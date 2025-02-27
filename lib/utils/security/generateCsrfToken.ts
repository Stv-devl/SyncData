import { randomBytes } from 'crypto';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

/**
 * Generates a random CSRF token
 * @returns A 64-character hexadecimal string to be used as a CSRF token
 */
export function generateCsrfToken(): string {
  return randomBytes(32).toString('hex');
}

/**
 * Sets a CSRF token cookie on the response
 * @param response - The Next.js response object
 * @param token - The CSRF token to set in the cookie
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
 * Validates a CSRF token from a request
 * @param request - The Next.js request object
 * @returns True if the CSRF token is valid, false otherwise
 */
export function validateCsrf(request: Request): boolean {
  const csrfTokenHeader = request.headers.get('X-CSRF-Token') ?? '';
  const csrfTokenCookie = cookies().get('X-CSRF-Token')?.value ?? '';
  return csrfTokenHeader !== '' && csrfTokenHeader === csrfTokenCookie;
}
