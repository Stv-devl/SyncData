import { getCsrfToken } from '../helpers/getCsrfToken';
import { createFormData } from '@/helpers/createFromData';
import { CreateFileResponse } from '@/types/storeType';
import { FileType } from '@/types/type';

const postAddFile = async (
  userId: string,
  parentId: string,
  newFile: FileType
): Promise<CreateFileResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/files`;

  try {
    const csrfToken = await getCsrfToken();
    if (!csrfToken) throw new Error('Missing CSRF token');

    const isFile = newFile.file instanceof File;
    const options = {
      method: 'POST',
      headers: {
        'X-CSRF-Token': csrfToken,
        ...(isFile ? {} : { 'Content-Type': 'application/json' }),
      },
      body: isFile
        ? createFormData(userId, parentId, newFile)
        : JSON.stringify({ userId, parentId, newFile }),
      credentials: 'include',
    };

    const response = await fetch(url, options as RequestInit);

    if (!response.ok) {
      throw new Error(`Error creating file. Status: ${response.status}`);
    }
    const data = await response.json();
    console.log('File created successfully');
    return data;
  } catch (error: unknown) {
    console.error('Error creating file:', error);
    throw error;
  }
};

export default postAddFile;
