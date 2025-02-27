import { findFileRecursive } from 'lib/utils/fileOperations/findFileRecursive';
import React, { useMemo } from 'react';
import AccordionItem from './AccordionItem';
import { useFileStore } from '@/store/useFileStore';
import { AccordionMenuProps, FileType } from '@/types/type';

/**
 * Accordion menu component that displays a list of files and folders
 * @param {Object} props - Component props
 * @param {FileType[]} props.files - The list of files and folders to display
 * @param {Function} props.handleCheck - Handler for checkbox changes
 * @param {string} props.checkedFile - ID of currently checked file
 * @param {Function} props.toggleOpen - Handler for expanding/collapsing folders
 * @param {Function} props.isOpen - Function to check if a folder is open
 * @returns {JSX.Element} Rendered accordion menu component
 */

const AccordionMenu: React.FC<AccordionMenuProps> = ({
  files,
  handleCheck,
  checkedFile,
  toggleOpen,
  isOpen,
}) => {
  const { parentFolderId } = useFileStore();

  const selectedFolder = useMemo(() => {
    const defaultFolder: FileType = {
      id: 'root',
      filename: 'Home',
      type: 'home',
      files: [],
    };
    if (!files) {
      return defaultFolder;
    }
    const filesArray = Array.isArray(files) ? files : [files];
    const foundFolder = findFileRecursive(filesArray, parentFolderId);

    return foundFolder && !Array.isArray(foundFolder)
      ? foundFolder
      : { ...defaultFolder, files: filesArray };
  }, [files, parentFolderId]);

  return (
    <div className="border-regular-gray h-[222px] w-full overflow-y-auto rounded-lg border p-3">
      <AccordionItem
        file={selectedFolder}
        handleCheck={handleCheck}
        checkedFile={checkedFile}
        toggleOpen={toggleOpen}
        isOpen={isOpen}
      />
    </div>
  );
};

export default AccordionMenu;
