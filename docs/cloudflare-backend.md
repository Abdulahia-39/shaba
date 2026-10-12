# Move only Shaba's backend to Cloudflare

Next.js remains on Vercel. Cloudflare Workers replaces Lambda; D1 replaces DynamoDB. Google admin sign-in, image validation/processing and permanent B2 image cleanup remain in the existing Next.js server actions. Only the backend provider changes. No Pages hosting, R2, KV, queues, Durable Objects or paid Cloudflare Images are introduced.

## What stays compatible

The Worker reuses the tested data service, including report support, private drafts, published-only direct reads, contacts, comment email privacy, optimistic versions and the two-stage media-deletion flow. D1 stores the original documents with their original partition/sort keys, IDs, versions and B2 URLs. Vercel verifies Google admin sessions before using the admin API token. Worker routes have separate credentials and action allowlists; the public token cannot access admin routes. Neither token belongs in client code or a `NEXT_PUBLIC_` variable.

Free Workers includes 100,000 requests/day and a 10 ms CPU limit per request; D1 includes 5 million rows read/day, 100,000 rows written/day and 5 GB total storage. These are quotas, not an uptime or permanent-pricing guarantee. Quota exhaustion can interrupt reads/writes; inspect remote CPU usage after deployment. The backend is small and does not process images. Existing collection limits remain 1,000 records per partition; add pagination before exceeding them.

## Current Shaba setup

The Worker is deployed at `https://shaba-data.abdilahi1055.workers.dev`, and the D1 database in the committed configuration has its schema applied. Matching API credentials and the local Cloudflare provider selection are saved in the ignored `.env.local` file. Restart the Next.js development server to use it. Live checks verified a private draft, published report, role isolation, record deletion and permanent B2 image-version cleanup; the disposable test data was removed. Do not recreate the database or regenerate credentials for the initial cutover. AWS has no data to migrate, as confirmed by the owner: skip the AWS login, export and import steps below. Follow section 6 after merging the PR. Vercel remains on AWS until its environment is switched.

## 1. Prepare accounts and code

1. Review and merge the migration PR into main when ready. The default provider is still AWS, so this merge alone does not switch databases.
2. Pull the merged code and run `npm ci`.
3. Sign into Cloudflare: `npx wrangler login`, then `npx wrangler whoami`. Use the Free Workers plan; do not enable paid products for this migration.
4. Only if AWS contains data to migrate, renew AWS access: `aws login --profile shaba`, then `aws sts get-caller-identity --profile shaba`.
5. Run `npm test` and `npm run cf:check`. Tests use an isolated local D1 database, never production.

## 2. Create and configure D1

Run:

```sh
npx wrangler d1 create shaba-data --config cloudflare/wrangler.jsonc
```

For a new account/database, copy the returned `database_id` into `cloudflare/wrangler.jsonc`, replacing the existing database ID. Keep the database name `shaba-data` and binding `DB`. If there are multiple Cloudflare accounts, configure `account_id` for the intended account. Record these non-secret identifiers in a follow-up feature-branch PR; never commit API tokens or secrets.

Apply the schema to the new database:

```sh
npm run cf:migrate:remote
```

Inspect the target name/account before accepting Wrangler's prompt. This creates the empty records table; it does not import data.

## 3. Configure Worker secrets and deploy

Generate two independent random tokens (at least 32 characters), store them in a password manager, and enter them at the interactive prompts below. These are application API credentials, not your Cloudflare account token. Do not reuse one token for both roles, paste them into chat, or put them into shell commands/history.

```sh
npx wrangler secret put PUBLIC_API_TOKEN --config cloudflare/wrangler.jsonc
npx wrangler secret put ADMIN_API_TOKEN --config cloudflare/wrangler.jsonc
npx wrangler secret put B2_PUBLIC_BASE_URL --config cloudflare/wrangler.jsonc
npm run cf:deploy
```

The media URL must exactly match the existing Vercel `B2_PUBLIC_BASE_URL`, including the bucket path. The Worker needs no B2 keys because Vercel still uploads/deletes images. Save the returned HTTPS Worker origin, for example `https://shaba-data.YOUR-SUBDOMAIN.workers.dev`.

## 4. Pause writes and export AWS data

Do this shortly before cutover, after the provider-selection code has deployed to Vercel. Set Vercel Production `SHABA_DATA_READ_ONLY=true` and redeploy main with the AWS provider still selected. Public browsing remains available; contact/comment submissions and admin writes are temporarily paused. Stop local editing too. Wait at least 30 seconds for in-flight requests to finish. This prevents new content or enquiries being written to AWS after the export.

Find the source table:

```sh
aws cloudformation describe-stacks --stack-name shaba-data --profile shaba --region us-east-1 --query 'Stacks[0].Outputs' --output table
```

Use its **TableName** output:

```sh
npm run data:export -- --table=YOUR_EXISTING_TABLE_NAME --profile=shaba --region=us-east-1
```

The exporter reads all scan pages consistently and writes `records.json` plus `import.sql` into a timestamped `migration-data/` directory. A scan is not a point-in-time snapshot, which is why writers must be paused. The export refuses duplicate keys, unsupported values and pending deletions; finish pending deletions before starting the pause. It never deletes AWS data.

These files include private contacts, comment emails and drafts. They are Git-ignored with restricted local permissions. Keep an encrypted/offline backup outside this checkout. If the export fails, remove the write pause and resume AWS operation while investigating.

## 5. Import and verify before cutover

Import into the new empty D1 database:

```sh
npx wrangler d1 execute shaba-data --remote --config cloudflare/wrangler.jsonc --file=migration-data/YOUR_EXPORT_DIRECTORY/import.sql
npx wrangler d1 execute shaba-data --remote --config cloudflare/wrangler.jsonc --command="SELECT pk, COUNT(*) AS count FROM records GROUP BY pk ORDER BY pk"
```

The import is INSERT-only: it refuses to overwrite records. If an import fails, inspect its result and the target database before retrying; never delete a database containing post-cutover writes just to retry an import.

Verify against the exported JSON counts and representative records. For stronger verification, export D1's data, decode each `document`, and compare it to `records.json` by pk/sk; counts alone do not prove a correct migration. Check drafts, reports, contacts and comments, not just published posts.

For local Next.js testing against the deployed Worker, add to `.env.local`:

```dotenv
SHABA_DATA_PROVIDER=cloudflare
SHABA_DATA_READ_ONLY=true
CLOUDFLARE_DATA_URL=https://shaba-data.YOUR-SUBDOMAIN.workers.dev
CLOUDFLARE_PUBLIC_API_TOKEN=YOUR_PUBLIC_TOKEN
CLOUDFLARE_ADMIN_API_TOKEN=YOUR_ADMIN_TOKEN
```

Run `npm run dev`, check public lists and published/draft detail access, and sign into admin to verify the full library, contacts and comments. Do not write while verifying the imported snapshot. Provider/token errors never silently fall back to AWS.

## 6. Switch Vercel Production

Keep Google and B2 variables exactly as they are. Add the Worker URL and two tokens above to Vercel Production, set `SHABA_DATA_PROVIDER=cloudflare`, and retain `SHABA_DATA_READ_ONLY=true` for the initial redeployment. Verify public pages and admin reads on the deployed site.

Then set `SHABA_DATA_READ_ONLY=false` and redeploy to resume writes. Verify a new draft/report, publish/unpublish, a contact/comment, and deletion of a newly created disposable item and its exact B2 image versions. Confirm those records appear in D1, not DynamoDB. Monitor Cloudflare errors, CPU and quota usage.

AWS credentials/function variables can remain temporarily for rollback; once the migration is confirmed, remove them from Vercel. Never remove Google/B2 credentials as part of this switch.

## Rollback and retirement

Before D1 accepts writes, rollback is simply `SHABA_DATA_PROVIDER=aws`, remove the write pause and redeploy. After D1 accepts writes, AWS is a stale snapshot: pause writes and reconcile/export D1 changes before rolling back. Deleted B2 images are permanently removed and cannot be restored by switching databases; an AWS snapshot can refer to a cover deleted after cutover.

Keep AWS data and backup files during verification. Do not delete the AWS stack/table, revoke credentials or close the AWS account automatically. Export D1 periodically with `wrangler d1 export` and keep independent B2 media backups; the temporary free-plan recovery window does not replace independent backups.

## Optional offline development

Create Git-ignored `cloudflare/.dev.vars` with local-only `PUBLIC_API_TOKEN`, `ADMIN_API_TOKEN` and `B2_PUBLIC_BASE_URL`. Run `npm run cf:migrate:local`, then `npm run cf:dev`. Point `.env.local` at the printed localhost origin with matching tokens and `SHABA_DATA_PROVIDER=cloudflare`; localhost HTTP is accepted only outside production. Restart Next.js after changing env values. Local migrations and tests require no Cloudflare account.

Sources: [Workers limits](https://developers.cloudflare.com/workers/platform/limits/), [D1 pricing](https://developers.cloudflare.com/d1/platform/pricing/), [D1 prepared statements](https://developers.cloudflare.com/d1/worker-api/prepared-statements/), [Worker secrets](https://developers.cloudflare.com/workers/configuration/secrets/).
