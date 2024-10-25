import React from 'react';
import IconFileWrapper from '../wrapper/IconFileWrapper';
import { iconsMap } from '@/constantes/iconsMap';
import { AccordionItemProps, FileType } from '@/types/type';
import { filteredFolders } from '@/utils/filteredFolders';

const AccordionItem: React.FC<AccordionItemProps> = ({
  file,
  handleCheck,
  checkedFile,
  toggleOpen,
  isOpen,
}) => {
  const isChecked = checkedFile === file.id;
  const initiallyOpen = file.id === 'root';

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    handleCheck(file.id, checked);
  };

  const getChevronIcon = () =>
    isOpen(file.id) || initiallyOpen ? (
      <iconsMap.IconChevronDown />
    ) : (
      <iconsMap.IconChevronRight />
    );

  return (
    <div className="ml-1">
      <div className="flex items-center gap-2">
        <div onClick={() => toggleOpen(file.id)} className="cursor-pointer">
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

      {(isOpen(file.id) || initiallyOpen) &&
        file.files &&
        file.files.length > 0 && (
          <div className="pl-4">
            {filteredFolders(file.files).map((child: FileType) => (
              <AccordionItem
                key={child.id}
                file={child}
                handleCheck={handleCheck}
                checkedFile={checkedFile}
                toggleOpen={toggleOpen}
                isOpen={isOpen}
              />
            ))}
          </div>
        )}
    </div>
  );
};

export default AccordionItem;
