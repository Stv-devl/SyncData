import React, { useState } from 'react';
import { icones } from '@/constantes/constantes';
import IconFileWrapper from '../../utils/IconFileWrapper';
import { filteredFiles } from '@/utils/filteredFiles';
import { AccordeonItemProps, FileType } from '@/types/type';

const AccordionItem: React.FC<AccordeonItemProps> = ({ file }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const getChevronIcon = () =>
    isOpen ? <icones.IconChevronDown /> : <icones.IconChevronRight />;

  return (
    <div className="ml-1">
      <div
        onClick={toggleOpen}
        className="flex cursor-pointer items-center gap-2 "
      >
        <div>{getChevronIcon()}</div>
        <input type="checkbox" className="border-dark-gray size-4 border-2" />
        <div className="icon-wrapper">
          <IconFileWrapper type={file.type} className="size-5" />
        </div>
        <p className="py-1">{file.filename}</p>
      </div>

      {isOpen && file.files && file.files.length > 0 && (
        <div className="">
          {filteredFiles(file.files).map((child: FileType, index: number) => (
            <AccordionItem key={index} file={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
