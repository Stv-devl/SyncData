import { withAuth } from 'next-auth/middleware';

/**
 * Middleware for authentication.
 */
export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
  pages: {
    signIn: '/login',
  },
});

/**
 * Configuration du middleware.
 * @type {Object}
 */
export const config = {
  matcher: ['/', '/home', '/profile', '/favorite', '/pricing'],
};
