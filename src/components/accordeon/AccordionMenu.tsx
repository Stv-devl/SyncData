import { findFileRecursive } from 'lib/utils/findFileRecursive';
import React, { useMemo } from 'react';
import AccordionItem from './AccordionItem';
import { useFileStore } from '@/store/useFileStore';
import { AccordionMenuProps, FileType } from '@/types/type';

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
