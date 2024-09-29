'use client';
import React from 'react';
import { CustomsInputProps } from '../../types/type';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Renders an input field with dynamic styling based on validation state.
 * The component supports displaying an icon, and changes the border and text color based on error presence.
 * An error message is displayed below the input field when validation fails.
 * @param {CustomsInputProps} props - The properties for the Input component.
 * @returns The rendered input component which may include an optional error message.
 */

const Input: React.FC<CustomsInputProps> = ({
  name,
  type,
  handleChange,
  value,
  label,
  placeholder,
  error,
  autoComplete,
  IconComponent,
}: CustomsInputProps) => {
  const errorId = `error-${name}`;
  const haveIcon = Boolean(IconComponent);

  const inputClasses = twMerge(
    'w-full border bg-white placeholder:text-medium-gray h-12 rounded-lg focus:outline-none focus:border-focus-border focus:shadow-custom-blue',
    clsx(
      haveIcon ? 'pl-10 pb-1' : 'pl-5 ',
      error
        ? 'border-error-border text-error-red'
        : 'border-input-border text-dark-gray'
    )
  );

  const labelClasses = twMerge(
    clsx(error && label !== 'Link' ? 'text-error-red' : 'text-darkest-gray'),
    'text-xs'
  );

  return (
    <>
      <label htmlFor={name} className={labelClasses}>
        {label}
      </label>
      <div className="relative w-full">
        {haveIcon && IconComponent && (
          <IconComponent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-max h-max" />
        )}
        <input
          className={inputClasses}
          type={type}
          id={name}
          name={name}
          value={value || ''}
          onChange={handleChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
        {error && (
          <span
            id={errorId}
            className="text-error-red relative sm:absolute right-0 sm:right-3 top-auto sm:top-1/2 transform-none sm:transform sm:-translate-y-1/2"
          >
            {error}
          </span>
        )}
      </div>
    </>
  );
};

export default Input;
