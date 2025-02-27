import NextAuth from 'next-auth';
import { authOptions } from '../../../../../lib/api/auth/authOptions';

/**
 * NextAuth handler for authentication
 * @returns The NextAuth handler
 */

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
