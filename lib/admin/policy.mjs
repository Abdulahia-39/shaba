export function allowedEmail(email, configuredEmail) {
  return typeof email === 'string' && typeof configuredEmail === 'string' &&
    Boolean(configuredEmail.trim()) && email.trim().toLowerCase() === configuredEmail.trim().toLowerCase();
}
export function allowedGoogleProfile(account, profile, configuredEmail) {
  return account?.provider === 'google' && profile?.email_verified === true && allowedEmail(profile.email, configuredEmail);
}
export function allowedSession(session, configuredEmail) {
  return session?.user?.admin === true && allowedEmail(session.user.email, configuredEmail);
}
