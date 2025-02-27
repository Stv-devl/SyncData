import { MongoClient, Db } from 'mongodb';

declare global {
  var _mongoClient: MongoClient | undefined;
}

/**
 * MongoDB connection URI from environment variables
 */
const uri = process.env.MONGODB_URI as string;
if (!uri) {
  throw new Error('MONGODB_URI is missing in the .env file');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

/**
 * In development, we use a global variable to maintain a persistent connection
 * In production, we create a new connection for each instance
 */
if (process.env.NODE_ENV === 'development') {
  if (!globalThis._mongoClient) {
    client = new MongoClient(uri, {});
    globalThis._mongoClient = client;
  }
  clientPromise = globalThis._mongoClient.connect();
} else {
  client = new MongoClient(uri, {});
  clientPromise = client.connect();
}

/**
 * Connects to the MongoDB database
 * @returns {Promise<{client: MongoClient, db: Db}>} The MongoDB client and database instance
 */
export async function connectToDatabase(): Promise<{
  client: MongoClient;
  db: Db;
}> {
  const client = await clientPromise;
  return { client, db: client.db() };
}

export { clientPromise };
