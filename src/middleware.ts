import { withAuth } from 'next-auth/middleware';

/**
 * Middleware for authentication.
 */
export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      console.log(' Middleware - Token:', token);
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
