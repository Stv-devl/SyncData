import { getCsrfToken } from '@/helpers/getCsrfToken';

const patchFileName = async (
  userId: string,
  fileId: string,
  fileName: string,
  actionType: string
) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/files`;

  try {
    const csrfToken = await getCsrfToken();
    if (!csrfToken) throw new Error('Missing CSRF token');

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      },
      body: JSON.stringify({ userId, fileId, fileName, actionType }),
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error(`Error updating the name. Status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Name successfully updated:', data);

    return data;
  } catch (error: unknown) {
    console.error('Error updating the name:', error);
    throw error;
  }
};

export default patchFileName;
