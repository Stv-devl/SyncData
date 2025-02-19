import { updateSchema } from 'lib/shema/udpateSchema';
import { handleError } from 'lib/utils/errors/handleError';
import { findFileRecursive } from 'lib/utils/fileOperations/findFileRecursive';
import { findUserFiles } from 'lib/utils/fileOperations/findUserFIles';
import { sanitizeFileName } from 'lib/utils/fileOperations/sanitizeFileName';
import { updateParentDates } from 'lib/utils/fileOperations/updateParentDates';
import { securityHeaders } from 'lib/utils/security/securityHeaders';
import { Collection, ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import { getCurrentDate } from '@/helpers/getCurrentDate';

export async function patchFileNameHandler(
  fileId: string,
  usersCollection: Collection,
  userId: string,
  fileName: string
): Promise<NextResponse> {
  try {
    const parsedData = updateSchema.safeParse({ fileId, fileName });
    if (!parsedData.success) {
      const errors = parsedData.error.format();
      return handleError(400, `Validation failed: ${JSON.stringify(errors)}`);
    }

    let sanitizedFileName: string;
    try {
      sanitizedFileName = sanitizeFileName(fileName);
    } catch (error) {
      return handleError(
        400,
        error instanceof Error ? error.message : 'Invalid file name'
      );
    }

    const userFiles = await findUserFiles(usersCollection, userId);
    if (userFiles instanceof NextResponse) return userFiles;

    const newDate = getCurrentDate();

    const fileFound = findFileRecursive(userFiles, fileId, (file) => {
      file.filename = sanitizedFileName;
      file.modified = newDate;
      return file;
    });

    if (!fileFound) return handleError(404, 'File not found.');

    const updatedFiles = updateParentDates(userFiles, fileId, newDate);

    const { modifiedCount } = await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { files: updatedFiles } }
    );

    if (!modifiedCount) {
      return handleError(304, 'No changes made to the file name.');
    }

    return NextResponse.json(
      { message: 'Name of file modified successfully', files: updatedFiles },
      {
        status: 200,
        headers: securityHeaders,
      }
    );
  } catch (error) {
    console.error(' Error processing PATCH request:', error);
    return handleError(500, 'Server error');
  }
}
