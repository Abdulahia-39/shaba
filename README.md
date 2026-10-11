# Shaba

Next.js 15 frontend with a private AWS Lambda data service, DynamoDB, and Backblaze B2 object storage. The active server actions no longer use Strapi or MongoDB. Legacy MongoDB files remain unused for migration reference.

## Development

Run `npm ci`, copy `.env.example` to `.env.local`, configure AWS credentials, then run `npm run dev`. The Next.js host needs `lambda:InvokeFunction` on the deployed public and admin function ARNs only; it does not need DynamoDB access. Prefer workload roles / temporary credentials. Never expose credentials in client variables.

Run `node --test tests/*.test.mjs` for data contract, validation, privacy, and failure handling checks.

## Deployment

Use AWS CLI with an authenticated `shaba` profile. SAM and S3 deployment buckets are not required. Run `npm ci` then `npm run backend:build` to generate `build/shaba-backend.json`. It embeds the complete bundled Lambda code inline in a plain CloudFormation template. Follow [the no-S3 deployment guide](docs/aws-deployment.md) to validate, preview the change set, and deploy.

Use stack name `shaba-data` in `us-east-1` to match the deployment policy. Set the `MediaBaseUrl` parameter to the exact public B2 base URL. Copy `FunctionName` into `SHABA_DATA_FUNCTION` and `AdminFunctionName` into `SHABA_ADMIN_FUNCTION`, using the same region. AWS SDK v3 is supplied by the Lambda Node.js 22 runtime. No S3 bucket, public function URL, API Gateway, VPC, NAT gateway, global secondary index, or provisioned concurrency is created. The table is retained on stack deletion. Later backend updates use the same generated-template workflow; no separate out-of-band code upload is needed.

CloudFormation has no additional charge for these AWS resource types. Lambda, DynamoDB and basic logs have recurring free allowances; other account usage and excess usage can incur charges. This is not a promise of a zero bill. IAM permissions do not enforce a spending cap.

## Data model and migration

One Standard table, with string keys `pk` and `sk`:

| Record | pk | sk | Data |
| --- | --- | --- | --- |
| Blog post | POSTS | original post ID as string | `id`, `attributes` |
| Comment | COMMENTS#postId | ISO timestamp#UUID | `_id`, `post`, `name`, `email`, `comment`, `createdAt` |
| Contact | CONTACTS | ISO timestamp#UUID | `name`, `email`, `phone`, `message` |

Export **all pages** of published Strapi posts with populated `postimg` and `categories`. Import each existing `{id, attributes}` with `pk: "POSTS"` and `sk: String(id)` using an administrator's DynamoDB credentials. This retains URLs and the existing frontend response shape. Required attributes include title, description, content, author, publishedAt, populated image dimensions/URL, and categories as consumed by the UI. Keep records under DynamoDB's 400 KB item limit.

Export MongoDB contacts and comments before retiring the databases. Convert comment dates to ISO strings, retain `_id` and `post`, and generate the composite keys shown above. Verify counts and representative records before switching production. The public runtime cannot perform admin operations. A separate admin Lambda provides content editing, private contact reads, and comment moderation to authenticated Next.js admin actions.

Use Backblaze B2 for images and other objects. Copy existing Strapi media into the B2 bucket, and update each post's `attributes.postimg.data.attributes.url` to its public B2/CDN URL while preserving dimensions. Set `B2_PUBLIC_BASE_URL` to the exact HTTPS bucket/CDN base URL (including the bucket path) before building Next.js; the image allowlist is restricted to that path. Verify every media URL before shutting down Strapi. The admin editor can upload cover images directly through its authenticated server endpoint. B2 application keys must remain server-side and scoped to the intended bucket. Private objects require a separate authenticated delivery design. B2 has separate storage and transfer allowances from AWS.

Comments are returned without email addresses and queried per post. Only the admin can delete comments. Existing UI only submits comments; it does not render a comment list. Contact submissions remain private. Collection reads use Query, handle DynamoDB's 1 MB pagination, and reject collections over 1,000 records; add cursor-based UI pagination before reaching that scale. Public posts are sorted by publication date in ascending order so the home page's final three items are the newest. Drafts are excluded from article, list, and public comment requests. Imported records without a status retain their published behavior.

## Free-tier design

The table provisions 5 RCUs and 5 WCUs with no autoscaling, within DynamoDB's recurring 25 RCU / 25 WCU and 25 GB Standard allowance, subject to other usage in the account/region. On-demand request pricing does not use this provisioned-capacity allowance. Lambda has a recurring allowance of 1 million requests and 400,000 GB-seconds monthly. These are allowances, not a guarantee of a zero bill.

AWS sources: [DynamoDB pricing](https://aws.amazon.com/dynamodb/pricing/), [Lambda pricing](https://aws.amazon.com/lambda/pricing/), [AWS account free-tier terms](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier.html).

Account eligibility, outbound transfer, CloudWatch logs, media hosting, and frontend hosting must be checked separately. The newer six-month AWS Free Plan is distinct from recurring service allowances. This template sets seven-day log retention. Public Next.js form submissions still need deployment-level abuse controls (rate limiting / bot protection) before production; IAM protects direct Lambda access but does not prevent abuse through the site.


## Single-admin Google editor

Visit `/admin` directly; it has no public navigation link. Every admin page, server action, and image upload verifies the session. Google sign-in must return a verified email that matches `ADMIN_EMAIL`. There is no registration, user database, or password to manage. Sessions expire after eight hours; changing `ADMIN_EMAIL` revokes the old account on the next request. Admin pages also set `noindex` metadata.

1. Create a Google OAuth **Web application** client and configure the consent screen. If the application is in testing mode, add the admin account as a test user.
2. Add redirect URIs `http://localhost:3000/api/auth/callback/google` and `https://YOUR_DOMAIN/api/auth/callback/google`. Use your actual production domain.
3. Set `ADMIN_EMAIL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXTAUTH_URL` (the app's canonical URL), and a strong `NEXTAUTH_SECRET` in `.env.local` and production hosting. Generate a secret locally with `openssl rand -base64 32`; never commit it. See [Google provider setup](https://next-auth.js.org/providers/google).
4. Deploy/update the CloudFormation stack and set `SHABA_ADMIN_FUNCTION` from its output. Grant the Next.js server permission to invoke **both** function ARNs. The public function denies all admin actions even if its caller supplies an `admin` flag; the privileged function uses an environment setting controlled at deployment and is accessible only through IAM.
5. In B2, create a bucket-scoped application key with write access under the `uploads/` prefix, and any bucket-discovery capability required by B2's S3 API. Set `B2_ENDPOINT`, `B2_REGION`, `B2_BUCKET`, `B2_KEY_ID`, and `B2_APPLICATION_KEY`. Keep these separate from AWS credentials. `B2_PUBLIC_BASE_URL` in Next.js must match the CloudFormation `MediaBaseUrl` value. See [B2 integration configuration](https://www.backblaze.com/docs/en/cloud-storage-get-started-with-a-backblaze-integration).
6. Restart/redeploy Next.js, visit `/admin`, and sign in. Create content, upload a cover, preview it, and save a draft or publish it. Test another Google account: it must be rejected. Test a draft URL while signed out: its content must not be exposed.

The editor supports blog posts, articles/publications, and projects with title, author, description, Markdown body, and cover image. Projects appear on `/Projects`; published content also appears in the blog. It includes a private contact inbox and per-post comment deletion. Saving detects concurrent edits and rejects stale versions. Use Refresh dashboard, then reopen content after a conflict. Existing public pages show updates after a refresh.

Uploads accept still JPEG, PNG, and WebP images up to 3 MB. The server checks actual image data, rejects SVG/animation, strips metadata by re-encoding to WebP, and resizes to at most 2400 pixels per dimension. Uploads pass through the Next.js server, so no browser CORS setup is needed; the hosting provider must allow this request size and server execution time. Uploaded images are **public even for drafts**. Saving a draft protects its text, not its media. Replaced, abandoned, and deleted content images remain in B2 until you remove them there. Deleting content does not automatically remove its comments. Attachments and inline-body uploads are not yet included.

You can start with an empty DynamoDB table; no Strapi export is needed if the old data is gone. Protect the new data with periodic exports or backups according to your cost requirements. Cloud deployment, real Google OAuth login, and real B2 uploads require account configuration and are not covered by local unit tests.
