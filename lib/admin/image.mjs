import sharp from 'sharp';
export const MAX_IMAGE_BYTES = 3 * 1024 * 1024;
export async function prepareImage(bytes) {
  if (!bytes.length || bytes.length > MAX_IMAGE_BYTES) throw new Error('Image must be 3 MB or smaller');
  const image = sharp(bytes, { limitInputPixels: 20_000_000 });
  const metadata = await image.metadata();
  if (!['jpeg', 'png', 'webp'].includes(metadata.format) || (metadata.pages || 1) > 1) throw new Error('Use a still JPEG, PNG, or WebP image');
  return image.rotate().resize({ width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true }).webp({ quality: 85 }).toBuffer({ resolveWithObject: true });
}
