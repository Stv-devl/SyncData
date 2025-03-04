import { isValidFileSignature } from './isValidFileSignature';
import { uploadFileToCloudinary } from './uploadFileToCloudinary';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const allowedMimeTypes = new Set(['image/jpeg', 'image/png']);
const validSignatures = {
  'image/jpeg': [0xff, 0xd8, 0xff],
  'image/png': [0x89, 0x50, 0x4e, 0x47],
};

/**
 * Handle an image error
 * @param message - The error message
 * @returns null
 */
const handleImageError = (message: string): null => {
  console.error(message);
  return null;
};

/**
 * Process an image file
 * @param image - The image file to process
 * @param currentImageUrl - The current image URL
 * @returns The URL of the processed image or null if there is an error
 */
export async function processImage(
  image: File,
  currentImageUrl: string | undefined | null | File
): Promise<string | null> {
  if (!image || !(image instanceof File)) return null;

  if (!allowedMimeTypes.has(image.type))
    return handleImageError('Invalid image format');
  if (image.size > MAX_FILE_SIZE)
    return handleImageError('File size exceeds limit (5MB)');

  const detectedMime = await isValidFileSignature(image, validSignatures);
  if (!detectedMime || detectedMime !== image.type)
    return handleImageError('Invalid file content');

  const uploadResult = await uploadFileToCloudinary(image);
  return (
    uploadResult?.secure_url ||
    (typeof currentImageUrl === 'string' ? currentImageUrl : null)
  );
}
