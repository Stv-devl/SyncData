import { fileTypeMap } from '@/constantes/fileTypeMap';

/**
 * Gets the file type from the file name.
 * @param {string} fileName - The name of the file.
 * @returns {string} The file type.
 */
export const getFileType = (fileName: string): string => {
  const fileExtension = fileName.split('.').pop()?.toLowerCase() || '';
  return fileTypeMap[fileExtension as keyof typeof fileTypeMap] || 'unknown';
};
