import 'server-only';
import { requireDataWriteAllowed } from './data-policy.mjs';
import { invokeCloudflare } from './cloudflare-data.mjs';
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';

const client = new LambdaClient({ region: process.env.AWS_REGION || 'us-east-1' });

async function invoke(functionName, action, input) {
  if (!functionName) throw new Error('Data function is not configured');
  const response = await client.send(new InvokeCommand({
    FunctionName: functionName,
    Payload: Buffer.from(JSON.stringify({ action, input })),
  }));
  if (response.FunctionError || !response.Payload) throw new Error('Data service unavailable');
  const result = JSON.parse(Buffer.from(response.Payload).toString());
  if (!result.ok) throw new Error(result.error || 'Data request failed');
  return result.data;
}

export async function callData(action, input = {}) {
  return selectedProvider(false, action, input);
}
export async function callAdminData(action, input = {}) {
  return selectedProvider(true, action, input);
}

function selectedProvider(admin, action, input) {
  requireDataWriteAllowed(action, process.env.SHABA_DATA_READ_ONLY);
  const provider = process.env.SHABA_DATA_PROVIDER || 'aws';
  if (provider === 'aws') return invoke(admin ? process.env.SHABA_ADMIN_FUNCTION : process.env.SHABA_DATA_FUNCTION, action, input);
  if (provider !== 'cloudflare') throw new Error('Invalid data provider');
  return invokeCloudflare({ baseUrl: process.env.CLOUDFLARE_DATA_URL,
    token: admin ? process.env.CLOUDFLARE_ADMIN_API_TOKEN : process.env.CLOUDFLARE_PUBLIC_API_TOKEN,
    action, input, allowLocal: process.env.NODE_ENV !== 'production' });
}
