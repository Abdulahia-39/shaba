import { randomUUID } from 'node:crypto';
export function field(input, key, max, optional = false) {
  const value = input[key];
  if (optional && (value == null || value === '')) return '';
  if (typeof value !== 'string' || !value.trim() || value.trim().length > max) throw new Error(`Invalid ${key}`);
  return value.trim();
}
export function version(value) {
  if (!Number.isSafeInteger(value) || value < 0) throw new Error('Invalid version');
  return value;
}
export function contentRecord(input, existing, mediaBase) {
  const type = field(input, 'type', 20);
  if (!['blog', 'article', 'project'].includes(type)) throw new Error('Invalid type');
  const status = field(input, 'status', 20);
  if (!['draft', 'published'].includes(status)) throw new Error('Invalid status');
  const image = input.image;
  if (!image || typeof image.url !== 'string') throw new Error('Invalid image');
  let url, base;
  try { url = new URL(image.url); base = new URL(mediaBase); } catch { throw new Error('Invalid image URL'); }
  const prefix = `${base.pathname.replace(/\/$/, '')}/uploads/`;
  if (base.protocol !== 'https:' || url.origin !== base.origin || !url.pathname.startsWith(prefix) || url.search || url.hash || image.url.length > 2048) throw new Error('Invalid image URL');
  if (!Number.isInteger(image.width) || !Number.isInteger(image.height) || image.width < 1 || image.height < 1 || image.width > 2400 || image.height > 2400) throw new Error('Invalid image dimensions');
  const now = new Date().toISOString();
  const category = type === 'project' ? 'projects' : type === 'article' ? 'publication' : 'blog';
  const id = existing?.id ?? randomUUID();
  return { pk: 'POSTS', sk: String(id), id, type, status, version: (existing?.version || 0) + 1,
    updatedAt: now, createdAt: existing?.createdAt || now,
    attributes: {
      title: field(input, 'title', 200), description: field(input, 'description', 1000),
      content: field(input, 'content', 60000), author: field(input, 'author', 100),
      publishedAt: status === 'published' ? existing?.attributes?.publishedAt || now : null,
      categories: { data: [{ id: category, attributes: { category } }] },
      postimg: { data: { attributes: { url: image.url, width: image.width, height: image.height } } },
    },
  };
}
// Records imported from Strapi have no status; they were published exports.
export const isPublished = post => Boolean(post && (post.status === 'published' || post.status === undefined));
export function publicPosts(posts) {
  return posts.filter(isPublished).sort((a, b) =>
    String(a.attributes.publishedAt || '').localeCompare(String(b.attributes.publishedAt || ''))
  ).map(({ id, attributes }) => ({ id, attributes }));
}
