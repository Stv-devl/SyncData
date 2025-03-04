'use client';

import clsx from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { CustomsInputProps } from '../../types/type';

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

  const isSearch = name === 'searchbar';

  const inputClasses = twMerge(
    'size-full border bg-white placeholder:text-dark-gray rounded-lg focus:outline-none focus:border-focus-border focus:shadow-custom-blue',
    clsx(
      haveIcon ? 'pl-9 sm:pl-10' : 'pl-5 ',
      error
        ? 'border-error-border text-error-red'
        : 'border-input-border text-dark-gray'
    )
  );

  const labelClasses = twMerge(
    clsx(
      isSearch ? 'hidden' : '',
      error && label !== 'Link' ? 'text-error-red' : 'text-darkest-gray'
    ),
    'text-sm w-[100px]'
  );

  return (
    <>
      <label htmlFor={name} className={labelClasses}>
        {label}
      </label>
      <div
        className={twMerge(
          clsx(isSearch ? 'h-[35px] sm:h-[40px]' : 'h-[46px]'),
          'relative w-full'
        )}
      >
        {haveIcon && IconComponent && (
          <IconComponent className="absolute left-3 top-1/2 mt-0.5 size-max -translate-y-1/2" />
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
            className="text-error-red relative right-0 top-auto transform-none sm:absolute sm:right-3 sm:top-1/2 sm:-translate-y-1/2"
          >
            {error}
          </span>
        )}
      </div>
    </>
  );
};

export default Input;
