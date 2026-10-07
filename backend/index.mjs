import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { createService } from './service.mjs';
const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const TableName = process.env.TABLE_NAME;
export const handler = createService({
  async get(pk, sk) {
    return (await client.send(new GetCommand({ TableName, Key: { pk, sk } }))).Item;
  },
  async put(Item) {
    await client.send(new PutCommand({ TableName, Item, ConditionExpression: 'attribute_not_exists(pk)' }));
  },
  async query(pk) {
    const items = [];
    let ExclusiveStartKey;
    do {
      const page = await client.send(new QueryCommand({ TableName,
        KeyConditionExpression: 'pk = :pk', ExpressionAttributeValues: { ':pk': pk }, ExclusiveStartKey }));
      items.push(...(page.Items || []));
      ExclusiveStartKey = page.LastEvaluatedKey;
      // Bound response size; introduce cursor-based UI pagination before growing beyond this limit.
      if (items.length > 1000) throw new Error('Collection exceeds response limit');
    } while (ExclusiveStartKey);
    return items;
  },
});
