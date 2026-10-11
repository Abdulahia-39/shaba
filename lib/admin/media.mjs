import { S3Client, ListObjectVersionsCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

// Only keys produced by the admin uploader are eligible for destructive cleanup.
export function imageKey(url, mediaBase) {
  let image, base;
  try { image = new URL(url); base = new URL(mediaBase); } catch { throw new Error('Invalid stored image URL'); }
  const prefix = `${base.pathname.replace(/\/$/, '')}/`;
  if (base.protocol !== 'https:' || image.origin !== base.origin || !image.pathname.startsWith(prefix) || image.search || image.hash) throw new Error('Invalid stored image URL');
  const key = image.pathname.slice(prefix.length);
  if (!/^uploads\/[a-zA-Z0-9-]+\.webp$/.test(key)) throw new Error('Invalid stored image key');
  return key;
}
export function mediaClient() {
  const required = ['B2_ENDPOINT', 'B2_REGION', 'B2_BUCKET', 'B2_KEY_ID', 'B2_APPLICATION_KEY', 'B2_PUBLIC_BASE_URL'];
  if (required.some(key => !process.env[key])) throw new Error('B2 media is not configured');
  if (!/^https:\/\/s3\.[a-z0-9-]+\.backblazeb2\.com\/?$/.test(process.env.B2_ENDPOINT)) throw new Error('Invalid B2 endpoint');
  return new S3Client({ endpoint: process.env.B2_ENDPOINT, region: process.env.B2_REGION,
    forcePathStyle: true, requestChecksumCalculation: 'WHEN_REQUIRED',
    credentials: { accessKeyId: process.env.B2_KEY_ID, secretAccessKey: process.env.B2_APPLICATION_KEY } });
}
export async function deleteImageVersions(client, bucket, key) {
  const versions = [];
  let KeyMarker, VersionIdMarker;
  for (let pageNumber = 0; ; pageNumber++) {
    if (pageNumber >= 100) throw new Error('Image version listing limit exceeded');
    const page = await client.send(new ListObjectVersionsCommand({ Bucket: bucket, Prefix: key, KeyMarker, VersionIdMarker }));
    for (const item of [...(page.Versions || []), ...(page.DeleteMarkers || [])]) {
      // Prefix matches can include other files. Never delete them.
      if (item.Key === key) {
        if (!item.VersionId) throw new Error('Image version ID missing');
        versions.push(item.VersionId);
      }
    }
    if (versions.length > 1000) throw new Error('Image version limit exceeded');
    if (!page.IsTruncated) break;
    if (!page.NextKeyMarker || (page.NextKeyMarker === KeyMarker && page.NextVersionIdMarker === VersionIdMarker)) throw new Error('Invalid image version cursor');
    KeyMarker = page.NextKeyMarker; VersionIdMarker = page.NextVersionIdMarker;
  }
  // A bare DeleteObject creates a hide marker in B2; delete every exact version instead.
  for (const VersionId of versions) {
    try { await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key, VersionId })); }
    catch (error) { if (!['NoSuchVersion', 'NoSuchKey'].includes(error.name)) throw error; }
  }
}
