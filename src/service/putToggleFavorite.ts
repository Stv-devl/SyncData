const putToggleFavorite = async (userId: string, fileId: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/favorite`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, fileId }),
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

export default putToggleFavorite;
