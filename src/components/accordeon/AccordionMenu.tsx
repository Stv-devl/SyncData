import React from 'react';
import AccordionItem from './AccordionItem';
import { ArrayContentProps, FileType } from '@/types/type';

const AccordionMenu: React.FC<ArrayContentProps> = ({
  files,
  handleCheck,
  checkedFile,
}) => {
  console.log(files);

  const firstFile: FileType = {
    id: 'root',
    filename: 'Home',
    type: 'home',
    files: files,
  };

  return (
    <div className="border-regular-gray h-[222px] w-full overflow-y-auto rounded-lg border p-3">
      <AccordionItem
        file={firstFile}
        initiallyOpen={true}
        onCheck={handleCheck}
        checkedFile={checkedFile}
      />
    </div>
  );
};

export default AccordionMenu;
