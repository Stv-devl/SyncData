import { handleError } from 'lib/utils/errors/handleError';
import { Collection, ObjectId } from 'mongodb';

/**
 * Retrieves a user's files from MongoDB.
 * @param usersCollection - The MongoDB users collection.
 * @param userId - The user's ID.
 * @returns The user's files or an error response.
 */
export async function findUserFiles(
  usersCollection: Collection,
  userId: string
) {
  const user = await usersCollection.findOne(
    { _id: new ObjectId(userId) },
    { projection: { files: 1 } }
  );

  if (!user?.files || !Array.isArray(user.files)) {
    return handleError(404, 'User files not found.');
  }

  return user.files;
}
