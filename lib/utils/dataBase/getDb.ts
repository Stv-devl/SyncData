import { Db, Collection } from 'mongodb';
import { clientPromise } from '../../mongod';

const dbName = 'syncData';
const collectionName = 'users';

/**
 * Establishes a connection to MongoDB and reuses it for subsequent calls.
 */
export async function getDb() {
  if (!globalThis._mongoClient) {
    try {
      console.log('Connecting to MongoDB...');
      globalThis._mongoClient = await clientPromise;
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw new Error('Database connection failed');
    }
  }

  const db: Db = globalThis._mongoClient.db(dbName);

  const usersCollection: Collection = db.collection(collectionName);
  await usersCollection.createIndex(
    { 'files.id': 1 },
    { unique: true, sparse: true }
  );

  return { db, usersCollection };
}
