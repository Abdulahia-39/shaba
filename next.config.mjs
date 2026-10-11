/** @type {import('next').NextConfig} */
const remotePatterns = [];
// Set to the public B2 bucket URL or CDN URL, including the bucket path.
if (process.env.B2_PUBLIC_BASE_URL) {
  const media = new URL(process.env.B2_PUBLIC_BASE_URL);
  if (media.protocol !== 'https:') throw new Error('B2_PUBLIC_BASE_URL must use HTTPS');
  remotePatterns.push({ protocol: 'https', hostname: media.hostname,
    port: media.port, pathname: `${media.pathname.replace(/\/$/, '')}/**` });
}
const nextConfig = { images: { remotePatterns } };
export default nextConfig;
