'use client';
import { ButtonComponent } from '../../../src/types/type';
import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

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
}: ButtonComponent): JSX.Element => {
  const colorStyle = clsx(
    color === 'empty'
      ? 'bg-white text-darkest-blue border border-darkest-blue hover:bg-light-blue'
      : 'bg-regular-blue text-white hover:bg-dark-blue'
  );

  return (
    <button
      type={type || 'button'}
      onClick={onClick}
      disabled={disabled || false}
      className={twMerge(
        colorStyle,
        'flex items-center justify-center gap-2 duration-500 ease-in-out font-semibold rounded-lg w-full h-[46px]'
      )}
    >
      {IconComponent && <IconComponent className="mt-1" />}
      {label}
    </button>
  );
};

export default Button;
