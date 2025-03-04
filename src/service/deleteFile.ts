import { getCsrfToken } from 'next-auth/react';

/**
 * Deletes a user file based on userId and fileId.
 * Sends a DELETE request to the API and handles the response.
 * @param {string} userId - The ID of the user.
 * @param {string[]} fileId - The IDs of the files to delete.
 * @param {string} parentId - The ID of the parent folder.
 * @param {string[]} publicId - The public IDs of the files in Cloudinary.
 * @returns {Promise<void>} A promise that resolves when the deletion is complete.
 */
async function deleteFile(
  userId: string,
  fileId: string[],
  parentId: string,
  publicId: string[]
): Promise<void> {
  try {
    const csrfToken = await getCsrfToken();
    if (!csrfToken) throw new Error('Missing CSRF token');

    const queryParams = new URLSearchParams({
      userId,
      parentId,
      publicId: JSON.stringify(publicId),
      fileId: JSON.stringify(fileId),
    }).toString();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/files?${queryParams}`,
      {
        method: 'DELETE',
        headers: {
          'X-CSRF-Token': csrfToken,
        },
        credentials: 'include',
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
    } else {
      const errorData = await response.json();
      console.error(errorData.message);
    }
  } catch (error) {
    console.error('Error deleting file:', error);
  }
}

export default deleteFile;
