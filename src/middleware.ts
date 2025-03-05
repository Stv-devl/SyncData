import { withAuth } from 'next-auth/middleware';

/**
 * Middleware for authentication.
 */
export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      return !!token;
    },
  },
  pages: {
    signIn: '/login',
  },
});

export const config = {
  matcher: ['/home', '/profile', '/favorite', '/pricing'],
};
