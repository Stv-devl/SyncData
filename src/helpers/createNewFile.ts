import { generateId } from '@/helpers/generateId';
import { getCurrentDate } from '@/helpers/getCurrentDate';

export const createNewFile = (filename: string, type: string) => {
  return {
    id: generateId(),
    filename,
    type,
    url: '',
    files: [],
    acces: 'only you',
    modified: getCurrentDate(),
  };
};
