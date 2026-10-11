export function contentType(post) {
  const categories = post?.attributes?.categories?.data || [];
  if (categories.some(item => item.attributes?.category === 'projects')) return 'project';
  if (categories.some(item => ['publication', 'article'].includes(item.attributes?.category))) return 'article';
  return 'blog';
}
export const typeLabel = type => ({ project: 'Project', article: 'Publication', blog: 'News' }[type] || 'News');
export function contentDate(value) {
  if (!value || Number.isNaN(new Date(value).getTime())) return '';
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(value));
}
export const contentHref = post => `/Blog/${encodeURIComponent(String(post.id))}`;
