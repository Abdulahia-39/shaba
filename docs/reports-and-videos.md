# Reports and project videos

The public redesign is already on main. Merge the corrective reports/video release PR into main to deploy these features. PR #9 was merged into the old redesign branch after its release, so it did not reach main. It restores the original two Shaba/SDF videos on Home and Projects using responsive, lazy-loaded YouTube privacy-enhanced embeds, with direct YouTube links if playback is unavailable.

## Update the existing backend

The new report content type requires updated Lambda code. No new services, IAM permissions, environment variables or table migration are required.

1. After merging, update your local checkout to the reviewed code and run `npm ci`.
2. Verify your login with `aws sts get-caller-identity --profile shaba`.
3. Run `npm run backend:build`.
4. Validate the generated template:

```sh
aws cloudformation validate-template --template-body file://build/shaba-backend.json --profile shaba --region us-east-1
```

5. Create an update change set for the existing stack, preserving its media URL:

```sh
aws cloudformation create-change-set \
  --stack-name shaba-data --change-set-name shaba-reports \
  --change-set-type UPDATE --template-body file://build/shaba-backend.json \
  --parameters ParameterKey=MediaBaseUrl,UsePreviousValue=true \
  --capabilities CAPABILITY_IAM --profile shaba --region us-east-1
aws cloudformation wait change-set-create-complete \
  --stack-name shaba-data --change-set-name shaba-reports --profile shaba --region us-east-1
aws cloudformation describe-change-set \
  --stack-name shaba-data --change-set-name shaba-reports --profile shaba --region us-east-1 \
  --query 'Changes[].ResourceChange.[Action,LogicalResourceId,ResourceType,Replacement]' --output table
```

6. Confirm the changes are code modifications to the two Lambda functions, with no table replacements, resource additions or deletions. If unexpected changes appear, inspect them before proceeding.
7. Execute the reviewed change set:

```sh
aws cloudformation execute-change-set \
  --stack-name shaba-data --change-set-name shaba-reports --profile shaba --region us-east-1
aws cloudformation wait stack-update-complete \
  --stack-name shaba-data --profile shaba --region us-east-1
```

Use a fresh change-set name if `shaba-reports` was already used. See [the deployment guide](aws-deployment.md) for troubleshooting.

## Publish a report

1. Sign in to `/admin` with the authorized Google account.
2. Open **Reports** in the sidebar and choose **New content**.
3. Select **Report** as the content type; fill in title, summary, author, Markdown report body and cover image.
4. Save as **Draft** to keep the report text private. Uploaded cover images remain public in B2, as the editor explains.
5. Set visibility to **Published** and save. Open `/Reports` to see it; use its title to read the full report.

Reports use the existing Markdown editor and image upload. PDF document uploads are not included in this change. Reports are excluded from Projects and Publications/News. Existing article detail URLs remain `/Blog/[id]`; report details link back to Reports. Unpublishing removes the record from public lists and direct reads.
