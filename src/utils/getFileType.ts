import { fileTypeMapping } from '@/constantes/fileTypeMapping';

export const getFileType = (fileName: string): string => {
  const fileExtension = fileName.split('.').pop()?.toLowerCase() || '';
  return (
    fileTypeMapping[fileExtension as keyof typeof fileTypeMapping] || 'unknown'
  );
};
