import 'server-only';
import GoogleProvider from 'next-auth/providers/google';
import { getServerSession } from 'next-auth';
import { allowedGoogleProfile, allowedSession } from './admin/policy.mjs';

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    authorization: { params: { prompt: 'select_account' } },
  })],
  session: { strategy: 'jwt', maxAge: 8 * 60 * 60 },
  pages: { signIn: '/admin/login', error: '/admin/login' },
  callbacks: {
    async signIn({ account, profile }) {
      return Boolean(process.env.NEXTAUTH_SECRET) && allowedGoogleProfile(account, profile, process.env.ADMIN_EMAIL);
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token.admin = allowedGoogleProfile(account, profile, process.env.ADMIN_EMAIL);
        token.email = profile?.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = { ...session.user, email: token.email, admin: token.admin === true };
      if (!allowedSession(session, process.env.ADMIN_EMAIL)) session.user.admin = false;
      return session;
    },
  },
};
export async function adminSession() {
  if (!process.env.NEXTAUTH_SECRET || !process.env.ADMIN_EMAIL || !process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) return null;
  const session = await getServerSession(authOptions);
  return allowedSession(session, process.env.ADMIN_EMAIL) ? session : null;
}
export async function requireAdmin() {
  const session = await adminSession();
  if (!session) throw new Error('Administrator sign-in required');
  return session;
}
