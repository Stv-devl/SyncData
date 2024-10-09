import React from 'react';
import { icones } from '../../../../constantes/constantes';

const FileContent = ({ testFile }) => {
  return (
    <ul className="grid-cols-auto-fill-minmax grid gap-4 p-6">
      {testFile &&
        testFile.map((file, index) => (
          <>
            <li
              className="relative flex size-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg bg-white"
              key={'file' + index}
            >
              <icones.IconFiles />
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
