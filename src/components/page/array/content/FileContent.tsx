import { ArrayContentProps } from '@/types/type';
import React from 'react';
import IconWrapper from '../wrapper/IconWrapper';

const FileContent: React.FC<ArrayContentProps> = ({ files }) => {
  return (
    <ul className="grid-cols-auto-fill-minmax grid gap-4 p-6">
      {files &&
        files.map((file, index) => (
          <>
            <li
              className="hover:bg-light-blue relative flex size-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg bg-white transition-colors duration-500"
              key={'file' + index}
            >
              <IconWrapper type={file.type} />
              <span className="text-sm"> {file.filename}</span>
              <div className="absolute right-2 top-2">
                <input
                  type="checkbox"
                  className="border-dark-gray size-4 border-2"
                />
              </div>
            </li>
          </>
        ))}
    </ul>
  );
};

export default FileContent;
