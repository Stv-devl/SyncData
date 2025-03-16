import React from 'react';
import { ProfileWrapperProps } from '../../types/type';
import Input from '../form/Input';

/**
 * ProfileWrapper : input fields for firstname, lastname, email.
 */
const ProfileWrapper: React.FC<ProfileWrapperProps> = ({
  profile,
  handleChange,
  profilErrors,
}) => {
  const inputFields = [
    {
      name: 'firstname',
      label: 'First name : ',
      placeholder: 'e.g. John',
      autoComplete: 'given-name',
    },
    {
      name: 'lastname',
      label: 'Last name : ',
      placeholder: 'e.g. Appleseed',
      autoComplete: 'family-name',
    },
    {
      name: 'email',
      label: 'Email : ',
      placeholder: 'e.g. alex@email.com',
      autoComplete: 'email',
    },
  ];

  return (
    <div className="bg-background-white flex flex-col gap-3 rounded-lg p-5 lg:w-3/4">
      {inputFields.map((field) => (
        <div
          key={field.name}
          className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-10"
        >
          <Input
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            type="text"
            handleChange={handleChange}
            value={String(profile?.[field.name as keyof typeof profile] ?? '')}
            error={profilErrors[field.name]}
            autoComplete={field.autoComplete}
          />
        </div>
      ))}
    </div>
  );
};

export default ProfileWrapper;
