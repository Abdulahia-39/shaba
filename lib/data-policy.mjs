const READ_ACTIONS = new Set(['listPosts', 'getPost', 'listComments', 'adminList', 'adminComments']);
export function requireDataWriteAllowed(action, readOnly) {
  if (readOnly === 'true' && !READ_ACTIONS.has(action)) throw new Error('Data writes are temporarily paused. Please try again later.');
}
