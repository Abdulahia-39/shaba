import { redirect } from 'next/navigation';
import { adminSession } from '@/lib/auth';
import Dashboard from './Dashboard';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Admin | Shaba', robots: { index: false, follow: false } };
export default async function AdminPage() {
  const session = await adminSession();
  if (!session) redirect('/admin/login');
  return <Dashboard email={session.user.email} />;
}
