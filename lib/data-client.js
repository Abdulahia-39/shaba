import 'server-only';
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
  return invoke(process.env.SHABA_DATA_FUNCTION, action, input);
}
export async function callAdminData(action, input = {}) {
  return invoke(process.env.SHABA_ADMIN_FUNCTION, action, input);
}
