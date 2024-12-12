import { findUserById } from 'lib/utils/findUserById';
import { NextResponse } from 'next/server';
import { clientPromise } from '../../../../lib/mongod';
import { FileType } from '@/types/type';

/**
 * Handles PUT requests to update the files of a user.
 * Validates the request body and updates the files in the database.
 * @param request
 * @returns Returns a response indicating the success or failure of the operation.
 */

const dbName = 'syncData';
const collectionName = 'users';

export async function PUT(request: Request): Promise<NextResponse> {
  const client = await clientPromise;
  const db = client.db(dbName);
  const usersCollection = db.collection(collectionName);

  try {
    const { userId, fileId, fileName } = await request.json();
    const user = await findUserById(userId, usersCollection);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found or invalid ID' },
        { status: 404 }
      );
    }
    if (!fileId) {
      return NextResponse.json({ error: 'Invalid file Id' }, { status: 400 });
    }
    const newFileName = fileName;

    const udpatedName = (file: FileType): FileType => {
      return {
        ...file,
        filename: file.id === fileId ? newFileName : file.filename,
        files: file.files ? file.files.map(udpatedName) : [],
      };
    };

    const updatedFiles = user.files?.map(udpatedName);

    if (!updatedFiles && fileId) {
      return NextResponse.json(
        { error: 'Parent folder not found' },
        { status: 400 }
      );
    }

    const updateResult = await usersCollection.updateOne(
      { _id: user._id },
      { $set: { files: updatedFiles } }
    );

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json({ error: 'No changes made' }, { status: 304 });
    }

    return NextResponse.json(
      {
        message: 'Name of folder modified successfully',
        files: updatedFiles,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing PUT request:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
