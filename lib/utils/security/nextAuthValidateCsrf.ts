import { cookies } from 'next/headers';

/**
 * Validate CSRF token from request headers and cookies
 * @param request - The incoming Request object
 * @returns {boolean} - Returns true if CSRF token is valid, false otherwise
 */
export function nextAuthValidateCsrf(request: Request): boolean {
  const csrfHeader = request.headers.get('X-CSRF-Token');
  if (!csrfHeader) return false;

  const tokenCookie =
    cookies().get('_Host-next-auth.csrf-token')?.value ||
    cookies().get('next-auth.csrf-token')?.value ||
    '';

  if (!tokenCookie) return false;

  const [cookieCsrf] = tokenCookie.split('|');
  return cookieCsrf === csrfHeader;
}
