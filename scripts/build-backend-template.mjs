import { build } from 'esbuild';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const result = await build({
  absWorkingDir: root,
  entryPoints: ['backend/index.mjs'],
  bundle: true,
  platform: 'node',
  target: 'node22',
  format: 'cjs',
  external: ['@aws-sdk/*'],
  minify: true,
  write: false,
});
const code = result.outputFiles[0].text;
const ref = name => ({ Ref: name });
const arn = name => ({ 'Fn::GetAtt': [name, 'Arn'] });
const context = (why, must) => ({ 'com.aws.cloudformation.Context': { why, must } });
const table = {
  Type: 'AWS::DynamoDB::Table',
  DeletionPolicy: 'Retain',
  UpdateReplacePolicy: 'Retain',
  Metadata: context('Stores Shaba content, contacts and comments in one table.', [
    'Keep Standard provisioned capacity at 5 RCU / 5 WCU; no autoscaling.',
    'Retain data on stack deletion or replacement.',
  ]),
  Properties: {
    BillingMode: 'PROVISIONED',
    TableClass: 'STANDARD',
    ProvisionedThroughput: { ReadCapacityUnits: 5, WriteCapacityUnits: 5 },
    AttributeDefinitions: [{ AttributeName: 'pk', AttributeType: 'S' }, { AttributeName: 'sk', AttributeType: 'S' }],
    KeySchema: [{ AttributeName: 'pk', KeyType: 'HASH' }, { AttributeName: 'sk', KeyType: 'RANGE' }],
  },
};
const resources = { DataTable: table };
for (const admin of [false, true]) {
  const functionName = admin ? 'AdminFunction' : 'DataFunction';
  const roleName = `${functionName}Role`;
  const logName = admin ? 'AdminFunctionLogs' : 'FunctionLogs';
  resources[roleName] = {
    Type: 'AWS::IAM::Role',
    Metadata: context('Gives this Lambda access only to the Shaba table and basic logs.', ['Keep public and admin table permissions separate.']),
    Properties: {
      AssumeRolePolicyDocument: { Version: '2012-10-17', Statement: [{ Effect: 'Allow', Principal: { Service: 'lambda.amazonaws.com' }, Action: 'sts:AssumeRole' }] },
      ManagedPolicyArns: [{ 'Fn::Sub': 'arn:${AWS::Partition}:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole' }],
      Policies: [{ PolicyName: 'ShabaTableAccess', PolicyDocument: { Version: '2012-10-17', Statement: [{
        Effect: 'Allow',
        Action: ['dynamodb:GetItem', 'dynamodb:PutItem', 'dynamodb:Query', ...(admin ? ['dynamodb:DeleteItem'] : [])],
        Resource: arn('DataTable'),
      }] } }],
    },
  };
  resources[functionName] = {
    Type: 'AWS::Lambda::Function',
    Metadata: context('Runs private data logic with source code embedded in the template, avoiding S3 artifacts.', [
      'No function URL, API Gateway, VPC, provisioned concurrency or S3 bucket.',
      'Keep AWS SDK external; Node.js 22 Lambda supplies it.',
    ]),
    Properties: {
      Code: { ZipFile: code },
      Handler: 'index.handler',
      Runtime: 'nodejs22.x',
      Architectures: ['arm64'],
      Role: arn(roleName),
      MemorySize: 128,
      Timeout: 15,
      Environment: { Variables: { TABLE_NAME: ref('DataTable'), ...(admin ? { ADMIN_MODE: 'true', B2_PUBLIC_BASE_URL: ref('MediaBaseUrl') } : {}) } },
    },
  };
  resources[logName] = {
    Type: 'AWS::Logs::LogGroup',
    Metadata: context('Keeps basic Lambda logs for troubleshooting within recurring free allowances.', ['Retain logs for seven days; ingestion can still exceed free usage.']),
    Properties: { LogGroupName: { 'Fn::Sub': `/aws/lambda/\${${functionName}}` }, RetentionInDays: 7 },
  };
}
const template = {
  AWSTemplateFormatVersion: '2010-09-09',
  Description: 'Shaba private Lambda and DynamoDB backend; inline code deployment without S3. B2 stores website media.',
  Metadata: { AWSToolsMetrics: { AWSAgentToolkit: 'aws-cloudformation@3' } },
  Parameters: { MediaBaseUrl: { Type: 'String', Description: 'Exact HTTPS public B2/CDN base URL including bucket path.', AllowedPattern: 'https://.+' } },
  Resources: resources,
  Outputs: {
    FunctionName: { Value: ref('DataFunction') }, FunctionArn: { Value: arn('DataFunction') },
    AdminFunctionName: { Value: ref('AdminFunction') }, AdminFunctionArn: { Value: arn('AdminFunction') },
    TableName: { Value: ref('DataTable') },
  },
};
const json = JSON.stringify(template);
const size = Buffer.byteLength(json);
if (size > 51200) throw new Error(`Template is ${size} bytes, over the 51,200-byte inline limit. Reduce the bundle; do not fall back to S3.`);
await mkdir(`${root}build`, { recursive: true });
await writeFile(`${root}build/shaba-backend.json`, json);
console.log(`Created build/shaba-backend.json (${size} bytes). No AWS resources were created.`);
