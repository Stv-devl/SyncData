import { CreateFileResponse } from '@/types/storeType';
import { FileType } from '@/types/type';

const putFile = async (
  userId: string,
  parentId: string,
  newFile: FileType
): Promise<CreateFileResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/files`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, parentId, newFile }),
    });
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

export default putFile;
