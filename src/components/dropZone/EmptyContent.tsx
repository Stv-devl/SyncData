import React from 'react';
import { iconsMap } from '../../constantes/iconsMap';

const EmptyContent = () => {
  return (
    <div className="mt-20 flex size-full justify-center">
      <div className="flex flex-col items-center gap-3">
        <iconsMap.IconEmpty />
        <p className="text-title text-regular-gray">Drag your file</p>
      </div>
    </div>
  );
};

export default EmptyContent;
