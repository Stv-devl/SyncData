import { addFileToParent } from 'lib/utils/addFileToParent';
import { deleteFileRecursive } from 'lib/utils/deleteFileRecursive';
import { filterById } from 'lib/utils/filterById';
import { findUserById } from 'lib/utils/findUserById';
import { updateParentDates } from 'lib/utils/updateParentDates';
import { NextResponse } from 'next/server';
import { clientPromise } from '../../../../lib/mongod';
import { getCurrentDate } from '@/helpers/getCurrentDate';

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
    const { userId, parentId, newFile } = await request.json();
    const user = await findUserById(userId, usersCollection);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found or invalid ID' },
        { status: 404 }
      );
    }
    if (!newFile) {
      return NextResponse.json(
        { error: 'Invalid folder name' },
        { status: 400 }
      );
    }

    const newDate = getCurrentDate();
    const fileId = newFile.id;

    const updatedFiles = parentId
      ? addFileToParent(user.files, newFile, parentId)
      : [...user.files, newFile];

    const updatedFilesWithParentDates = updateParentDates(
      updatedFiles,
      fileId,
      newDate
    );

    const updateResult = await usersCollection.updateOne(
      { _id: user._id },
      { $set: { files: updatedFilesWithParentDates } }
    );

    return updateResult.modifiedCount === 0
      ? NextResponse.json({ error: 'No changes made' }, { status: 304 })
      : NextResponse.json(
          { message: 'Folder created successfully' },
          { status: 200 }
        );
  } catch (error) {
    console.error('Error processing PUT request:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request): Promise<NextResponse> {
  const client = await clientPromise;
  const db = client.db(dbName);
  const usersCollection = db.collection(collectionName);

  try {
    const { userId, fileId, parentId } = await request.json();
    const user = await findUserById(userId, usersCollection);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found or invalid ID' },
        { status: 404 }
      );
    }

    const updatedFiles =
      parentId === 'root'
        ? filterById(user.files, fileId)
        : deleteFileRecursive(user.files, fileId, parentId);

    const updateResult = await usersCollection.updateOne(
      { _id: user._id },
      { $set: { files: updatedFiles || [] } }
    );

    return updateResult.modifiedCount === 0
      ? NextResponse.json({ error: 'No changes made' }, { status: 304 })
      : NextResponse.json(
          { message: 'File deleted successfully' },
          { status: 200 }
        );
  } catch (error) {
    console.error('Error processing DELETE request:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
