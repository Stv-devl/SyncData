const putName = async (userId: string, fileId: string, filename: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/favorite`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, fileId, filename }),
    });
    if (!response.ok) {
      throw new Error(`Error to change the name. Status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Name of the file successfully changed');
    return data;
  } catch (error: unknown) {
    console.error('Error to add to change the name:', error);
    throw error;
  }
};

export default putName;
