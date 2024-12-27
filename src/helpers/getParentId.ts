import { log } from 'console';
import { findFileRecursive } from 'lib/utils/findFileRecursive';
import { FileType } from '@/types/type';

export const getParentId = (files: FileType[], fileId: string) => {
  const selectedFolder = findFileRecursive(files, fileId);

  console.log(selectedFolder);

  /*  return selectedFolder && selectedFolder.type === 'folder'
    ? selectedFolder
    : null;*/
};
