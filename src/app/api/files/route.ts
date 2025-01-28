import { v2 as cloudinary } from 'cloudinary';
import { addFileToParent } from 'lib/utils/addFileToParent';
import { deleteFileToParent } from 'lib/utils/deleteFileToParent';
import { filterById } from 'lib/utils/filterById';
import { findUserById } from 'lib/utils/findUserById';
import { updateParentDates } from 'lib/utils/updateParentDates';
import { NextResponse } from 'next/server';
import { clientPromise } from '../../../../lib/mongod';
import { getCurrentDate } from '@/helpers/getCurrentDate';
import { FileType } from '@/types/type';

/**
 * Handles PUT requests to update the files of a user.
 * Validates the request body and updates the files in the database.
 * @param request
 * @returns Returns a response indicating the success or failure of the operation.
 */

const dbName = 'syncData';
const collectionName = 'users';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const runtime = 'nodejs';

type FormDataFile = {
  name: string;
  type: string;
  arrayBuffer: () => Promise<ArrayBuffer>;
};

async function uploadFileToCloudinary(file: FormDataFile) {
  try {
    const buffer = await file.arrayBuffer();
    const base64String = Buffer.from(buffer).toString('base64');
    const dataUrl = `data:${file.type};base64,${base64String}`;

    const type = file.name.includes('.') ? file.name.split('.').pop() : null;
    if (!type) return;

    const publicId = `${Date.now()}_${file.name.replace(
      /[^a-zA-Z0-9_-]/g,
      ''
    )}`;

    const result = await cloudinary.uploader.upload(dataUrl, {
      folder: 'user_profil',
      public_id: `${publicId}.${type}`,
      resource_type: 'raw',
    });

    const downloadUrl = cloudinary.url(result.public_id, {
      resource_type: result.resource_type,
      type: 'upload',
      flags: 'attachment',
      attachment: file.name,
    });

    console.log('Generated Cloudinary Download URL:', downloadUrl);
    return {
      ...result,
      downloadUrl,
    };
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
    throw new Error('Failed to upload file to Cloudinary');
  }
}

export async function PUT(request: Request): Promise<NextResponse> {
  const client = await clientPromise;
  const db = client.db(dbName);
  const usersCollection = db.collection(collectionName);

  try {
    let userId: string | null = null;
    let parentId: string | null = null;
    let newFile: FileType | null = null;
    let file: FormDataFile | null = null;

    const contentType = request.headers.get('Content-Type') || '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      userId = formData.get('userId')?.toString() || null;
      parentId = formData.get('parentId')?.toString() || null;

      const newFileData = formData.get('newFile')?.toString();
      newFile = newFileData ? JSON.parse(newFileData) : null;
      file = formData.get('file') as FormDataFile | null;
    } else if (contentType.includes('application/json')) {
      const body = await request.json();
      userId = body.userId || null;
      parentId = body.parentId || null;
      newFile = body.newFile || null;
    } else {
      return NextResponse.json(
        { error: 'Unsupported Content-Type' },
        { status: 400 }
      );
    }

    if (!userId || !newFile) {
      return NextResponse.json(
        { error: 'Missing required fields (userId, newFile)' },
        { status: 400 }
      );
    }

    const user = await findUserById(userId, usersCollection);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    let newFileWithUrl = { ...newFile };

    if (newFile.type !== 'folder' && file) {
      const uploadedFile = await uploadFileToCloudinary(file);
      newFileWithUrl = {
        ...newFile,
        url: uploadedFile && uploadedFile.downloadUrl,
        publicId: uploadedFile && uploadedFile.public_id,
      };
    }

    const newDate = getCurrentDate();
    const fileId = newFile.id;
    const publicId = newFileWithUrl.publicId ?? undefined;

    const updatedFiles = parentId
      ? addFileToParent(user.files, newFileWithUrl, parentId, publicId)
      : [...user.files, newFileWithUrl];

    const updatedFilesWithParentDates = updateParentDates(
      updatedFiles,
      fileId,
      newDate
    );

    const updateResult = await usersCollection.updateOne(
      { _id: user._id },
      { $set: { files: updatedFilesWithParentDates } }
    );

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json({ error: 'No changes made' }, { status: 304 });
    }

    return NextResponse.json(
      {
        message: 'Folder or file created successfully',
        file: newFileWithUrl,
      },
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
    const { userId, fileId, parentId, publicId } = await request.json();
    const user = await findUserById(userId, usersCollection);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found or invalid ID' },
        { status: 404 }
      );
    }

    if (Array.isArray(publicId) && publicId.length > 0) {
      try {
        const cloudinaryResults = await Promise.all(
          publicId.map(async (id) => {
            return await cloudinary.uploader.destroy(id, {
              resource_type: 'raw',
            });
          })
        );

        console.log('Cloudinary file deletion results:', cloudinaryResults);
      } catch (error) {
        console.error('Error deleting files from Cloudinary:', error);
        return NextResponse.json(
          { error: 'Failed to delete files from Cloudinary' },
          { status: 500 }
        );
      }
    }

    const updatedFiles =
      parentId === 'root'
        ? filterById(user.files, fileId)
        : deleteFileToParent(user.files, fileId, parentId);

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
