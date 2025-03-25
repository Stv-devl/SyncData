import clsx from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { ButtonComponent } from '../../../src/types/type';

/**
 * Reusable button component with various style options
 * @param {Object} props - Component properties
 * @param {string} props.label - Text to display on the button
 * @param {Function} props.onClick - Callback function triggered when the button is clicked
 * @param {string} props.color - Button color ('empty' for a button with border, otherwise filled)
 * @param {React.ComponentType} props.IconComponent - Optional icon component to display
 * @param {boolean} props.disabled - Indicates if the button is disabled
 * @param {string} props.type - HTML button type ('button', 'submit', 'reset')
 * @param {string} props.iconColor - Color of the icon if present
 * @returns {JSX.Element} The rendered button component
 */
const Button: React.FC<ButtonComponent> = ({
  label,
  onClick,
  color,
  IconComponent,
  disabled,
  type,
  iconColor,
}: ButtonComponent): JSX.Element => {
  const colorStyle = clsx(
    color === 'empty'
      ? 'border border-darkest-blue bg-white text-darkest-blue hover:bg-light-blue'
      : 'bg-regular-blue text-white hover:bg-dark-blue'
  );

  return (
    <button
      type={type || 'button'}
      onClick={onClick}
      disabled={disabled || false}
      className={twMerge(
        colorStyle,
        'flex items-center justify-center gap-1 lg:gap-2 duration-500 ease-in-out font-semibold rounded-lg w-full h-full px-3 '
      )}
    >
      {IconComponent && <IconComponent fill={iconColor} />}
      {label}
    </button>
  );
};

export default Button;
