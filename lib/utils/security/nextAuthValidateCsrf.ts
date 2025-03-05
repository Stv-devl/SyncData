import { cookies } from 'next/headers';

export function nextAuthValidateCsrf(request: Request): boolean {
  const csrfHeader = request.headers.get('X-CSRF-Token');

  if (!csrfHeader) {
    return false;
  }
  const tokenCookie = cookies().get('next-auth.csrf-token')?.value || '';

  if (!tokenCookie) {
    return false;
  }

  const [cookieCsrf] = tokenCookie.split('|');

  const isValid = cookieCsrf === csrfHeader;

  return isValid;
}
