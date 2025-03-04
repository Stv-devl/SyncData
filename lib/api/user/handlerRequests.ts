import { authMiddleware } from 'lib/middleware/authMiddleware';
import { corsMiddleware } from 'lib/middleware/corsMiddleware';
import { rateLimitMiddleware } from 'lib/middleware/rateLimitMiddleware';
import { getDb } from 'lib/utils/dataBase/getDb';
import { handleError } from 'lib/utils/errors/handleError';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import { patchProfileHandler } from './patchProfileHandler';
import { userHandler } from './userHandler';

export const runtime = 'nodejs';

/**
 * Handles incoming requests and routes them to the appropriate handler.
 * @param request - The HTTP request object
 * @returns A Promise resolving to the NextResponse object
 */
export async function handlerRequests(request: Request): Promise<NextResponse> {
  try {
    const corsResponse = corsMiddleware(request);
    if (corsResponse) return corsResponse;

    const rateLimitResponse = await rateLimitMiddleware({
      limit: 10,
      ttl: 10000,
    });
    if (rateLimitResponse) return rateLimitResponse;

    const authResponse = await authMiddleware();
    if (authResponse instanceof NextResponse) return authResponse;
    const { userId } = authResponse;

    const { usersCollection } = await getDb();
    if (!usersCollection) {
      return handleError(500, 'Database connection error');
    }

    const requestUserId = new URL(request.url).searchParams.get('userId');
    if (!requestUserId) return handleError(400, 'User ID is required');
    if (!ObjectId.isValid(requestUserId))
      return handleError(400, 'Invalid user ID format');
    if (requestUserId !== userId) return handleError(403, 'Forbidden access');

    const context = { usersCollection, requestUserId };

    switch (request.method) {
      case 'GET':
        return userHandler(context);
      case 'PATCH':
        return patchProfileHandler(request, context);
      default:
        return handleError(405, `Method ${request.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Internal server error:', error);
    return handleError(500, 'Server error');
  }
}
