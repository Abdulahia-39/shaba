import { createService } from '../backend/service.mjs';
import { createD1Store } from './store.mjs';
const PUBLIC_ACTIONS = new Set(['listPosts', 'getPost', 'listComments', 'createComment', 'createContact']);
const ADMIN_ACTIONS = new Set(['adminList', 'adminSavePost', 'adminBeginDeletePost', 'adminFinishDeletePost', 'adminComments', 'adminDeleteComment']);
const MAX_BODY_BYTES = 256 * 1024;
function json(body, status = 200) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });
}
function equalToken(actual, expected) {
  if (!actual || actual.length !== expected.length) return false;
  let difference = 0;
  for (let i = 0; i < expected.length; i++) difference |= actual.charCodeAt(i) ^ expected.charCodeAt(i);
  return difference === 0;
}
async function readBody(request) {
  const reader = request.body?.getReader();
  if (!reader) throw new Error('Invalid request');
  const chunks = []; let length = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > MAX_BODY_BYTES) { await reader.cancel(); throw new Error('Request too large'); }
    chunks.push(value);
  }
  const bytes = new Uint8Array(length); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return JSON.parse(new TextDecoder().decode(bytes));
}
const worker = {
  async fetch(request, env) {
    const path = new URL(request.url).pathname;
    if (!['/public', '/admin'].includes(path)) return json({ ok: false, error: 'Not found' }, 404);
    if (request.method !== 'POST') return json({ ok: false, error: 'Method not allowed' }, 405);
    if (!env.DB || !env.B2_PUBLIC_BASE_URL || env.PUBLIC_API_TOKEN?.length < 32 || env.ADMIN_API_TOKEN?.length < 32 || !env.PUBLIC_API_TOKEN || !env.ADMIN_API_TOKEN || env.PUBLIC_API_TOKEN === env.ADMIN_API_TOKEN) return json({ ok: false, error: 'Data service is not configured' }, 503);
    const admin = path === '/admin';
    const token = request.headers.get('Authorization')?.replace(/^Bearer /, '');
    if (!equalToken(token, admin ? env.ADMIN_API_TOKEN : env.PUBLIC_API_TOKEN)) return json({ ok: false, error: 'Unauthorized' }, 401);
    if (!request.headers.get('content-type')?.startsWith('application/json')) return json({ ok: false, error: 'Invalid request' }, 400);
    let payload;
    try { payload = await readBody(request); }
    catch (error) { return json({ ok: false, error: error.message === 'Request too large' ? error.message : 'Invalid request' }, error.message === 'Request too large' ? 413 : 400); }
    if (!payload || Array.isArray(payload) || typeof payload !== 'object' || !(admin ? ADMIN_ACTIONS : PUBLIC_ACTIONS).has(payload.action)) return json({ ok: false, error: 'Forbidden' }, 403);
    if (payload.input !== undefined && (!payload.input || Array.isArray(payload.input) || typeof payload.input !== 'object')) return json({ ok: false, error: 'Invalid input' }, 400);
    const service = createService(createD1Store(env.DB), { admin, mediaBase: env.B2_PUBLIC_BASE_URL });
    return json(await service({ action: payload.action, input: payload.input || {} }));
  },
};

export default worker;
