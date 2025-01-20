import { findFileRecursive } from 'lib/utils/findFileRecursive';
import React, { useMemo } from 'react';
import AccordionItem from './AccordionItem';
import { useFileStore } from '@/store/useFileStore';
import { AccordionFirstFileType, AccordionMenuProps } from '@/types/type';

const AccordionMenu: React.FC<AccordionMenuProps> = ({
  files,
  handleCheck,
  checkedFile,
  toggleOpen,
  isOpen,
}) => {
  const { parentFolderId } = useFileStore();

  const selectedFolder = useMemo(() => {
    const folder = findFileRecursive(files, parentFolderId);
    return folder ? folder : null;
  }, [files, parentFolderId]);

  const firstFile: AccordionFirstFileType = {
    id: 'root',
    filename: 'Home',
    type: 'home',
    files: files,
  };

  return (
    <div className="border-regular-gray h-[222px] w-full overflow-y-auto rounded-lg border p-3">
      <AccordionItem
        file={selectedFolder ?? firstFile}
        handleCheck={handleCheck}
        checkedFile={checkedFile}
        toggleOpen={toggleOpen}
        isOpen={isOpen}
      />
    </div>
  );
};

export default AccordionMenu;
