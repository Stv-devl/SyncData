import { favoriteSchema } from 'lib/shema/favoriteShemas';
import { handleError } from 'lib/utils/errors/handleError';
import { findUserFiles } from 'lib/utils/fileOperations/findUserFIles';
import { securityHeaders } from 'lib/utils/security/securityHeaders';
import { Collection, ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import { FileType } from '@/types/type';

/**
 * Handles PATCH requests to update the favorite status of a file.
 * @param fileId - The ID of the file to update
 * @param usersCollection - The MongoDB collection for user data
 * @param userId - The ID of the user performing the request
 * @returns A Promise that resolves to the NextResponse object
 */

export async function patchFavoriteHandler(
  fileId: string,
  usersCollection: Collection,
  userId: string
): Promise<NextResponse> {
  try {
    const validationResult = favoriteSchema.safeParse({
      fileId,
      actionType: 'updateFavorite',
    });
    if (!validationResult.success) {
      return handleError(
        400,
        `Invalid request: ${validationResult.error.message}`
      );
    }

    const userFiles = await findUserFiles(usersCollection, userId);
    if (userFiles instanceof NextResponse) return userFiles;

    const updateFavoriteStatus = (
      files: FileType[]
    ): { files: FileType[]; updated: boolean } => {
      let updated = false;
      const newFiles = files.map((file) => {
        if (file.id === fileId) {
          updated = true;
          return { ...file, isFavorite: !file.isFavorite };
        }
        const { files: updatedFiles, updated: childUpdated } =
          updateFavoriteStatus(file.files || []);
        if (childUpdated) updated = true;
        return { ...file, files: updatedFiles };
      });
      return { files: newFiles, updated };
    };

    const { files: updatedFiles, updated } = updateFavoriteStatus(userFiles);

    if (!updated) {
      return handleError(404, 'File not found or unauthorized');
    }

    const { modifiedCount } = await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { files: updatedFiles } }
    );

    if (!modifiedCount) {
      return handleError(304, 'No changes were made to the favorite status.');
    }

    return new NextResponse(
      JSON.stringify({
        message: 'File favorite status updated successfully',
        files: updatedFiles,
      }),
      { status: 200, headers: securityHeaders }
    );
  } catch (error) {
    console.error('Error processing PATCH request:', error);
    return handleError(500, 'Server error');
  }
}
