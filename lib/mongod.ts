import { MongoClient } from 'mongodb';

declare global {
  var _mongoClient: MongoClient | undefined;
}

const uri = process.env.MONGODB_URI as string;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  if (!globalThis._mongoClient) {
    globalThis._mongoClient = new MongoClient(uri, {});
  }
  client = globalThis._mongoClient;
  clientPromise = globalThis._mongoClient.connect();
} else {
  client = new MongoClient(uri, {});
  clientPromise = client.connect();
}

export { client, clientPromise };
