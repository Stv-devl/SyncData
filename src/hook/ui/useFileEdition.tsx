import { useCallback, useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';
import { updateFileNameSchema } from '@/helpers/validationShema';
import useManageFonctions from '@/hook/manage/useManageFonctions';
import useEditedInput from '@/hook/ui/useEditedInput';
import { FileType, IconType, UseFileEditionProps } from '@/types/type';

/**
 * Custom hook for managing file edition functionality
 * @param {UseFileEditionProps} props - The props for the useFileEdition hook
 * @returns {Object} Object containing newFileName, editedFileRef, handleInputChange, handleIconClick, validateName, and error
 */
function useFileEdition({
  files,
  toggleEditedFile,
  updateFileName,
}: UseFileEditionProps) {
  const { getActionByType } = useManageFonctions();
  const [newFileName, setNewFileName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const editedFile = useMemo(() => files.find((f) => f.isEdited), [files]);
  const editedFileRef = useEditedInput({ editedFile, toggleEditedFile });

  useEffect(() => {
    if (editedFile) {
      setNewFileName(editedFile.filename);
      setError(null);
    }
  }, [editedFile]);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewFileName(event.target.value);
      setError(null);
    },
    []
  );
  //pourquoi icon Click passe par hook édition a bouger?
  const handleIconClick = useCallback(
    (icon: IconType, file: FileType) => {
      getActionByType(icon.type, file.id, file.filename);
    },
    [getActionByType]
  );

  const validateName = useCallback(
    async (fileId: string, fileName: string) => {
      try {
        await updateFileNameSchema.validate({ filename: newFileName });
        setError(null);
        updateFileName(fileId, newFileName, fileName);
        toggleEditedFile(fileId);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          setError(err.message);
        }
      }
    },
    [newFileName, updateFileName, toggleEditedFile]
  );

  return {
    newFileName,
    editedFileRef,
    handleInputChange,
    handleIconClick,
    validateName,
    error,
  };
}

export default useFileEdition;
