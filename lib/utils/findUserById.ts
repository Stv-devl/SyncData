import { Collection, ObjectId } from 'mongodb';

export async function findUserById(
  userId: string,
  usersCollection: Collection
) {
  if (!ObjectId.isValid(userId)) return null;
  return await usersCollection.findOne({ _id: new ObjectId(userId) });
}
