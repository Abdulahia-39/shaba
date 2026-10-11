import { randomUUID } from 'node:crypto';

function text(input, key, max, optional = false) {
  const value = input[key];
  if (optional && (value == null || value === '')) return '';
  if (typeof value !== 'string' || !value.trim() || value.trim().length > max) {
    throw new Error(`Invalid ${key}`);
  }
  return value.trim();
}
function email(input) {
  const value = text(input, 'email', 254);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) throw new Error('Invalid email');
  return value;
}
const publicComment = ({ _id, post, name, comment, createdAt }) => ({ _id, post, name, comment, createdAt });

export function createService(store) {
  return async ({ action, input = {} } = {}) => {
    try {
      switch (action) {
        case 'listPosts': {
          const posts = await store.query('POSTS');
          return { ok: true, data: { data: posts.map(({ id, attributes }) => ({ id, attributes })) } };
        }
        case 'getPost': {
          const post = await store.get('POSTS', text(input, 'id', 128));
          return { ok: true, data: { data: post ? { id: post.id, attributes: post.attributes } : null } };
        }
        case 'listComments': {
          const items = await store.query(`COMMENTS#${text(input, 'postId', 128)}`);
          return { ok: true, data: items.map(publicComment) };
        }
        case 'createComment': {
          const post = text(input, 'postId', 128);
          const item = { _id: randomUUID(), post, name: text(input, 'name', 100),
            email: email(input), comment: text(input, 'comment', 5000), createdAt: new Date().toISOString() };
          if (!await store.get('POSTS', post)) throw new Error('Post not found');
          await store.put({ ...item, pk: `COMMENTS#${post}`, sk: `${item.createdAt}#${item._id}` });
          return { ok: true, data: publicComment(item) };
        }
        case 'createContact': {
          const item = { pk: 'CONTACTS', sk: `${new Date().toISOString()}#${randomUUID()}`,
            name: text(input, 'name', 100), email: email(input),
            phone: text(input, 'phone', 40, true), message: text(input, 'message', 5000) };
          await store.put(item);
          return { ok: true, data: { success: true } };
        }
        default: return { ok: false, error: 'Unsupported action' };
      }
    } catch (error) {
      if (/^(Invalid |Post not found)/.test(error.message)) return { ok: false, error: error.message };
      console.error('Data operation failed', error.name);
      return { ok: false, error: 'Data service unavailable' };
    }
  };
}
