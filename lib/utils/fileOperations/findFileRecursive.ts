import { FileType } from '@/types/type';

/**
 * Finds a file in the array of files
 * @param files - The array of files
 * @param idOrIds - The ID or IDs of the file to find
 * @param action - The action to perform on the file
 * @returns The file or files found
 */

export function findFileRecursive(
  files: FileType[],
  idOrIds: string | string[],
  action?: (file: FileType) => FileType
): FileType | FileType[] | null {
  if (Array.isArray(idOrIds)) {
    const foundFiles: FileType[] = [];
    for (const id of idOrIds) {
      const found = findFile(files, id, action);
      if (found) {
        foundFiles.push(found);
      }
    }
    return foundFiles.length > 0 ? foundFiles : null;
  } else {
    return findFile(files, idOrIds, action);
  }
}

function findFile(
  files: FileType[],
  id: string,
  action?: (file: FileType) => FileType
): FileType | null {
  for (const file of files) {
    if (file.id === id) {
      return action ? action(file) : file;
    }
    if (file.files && file.files.length > 0) {
      const found = findFile(file.files, id, action);

      if (found) return found;
    }
  }
  return null;
}
