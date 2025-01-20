import { callFilesRecursive } from './callFilesRecursive';
import { findFileRecursive } from './findFileRecursive';
import { FileType } from '@/types/type';

export const updateParentDates = (
  files: FileType[],
  childId: string,
  newDate: string,
  isRemove?: boolean
): FileType[] => {
  const callback = (file: FileType): FileType => {
    if (file.files?.some((child) => child.id === childId)) {
      const updatedParent = { ...file, modified: newDate };
      updatedParent.files = file.files.map((child) => {
        if (isRemove && child.id === childId) {
          return { ...child, modified: newDate };
        }
        return child;
      });
      return updatedParent;
    }

    const found = file.files && findFileRecursive(file.files, childId);
    if (found) {
      return { ...file, modified: newDate };
    }

    return file;
  };

  return callFilesRecursive(files, callback);
};
