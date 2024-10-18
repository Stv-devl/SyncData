import React from 'react';
import { iconsMap } from '../../constantes/iconsMap';
import { IconWrapperProps } from '@/types/type';

const IconFileWrapper: React.FC<IconWrapperProps> = ({ type, className }) => {
  const iconMapping = {
    home: iconsMap.IconHomeFile,
    folder: iconsMap.IconFiles,
    pdf: iconsMap.IconPdf,
    image: iconsMap.IconImage,
    unknown: iconsMap.IconUnknown,
    dwg: iconsMap.IconDwg,
  };

  const IconComponent =
    iconMapping[type as keyof typeof iconMapping] || iconsMap.IconUnknown;

  return <IconComponent className={className} />;
};

export default IconFileWrapper;
