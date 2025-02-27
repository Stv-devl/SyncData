import { withAuth } from 'next-auth/middleware';

/**
 * Middleware for authentication.
 * @param {Object} config - The configuration object.
 * @param {Object} config.pages - The pages configuration.
 * @param {string} config.pages.signIn - The sign in page.
 * @param {string} config.matcher - The matcher for the middleware.
 * @returns {Object} The middleware configuration.
 */
export default withAuth({
  pages: {
    signIn: '/login',
  },
});

export const config = {
  matcher: ['/', '/home', '/profile', '/favorite', '/pricing', '/bin'],
};
