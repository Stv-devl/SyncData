import { handleError } from 'lib/utils/errors/handleError';
import { Collection, ObjectId } from 'mongodb';

/**
 * Récupère les fichiers d'un utilisateur à partir de MongoDB.
 * @param usersCollection - La collection MongoDB des utilisateurs.
 * @param userId - L'ID de l'utilisateur.
 * @returns Les fichiers de l'utilisateur ou une réponse d'erreur.
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
