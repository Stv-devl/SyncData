import { useMemo } from 'react';
import { FileType } from '@/types/type';

/**
 * Custom hook for managing checked items in a list of files
 * @param {FileType[] | null} files - The list of files to manage
 * @returns {Object} Object containing fileName, fileId, and checkedItems
 */
const useCheckedItems = (files: FileType[] | null) => {
  const checkedItems = useMemo(
    () => files?.filter((item) => item.isChecked),
    [files]
  );

  const fileName = useMemo(
    () => checkedItems?.map((item) => item.filename) || [],
    [checkedItems]
  );
  const fileId = useMemo(
    () => checkedItems?.map((item) => item.id) || [],
    [checkedItems]
  );

  return { fileName, fileId, checkedItems };
};

export default useCheckedItems;
