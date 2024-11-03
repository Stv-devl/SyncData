/**
 * Deletes a user's file based on userId and fileId.
 * Sends a DELETE request to the API and handles the response.
 * @param {string} userId - The ID of the user.
 * @param {string} fileId - The Id of the file to delete.
 * @returns {Promise<void>} A promise that resolves when the deletion is complete.
 */

async function deleteFile(
  userId: string,
  fileId: string | string[],
  parentId: string
): Promise<void> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/files`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, fileId, parentId }),
    });

    console.log('parentid in delete', parentId);

    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
    } else {
      const errorData = await response.json();
      console.error(errorData.message);
    }
  } catch (error) {
    console.error('Error deleting Link:', error);
  }
}

export default deleteFile;
