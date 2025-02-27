import React from 'react';
import { iconsMap } from '../../constantes/iconsMap';

/**
 * EmptyContent component that displays a message when the drop zone is empty
 * @returns The EmptyContent component
 */

const EmptyContent = () => {
  return (
    <div className="mt-2  flex size-full items-center justify-center">
      <div className="flex flex-col items-center gap-3 ">
        <iconsMap.IconEmpty className="h-[80px] w-[73px] lg:h-[111px] lg:w-[104px]" />
        <p className="text-titleSmall lg:text-title text-regular-gray">
          Drag your file
        </p>
      </div>
    </div>
  );
};

export default EmptyContent;
