# Deploy the backend without S3

Use the AWS CLI and Node.js/npm. The builder bundles the backend into CommonJS and embeds it in both Lambda functions through CloudFormation `Code.ZipFile`. There is no SAM packaging step, separate code upload, or S3 artifact bucket. CloudFormation has no extra charge for these AWS resource types. Keep account usage within the recurring Lambda, provisioned DynamoDB Standard and basic CloudWatch Logs free allowances.

## First deployment

1. Merge the admin/no-S3 workflow PR into `main`, then update a clean local checkout. Do not push directly to `main`.
2. Verify `aws sts get-caller-identity --profile shaba` and region `us-east-1`. The deployment policy must permit stack `shaba-data` and its generated function, table and role names. Remove the `DeploymentBucket`, `DeploymentArtifacts`, and now-unused `SamTransform` statements from the previously supplied IAM policy. Keep `SignInLocalDevelopmentAccess` attached to the developers group.
3. Copy the exact HTTPS public B2 bucket/CDN base URL. It must match the frontend `B2_PUBLIC_BASE_URL` and the stack's `MediaBaseUrl` parameter. No secret is required in this template.
4. Install dependencies and build the template:

```sh
npm ci
npm run backend:build
```

Generated `build/shaba-backend.json` is ignored by Git. The builder rejects templates over the 51,200-byte direct-upload limit instead of falling back to S3. Only use the generated template, not the previous SAM template.

5. Validate template syntax and resource declarations with AWS:

```sh
aws cloudformation validate-template \
  --template-body file://build/shaba-backend.json \
  --profile shaba --region us-east-1
```

This validation does not confirm deployment IAM permissions, runtime behavior, or free-tier eligibility. CloudFormation also performs account-aware pre-deployment validation during change-set creation. An existing stack should be inspected before updating to avoid unintended replacements.

6. Set the public media URL in your current shell and create an initial change set:

```sh
export SHABA_MEDIA_BASE_URL='https://YOUR-DOWNLOAD-HOST/file/YOUR-BUCKET'
aws cloudformation create-change-set \
  --stack-name shaba-data \
  --change-set-name shaba-initial \
  --change-set-type CREATE \
  --template-body file://build/shaba-backend.json \
  --parameters ParameterKey=MediaBaseUrl,ParameterValue="$SHABA_MEDIA_BASE_URL" \
  --capabilities CAPABILITY_IAM \
  --profile shaba --region us-east-1
aws cloudformation wait change-set-create-complete \
  --stack-name shaba-data --change-set-name shaba-initial \
  --profile shaba --region us-east-1
aws cloudformation describe-change-set \
  --stack-name shaba-data --change-set-name shaba-initial \
  --profile shaba --region us-east-1 \
  --query 'Changes[].ResourceChange.[Action,LogicalResourceId,ResourceType,Replacement]' \
  --output table
```

Review seven additions: one table, two roles, two functions and two log groups. There must be no S3 resource or public endpoint. If creating the change set fails, inspect `StatusReason` with `describe-change-set` before retrying. Do not execute a failed or unexpected change set.

7. Apply the reviewed change set:

```sh
aws cloudformation execute-change-set \
  --stack-name shaba-data --change-set-name shaba-initial \
  --profile shaba --region us-east-1
aws cloudformation wait stack-create-complete \
  --stack-name shaba-data --profile shaba --region us-east-1
aws cloudformation describe-stacks \
  --stack-name shaba-data --profile shaba --region us-east-1 \
  --query 'Stacks[0].Outputs' --output table
```

8. Save both function names and ARNs. The Next.js host needs `lambda:InvokeFunction` on those exact ARNs; never attach deployment permissions to its runtime identity. For the current code, Vercel can use dedicated IAM-user credentials with that invocation-only policy; local development uses `AWS_PROFILE=shaba`. Do not put the laptop profile or expiring laptop credentials in Vercel. OIDC requires a separate code integration.

## Later backend changes

Regenerate the template after pulling reviewed backend changes. Create a uniquely named change set with `--change-set-type UPDATE` for the same stack. Review replacements and deletions before executing; use the `stack-update-complete` waiter afterwards. Inline function code updates remain managed by CloudFormation, so an infrastructure update does not revert a separately uploaded package.

If the table requires replacement, stop and plan a data migration. Retention prevents deletion of the old table but does not automatically copy its data to a new one. Do not deploy duplicate stacks just to retry a failed deployment.

## Free-allowance constraints

- DynamoDB: Standard provisioned table, 5 RCU and 5 WCU; no autoscaling, global tables or paid backup features enabled here.
- Lambda: on-demand execution, 128 MB, 15-second timeout; no provisioned concurrency, layers, custom VPC or API Gateway.
- Logs: seven-day retention; high ingestion can still consume the free allowance.
- B2: media storage and downloads have separate allowances. Draft images are public.
- Account free-plan expiry is distinct from recurring service allowances. Check Billing's Free Tier page before deployment. Alerts notify; they do not cap charges. Frontend hosting and domain costs are separate.

Sources: [CloudFormation pricing](https://aws.amazon.com/cloudformation/pricing/), [inline Lambda code](https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-properties-lambda-function-code.html), [DynamoDB pricing](https://aws.amazon.com/dynamodb/pricing/), [Lambda pricing](https://aws.amazon.com/lambda/pricing/), [CloudWatch pricing](https://aws.amazon.com/cloudwatch/pricing/).
