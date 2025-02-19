import { randomBytes } from 'crypto';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

/**
 * Generate a CSRF token.
 */
export function generateCsrfToken(): string {
  return randomBytes(32).toString('hex');
}

/**
 * Set the CSRF token in the cookie.
 */
export function setCsrfCookie(response: NextResponse, token: string) {
  response.cookies.set('X-CSRF-Token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 3600,
  });
}

/**
 * Validate the CSRF token from the request.
 */
export function validateCsrf(request: Request): boolean {
  const csrfTokenHeader = request.headers.get('X-CSRF-Token') ?? '';
  const csrfTokenCookie = cookies().get('X-CSRF-Token')?.value ?? '';
  return csrfTokenHeader !== '' && csrfTokenHeader === csrfTokenCookie;
}
