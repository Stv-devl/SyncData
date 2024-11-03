import React, { useRef } from 'react';
import IconFileWrapper from '../../../wrapper/IconFileWrapper';
import { ArrayFileContentProps } from '@/types/type';

const FileContent: React.FC<ArrayFileContentProps> = ({
  files,
  handleOpenFolder,
  toggleFileChecked,
  handleClickOpen,
}) => {
  const containerRefs = useRef<HTMLLIElement[]>([]);

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
            onContextMenu={(e) =>
              handleClickOpen(
                e,
                file.filename,
                new DOMRect(e.clientX, e.clientY, 0, 0),
                file.id
              )
            }
            onClick={() => handleOpenFolder(file.id)}
          >
            <IconFileWrapper type={file.type} />
            <span className="text-sm"> {file.filename}</span>
            <div className="absolute right-2 top-2">
              <input
                type="checkbox"
                className="border-dark-gray size-4 border-2"
                onChange={() => toggleFileChecked(file.id)}
                checked={file.isChecked || false}
              />
            </div>
          </li>
        ))}
    </ul>
  );
};

export default FileContent;
