import { MongoClient, Db } from 'mongodb';

declare global {
  var _mongoClient: MongoClient | undefined;
}

const uri = process.env.MONGODB_URI as string;
if (!uri) {
  throw new Error('MONGODB_URI is missing in the .env file');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

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

export async function connectToDatabase(): Promise<{
  client: MongoClient;
  db: Db;
}> {
  const client = await clientPromise;
  return { client, db: client.db() };
}

export { clientPromise };
