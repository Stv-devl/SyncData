import React, { useEffect, useRef } from 'react';
import usePopupStore from '../../../../store/usePopup';
import { ArrayContentProps } from '@/types/type';
import IconFileWrapper from '../../../wrapper/IconFileWrapper';
import { useUserStore } from '@/store/useUserStore';

const FileContent: React.FC<ArrayContentProps> = ({ files }) => {
  const { isOpen, handleClickOpen, handleClickClose } = usePopupStore();

  const { toggleFileChecked } = useUserStore();

  const containerRefs = useRef<HTMLLIElement[]>([]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('click', handleClickClose);
    } else {
      window.removeEventListener('click', handleClickClose);
    }
    return () => {
      window.removeEventListener('click', handleClickClose);
    };
  }, [isOpen, handleClickClose]);

  const handleCheckbox = (fileId: string) => {
    toggleFileChecked(fileId);
  };

  return (
    <ul className="grid-cols-auto-fill-minmax grid gap-4 p-6">
      {files &&
        files.map((file, index) => (
          <li
            key={file.filename}
            ref={(el) => {
              if (el) containerRefs.current[index] = el;
            }}
            className="hover:bg-light-blue relative flex size-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg bg-white transition-colors duration-500"
            onContextMenu={(e) => {
              e.preventDefault();
              const rect = containerRefs.current[index].getBoundingClientRect();
              handleClickOpen(e, file.filename, rect, file.id);
            }}
          >
            <IconFileWrapper type={file.type} />
            <span className="text-sm"> {file.filename}</span>
            <div className="absolute right-2 top-2">
              <input
                type="checkbox"
                className="border-dark-gray size-4 border-2"
                onChange={() => handleCheckbox(file.id)}
                checked={file.isChecked || false}
              />
            </div>
          </li>
        ))}
    </ul>
  );
};

export default FileContent;
