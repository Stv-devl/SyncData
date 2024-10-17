import React from 'react';
import { icones } from '../../constantes/constantes';
import { IconWrapperProps } from '@/types/type';

const IconFileWrapper: React.FC<IconWrapperProps> = ({ type, className }) => {
  const iconMapping = {
    home: icones.IconHomeFile,
    folder: icones.IconFiles,
    pdf: icones.IconPdf,
    image: icones.IconImage,
    unknown: icones.IconUnknown,
    dwg: icones.IconDwg,
  };

  const IconComponent =
    iconMapping[type as keyof typeof iconMapping] || icones.IconUnknown;

  return <IconComponent className={className} />;
};

export default IconFileWrapper;
