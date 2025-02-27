import { authMiddleware } from 'lib/middleware/authMiddleware';
import { corsMiddleware } from 'lib/middleware/corsMiddleware';
import { rateLimitMiddleware } from 'lib/middleware/rateLimitMiddleware';
import { getDb } from 'lib/utils/dataBase/getDb';
import { handleError } from 'lib/utils/errors/handleError';
import { securityHeaders } from 'lib/utils/security/securityHeaders';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

/**
 * Handles user requests
 * @param request - The HTTP request object
 * @returns A Promise that resolves to the NextResponse object
 */

export async function userHandler(request: Request): Promise<NextResponse> {
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

    const user = await usersCollection.findOne(
      { _id: new ObjectId(requestUserId) },
      { projection: { credentials: 0 } }
    );

    if (!user) return handleError(404, 'User not found');

    return new NextResponse(JSON.stringify(user), {
      status: 200,
      headers: securityHeaders,
    });
  } catch (error) {
    console.error('Internal server error:', error);
    return handleError(500, 'Server error');
  }
}
