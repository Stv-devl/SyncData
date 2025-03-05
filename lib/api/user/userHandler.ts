import { handleError } from 'lib/utils/errors/handleError';
import { securityHeaders } from 'lib/utils/security/securityHeaders';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import { HandlerContext } from '@/types/type';

/**
 * Handles user profile retrieval
 * @param context - The authentication and database context
 * @returns A Promise that resolves to the NextResponse object
 */
export async function userHandler(
  context: HandlerContext
): Promise<NextResponse> {
  try {
    const { requestUserId, usersCollection } = context;

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
