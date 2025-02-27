import React from 'react';
import { iconsMap } from '../../constantes/iconsMap';
import { IconWrapperProps } from '@/types/type';

/**
 * IconFileWrapper component that displays an icon for a file
 * @component
 * @param {IconWrapperProps} props - The properties for the IconFileWrapper component
 * @returns {JSX.Element} The rendered IconFileWrapper component with an icon
 */
const IconFileWrapper: React.FC<IconWrapperProps> = ({ type, className }) => {
  const iconMapping = {
    home: iconsMap.IconHomeFile,
    folder: iconsMap.IconFiles,
    pdf: iconsMap.IconPdf,
    image: iconsMap.IconImage,
    unknown: iconsMap.IconUnknown,
    dwg: iconsMap.IconDwg,
  };

  /**
   * Gets the icon component based on the type
   * @returns {JSX.Element} The rendered IconFileWrapper component with an icon
   */
  const IconComponent =
    iconMapping[type as keyof typeof iconMapping] || iconsMap.IconUnknown;

  return <IconComponent className={className} />;
};

export default IconFileWrapper;
