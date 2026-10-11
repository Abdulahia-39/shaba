# Admin workspace and image deletion

The admin uses Shaba's design tokens, a responsive sidebar, searchable/status-filtered content library, publication/project sections, contact inbox and editor preview. Drafts remain admin-only; media uploads remain public. Destructive actions and unsaved-edit confirmations use keyboard-accessible dialogs. Errors use a dialog and persistent recovery message; successful actions use a dismissible status notification. The browser's own close/reload warning is retained for unsaved edits because browsers require that mechanism.

## Enable this release

Backend changes must be deployed as well as merging the frontend PR. No AWS resources or B2 files are changed merely by merging/building.

1. After reviewing the PR, check out its feature branch locally (or pull main after merging). Run `npm ci` and `npm run backend:build`.
2. Confirm `aws sts get-caller-identity --profile shaba` identifies the existing deployment account.
3. Create an UPDATE change set for the existing stack, retaining its media base parameter:

```sh
aws cloudformation create-change-set \
  --stack-name shaba-data \
  --change-set-name shaba-admin-media-cleanup \
  --change-set-type UPDATE \
  --template-body file://build/shaba-backend.json \
  --parameters ParameterKey=MediaBaseUrl,UsePreviousValue=true \
  --capabilities CAPABILITY_IAM \
  --profile shaba --region us-east-1
aws cloudformation wait change-set-create-complete \
  --stack-name shaba-data --change-set-name shaba-admin-media-cleanup \
  --profile shaba --region us-east-1
aws cloudformation describe-change-set \
  --stack-name shaba-data --change-set-name shaba-admin-media-cleanup \
  --query 'Changes[].ResourceChange.[Action,LogicalResourceId,ResourceType,Replacement]' \
  --output table --profile shaba --region us-east-1
```

4. Expect in-place code modifications of DataFunction and AdminFunction, with no table replacement, new service, or resource deletion. Inspect unexpected changes before proceeding. Apply the reviewed update:

```sh
aws cloudformation execute-change-set \
  --stack-name shaba-data --change-set-name shaba-admin-media-cleanup \
  --profile shaba --region us-east-1
aws cloudformation wait stack-update-complete \
  --stack-name shaba-data --profile shaba --region us-east-1
```

5. In Backblaze's Application Keys, ensure the app key is restricted to the Shaba bucket and `uploads/` prefix and has `listFiles`, `writeFiles`, and `deleteFiles`. Version listing and permanent deletion need list/delete capabilities; upload-only keys cannot clean up images. If a replacement key is needed, replace `B2_KEY_ID` and `B2_APPLICATION_KEY` in local `.env.local` and Vercel Production, then redeploy main. Do not expose these credentials or grant Object Lock bypass capabilities. Keep the existing endpoint, region, bucket and public base URL.
6. Merge the reviewed PR into main to trigger the normal production deployment. AWS runtime credentials and the two function names remain the same. Updating the Lambda code first briefly disables the old dashboard's delete action rather than allowing database-only deletion.
7. Verify saving a draft, publishing, inbox navigation, and cancellation of a delete dialog. For an actual deletion check, create a disposable content item with a newly uploaded cover; delete that item, then verify its exact key has no versions left in B2. Do not test with existing valuable content.

## Deletion behavior

Next.js verifies the admin session and asks the private admin Lambda to begin deletion using the saved record ID/version. Lambda locks the record against edits and hides it from public feeds, direct article access and comments. It returns the persisted cover URL, never a browser-supplied deletion URL. Next.js validates that URL against the configured media base and the uploader's `uploads/*.webp` key format, lists the exact key's versions/hide markers through the B2 endpoint, and permanently deletes each version. Only then does Lambda remove the content record.

B2 and DynamoDB do not share a transaction. If cleanup or final removal fails, the locked record keeps its image reference, appears as **Deletion pending**, and offers **Retry deletion**. Already removed versions are safe to retry. Do not report successful deletion until both stages finish. If a record's cover is referenced by another content item, preserve that image and tell the admin it was retained. Covers with legacy external or unsupported paths are not deleted automatically; the record remains pending for investigation.

This operation cleans up the saved cover belonging to the deleted content. It does not sweep abandoned uploads, old replacement covers, inline Markdown images, or previously deleted records. Existing browser/CDN caches can still serve a previously downloaded image after bucket deletion; this workflow does not purge caches. Comments are not bulk-purged by content deletion (they become inaccessible publicly).

No B2 credentials are passed to Lambda. No S3 bucket, API Gateway, queue, scheduler, or other AWS service is added. Existing Lambda/DynamoDB allowance constraints remain unchanged; B2 API usage has its own allowances. Sources: [B2 version listing](https://www.backblaze.com/apidocs/s3-list-object-versions), [version-specific deletion](https://www.backblaze.com/apidocs/s3-delete-object).

## Delete says the backend is an older version

If deletion returns `Unsupported action` from the admin Lambda, merging the frontend did not update the backend. Deploy the latest reviewed backend using the **Later backend changes** section in `docs/aws-deployment.md`. Check for code-only changes to the existing two functions and preserve the table and MediaBaseUrl parameter. Frontend deployments alone cannot enable the deletion commands.

A safe support check is an invocation of `adminBeginDeletePost` with an empty input. A current backend returns `Invalid id` before reading or changing any record. An old backend returns `Unsupported action`. Do not supply a real record ID just to test support. B2 `listFiles` and `deleteFiles` permissions are also required; successful uploads alone do not establish deletion access.
