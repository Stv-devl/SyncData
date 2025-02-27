import { getCsrfToken } from '@/helpers/getCsrfToken';

/**
 * patchFavorite function
 * @param {string} userId - The user ID
 * @param {string} fileId - The file ID
 * @param {string} actionType - The action type
 * @returns {Promise} The response from the API
 */
const patchFavorite = async (
  userId: string,
  fileId: string,
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
      body: JSON.stringify({ userId, fileId, actionType }),
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error(`Error to add to favorite. Status: ${response.status}`);
    }
    const data = await response.json();
    console.log('File added to favorite');
    return data;
  } catch (error: unknown) {
    console.error('Error to add to favorite:', error);
    throw error;
  }
};

export default patchFavorite;
