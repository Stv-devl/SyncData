'use client';

import React from 'react';
import { twMerge } from 'tailwind-merge';
import IconCrossCircle from '@/icones/IconCrossCircle';
import IconValidate from '@/icones/IconValidate';
import { ChangeNameProps } from '@/types/type';

/**
 * UpdateNameInput component that displays an input field for updating a file name
 * @param {ChangeNameProps} props - The properties for the UpdateNameInput component.
 * @returns {JSX.Element} The rendered UpdateNameInput component
 */
const UpdateNameInput: React.FC<ChangeNameProps> = ({
  file,
  isFile,
  name,
  handleChange,
  value,
  placeholder,
  error,
  autoComplete,
  toggleEditedFile,
  validateName,
}: ChangeNameProps) => {
  const inputClasses = twMerge(
    'border bg-white placeholder:text-dark-gray rounded focus:outline-none focus:border-focus-border focus:shadow-custom-blue w-full h-7 p-2',
    error
      ? 'border-error-border text-error-red'
      : 'border-input-border text-dark-gray'
  );

  const iconBaseClasses =
    'text-regular-blue hover:text-dark-blue absolute duration-300 cursor-pointer';

  return (
    <div
      className={twMerge(
        'relative z-20 ',
        isFile ? 'w-full' : 'w-3/5 lg:w-2/3'
      )}
    >
      <div
        className={twMerge(
          'group flex relative items-center',
          isFile && 'justify-end'
        )}
      >
        <input
          className={inputClasses}
          type="text"
          id={`${name}-${file.id}`}
          name={name}
          value={value || ''}
          onChange={handleChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onClick={(e) => e.stopPropagation()}
        />
        <IconValidate
          className={twMerge(
            iconBaseClasses,
            isFile ? 'right-1/2 top-[28px]' : 'right-[-28px] top-[3px]'
          )}
          onClick={(e) => {
            e.stopPropagation();
            validateName(file.id, file.filename);
          }}
        />
        <IconCrossCircle
          className={twMerge(
            iconBaseClasses,
            isFile ? 'right-[35px] top-[29px]' : 'right-[-52px] top-[3.5px]'
          )}
          onClick={(e) => {
            e.stopPropagation();
            toggleEditedFile(file.id);
          }}
        />
      </div>
      {error && (
        <span
          className={twMerge(
            'text-error-red absolute  w-[200px] text-sm',
            isFile ? 'top-14 ' : 'top-8'
          )}
        >
          {error}
        </span>
      )}
    </div>
  );
};

export default UpdateNameInput;
