import React, { useState } from 'react';
import { iconsMap } from '@/constantes/iconsMap';
import IconFileWrapper from '../wrapper/IconFileWrapper';
import { filteredFolders } from '@/utils/filteredFolders';
import { AccordionItemProps, FileType } from '@/types/type';

const AccordionItem: React.FC<AccordionItemProps> = ({
  file,
  initiallyOpen = false,
  onCheck,
  checkedFile,
}) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  const toggleOpen = () => setIsOpen(!isOpen);

  const isChecked = checkedFile === file.id;

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    onCheck(file.id, checked);
  };

  const getChevronIcon = () =>
    isOpen ? <iconsMap.IconChevronDown /> : <iconsMap.IconChevronRight />;

  return (
    <div className="ml-1">
      <div className="flex items-center gap-2">
        <div onClick={toggleOpen} className="cursor-pointer">
          {getChevronIcon()}
        </div>
        <input
          type="checkbox"
          className="border-dark-gray size-4 border-2"
          checked={isChecked}
          onChange={handleCheckboxChange}
          onClick={(e) => e.stopPropagation()}
        />
        <div className="icon-wrapper">
          <IconFileWrapper type={file.type} className="size-5" />
        </div>
        <p className="py-1">{file.filename}</p>
      </div>

      {isOpen && file.files && file.files.length > 0 && (
        <div className="pl-4">
          {filteredFolders(file.files).map((child: FileType) => (
            <AccordionItem
              key={child.id}
              file={child}
              onCheck={onCheck}
              checkedFile={checkedFile}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
