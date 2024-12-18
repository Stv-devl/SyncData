import { useCallback, useEffect, useMemo, useState } from 'react';
import useManageFonctions from '@/hook/manage/useManageFonctions';
import useEditedInput from '@/hook/ui/useEditedInput';
import { FileType, IconType, UseFileEditionProps } from '@/types/type';

function useFileEdition({
  files,
  toggleEditedFile,
  updateFileName,
}: UseFileEditionProps) {
  const { getActionByType } = useManageFonctions();

  const [newFileName, setNewFileName] = useState('');

  const editedFile = useMemo(() => files.find((f) => f.isEdited), [files]);
  const editedFileRef = useEditedInput({ editedFile, toggleEditedFile });

  useEffect(() => {
    if (editedFile) {
      setNewFileName(editedFile.filename);
    }
  }, [editedFile]);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewFileName(event.target.value);
    },
    []
  );

  const handleIconClick = useCallback(
    (icon: IconType, file: FileType) => {
      getActionByType(icon.type, file.id, file.filename);
    },
    [getActionByType]
  );

  const validateName = useCallback(
    (fileId: string, fileName: string) => {
      updateFileName(fileId, newFileName, fileName);
      toggleEditedFile(fileId);
    },
    [newFileName, updateFileName, toggleEditedFile]
  );

  return {
    newFileName,
    editedFileRef,
    handleInputChange,
    handleIconClick,
    validateName,
  };
}

export default useFileEdition;
