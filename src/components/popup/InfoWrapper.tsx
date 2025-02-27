import clsx from 'clsx';
import React, { useCallback } from 'react';
import { twMerge } from 'tailwind-merge';
import { arrayPopup } from '@/constantes/constantes';
import useManageFonctions from '@/hook/manage/useManageFonctions';
import usePopupStore from '@/store/ui/usePopup';
import { InfoWrapperProps } from '@/types/type';

/**
 * InfoWrapper component that displays a list of actions for a file
 * @component
 * @param {InfoWrapperProps} props - The properties for the InfoWrapper component
 * @returns {JSX.Element} The rendered InfoWrapper component with a list of actions
 */
const InfoWrapper: React.FC<InfoWrapperProps> = ({ fileName, fileId }) => {
  const { getActionByType } = useManageFonctions();
  const { closePopup } = usePopupStore();

  /**
   * Handles the popup click event
   * @param {string} type - The type of the action
   * @param {string | null} fileId - The id of the file
   * @param {string | null} fileName - The name of the file
   */
  const handlePopupClick = useCallback(
    (type: string, fileId: string | null, fileName: string | null) => {
      if (!fileId || !fileName) return;
      getActionByType(type, fileId, fileName);
      closePopup();
    },
    [getActionByType, closePopup]
  );

  /**
   * Renders the InfoWrapper component
   * @returns {JSX.Element} The rendered InfoWrapper component
   */
  return (
    <div className="flex flex-col items-center ">
      <div className="text-darkest-blue border-regular-gray size-full truncate border-b p-3 text-center font-semibold capitalize">
        {fileName}
      </div>
      {arrayPopup.map((item) => (
        <div
          key={item.label}
          className="hover:bg-light-blue flex w-full cursor-pointer items-center gap-4 px-4 py-2 transition-colors duration-500"
          onClick={() => handlePopupClick(item.type, fileId, fileName)}
        >
          <item.icon
            className={twMerge(
              'group-hover:text-regular-blue text-darkest-blue transition-colors duration-300',
              clsx(item.label === 'Information' ? 'ml-0.5 size-5' : 'size-6')
            )}
          />
          <span className="text-darkest-blue">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default InfoWrapper;
