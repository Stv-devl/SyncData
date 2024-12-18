'use client';
import clsx from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import IconCrossCircle from '@/icones/IconCrossCircle';
import IconValidate from '@/icones/IconValidate';
import { ChangeNameProps } from '@/types/type';

const UpdateNameInput: React.FC<ChangeNameProps> = ({
  file,
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
    clsx(
      error
        ? 'border-error-border text-error-red'
        : 'border-input-border text-dark-gray'
    )
  );

  return (
    <div className="relative w-3/5 lg:w-2/3">
      <div className="group flex">
        <input
          className={inputClasses}
          type="text"
          id={name}
          name={name}
          value={value || ''}
          onChange={handleChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
        <IconValidate
          className=" text-regular-blue hover:text-dark-blue absolute right-[-25px] top-[3px] duration-300"
          onClick={() => validateName(file.id, file.filename)}
        />
        <IconCrossCircle
          className="text-regular-blue hover:text-dark-blue absolute right-[-45px] top-[3.5px] duration-300"
          onClick={() => toggleEditedFile(file.id)}
        />
      </div>
      {error && (
        <span className="text-error-red relative right-0 top-auto transform-none sm:absolute sm:right-3 sm:top-1/2 sm:-translate-y-1/2">
          {error}
        </span>
      )}
    </div>
  );
};

export default UpdateNameInput;
