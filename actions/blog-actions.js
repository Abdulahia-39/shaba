"use server";
import { callData } from '@/lib/data-client';

export async function fetchBlogData() {
  try { return await callData('listPosts'); }
  catch (error) { console.error('Blog request failed:', error.message); return null; }
}
export async function fetchArticle(postid) {
  try { return await callData('getPost', { id: String(postid) }); }
  catch (error) { console.error('Article request failed:', error.message); return null; }
}
export async function submitComment(formData) {
  return callData('createComment', Object.fromEntries(
    ['name', 'email', 'comment', 'postId'].map(key => [key, formData.get(key)])
  ));
}
export async function getComments(postId) {
  if (!postId) return [];
  return callData('listComments', { postId: String(postId) });
}
export async function deleteComment() {
  throw new Error('Comment deletion requires an authenticated administrator');
}
