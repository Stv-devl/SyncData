import React from 'react';
import { useDropzone } from 'react-dropzone';
import IconFileWrapper from '../../../wrapper/IconFileWrapper';
import DropZoneWrapper from '@/components/dropZone/DropZoneWrapper';
import UpdateInput from '@/components/form/UpdateNameInput';
import { arrayIcone } from '@/constantes/constantes';
import useFileEdition from '@/hook/ui/useFileEdition';
import IconFavorited from '@/icones/iconFavorited';
import { ArrayFileContentProps } from '@/types/type';

/**
 * FileContent component that displays a list of files and allows users to edit their names
 * @component
 * @param {ArrayFileContentProps} props - The properties for the FileContent component
 * @returns {JSX.Element} The rendered FileContent component with a list of files and edit form
 */

const FileContent: React.FC<ArrayFileContentProps> = ({
  files,
  updateFileName,
  handleOpenFolder,
  toggleFileChecked,
  handleClickOpen,
  toggleEditedFile,
  containerRef,
}) => {
  const {
    newFileName,
    editedFileRef,
    handleInputChange,
    handleIconClick,
    validateName,
    error,
  } = useFileEdition({ files, toggleEditedFile, updateFileName });

  const { isDragActive, getRootProps, getInputProps } = useDropzone({
    noClick: true,
    noKeyboard: true,
    multiple: true,
    onDragEnter: () => {},
    onDragOver: () => {},
    onDrop: () => {},
  });

  return (
    <div {...getRootProps()} className="relative">
      <input {...getInputProps()} />
      <ul
        ref={containerRef}
        className="grid-cols-auto-fill-minmax grid justify-items-center gap-4 p-6 "
      >
        {files.map((file) => (
          <li
            key={file.id}
            className="relative size-28 cursor-pointer"
            onContextMenu={(e) => {
              e.preventDefault();
              handleClickOpen(
                e,
                file.filename,
                new DOMRect(e.clientX, e.clientY, 0, 0),
                file.id
              );
            }}
            onClick={(e) => {
              if (!e.defaultPrevented) handleOpenFolder(file.id);
            }}
          >
            {file.type === 'folder' && isDragActive && (
              <DropZoneWrapper
                isDragIcon={false}
                dropFolderId={file.id}
                dropStyle="absolute inset-0 z-10"
              />
            )}

            <div
              ref={file.isEdited ? editedFileRef : null}
              className="hover:bg-light-blue z-20 flex size-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg bg-white transition-colors duration-500"
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
                  error={error}
                />
              ) : (
                <span className="w-[90%] truncate text-center">
                  {file.filename}
                </span>
              )}

              {file.isFavorite && (
                <IconFavorited
                  className="text-regular-blue hover:text-dark-blue z-11 absolute left-2 top-2 w-[23px] transition-colors duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleIconClick(arrayIcone[0], file);
                  }}
                />
              )}
              <div className="z-11 absolute right-2 top-2">
                <input
                  type="checkbox"
                  name="checkFile"
                  className="border-dark-gray size-4 border-2"
                  onClick={(e) => e.stopPropagation()}
                  onChange={() => toggleFileChecked(file.id)}
                  checked={file.isChecked || false}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileContent;
