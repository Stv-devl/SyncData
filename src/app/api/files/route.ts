import { addFileToParent } from 'lib/utils/addFileToParent';
import { deleteFileRecursive } from 'lib/utils/deleteFileRecursive';
import { filterById } from 'lib/utils/filterById';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import { clientPromise } from '../../../../lib/mongod';
import { FileType } from '../../../types/type';

/**
 * Handles PUT requests to update the files of a user.
 * Validates the request body and updates the files in the database.
 * @param request
 * @returns Returns a response indicating the success or failure of the operation.
 */

const dbName = 'syncData';
const collectionName = 'users';

export async function PUT(request: Request): Promise<NextResponse> {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const usersCollection = db.collection(collectionName);

    const { userId, parentId, newFile } = await request.json();

    if (!ObjectId.isValid(userId)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    if (!newFile) {
      return NextResponse.json(
        { error: 'Invalid folder name' },
        { status: 400 }
      );
    }

    const objectId = new ObjectId(userId);
    const user = await usersCollection.findOne({ _id: objectId });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const updatedFiles = parentId
      ? addFileToParent(user.files, newFile, parentId)
      : [...user.files, newFile];

    if (!updatedFiles && parentId) {
      return NextResponse.json(
        { error: 'Parent folder not found' },
        { status: 400 }
      );
    }

    console.log('updatedFiles', updatedFiles);

    const updateResult = await usersCollection.updateOne(
      { _id: objectId },
      { $set: { files: updatedFiles } }
    );

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json({ error: 'No changes made' }, { status: 304 });
    }

    return NextResponse.json(
      {
        message: 'Folder created successfully',
        files: updatedFiles,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing PUT request:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request): Promise<NextResponse> {
  try {
    const { userId, fileId, parentId } = await request.json();

    if (!ObjectId.isValid(userId)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(dbName);
    const usersCollection = db.collection(collectionName);

    const objectId = new ObjectId(userId);
    const user = await usersCollection.findOne({ _id: objectId });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const updatedLinks =
      parentId === 'root'
        ? filterById(user.files, fileId)
        : user.files.map((file: FileType) => {
            if (file.id === parentId) {
              return {
                ...file,
                files: filterById(file.files || [], fileId),
              };
            }
            return file.files
              ? {
                  ...file,
                  files: deleteFileRecursive(file.files, fileId, parentId),
                }
              : file;
          });

    console.log('updatedLinks', updatedLinks);

    const updateResult = await usersCollection.updateOne(
      { _id: objectId },
      { $set: { files: updatedLinks } }
    );

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json({ error: 'No changes made' }, { status: 304 });
    }

    return NextResponse.json(
      { message: 'File deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing DELETE request:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
