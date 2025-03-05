import { Db, Collection, MongoClient } from 'mongodb';
import { clientPromise } from '../../mongod';
import { UserType } from '@/types/type';

const dbName = 'syncData';
const collectionName = 'users';

let client: MongoClient | null = null;

/**
 * Establishes a connection to MongoDB and reuses it for subsequent calls.
 * @returns A Promise that resolves to the database connection and collection.
 */
export async function getDb() {
  try {
    if (!client) {
      console.log('connecting to MongoDB...');
      client = await clientPromise;
      console.log('Connected to MongoDB');
    }

    const db: Db = client.db(dbName);

    const usersCollection: Collection<UserType> =
      db.collection<UserType>(collectionName);

    await usersCollection.createIndex(
      { 'files.id': 1 },
      { unique: true, sparse: true }
    );

    return { db, usersCollection };
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Database connection failed');
  }
}
