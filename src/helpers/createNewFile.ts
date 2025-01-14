import { generateId } from '@/helpers/generateId';
import { getCurrentDate } from '@/helpers/getCurrentDate';
import { getFileType } from '@/utils/getFileType';

export const createNewFile = (
  filename: string,
  url: string,
  file: File | null
) => {
  return {
    id: generateId(),
    filename,
    type: getFileType(filename),
    url: url || '',
    file,
    files: [],
    acces: 'only you',
    modified: getCurrentDate(),
  };
};
