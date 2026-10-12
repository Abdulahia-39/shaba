import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { getPlatformProxy } from 'wrangler';
import { requireDataWriteAllowed } from '../lib/data-policy.mjs';
import worker from '../cloudflare/worker.mjs';
import { invokeCloudflare } from '../lib/cloudflare-data.mjs';
import { d1ImportSql, decodeDynamoValue } from '../scripts/d1-import.mjs';
const publicToken = 'public-'.padEnd(64, 'p');
const adminToken = 'admin-'.padEnd(64, 'a');
const mediaBase = 'https://example.com/file/shaba';
const input = { title: 'D1 report', description: 'A report', content: '## Report\nDetails', author: 'Shaba', type: 'report', status: 'draft', image: { url: `${mediaBase}/uploads/test.webp`, width: 100, height: 100 } };
const request = (action, input, admin = false, token = admin ? adminToken : publicToken) => new Request(`https://data.example/${admin ? 'admin' : 'public'}`, { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ action, input }) });

test('Cloudflare transport validates destinations and keeps tokens server-side', async () => {
  let calls = 0;
  const fetchImpl = async (url, options) => {
    calls++;
    assert.equal(url.href, 'https://data.example/admin');
    assert.equal(options.headers.Authorization, `Bearer ${adminToken}`);
    assert.equal(options.redirect, 'error');
    assert.equal(options.cache, 'no-store');
    assert.deepEqual(JSON.parse(options.body), { action: 'adminList', input: {} });
    return Response.json({ ok: true, data: { posts: [] } });
  };
  assert.deepEqual(await invokeCloudflare({ baseUrl: 'https://data.example', token: adminToken, action: 'adminList', fetchImpl }), { posts: [] });
  for (const baseUrl of ['http://data.example', 'https://user:pass@data.example', 'https://data.example/path', 'https://data.example?token=x']) await assert.rejects(invokeCloudflare({ baseUrl, token: adminToken, action: 'adminList', fetchImpl }));
  assert.equal(calls, 1);
  await assert.rejects(invokeCloudflare({ baseUrl: 'https://data.example', token: adminToken, action: 'adminList', fetchImpl: async () => new Response('', { status: 401 }) }), /API token/);
});

test('D1 migration preserves documents, safely quotes SQL and refuses destructive imports', () => {
  const item = { pk: 'POSTS', sk: "O'Brien", version: 2, attributes: { content: "Text ' quoted", description: 'Unicode: Borama ✓' } };
  const sql = d1ImportSql([item]);
  assert.match(sql, /O''Brien/);
  assert.match(sql, /INSERT INTO/);
  assert.doesNotMatch(sql, /REPLACE|UPDATE|DELETE/);
  assert.throws(() => d1ImportSql([item, item]), /Duplicate/);
  assert.throws(() => d1ImportSql([{ ...item, deletionPending: true }]), /pending/);
  assert.deepEqual(decodeDynamoValue({ M: { pk: { S: 'POSTS' }, version: { N: '2' }, status: { S: 'draft' }, nested: { L: [{ BOOL: true }, { NULL: true }] } } }), { pk: 'POSTS', version: 2, status: 'draft', nested: [true, null] });
});

test('real local D1 preserves authorization, concurrency, privacy, and media-deletion flow', async t => {
  const proxy = await getPlatformProxy({ configPath: 'cloudflare/wrangler.jsonc', persist: false });
  t.after(() => proxy.dispose());
  const env = { DB: proxy.env.DB, PUBLIC_API_TOKEN: publicToken, ADMIN_API_TOKEN: adminToken, B2_PUBLIC_BASE_URL: mediaBase };
  await env.DB.exec((await readFile('cloudflare/migrations/0001_records.sql', 'utf8')).replaceAll('\n', ' '));
  const call = async (action, input = {}, admin = false) => (await worker.fetch(request(action, input, admin), env)).json();
  assert.equal((await worker.fetch(request('adminList', {}, true, publicToken), env)).status, 401);
  assert.equal((await worker.fetch(request('adminList', {}, false), env)).status, 403);
  assert.equal((await worker.fetch(request('listPosts', {}, false, 'bad-token'), env)).status, 401);
  assert.equal((await worker.fetch(request('listPosts', {}, false), { ...env, ADMIN_API_TOKEN: publicToken })).status, 503);
  assert.equal((await worker.fetch(new Request('https://data.example/public', { method: 'POST', headers: { Authorization: `Bearer ${publicToken}`, 'Content-Type': 'application/json' }, body: 'x'.repeat(262145) }), env)).status, 413);
  const draft = await call('adminSavePost', input, true);
  assert.equal(draft.ok, true);
  const id = draft.data.id;
  assert.equal((await call('listPosts')).data.data.length, 0);
  assert.equal((await call('getPost', { id })).data.data, null);
  assert.equal((await call('adminSavePost', { ...input, id, version: 0 }, true)).ok, false);
  const published = await call('adminSavePost', { ...input, id, version: 1, status: 'published' }, true);
  assert.equal(published.ok, true);
  assert.equal((await call('listPosts')).data.data[0].attributes.categories.data[0].attributes.category, 'report');
  const comment = await call('createComment', { postId: id, name: 'Visitor', email: 'visitor@example.com', comment: 'Hello' });
  assert.equal(comment.ok, true);
  assert.equal('email' in comment.data, false);
  const comments = (await call('adminComments', { postId: id }, true)).data;
  assert.equal(comments[0].email, 'visitor@example.com');
  await call('adminDeleteComment', { postId: id, sk: comments[0].sk }, true);
  assert.equal((await call('listComments', { postId: id })).data.length, 0);
  await call('createContact', { name: 'Visitor', email: 'visitor@example.com', message: 'Hello' });
  assert.equal((await call('adminList', {}, true)).data.contacts.length, 1);
  const pending = await call('adminBeginDeletePost', { id, version: 2 }, true);
  assert.equal(pending.data.deleteImage, true);
  assert.equal(pending.data.imageUrl, input.image.url);
  assert.equal((await call('getPost', { id })).data.data, null);
  assert.equal((await call('adminSavePost', { ...input, id, version: 3 }, true)).ok, false);
  assert.equal((await call('adminFinishDeletePost', { id, version: 2 }, true)).ok, false);
  assert.equal((await call('adminFinishDeletePost', { id, version: 3 }, true)).ok, true);
  assert.equal((await call('adminList', {}, true)).data.posts.length, 0);
  const imported = { pk: 'POSTS', sk: 'legacy', id: 'legacy', attributes: { ...draft.data.attributes, publishedAt: '2026-01-01T00:00:00Z' } };
  await env.DB.exec(d1ImportSql([imported]));
  assert.equal((await call('getPost', { id: 'legacy' })).data.data.id, 'legacy');
  assert.equal((await call('adminSavePost', { ...input, id: 'legacy', version: 0 }, true)).ok, true);
});

test('migration write pause preserves reads and blocks every mutation before provider access', () => {
  for (const action of ['listPosts', 'getPost', 'listComments', 'adminList', 'adminComments']) assert.doesNotThrow(() => requireDataWriteAllowed(action, 'true'));
  for (const action of ['adminSavePost', 'adminBeginDeletePost', 'adminFinishDeletePost', 'adminDeleteComment', 'createComment', 'createContact']) {
    assert.throws(() => requireDataWriteAllowed(action, 'true'), /temporarily paused/);
    assert.doesNotThrow(() => requireDataWriteAllowed(action, 'false'));
  }
});
