import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { clientPromise } from '../../../../../lib/mongod';

const saltRounds = 10;
const dbName = 'syncData';
const collectionName = 'users';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const newUser = await request.json();
    const client = await clientPromise;
    const db = client.db(dbName);
    const usersCollection = db.collection(collectionName);

    const existingUser = await usersCollection.findOne({
      'credentials.email': newUser.email,
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already in use' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(newUser.password, saltRounds);

    const userData = {
      credentials: {
        email: newUser.email,
        password: hashedPassword,
      },
      profile: {
        firstname: '',
        lastname: '',
        picture: '',
      },
      files: [],
    };

    const result = await usersCollection.insertOne(userData);

    const response = NextResponse.json(
      {
        message: 'User created successfully',
        userId: result.insertedId,
      },
      { status: 201 }
    );

    return response;
  } catch (error) {
    console.error('Error processing POST request:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
