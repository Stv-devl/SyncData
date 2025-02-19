import { fileTypeFromBuffer } from 'file-type';
import { fileTypeMap } from '@/constantes/fileTypeMap';

/**
 * Check if a file is valid based on its Magic Number
 * @param file - File received as a `File`
 * @returns {boolean} True if valid, False otherwise
 */
export async function isValidFile(file: File): Promise<boolean> {
  const buffer = await file.arrayBuffer();
  const detectedType = await fileTypeFromBuffer(new Uint8Array(buffer));

  if (!detectedType) {
    return false;
  }

  return Object.keys(fileTypeMap).includes(detectedType.ext);
}
