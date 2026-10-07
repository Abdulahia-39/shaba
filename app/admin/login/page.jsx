import { redirect } from 'next/navigation';
import { adminSession } from '@/lib/auth';
import LoginButton from './LoginButton';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Admin sign-in | Shaba', robots: { index: false, follow: false } };
export default async function LoginPage({ searchParams }) {
  if (await adminSession()) redirect('/admin');
  const { error } = await searchParams;
  const configured = Boolean(process.env.ADMIN_EMAIL && process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.NEXTAUTH_SECRET);
  return <main className="min-h-screen bg-green-950 flex items-center justify-center p-6">
    <section className="max-w-md w-full rounded-2xl bg-white p-10 shadow-xl">
      <p className="text-green-700 font-semibold">SHABA</p>
      <h1 className="text-3xl font-bold mt-4">Admin sign-in</h1>
      <p className="text-gray-600 my-5">Manage publications and projects with your authorized Google account.</p>
      {error && <p role="alert" className="text-red-700 mb-4">Sign-in failed or this Google account does not have access.</p>}
      {configured ? <LoginButton /> : <p role="alert">Admin sign-in needs to be configured before use.</p>}
    </section>
  </main>;
}
