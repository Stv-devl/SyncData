import { createFormData } from '@/helpers/createFromData';
import { CreateFileResponse } from '@/types/storeType';
import { FileType } from '@/types/type';

const putAddFile = async (
  userId: string,
  parentId: string,
  newFile: FileType
): Promise<CreateFileResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/files`;

  try {
    const isFile = newFile.file instanceof File;
    const options = isFile
      ? {
          method: 'PUT',
          body: createFormData(userId, parentId, newFile),
        }
      : {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, parentId, newFile }),
        };

    const response = await fetch(url, options);

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

export default putAddFile;
