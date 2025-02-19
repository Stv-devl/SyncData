import { authOptions } from 'lib/api/auth/authOptions';
import { objectIdSchema } from 'lib/shema/objectIdShema';
import { sanitizeMongoObject } from 'lib/utils/security/sanitizeMongoObject';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';

/**
 * Middleware pour vérifier l'authentification de l'utilisateur.
 * @param request - La requête entrante
 * @returns NextResponse | null - Une erreur si l'utilisateur n'est pas authentifié, sinon null.
 */
export async function authMiddleware(
  request: Request
): Promise<{ userId: string } | NextResponse> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized access' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const userId = sanitizeMongoObject(session.user.id);

  if (!objectIdSchema.safeParse(userId).success) {
    return new NextResponse(
      JSON.stringify({ error: 'Invalid user ID format' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return { userId };
}
