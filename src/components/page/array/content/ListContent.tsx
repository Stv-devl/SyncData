import React, { useRef, useCallback } from 'react';
import IconWrapper from '../../../wrapper/IconFileWrapper';
import { arrayHeader, arrayIcone } from '@/constantes/constantes';
import { iconsMap } from '@/constantes/iconsMap';
import { headerClass } from '@/helpers/headerClass';
import useManageFonctions from '@/hook/manage/useManageFonctions';
import { ArrayListContentProps, FileType } from '@/types/type';

const ListContent: React.FC<ArrayListContentProps> = ({
  files,
  handleOpenFolder,
  toggleFileChecked,
  handleClickOpen,
  handleMouseEnter,
  handleMouseLeave,
}) => {
  const { getActionByType } = useManageFonctions();
  const containerRefs = useRef<HTMLLIElement[]>([]);

  const handleIconClick = useCallback(
    (icon: { type: string }, file: FileType) => {
      getActionByType(icon.type, file.id, file.filename);
    },
    [getActionByType]
  );

  return (
    <>
      {files.map((file, index) => (
        <div
          key={file.id}
          className="ml-[9px] flex items-center px-3 transition-colors duration-500 lg:px-6"
        >
          <input
            type="checkbox"
            className="border-dark-gray mr-8 size-5 shrink-0 cursor-pointer border-2"
            onChange={() => toggleFileChecked(file.id)}
            checked={file.isChecked || false}
          />
          <ul
            className="hover:bg-light-blue flex h-16 w-full cursor-pointer items-center"
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
            {arrayHeader.map((item) => {
              const content = file[item.name as keyof typeof file];
              return (
                <li key={item.name} className={headerClass(item.name)}>
                  <div className="flex items-center gap-1">
                    {item.name === 'filename' ? (
                      <>
                        <IconWrapper type={file.type} className="size-8" />
                        <span>{String(content)}</span>
                      </>
                    ) : (
                      <span>{String(content)}</span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
          <ul className="flex">
            {arrayIcone.map((icon, iconIndex) => (
              <li
                key={`icon-${iconIndex}`}
                className="relative hidden w-7 flex-none cursor-pointer px-5 sm:block lg:w-9"
                onClick={() => handleIconClick(icon, file)}
              >
                <icon.icon
                  className="text-regular-blue hover:text-dark-blue z-20 size-6 transition-colors duration-300"
                  onMouseEnter={(e) =>
                    handleMouseEnter(e, icon.type, 'translate(-40%, -110%)')
                  }
                  onMouseLeave={handleMouseLeave}
                />
              </li>
            ))}
            <li
              className="relative block w-7 flex-none px-5 sm:hidden lg:w-9"
              ref={(el) => {
                if (el) containerRefs.current[index] = el;
              }}
              onClick={(e) => {
                e.preventDefault();
                const rect =
                  containerRefs.current[index].getBoundingClientRect();
                handleClickOpen(e, file.filename, rect, file.id);
              }}
            >
              <iconsMap.IconInfo className="text-regular-blue hover:text-dark-blue size-6 transition-colors duration-300" />
            </li>
          </ul>
        </div>
      ))}
    </>
  );
};

export default ListContent;
