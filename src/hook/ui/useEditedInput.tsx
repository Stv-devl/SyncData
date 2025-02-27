import { useEffect, useRef } from 'react';
import { FileType } from '@/types/type';

/**
 * Custom hook for managing the edited file input
 * @param {FileType | undefined} editedFile - The edited file
 * @param {Function} toggleEditedFile - The function to toggle the edited file
 * @returns {RefObject<HTMLDivElement>} The ref of the edited file
 */
interface UseEditedInputProps {
  editedFile: FileType | undefined;
  toggleEditedFile: (fileId: string) => void;
}

function useEditedInput({ editedFile, toggleEditedFile }: UseEditedInputProps) {
  const editedFileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        editedFile &&
        editedFileRef.current &&
        !editedFileRef.current.contains(event.target as Node)
      ) {
        toggleEditedFile(editedFile.id);
      }
    };

    if (editedFile) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      if (editedFile) {
        document.removeEventListener('mousedown', handleClickOutside);
      }
    };
  }, [editedFile, toggleEditedFile]);

  return editedFileRef;
}

export default useEditedInput;
