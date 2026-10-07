import 'server-only';
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';

const client = new LambdaClient({ region: process.env.AWS_REGION || 'us-east-1' });

export async function callData(action, input = {}) {
  if (!process.env.SHABA_DATA_FUNCTION) throw new Error('SHABA_DATA_FUNCTION is not configured');
  const response = await client.send(new InvokeCommand({
    FunctionName: process.env.SHABA_DATA_FUNCTION,
    Payload: Buffer.from(JSON.stringify({ action, input })),
  }));
  if (response.FunctionError || !response.Payload) throw new Error('Data service unavailable');
  const result = JSON.parse(Buffer.from(response.Payload).toString());
  if (!result.ok) throw new Error(result.error || 'Data request failed');
  return result.data;
}
