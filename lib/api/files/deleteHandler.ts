import { v2 as cloudinary } from 'cloudinary';
import { deleteShema } from 'lib/shema/deleteShema';
import { handleError } from 'lib/utils/errors/handleError';
import { deleteFileToParent } from 'lib/utils/fileOperations/deleteFileToParent';
import { filterById } from 'lib/utils/fileOperations/filterById';
import { findFileRecursive } from 'lib/utils/fileOperations/findFileRecursive';
import { parseJsonSafe } from 'lib/utils/security/parseJsonSafe';
import { securityHeaders } from 'lib/utils/security/securityHeaders';
import { Collection, ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

/**
 * Handles the DELETE request for file deletion.
 * @param request - The HTTP request object.
 * @param usersCollection - The MongoDB collection for user data.
 * @param userId - The ID of the user performing the request.
 * @returns A Promise that resolves to the NextResponse object.
 */
export async function handleDelete(
  request: Request,
  usersCollection: Collection,
  userId: string
): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const parsedParams = {
      parentId: searchParams.get('parentId') || null,
      fileId: parseJsonSafe<string[]>(searchParams.get('fileId')) || [],
      publicId: parseJsonSafe<string[]>(searchParams.get('publicId')) || [],
    };
    const parseResult = deleteShema.safeParse(parsedParams);
    if (!parseResult.success) {
      return handleError(400, 'Invalid request parameters');
    }
    const { parentId, fileId, publicId } = parseResult.data;

    if (!Array.isArray(fileId) || fileId.length === 0) {
      return handleError(400, 'Invalid or missing fileId');
    }
    if (!Array.isArray(publicId)) {
      return handleError(400, 'Invalid publicId format');
    }
    if (parentId && parentId !== 'root' && typeof parentId !== 'string') {
      return handleError(400, 'Invalid parentId format');
    }

    const user = await usersCollection.findOne(
      { _id: new ObjectId(userId) },
      { projection: { files: 1 } }
    );
    if (!user) {
      return handleError(404, 'User not found');
    }

    const allUserFiles = findFileRecursive(user.files, fileId);
    if (
      !allUserFiles ||
      !Array.isArray(allUserFiles) ||
      allUserFiles.length !== fileId.length
    ) {
      return handleError(
        403,
        'Unauthorized: Some files do not belong to the user'
      );
    }

    const foundPublicFiles = allUserFiles.filter(
      (file) => file.publicId && publicId.includes(file.publicId)
    );
    if (foundPublicFiles.length !== publicId.length) {
      return handleError(
        403,
        'Unauthorized: Some Cloudinary files do not belong to the user'
      );
    }

    if (Array.isArray(publicId) && publicId.length > 0) {
      try {
        const cloudinaryResults = await Promise.all(
          publicId.map(async (id) => {
            return await cloudinary.uploader.destroy(id, {
              resource_type: 'raw',
            });
          })
        );

        console.log('Cloudinary file deletion results:', cloudinaryResults);
      } catch (error) {
        console.error('Error deleting files from Cloudinary:', error);
        return NextResponse.json(
          { error: 'Failed to delete files from Cloudinary' },
          { status: 500 }
        );
      }
    }
    const updatedFiles =
      parentId === 'root'
        ? filterById(user.files, fileId)
        : deleteFileToParent(user.files, fileId, parentId || 'root');

    const updateResult = await usersCollection.updateOne(
      { _id: new ObjectId(user._id) },
      { $set: { files: updatedFiles || [] } }
    );

    return updateResult.modifiedCount === 0
      ? NextResponse.json({ error: 'No changes made' }, { status: 304 })
      : NextResponse.json(
          { message: 'File deleted successfully' },
          { status: 200 }
        );
  } catch (error) {
    console.error('Error processing DELETE request:', error);
    return NextResponse.json(
      { error: 'Server error' },
      {
        status: 500,
        headers: securityHeaders,
      }
    );
  }
}
