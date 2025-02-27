import { userHandler } from 'lib/api/user/userHandler';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * GET route for users
 * @returns The GET route for users
 */
export { userHandler as GET };
