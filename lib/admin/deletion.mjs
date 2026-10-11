export function deletionFailureMessage(error) {
  if (error.message === 'Unsupported action') return 'The data service is running an older version. Deploy the latest backend before deleting content.';
  return /^(Invalid |Conflict:|Post not found|Administrator sign-in required)/.test(error.message)
    ? error.message : 'Delete failed. Check the B2 and data service configuration, then retry.';
}
// Keep the database reference until B2 confirms cleanup. Retrying is safe after
// either a partial B2 failure or a failed final database write.
export async function deleteWithMedia({ invoke, cleanup }, id, version) {
  const pending = await invoke('adminBeginDeletePost', { id, version });
  try {
    if (pending.deleteImage) await cleanup(pending.imageUrl);
    await invoke('adminFinishDeletePost', { id, version: pending.post.version });
    return { data: { success: true, imageRetained: !pending.deleteImage } };
  } catch (error) {
    console.error('Admin deletion cleanup failed:', error.name);
    return { error: 'Deletion is pending. The content is hidden from visitors. Check B2 list/delete permissions and try Delete again.', pendingPost: pending.post };
  }
}
