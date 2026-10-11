import { randomUUID } from 'node:crypto';
import { contentRecord, field, version, isPublished, publicPosts } from './content.mjs';

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

export function createService(store, { admin = false, mediaBase } = {}) {
  return async ({ action, input = {} } = {}) => {
    try {
      if (typeof action !== 'string') return { ok: false, error: 'Unsupported action' };
      if (action.startsWith('admin') && !admin) return { ok: false, error: 'Forbidden' };
      switch (action) {
        case 'adminList': {
          const posts = await store.query('POSTS');
          const contacts = await store.query('CONTACTS');
          return { ok: true, data: { posts: posts.sort((a, b) => String(b.updatedAt || '').localeCompare(String(a.updatedAt || ''))), contacts: contacts.reverse() } };
        }
        case 'adminSavePost': {
          const id = input.id ? field(input, 'id', 128) : null;
          const existing = id ? await store.get('POSTS', id) : null;
          if (id && !existing) throw new Error('Post not found');
          if (existing?.deletionPending) throw new Error('Conflict: deletion is pending; finish deleting this content');
          const expected = existing ? version(input.version) : null;
          if (existing && (existing.version || 0) !== expected) throw new Error('Conflict: content changed; reload before saving');
          const item = contentRecord(input, existing, mediaBase);
          const posts = await store.query('POSTS');
          if (posts.some(post => post.deletionPending && post.attributes?.postimg?.data?.attributes?.url === input.image.url)) throw new Error('Conflict: this image belongs to content pending deletion');
          await store.save(item, expected);
          return { ok: true, data: item };
        }
        case 'adminBeginDeletePost': {
          const id = field(input, 'id', 128);
          const existing = await store.get('POSTS', id);
          if (!existing) throw new Error('Post not found');
          const expected = version(input.version);
          if ((existing.version || 0) !== expected) throw new Error('Conflict: content changed; reload before deleting');
          const post = existing.deletionPending ? existing : { ...existing, deletionPending: true, version: expected + 1 };
          if (!existing.deletionPending) await store.save(post, expected);
          const imageUrl = post.attributes?.postimg?.data?.attributes?.url;
          const posts = await store.query('POSTS');
          const shared = posts.some(item => String(item.id) !== id && item.attributes?.postimg?.data?.attributes?.url === imageUrl);
          return { ok: true, data: { post, imageUrl, deleteImage: !shared } };
        }
        case 'adminFinishDeletePost': {
          const id = field(input, 'id', 128);
          const existing = await store.get('POSTS', id);
          if (!existing?.deletionPending) throw new Error('Conflict: begin deletion before finishing');
          await store.remove('POSTS', id, version(input.version));
          return { ok: true, data: { success: true } };
        }
        case 'adminComments': {
          return { ok: true, data: await store.query(`COMMENTS#${field(input, 'postId', 128)}`) };
        }
        case 'adminDeleteComment': {
          await store.remove(`COMMENTS#${field(input, 'postId', 128)}`, field(input, 'sk', 256));
          return { ok: true, data: { success: true } };
        }
        case 'listPosts': {
          const posts = await store.query('POSTS');
          return { ok: true, data: { data: publicPosts(posts) } };
        }
        case 'getPost': {
          const post = await store.get('POSTS', text(input, 'id', 128));
          return { ok: true, data: { data: isPublished(post) ? { id: post.id, attributes: post.attributes } : null } };
        }
        case 'listComments': {
          const postId = text(input, 'postId', 128);
          if (!isPublished(await store.get('POSTS', postId))) return { ok: true, data: [] };
          const items = await store.query(`COMMENTS#${postId}`);
          return { ok: true, data: items.map(publicComment) };
        }
        case 'createComment': {
          const post = text(input, 'postId', 128);
          const item = { _id: randomUUID(), post, name: text(input, 'name', 100),
            email: email(input), comment: text(input, 'comment', 5000), createdAt: new Date().toISOString() };
          if (!isPublished(await store.get('POSTS', post))) throw new Error('Post not found');
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
      if (error.name === 'ConditionalCheckFailedException') return { ok: false, error: 'Conflict: content changed; reload before continuing' };
      if (/^(Invalid |Post not found|Conflict:)/.test(error.message)) return { ok: false, error: error.message };
      console.error('Data operation failed', error.name);
      return { ok: false, error: 'Data service unavailable' };
    }
  };
}
