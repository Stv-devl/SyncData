/**
 * Convert a Blob URL to a File
 * @param blobUrl The Blob URL to convert
 * @param fileName The resulting file name (default: 'image.png')
 * @returns A File object ready to be sent via FormData
 */
export const convertBlobToFile = async (
  blobUrl: string,
  fileName: string
): Promise<File | null> => {
  try {
    if (!blobUrl.startsWith('blob:')) {
      console.warn('URL provided is not a Blob:', blobUrl);
      return null;
    }

    const response = await fetch(blobUrl);
    const blob = await response.blob();
    const file = new File([blob], fileName, { type: blob.type });

    return file;
  } catch (error) {
    console.error('Error when converting Blob to File:', error);
    return null;
  }
};
