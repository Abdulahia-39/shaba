'use client';
import { signIn } from 'next-auth/react';
export default function LoginButton() {
  return <button onClick={() => signIn('google', { callbackUrl: '/admin' })} className="w-full bg-green-900 text-white rounded-lg p-3 cursor-pointer">Continue with Google</button>;
}
