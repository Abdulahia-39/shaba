import test from 'node:test';
import assert from 'node:assert/strict';
import { createService } from '../backend/service.mjs';
function setup() {
  const items = [{ pk: 'POSTS', sk: '1', id: 1, attributes: { title: 'Test' } }];
  const service = createService({
    get: async (pk, sk) => items.find(i => i.pk === pk && i.sk === sk),
    query: async pk => items.filter(i => i.pk === pk),
    put: async item => items.push(item),
  });
  return { service, items };
}
test('blog responses preserve frontend contract', async () => {
  const { service } = setup();
  assert.deepEqual((await service({ action: 'listPosts' })).data.data, [{ id: 1, attributes: { title: 'Test' } }]);
  assert.equal((await service({ action: 'getPost', input: { id: 'missing' } })).data.data, null);
});
test('comments are scoped to a post and do not expose email', async () => {
  const { service, items } = setup();
  const result = await service({ action: 'createComment', input: { postId: '1', name: 'Test', email: 'test@example.com', comment: 'Hello' } });
  assert.equal(result.ok, true);
  assert.equal(result.data.email, undefined);
  assert.equal(items[1].email, 'test@example.com');
  assert.equal((await service({ action: 'listComments', input: { postId: '2' } })).data.length, 0);
  assert.deepEqual((await service({ action: 'listComments', input: { postId: '1' } })).data, [result.data]);
});
test('invalid writes and arbitrary deletion are rejected', async () => {
  const { service, items } = setup();
  assert.equal((await service({ action: 'createContact', input: { name: 'Test', email: 'bad', message: 'Hi' } })).ok, false);
  assert.equal((await service({ action: 'deleteComment' })).ok, false);
  assert.equal(items.length, 1);
});
test('storage failures return a generic error', async () => {
  const service = createService({ query: async () => { throw new Error('private storage details'); } });
  assert.deepEqual(await service({ action: 'listPosts' }), { ok: false, error: 'Data service unavailable' });
});
