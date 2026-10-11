'use server';
import { requireAdmin } from '@/lib/auth';
import { callAdminData } from '@/lib/data-client';

async function execute(action, input = {}) {
  try {
    await requireAdmin();
    return { data: await callAdminData(action, input) };
  } catch (error) {
    const message = /^(Invalid |Conflict:|Post not found|Administrator sign-in required)/.test(error.message)
      ? error.message : 'Admin data service unavailable. Check the deployment configuration and try again.';
    return { error: message };
  }
}
export async function loadDashboard() { return execute('adminList'); }
export async function saveContent(input) { return execute('adminSavePost', input); }
export async function deleteContent(id, version) { return execute('adminDeletePost', { id, version }); }
export async function loadPostComments(postId) { return execute('adminComments', { postId }); }
export async function moderateComment(postId, sk) { return execute('adminDeleteComment', { postId, sk }); }
