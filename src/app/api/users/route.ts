import { NextResponse } from 'next/server';
import { clientPromise } from '../../../../lib/mongod';

const dbName = 'syncData';
const collectionName = 'users';

/**
 * Handles GET requests to retrieve the list of users.
 * @returns {NextResponse} A response containing the list of users in JSON format.
 */
export async function GET(): Promise<NextResponse> {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const usersCollection = db.collection(collectionName);
    const users = await usersCollection.find().toArray();
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error processing GET request:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
