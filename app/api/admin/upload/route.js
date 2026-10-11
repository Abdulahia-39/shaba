import { randomUUID } from 'node:crypto';
import { prepareImage, MAX_IMAGE_BYTES } from '@/lib/admin/image.mjs';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { mediaClient } from '@/lib/admin/media.mjs';
import { adminSession } from '@/lib/auth';
export const runtime = 'nodejs';
const MAX_BYTES = MAX_IMAGE_BYTES;
export async function POST(request) {
  if (!await adminSession()) return Response.json({ error: 'Administrator sign-in required' }, { status: 401 });
  if (!process.env.NEXTAUTH_URL || request.headers.get('origin') !== new URL(process.env.NEXTAUTH_URL).origin) {
    return Response.json({ error: 'Invalid request origin' }, { status: 403 });
  }
  const required = ['B2_ENDPOINT', 'B2_REGION', 'B2_BUCKET', 'B2_KEY_ID', 'B2_APPLICATION_KEY', 'B2_PUBLIC_BASE_URL'];
  if (required.some(key => !process.env[key])) return Response.json({ error: 'B2 uploads are not configured' }, { status: 503 });
  try {
    // Enforce the actual streamed size; do not trust Content-Length or the filename.
    const reader = request.body?.getReader();
    if (!reader) return Response.json({ error: 'Image required' }, { status: 400 });
    const chunks = [];
    let total = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_BYTES + 65536) { await reader.cancel(); return Response.json({ error: 'Image must be 3 MB or smaller' }, { status: 413 }); }
      chunks.push(value);
    }
    const form = await new Request(request.url, { method: 'POST', headers: { 'content-type': request.headers.get('content-type') || '' }, body: Buffer.concat(chunks) }).formData();
    const file = form.get('image');
    if (!(file instanceof File) || !file.size || file.size > MAX_BYTES) return Response.json({ error: 'Choose an image up to 3 MB' }, { status: 400 });
    const bytes = Buffer.from(await file.arrayBuffer());
    const { data, info } = await prepareImage(bytes);
    const key = `uploads/${randomUUID()}.webp`;
    const client = mediaClient();
    await client.send(new PutObjectCommand({ Bucket: process.env.B2_BUCKET, Key: key, Body: data,
      ContentType: 'image/webp', CacheControl: 'public, max-age=31536000, immutable' }));
    return Response.json({ url: `${process.env.B2_PUBLIC_BASE_URL.replace(/\/$/, '')}/${key}`, width: info.width, height: info.height });
  } catch (error) {
    console.error('Admin image upload failed:', error.name);
    return Response.json({ error: 'Upload failed. Check the image and B2 configuration.' }, { status: 400 });
  }
}
