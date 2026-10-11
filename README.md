# Shaba

Next.js 15 frontend with a private AWS Lambda data service, DynamoDB, and Backblaze B2 object storage. The active server actions no longer use Strapi or MongoDB. Legacy MongoDB files remain unused for migration reference.

## Development

Run `npm ci`, copy `.env.example` to `.env.local`, configure AWS credentials, then run `npm run dev`. The Next.js host needs `lambda:InvokeFunction` on the deployed function ARN only; it does not need DynamoDB access. Prefer workload roles / temporary credentials. Never expose credentials in client variables.

Run `node --test tests/*.test.mjs` for data contract, validation, privacy, and failure handling checks.

## Deployment

Install AWS CLI and AWS SAM CLI, authenticate to the intended account, then run:

```sh
sam validate --template-file backend/template.yaml
sam build --template-file backend/template.yaml
sam deploy --guided
```

SAM deployment creates billable-capable AWS resources. Review the account and region before deployment. Copy the stack's FunctionName output into `SHABA_DATA_FUNCTION` and use the same region. The Lambda runtime supplies AWS SDK v3. No public function URL, API Gateway, VPC, NAT gateway, or global secondary index is created. The table is retained on stack deletion.

## Data model and migration

One Standard table, with string keys `pk` and `sk`:

| Record | pk | sk | Data |
| --- | --- | --- | --- |
| Blog post | POSTS | original post ID as string | `id`, `attributes` |
| Comment | COMMENTS#postId | ISO timestamp#UUID | `_id`, `post`, `name`, `email`, `comment`, `createdAt` |
| Contact | CONTACTS | ISO timestamp#UUID | `name`, `email`, `phone`, `message` |

Export **all pages** of published Strapi posts with populated `postimg` and `categories`. Import each existing `{id, attributes}` with `pk: "POSTS"` and `sk: String(id)` using an administrator's DynamoDB credentials. This retains URLs and the existing frontend response shape. Required attributes include title, description, content, author, publishedAt, populated image dimensions/URL, and categories as consumed by the UI. Keep records under DynamoDB's 400 KB item limit.

Export MongoDB contacts and comments before retiring the databases. Convert comment dates to ISO strings, retain `_id` and `post`, and generate the composite keys shown above. Verify counts and representative records before switching production. The runtime role cannot edit posts or read contacts: use a separate administrator role and the DynamoDB console/CLI initially. Strapi's editorial interface is not replaced by Lambda; a future authenticated editor can provide that workflow.

Use Backblaze B2 for images and other objects. Copy existing Strapi media into the B2 bucket, and update each post's `attributes.postimg.data.attributes.url` to its public B2/CDN URL while preserving dimensions. Set `B2_PUBLIC_BASE_URL` to the exact HTTPS bucket/CDN base URL (including the bucket path) before building Next.js; the image allowlist is restricted to that path. Verify every media URL before shutting down Strapi. Upload through the B2 console initially; this change does not implement an upload editor. B2 application keys must remain server-side and scoped to the intended bucket. Private objects require a separate authenticated delivery design. B2 has separate storage and transfer allowances from AWS.

Comments are returned without email addresses and queried per post. There is no unauthenticated deletion endpoint. Existing UI only submits comments; it does not render a comment list. Contact submissions remain private. Collection reads use Query, handle DynamoDB's 1 MB pagination, and reject collections over 1,000 records; add cursor-based UI pagination before reaching that scale. Blog order follows string IDs, matching existing list/slice behavior imperfectly for numeric IDs; date ordering should be specified before expanding publishing.

## Free-tier design

The table provisions 5 RCUs and 5 WCUs with no autoscaling, within DynamoDB's recurring 25 RCU / 25 WCU and 25 GB Standard allowance, subject to other usage in the account/region. On-demand request pricing does not use this provisioned-capacity allowance. Lambda has a recurring allowance of 1 million requests and 400,000 GB-seconds monthly. These are allowances, not a guarantee of a zero bill.

AWS sources: [DynamoDB pricing](https://aws.amazon.com/dynamodb/pricing/), [Lambda pricing](https://aws.amazon.com/lambda/pricing/), [AWS account free-tier terms](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier.html).

Account eligibility, outbound transfer, CloudWatch logs, SAM deployment artifacts in S3, media hosting, and frontend hosting must be checked separately. The newer six-month AWS Free Plan is distinct from recurring service allowances. This template sets seven-day log retention. Public Next.js form submissions still need deployment-level abuse controls (rate limiting / bot protection) before production; IAM protects direct Lambda access but does not prevent abuse through the site.
