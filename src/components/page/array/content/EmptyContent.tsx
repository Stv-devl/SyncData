import React from 'react';
import { iconsMap } from '../../../../constantes/iconsMap';

const EmptyContent = () => {
  return (
    <div className="flex size-full items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <iconsMap.IconEmpty />
        <p className="text-title text-regular-gray">Drag your file</p>
      </div>
    </div>
  );
};

export default EmptyContent;
