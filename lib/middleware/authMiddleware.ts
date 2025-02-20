import { authOptions } from 'lib/api/auth/authOptions';
import { objectIdSchema } from 'lib/shema/objectIdShema';
import { handleError } from 'lib/utils/errors/handleError';
import { sanitizeMongoObject } from 'lib/utils/security/sanitizeMongoObject';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';

/**
 * Middleware to check user authentication.
 * @param request - The incoming request
 * @returns NextResponse | null - An error if the user is not authenticated, otherwise null.
 */
export async function authMiddleware(): Promise<
  { userId: string } | NextResponse
> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return handleError(401, 'Unauthorized access');
  }

  const userId = sanitizeMongoObject(session.user.id);

  if (!objectIdSchema.safeParse(userId).success) {
    return handleError(400, 'Invalid user ID format');
  }

  return { userId };
}
