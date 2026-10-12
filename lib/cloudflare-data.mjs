export async function invokeCloudflare({ baseUrl, token, action, input = {}, fetchImpl = fetch, allowLocal = false }) {
  let url;
  try { url = new URL(baseUrl); } catch { throw new Error('Cloudflare data service is not configured'); }
  if ((url.protocol !== 'https:' && !(allowLocal && url.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(url.hostname))) || url.username || url.password || url.search || url.hash || url.pathname !== '/' || !token || token.length < 32) throw new Error('Cloudflare data service is not configured');
  const admin = action.startsWith('admin');
  const response = await fetchImpl(new URL(admin ? '/admin' : '/public', url), {
    method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, input }), cache: 'no-store', redirect: 'error', signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error('Cloudflare data service unavailable. Check its URL and API token.');
  const result = await response.json();
  if (!result.ok) throw new Error(result.error || 'Data request failed');
  return result.data;
}
