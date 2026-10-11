'use server';
import { requireAdmin } from '@/lib/auth';
import { callAdminData } from '@/lib/data-client';
import { deleteWithMedia } from '@/lib/admin/deletion.mjs';
import { mediaClient, imageKey, deleteImageVersions } from '@/lib/admin/media.mjs';

async function execute(action, input = {}) {
  try {
    await requireAdmin();
    return { data: await callAdminData(action, input) };
  } catch (error) {
    console.error('Admin data operation failed:', action, error.name);
    const message = /^(Invalid |Conflict:|Post not found|Administrator sign-in required)/.test(error.message)
      ? error.message : 'Admin data service unavailable. Check the deployment configuration and try again.';
    return { error: message };
  }
}
export async function loadDashboard() { return execute('adminList'); }
export async function saveContent(input) { return execute('adminSavePost', input); }
export async function deleteContent(id, version) {
  try {
    await requireAdmin();
    // Check configuration before hiding the record, then obtain its trusted image from Lambda.
    const client = mediaClient();
    return await deleteWithMedia({ invoke: callAdminData, cleanup: url => deleteImageVersions(client, process.env.B2_BUCKET, imageKey(url, process.env.B2_PUBLIC_BASE_URL)) }, id, version);
  } catch (error) {
    return { error: /^(Invalid |Conflict:|Post not found|Administrator sign-in required)/.test(error.message) ? error.message : 'Delete failed. Check the B2 and data service configuration, then retry.' };
  }
}
export async function loadPostComments(postId) { return execute('adminComments', { postId }); }
export async function moderateComment(postId, sk) { return execute('adminDeleteComment', { postId, sk }); }
