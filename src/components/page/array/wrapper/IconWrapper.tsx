import React from 'react';
import { icones } from '../../../../constantes/constantes';
import { IconWrapperProps } from '@/types/type';

const IconWrapper: React.FC<IconWrapperProps> = ({ type, className }) => {
  const iconMapping = {
    file: <icones.IconFiles className={className} />,
    pdf: <icones.IconPdf className={className} />,
    image: <icones.IconImage className={className} />,
    unknown: <icones.IconUnknown className={className} />,
    dwg: <icones.IconDwg className={className} />,
  };

  return iconMapping[type as keyof typeof iconMapping] || null;
};

export default IconWrapper;
