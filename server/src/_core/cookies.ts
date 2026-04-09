export const COOKIE_NAME = 'session';

export function getSessionCookieOptions(req: any) {
  const isProduction = process.env.NODE_ENV === 'production';
  const protocol = req?.headers?.['x-forwarded-proto'] || 'http';
  const isSecure = isProduction || protocol === 'https';

  return {
    httpOnly: true,
    secure: isSecure,
    sameSite: 'lax' as const,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/',
  };
}
