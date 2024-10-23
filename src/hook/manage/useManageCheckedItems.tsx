import { FileType } from '@/types/type';
import { useMemo } from 'react';

const useManageCheckedItems = (files: FileType[] | null) => {
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

export default useManageCheckedItems;
