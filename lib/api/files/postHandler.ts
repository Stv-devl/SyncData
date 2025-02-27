import { postSchema } from 'lib/shema/postSchema';
import { handleError } from 'lib/utils/errors/handleError';
import { addFileToParent } from 'lib/utils/fileOperations/addFileToParent';
import { findFileRecursive } from 'lib/utils/fileOperations/findFileRecursive';
import { findUserFiles } from 'lib/utils/fileOperations/findUserFIles';
import { sanitizeFileName } from 'lib/utils/fileOperations/sanitizeFileName';
import { updateParentDates } from 'lib/utils/fileOperations/updateParentDates';
import {
  FormDataFile,
  uploadFileToCloudinary,
} from 'lib/utils/fileOperations/uploadFileToCloudinary';
import { isForbiddenExtension } from 'lib/utils/security/isForbiddenExtension';
import { isValidFile } from 'lib/utils/security/isValidFile';
import { parseJsonSafe } from 'lib/utils/security/parseJsonSafe';
import { sanitizeMongoObject } from 'lib/utils/security/sanitizeMongoObject';
import { securityHeaders } from 'lib/utils/security/securityHeaders';
import { ObjectId, Collection } from 'mongodb';
import { NextResponse } from 'next/server';
import { getCurrentDate } from '@/helpers/getCurrentDate';
import { FileType } from '@/types/type';
export async function handlePost(
  request: Request,
  usersCollection: Collection,
  userId: string
): Promise<NextResponse> {
  try {
    let newFile,
      parentId,
      file: FormDataFile | null = null;

    if (request.headers.get('Content-Type')?.includes('multipart/form-data')) {
      const formData = await request.formData();
      parentId = formData.get('parentId')?.toString() || null;

      newFile = parseJsonSafe<FileType>(
        formData.get('newFile')?.toString() || null
      );
      if (!newFile) return handleError(400, 'Invalid JSON format in newFile');

      const fileBlob = formData.get('file');
      if (fileBlob instanceof File) {
        if (!(await isValidFile(fileBlob))) {
          return handleError(400, 'Invalid file type detected');
        }
        file = {
          name: fileBlob.name,
          type: fileBlob.type,
          arrayBuffer: () => fileBlob.arrayBuffer(),
        };
      }
    } else {
      const parsedBody = postSchema.safeParse(await request.json());
      if (!parsedBody.success)
        return handleError(400, 'Invalid JSON format in newFile');
      ({ newFile, parentId } = parsedBody.data);
    }

    newFile = sanitizeMongoObject(newFile);
    if (!newFile.id) newFile.id = new ObjectId().toString();

    if (!newFile.filename || typeof newFile.filename !== 'string') {
      return handleError(400, 'Invalid or missing file name');
    }

    if (isForbiddenExtension(newFile.filename)) {
      return handleError(400, 'Forbidden file extension');
    }

    try {
      newFile.filename = sanitizeFileName(newFile.filename);
    } catch (error) {
      return handleError(
        400,
        error instanceof Error ? error.message : 'Invalid file name'
      );
    }

    const userFiles = await findUserFiles(usersCollection, userId);
    if (userFiles instanceof NextResponse) return userFiles;

    if (parentId && parentId !== 'root') {
      if (!findFileRecursive(userFiles, parentId)) {
        return handleError(
          403,
          "You don't have permission to create a file in this folder."
        );
      }
    }

    const newFileWithUrl = { ...newFile };
    if (newFile.type !== 'folder' && file) {
      const uploadedFile = await uploadFileToCloudinary(file);
      if (!uploadedFile) {
        return handleError(500, 'Failed to upload file');
      }
      newFileWithUrl.url = uploadedFile.downloadUrl;
      newFileWithUrl.publicId = uploadedFile.public_id;
    }

    const newDate = getCurrentDate();

    const updatedFiles = parentId
      ? addFileToParent(
          userFiles,
          newFileWithUrl,
          parentId,
          newFileWithUrl.publicId || undefined
        )
      : [...userFiles, newFileWithUrl];

    const updatedFilesWithParentDates = updateParentDates(
      updatedFiles,
      newFile.id,
      newDate
    );

    const { modifiedCount } = await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { files: updatedFilesWithParentDates } }
    );

    if (!modifiedCount) {
      return handleError(304, 'No changes made to the file name.');
    }

    return NextResponse.json(
      { message: 'Folder or file created successfully', file: newFileWithUrl },
      {
        status: 200,
        headers: securityHeaders,
      }
    );
  } catch (error) {
    console.error(
      process.env.NODE_ENV === 'development' ? error : 'Server error occurred'
    );
    return handleError(500, 'Server error');
  }
}
