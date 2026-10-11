import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { createService } from './service.mjs';
const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const TableName = process.env.TABLE_NAME;
export const handler = createService({
  async get(pk, sk) {
    return (await client.send(new GetCommand({ TableName, Key: { pk, sk }, ConsistentRead: true }))).Item;
  },
  async put(Item) {
    await client.send(new PutCommand({ TableName, Item, ConditionExpression: 'attribute_not_exists(pk)' }));
  },
  async save(Item, expected) {
    const options = expected === null
      ? { ConditionExpression: 'attribute_not_exists(pk)' }
      : { ConditionExpression: expected === 0 ? 'attribute_exists(pk) AND (#version = :expected OR attribute_not_exists(#version))' : 'attribute_exists(pk) AND #version = :expected',
          ExpressionAttributeNames: { '#version': 'version' }, ExpressionAttributeValues: { ':expected': expected } };
    await client.send(new PutCommand({ TableName, Item, ...options }));
  },
  async remove(pk, sk, expected) {
    const options = expected === undefined ? {} : {
      ConditionExpression: expected === 0 ? 'attribute_exists(pk) AND (#version = :expected OR attribute_not_exists(#version))' : 'attribute_exists(pk) AND #version = :expected',
      ExpressionAttributeNames: { '#version': 'version' }, ExpressionAttributeValues: { ':expected': expected },
    };
    await client.send(new DeleteCommand({ TableName, Key: { pk, sk }, ...options }));
  },
  async query(pk) {
    const items = [];
    let ExclusiveStartKey;
    do {
      const page = await client.send(new QueryCommand({ TableName,
        KeyConditionExpression: 'pk = :pk', ExpressionAttributeValues: { ':pk': pk }, ConsistentRead: true, ExclusiveStartKey }));
      items.push(...(page.Items || []));
      ExclusiveStartKey = page.LastEvaluatedKey;
      // Bound response size; introduce cursor-based UI pagination before growing beyond this limit.
      if (items.length > 1000) throw new Error('Collection exceeds response limit');
    } while (ExclusiveStartKey);
    return items;
  },
}, { admin: process.env.ADMIN_MODE === 'true', mediaBase: process.env.B2_PUBLIC_BASE_URL });
