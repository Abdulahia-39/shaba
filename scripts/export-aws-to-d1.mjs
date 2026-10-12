import { execFileSync } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { d1ImportSql, decodeDynamoValue } from './d1-import.mjs';
const args = Object.fromEntries(process.argv.slice(2).map(arg => { const index = arg.indexOf('='); if (!arg.startsWith('--') || index < 0) throw new Error('Use --table=NAME --profile=shaba --region=us-east-1'); return [arg.slice(2, index), arg.slice(index + 1)]; }));
if (!args.table || Object.keys(args).some(key => !['table', 'profile', 'region'].includes(key))) throw new Error('Use --table=NAME --profile=shaba --region=us-east-1');
// AWS CLI paginates the entire scan automatically. Do not add --no-paginate or --max-items.
const output = execFileSync('aws', ['dynamodb', 'scan', '--table-name', args.table, '--consistent-read', '--profile', args.profile || 'shaba', '--region', args.region || 'us-east-1', '--output', 'json'], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'inherit'] });
const raw = JSON.parse(output);
if (!Array.isArray(raw.Items) || raw.LastEvaluatedKey) throw new Error('Incomplete DynamoDB export');
const items = raw.Items.map(item => decodeDynamoValue({ M: item }));
const sql = d1ImportSql(items);
const directory = `migration-data/${new Date().toISOString().replaceAll(':', '-')}`;
await mkdir(directory, { recursive: true, mode: 0o700 });
await writeFile(`${directory}/records.json`, JSON.stringify(items), { mode: 0o600, flag: 'wx' });
await writeFile(`${directory}/import.sql`, sql, { mode: 0o600, flag: 'wx' });
console.log(`Exported ${items.length} records to ${directory}. Contains private contacts/drafts; do not commit or share.`);
