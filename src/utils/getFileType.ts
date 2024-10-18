import { fileTypeMap } from '@/constantes/fileTypeMap';

export const getFileType = (fileName: string): string => {
  const fileExtension = fileName.split('.').pop()?.toLowerCase() || '';
  return fileTypeMap[fileExtension as keyof typeof fileTypeMap] || 'unknown';
};
