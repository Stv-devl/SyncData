'use client';
import clsx from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { ButtonComponent } from '../../../src/types/type';

/**
 * Button component renders a button with a label and an optional onClick handler.
 * It includes a hover effect when the mouse is over the button.
 * @param {ButtonComponent} props - Component properties.
 * @param {string} props.label - The text content of the button.
 * @param {() => void} props.onClick - The function to be called when the button is clicked.
 * @returns {JSX.Element} The Button component.
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
      ? 'text-darkest-blue border-darkest-blue hover:bg-light-blue border bg-white'
      : 'bg-regular-blue hover:bg-dark-blue text-white'
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
