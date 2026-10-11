import test from 'node:test';
import assert from 'node:assert/strict';
import { imageKey, deleteImageVersions } from '../lib/admin/media.mjs';
import { deleteWithMedia, deletionFailureMessage } from '../lib/admin/deletion.mjs';

test('cleanup validates the exact configured public base and upload key', () => {
  const base = 'https://cdn.example/file/bucket';
  assert.equal(imageKey(`${base}/uploads/a-b.webp`, base), 'uploads/a-b.webp');
  for (const url of ['https://evil.example/uploads/a.webp', `${base}2/uploads/a.webp`, `${base}/uploads/a.webp?q=1`, `${base}/uploads/%2Fother.webp`, `${base}/uploads/../secret`, `${base}/other/a.webp`]) assert.throws(() => imageKey(url, base));
});
test('cleanup deletes all exact versions and hide markers across pages, never prefix neighbors', async () => {
  const calls = [];
  const client = { send: async command => {
    calls.push(command);
    if (command.constructor.name === 'ListObjectVersionsCommand') return command.input.KeyMarker
      ? { Versions: [{ Key: 'uploads/a.webp', VersionId: 'v2' }] }
      : { Versions: [{ Key: 'uploads/a.webp', VersionId: 'v1' }, { Key: 'uploads/a.webp-other', VersionId: 'other' }], DeleteMarkers: [{ Key: 'uploads/a.webp', VersionId: 'hide' }], IsTruncated: true, NextKeyMarker: 'uploads/a.webp', NextVersionIdMarker: 'v1' };
  } };
  await deleteImageVersions(client, 'bucket', 'uploads/a.webp');
  assert.deepEqual(calls.filter(command => command.constructor.name === 'DeleteObjectCommand').map(command => command.input), ['v1', 'hide', 'v2'].map(VersionId => ({ Bucket: 'bucket', Key: 'uploads/a.webp', VersionId })));
});
test('B2 permission failures stop final database removal and preserve retry information', async () => {
  const calls = [];
  const pending = { post: { id: 'p', version: 2, deletionPending: true }, imageUrl: 'url', deleteImage: true };
  const response = await deleteWithMedia({ invoke: async action => { calls.push(action); return pending; }, cleanup: async () => { throw Object.assign(new Error(), { name: 'AccessDenied' }); } }, 'p', 1);
  assert.deepEqual(calls, ['adminBeginDeletePost']);
  assert.equal(response.pendingPost.version, 2);
  assert.match(response.error, /pending/);
});
test('retry after final database failure can complete with an already absent image', async () => {
  let fail = true;
  const pending = { post: { version: 2 }, deleteImage: true, imageUrl: 'url' };
  const invoke = async action => { if (action === 'adminBeginDeletePost') return pending; if (fail) throw new Error('database'); };
  const cleanup = () => deleteImageVersions({ send: async () => ({ Versions: [] }) }, 'bucket', 'uploads/a.webp');
  assert.ok((await deleteWithMedia({ invoke, cleanup }, 'p', 2)).error);
  fail = false;
  assert.equal((await deleteWithMedia({ invoke, cleanup }, 'p', 2)).data.success, true);
});
test('shared covers bypass cleanup; invalid listing cannot silently succeed', async () => {
  const response = await deleteWithMedia({ invoke: async () => ({ post: { version: 2 }, deleteImage: false }), cleanup: async () => { assert.fail('shared cover deletion'); } }, 'p', 1);
  assert.equal(response.data.imageRetained, true);
  await assert.rejects(deleteImageVersions({ send: async () => ({ IsTruncated: true }) }, 'bucket', 'uploads/a.webp'));
});

test('an outdated backend is identified before any image cleanup happens', async () => {
  let cleaned = false;
  try {
    await deleteWithMedia({ invoke: async () => { throw new Error('Unsupported action'); }, cleanup: async () => { cleaned = true; } }, 'p', 1);
    assert.fail('Old backend should reject deletion');
  } catch (error) {
    assert.match(deletionFailureMessage(error), /older version.*Deploy the latest backend/);
  }
  assert.equal(cleaned, false);
  assert.equal(deletionFailureMessage(new Error('private internal diagnostic')), 'Delete failed. Check the B2 and data service configuration, then retry.');
});
