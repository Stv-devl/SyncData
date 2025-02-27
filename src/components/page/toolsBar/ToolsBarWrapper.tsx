import React from 'react';
import Button from '@/components/button/Button';
import { ToolsBarWrapperProps } from '@/types/type';

/**
 * ToolsBarWrapper component that displays a button with an icon and a label
 * @component
 * @param {ToolsBarWrapperProps} props - The properties for the ToolsBarWrapper component
 * @returns {JSX.Element} The rendered ToolsBarWrapper component
 */
const ToolsBarWrapper: React.FC<ToolsBarWrapperProps> = ({
  label,
  icon: IconComponent,
  color,
  iconColor,
  onClick,
}) => {
  return (
    <div>
      <div className="hidden h-9 items-center text-sm sm:flex">
        <Button
          label={label}
          IconComponent={IconComponent}
          color={color}
          onClick={onClick}
          iconColor={iconColor}
        />
      </div>
      <div
        className="group mt-1 flex cursor-pointer sm:hidden"
        onClick={onClick}
      >
        <IconComponent className="group-hover:text-regular-blue text-darkest-blue size-7 transition-colors duration-300" />
      </div>
    </div>
  );
};

export default ToolsBarWrapper;
