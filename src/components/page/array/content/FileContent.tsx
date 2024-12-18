import React, { useMemo } from 'react';
import IconFileWrapper from '../../../wrapper/IconFileWrapper';
import UpdateInput from '@/components/form/UpdateNameInput';
import { arrayIcone } from '@/constantes/constantes';
import useFileEdition from '@/hook/ui/useFileEdition';
import IconFavorited from '@/icones/iconFavorited';
import { ArrayFileContentProps } from '@/types/type';

const FileContent: React.FC<ArrayFileContentProps> = ({
  files,
  updateFileName,
  handleOpenFolder,
  toggleFileChecked,
  handleClickOpen,
  toggleEditedFile,
}) => {
  const {
    newFileName,
    editedFileRef,
    handleInputChange,
    handleIconClick,
    validateName,
  } = useFileEdition({ files, toggleEditedFile, updateFileName });

  const fileNameStyle = useMemo(() => 'truncate', []);

  return (
    <ul className="grid-cols-auto-fill-minmax grid gap-4 p-6">
      {files.map((file) => (
        <div key={file.filename} className="relative">
          <div
            ref={file.isEdited ? editedFileRef : null}
            className="hover:bg-light-blue z-2 fixed flex size-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg bg-white transition-colors duration-500"
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
            {file.isEdited ? (
              <UpdateInput
                file={file}
                isFile={true}
                name="searchbar"
                value={newFileName || ''}
                handleChange={handleInputChange}
                placeholder={file.filename}
                autoComplete="off"
                toggleEditedFile={toggleEditedFile}
                validateName={validateName}
                error=""
              />
            ) : (
              <span className={fileNameStyle}>{file.filename}</span>
            )}

            {file.isFavorite && (
              <IconFavorited
                className="text-regular-blue hover:text-dark-blue absolute left-2 top-2 z-20 w-[23px] transition-colors duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  handleIconClick(arrayIcone[0], file);
                }}
              />
            )}

            <div className="absolute right-2 top-2 z-20">
              <input
                type="checkbox"
                className="border-dark-gray size-4 border-2"
                onClick={(e) => e.stopPropagation()}
                onChange={() => toggleFileChecked(file.id)}
                checked={file.isChecked || false}
              />
            </div>
          </div>
        </div>
      ))}
    </ul>
  );
};

export default FileContent;
