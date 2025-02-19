import { objectIdSchema } from 'lib/shema/objectIdShema';
import { getDb } from 'lib/utils/dataBase/getDb';
import { handleError } from 'lib/utils/errors/handleError';
import { checkRateLimit } from 'lib/utils/security/checkRateLimit';
import { handleCors } from 'lib/utils/security/handleCors';
import { sanitizeMongoObject } from 'lib/utils/security/sanitizeMongoObject';
import { securityHeaders } from 'lib/utils/security/securityHeaders';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/authOptions';

export const dynamic = 'force-dynamic';

export async function userHandler(request: Request): Promise<NextResponse> {
  try {
    const corsResponse = handleCors(request);
    if (corsResponse) return corsResponse;

    const rateLimitResponse = await checkRateLimit({ limit: 10, ttl: 10_000 });
    if (rateLimitResponse) return rateLimitResponse;

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return handleError(401, 'Unauthorized access');

    const userId = sanitizeMongoObject(session.user.id);
    if (!objectIdSchema.safeParse(userId).success) {
      return handleError(400, 'Invalid user ID format');
    }
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
