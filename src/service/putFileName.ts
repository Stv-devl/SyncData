const putFileName = async (
  userId: string,
  fileId: string,
  fileName: string
) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/updateName`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, fileId, fileName }),
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

export default putFileName;
