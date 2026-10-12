// Import SQL is intentionally INSERT-only: duplicates fail instead of overwriting data.
export function d1ImportSql(items) {
  const quote = value => `'${value.replaceAll("'", "''")}'`;
  const keys = new Set();
  const lines = [];
  for (const item of items) {
    if (!item || typeof item.pk !== 'string' || typeof item.sk !== 'string' || !item.pk || !item.sk) throw new Error('Invalid record key');
    const key = JSON.stringify([item.pk, item.sk]);
    if (keys.has(key)) throw new Error('Duplicate record key');
    keys.add(key);
    const version = item.version ?? 0;
    if (!Number.isSafeInteger(version) || version < 0) throw new Error('Invalid record version');
    if (item.deletionPending) throw new Error('Finish pending media deletions before migrating');
    lines.push(`INSERT INTO records (pk, sk, version, document) VALUES (${quote(item.pk)}, ${quote(item.sk)}, ${version}, ${quote(JSON.stringify(item))});`);
  }
  return lines.join('\n') + '\n';
}
export function decodeDynamoValue(value) {
  if ('S' in value) return value.S;
  if ('N' in value) { const n = Number(value.N); if (!Number.isFinite(n)) throw new Error('Invalid DynamoDB number'); return n; }
  if ('BOOL' in value) return value.BOOL;
  if ('NULL' in value) return null;
  if ('M' in value) return Object.fromEntries(Object.entries(value.M).map(([key, val]) => [key, decodeDynamoValue(val)]));
  if ('L' in value) return value.L.map(decodeDynamoValue);
  throw new Error('Unsupported DynamoDB attribute type; export requires inspection');
}
