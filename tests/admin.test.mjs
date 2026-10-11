import test from 'node:test';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import { allowedGoogleProfile, allowedSession } from '../lib/admin/policy.mjs';
import { prepareImage } from '../lib/admin/image.mjs';
import { createService } from '../backend/service.mjs';
const mediaBase = 'https://example.com/file/shaba';
const input = { title: 'Our new project', description: 'A new water project', content: '## Project\nDetails', author: 'Shaba', type: 'project', status: 'draft', image: { url: `${mediaBase}/uploads/test.webp`, width: 1200, height: 800 } };
function setup() {
  const items = [];
  const store = {
    get: async (pk, sk) => items.find(item => item.pk === pk && item.sk === sk),
    query: async pk => items.filter(item => item.pk === pk),
    save: async (item, expected) => {
      const index = items.findIndex(current => current.pk === item.pk && current.sk === item.sk);
      if (index >= 0 && items[index].version !== expected) throw Object.assign(new Error('conflict'), { name: 'ConditionalCheckFailedException' });
      if (index >= 0) items[index] = item; else items.push(item);
    },
    remove: async (pk, sk, expected) => { const index = items.findIndex(item => item.pk === pk && item.sk === sk); if (expected !== undefined && (index < 0 || items[index].version !== expected)) throw Object.assign(new Error('conflict'), { name: 'ConditionalCheckFailedException' }); if (index >= 0) items.splice(index, 1); },
    put: async item => items.push(item),
  };
  return { items, admin: createService(store, { admin: true, mediaBase }), publicService: createService(store) };
}
test('only the configured verified Google account can become admin', () => {
  const profile = { email: 'admin@gmail.com', email_verified: true };
  assert.equal(allowedGoogleProfile({ provider: 'google' }, profile, 'ADMIN@gmail.com'), true);
  assert.equal(allowedGoogleProfile({ provider: 'google' }, profile, ''), false);
  assert.equal(allowedGoogleProfile({ provider: 'github' }, profile, profile.email), false);
  assert.equal(allowedGoogleProfile({ provider: 'google' }, { ...profile, email_verified: false }, profile.email), false);
  assert.equal(allowedGoogleProfile({ provider: 'google' }, { ...profile, email: 'someone@gmail.com' }, profile.email), false);
  assert.equal(allowedSession({ user: { email: profile.email } }, profile.email), false);
  assert.equal(allowedSession({ user: { email: profile.email, admin: true } }, 'new-admin@gmail.com'), false);
});
test('public function rejects privileged operations even with forged admin input', async () => {
  const { publicService, items } = setup();
  for (const action of ['adminList', 'adminSavePost', 'adminBeginDeletePost', 'adminFinishDeletePost', 'adminComments', 'adminDeleteComment']) {
    assert.deepEqual(await publicService({ action, input: { ...input, admin: true } }), { ok: false, error: 'Forbidden' });
  }
  assert.equal(items.length, 0);
});
test('drafts stay private through list, direct article, and comment endpoints', async () => {
  const { admin, publicService } = setup();
  const saved = await admin({ action: 'adminSavePost', input });
  assert.equal(saved.ok, true);
  const id = saved.data.id;
  assert.equal((await publicService({ action: 'listPosts' })).data.data.length, 0);
  assert.equal((await publicService({ action: 'getPost', input: { id } })).data.data, null);
  assert.equal((await publicService({ action: 'listComments', input: { postId: id } })).data.length, 0);
  assert.equal((await publicService({ action: 'createComment', input: { postId: id, name: 'Visitor', email: 'visitor@example.com', comment: 'Hello' } })).ok, false);
  assert.equal((await admin({ action: 'adminList' })).data.posts.length, 1);
  const published = await admin({ action: 'adminSavePost', input: { ...input, id, version: 1, status: 'published' } });
  assert.equal(published.ok, true);
  assert.equal((await publicService({ action: 'getPost', input: { id } })).data.data.attributes.categories.data[0].attributes.category, 'projects');
  await admin({ action: 'adminSavePost', input: { ...input, id, version: 2 } });
  assert.equal((await publicService({ action: 'getPost', input: { id } })).data.data, null);
});
test('stale saves fail and media must belong to the configured upload path', async () => {
  const { admin } = setup();
  const saved = await admin({ action: 'adminSavePost', input });
  const stale = await admin({ action: 'adminSavePost', input: { ...input, id: saved.data.id, version: 0 } });
  assert.match(stale.error, /^Conflict:/);
  for (const url of ['https://evil.example/uploads/test.webp', `${mediaBase}/../other/test.webp`, `${mediaBase}/uploads/test.webp?other=1`]) {
    const result = await admin({ action: 'adminSavePost', input: { ...input, image: { ...input.image, url } } });
    assert.equal(result.ok, false);
  }
});
test('contact inbox and comment moderation work only through admin operations', async () => {
  const { admin, publicService } = setup();
  const saved = await admin({ action: 'adminSavePost', input: { ...input, status: 'published' } });
  const id = saved.data.id;
  await publicService({ action: 'createContact', input: { name: 'Visitor', email: 'test@example.com', message: 'Hello' } });
  await publicService({ action: 'createComment', input: { name: 'Visitor', email: 'test@example.com', comment: 'Hello', postId: id } });
  const comments = (await admin({ action: 'adminComments', input: { postId: id } })).data;
  assert.equal(comments[0].email, 'test@example.com');
  await admin({ action: 'adminDeleteComment', input: { postId: id, sk: comments[0].sk } });
  assert.equal((await publicService({ action: 'listComments', input: { postId: id } })).data.length, 0);
  assert.equal((await admin({ action: 'adminList' })).data.contacts.length, 1);
  await admin({ action: 'adminBeginDeletePost', input: { id, version: 1 } });
  await admin({ action: 'adminFinishDeletePost', input: { id, version: 2 } });
  assert.equal((await publicService({ action: 'listPosts' })).data.data.length, 0);
});
test('image processing decodes real images, bounds dimensions, rejects SVG and oversized bytes', async () => {
  const bytes = await sharp({ create: { width: 3000, height: 1500, channels: 3, background: 'green' } }).png().toBuffer();
  const result = await prepareImage(bytes);
  assert.equal(result.info.width, 2400);
  assert.equal(result.info.height, 1200);
  assert.equal((await sharp(result.data).metadata()).format, 'webp');
  await assert.rejects(prepareImage(Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"></svg>')));
  await assert.rejects(prepareImage(Buffer.alloc(3 * 1024 * 1024 + 1)));
});

test('deletion locks edits, hides content and retains the image reference until finalization', async () => {
  const { admin, publicService } = setup();
  const post = (await admin({ action: 'adminSavePost', input: { ...input, status: 'published' } })).data;
  assert.equal((await admin({ action: 'adminFinishDeletePost', input: { id: post.id, version: 1 } })).ok, false);
  assert.equal((await admin({ action: 'adminBeginDeletePost', input: { id: post.id, version: 0 } })).ok, false);
  const pending = (await admin({ action: 'adminBeginDeletePost', input: { id: post.id, version: 1 } })).data;
  assert.equal(pending.post.version, 2);
  assert.equal(pending.deleteImage, true);
  assert.equal(pending.imageUrl, input.image.url);
  assert.equal((await publicService({ action: 'getPost', input: { id: post.id } })).data.data, null);
  assert.equal((await admin({ action: 'adminSavePost', input: { ...input, id: post.id, version: 2 } })).ok, false);
  assert.equal((await admin({ action: 'adminSavePost', input })).ok, false);
  assert.equal((await admin({ action: 'adminBeginDeletePost', input: { id: post.id, version: 2 } })).data.post.version, 2);
  assert.equal((await admin({ action: 'adminFinishDeletePost', input: { id: post.id, version: 1 } })).ok, false);
  assert.equal((await admin({ action: 'adminList' })).data.posts.length, 1);
  assert.equal((await admin({ action: 'adminFinishDeletePost', input: { id: post.id, version: 2 } })).ok, true);
});
test('a cover referenced by another content item is retained', async () => {
  const { admin } = setup();
  const first = (await admin({ action: 'adminSavePost', input })).data;
  await admin({ action: 'adminSavePost', input: { ...input, title: 'Another item' } });
  const pending = (await admin({ action: 'adminBeginDeletePost', input: { id: first.id, version: 1 } })).data;
  assert.equal(pending.deleteImage, false);
});

test('reports publish through admin and remain private when draft or withdrawn', async () => {
  const { admin, publicService } = setup();
  const report = { ...input, type: 'report', title: 'Annual report' };
  const saved = await admin({ action: 'adminSavePost', input: report });
  assert.equal(saved.ok, true);
  const id = saved.data.id;
  assert.equal((await publicService({ action: 'listPosts' })).data.data.length, 0);
  assert.equal((await publicService({ action: 'getPost', input: { id } })).data.data, null);
  const published = await admin({ action: 'adminSavePost', input: { ...report, id, version: 1, status: 'published' } });
  assert.equal(published.ok, true);
  const publicPost = (await publicService({ action: 'listPosts' })).data.data[0];
  assert.equal(publicPost.attributes.categories.data[0].attributes.category, 'report');
  assert.equal((await publicService({ action: 'getPost', input: { id } })).data.data.id, id);
  await admin({ action: 'adminSavePost', input: { ...report, id, version: 2 } });
  assert.equal((await publicService({ action: 'listPosts' })).data.data.length, 0);
  assert.equal((await publicService({ action: 'getPost', input: { id } })).data.data, null);
});
