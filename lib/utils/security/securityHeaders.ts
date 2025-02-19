const isDev = process.env.NODE_ENV !== 'production';

export const securityHeaders = {
  'Access-Control-Allow-Origin': isDev
    ? '*'
    : process.env.NEXT_PUBLIC_ORIGIN || '*',
  'Access-Control-Allow-Methods': 'POST, PATCH, DELETE, GET, OPTIONS',
  'Access-Control-Allow-Headers':
    'Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Origin, User-Agent, Referer',
  'Content-Type': 'application/json',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  'X-Frame-Options': 'DENY',
  'Content-Security-Policy':
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; object-src 'none'; frame-ancestors 'none'; connect-src 'self';",
  'Permissions-Policy':
    'geolocation=(), microphone=(), camera=(), usb=(), magnetometer=()',
  'Expect-CT': 'max-age=86400, enforce',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
};
