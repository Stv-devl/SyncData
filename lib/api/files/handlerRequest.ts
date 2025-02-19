import { objectIdSchema } from 'lib/shema/objectIdShema';
import { getDb } from 'lib/utils/dataBase/getDb';
import { handleError } from 'lib/utils/errors/handleError';
import { checkRateLimit } from 'lib/utils/security/checkRateLimit';
import {
  generateCsrfToken,
  setCsrfCookie,
  validateCsrf,
} from 'lib/utils/security/generateCsrfToken';
import { handleCors } from 'lib/utils/security/handleCors';
import { sanitizeMongoObject } from 'lib/utils/security/sanitizeMongoObject';
import { validateContentType } from 'lib/utils/security/validateContentType';
import { Collection } from 'mongodb';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/authOptions';
import { handleDelete } from './deleteHandler';
import { patchFavoriteHandler } from './patchFavoriteHandler';
import { patchFileNameHandler } from './patchFileNameHandler';
import { handlePost } from './postHandler';

export const runtime = 'nodejs';

/**
 * Handles the request for file operations.
 * @param request - The HTTP request object.
 * @returns A Promise that resolves to the NextResponse object.
 */
export async function handlerRequest(request: Request): Promise<NextResponse> {
  const corsResponse = handleCors(request);
  if (corsResponse) return corsResponse;

  const response = new NextResponse();

  if (request.method !== 'DELETE') {
    const rateLimitResponse = await checkRateLimit({ limit: 40, ttl: 10_000 });
    if (rateLimitResponse) return rateLimitResponse;
  }

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return handleError(401, 'Unauthorized access');

  const userId = sanitizeMongoObject(session.user.id);
  if (!objectIdSchema.safeParse(userId).success) {
    return handleError(400, 'Invalid user ID format');
  }

  if (request.method === 'GET') {
    const csrfToken = generateCsrfToken();
    setCsrfCookie(response, csrfToken);

    response.headers.set('X-CSRF-Token', csrfToken);
    response.headers.append('Access-Control-Expose-Headers', 'X-CSRF-Token');
    return response;
  }

  if (['POST', 'PATCH'].includes(request.method)) {
    if (!validateCsrf(request)) return handleError(403, 'Invalid CSRF token');
    if (
      !validateContentType(request, ['application/json', 'multipart/form-data'])
    ) {
      return handleError(400, 'Unsupported Content-Type');
    }
  }

  const { usersCollection } = await getDb();
  if (!usersCollection) return handleError(500, 'Database connection error');

  const handlersMap: Record<
    string,
    (
      req: Request,
      collection: Collection,
      userId: string
    ) => Promise<NextResponse>
  > = {
    POST: handlePost,
    DELETE: handleDelete,
    PATCH: handlePatchRequest,
  };

  const handler = handlersMap[request.method];
  if (!handler) {
    return handleError(405, `Method ${request.method} Not Allowed`);
  }

  return handler(request, usersCollection, userId);
}
/**
 * Handles PATCH requests based on the requested action.
 */
async function handlePatchRequest(
  request: Request,
  usersCollection: Collection,
  userId: string
): Promise<NextResponse> {
  try {
    const requestBody = await request.json();

    if (typeof requestBody !== 'object' || Array.isArray(requestBody)) {
      return handleError(400, 'Request body must be a JSON object');
    }
    const { actionType, fileId, fileName } = requestBody;

    if (!actionType || !fileId)
      return handleError(400, 'Missing actionType or fileId');

    const validActions = ['updateName', 'updateFavorite'];
    if (!validActions.includes(actionType)) {
      return handleError(400, `Invalid actionType: ${actionType}`);
    }

    const patchHandlers: Record<
      string,
      (
        fileId: string,
        usersCollection: Collection,
        userId: string,
        fileName: string
      ) => Promise<NextResponse>
    > = {
      updateName: patchFileNameHandler,
      updateFavorite: patchFavoriteHandler,
    };

    if (actionType === 'updateName' && !fileName) {
      return handleError(400, 'Missing filename for updateName action');
    }

    return patchHandlers[actionType]
      ? patchHandlers[actionType](fileId, usersCollection, userId, fileName)
      : handleError(400, 'Invalid PATCH actionType');
  } catch (error) {
    return handleError(400, 'Invalid request body');
  }
}

export {
  handlerRequest as GET,
  handlerRequest as POST,
  handlerRequest as PATCH,
  handlerRequest as DELETE,
};
