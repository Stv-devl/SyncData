import { findFileRecursive } from './findFileRecursive';
import { FileType } from '@/types/type';

export const updateParentDates = (
  files: FileType[],
  childId: string,
  newDate: string,
  isRemove?: boolean
): FileType[] => {
  const updateFile = (file: FileType): FileType => ({
    ...file,
    modified: newDate,
  });

  const updateChild = (child: FileType): FileType => {
    if (isRemove && child.id === childId) {
      return {
        ...child,
        modified: newDate,
      };
    }
    return child;
  };

  const updateParentsRecursive = (
    folders: FileType[],
    childId: string
  ): FileType[] => {
    return folders.map((file) => {
      if (file.files) {
        const containsChildDirectly = file.files.some(
          (child) => child.id === childId
        );

        if (containsChildDirectly) {
          return {
            ...updateFile(file),
            files: file.files.map((child) => updateChild(child)),
          };
        }

        if (findFileRecursive(file.files, childId)) {
          return {
            ...updateFile(file),
            files: updateParentsRecursive(file.files, childId),
          };
        }

        return {
          ...file,
          files: updateParentsRecursive(file.files, childId),
        };
      }

      return file;
    });
  };
  return updateParentsRecursive(files, childId);
};
