'use client';

import React from 'react';
import ProfilePictureWrapper from '../../../components/profile/PictureWrapper';
import ProfileWrapper from '../../../components/profile/ProfileWrapper';
import Button from '@/components/button/Button';
import SuscriptionWrapper from '@/components/profile/SubscriptionWrapper';
import useManageProfile from '@/hook/manage/useManageProfile';

const Profile: React.FC = () => {
  const {
    localProfile,
    imagePreview,
    profilErrors,
    handleChange,
    handleImageChange,
    handleSubmit,
  } = useManageProfile();

  return (
    <div className="space-between flex size-full flex-col bg-white p-6 sm:max-w-screen-lg sm:rounded-lg sm:p-12">
      <h1 className="text-titleSmall sm:text-title text-darkest-blue mb-4">
        Update your profile :
      </h1>
      <p className="mb-6">
        Add your details to create a personal touch to your profile.
      </p>
      <form onSubmit={handleSubmit} className="relative">
        <div className="bg-lightest-gray mb-6 rounded-lg">
          <ProfilePictureWrapper
            imagePreview={imagePreview}
            handleImageChange={handleImageChange}
          />
        </div>
        <div className="bg-lightest-gray mb-6 rounded-lg">
          <ProfileWrapper
            profile={localProfile}
            handleChange={handleChange}
            profilErrors={profilErrors}
          />
        </div>
        {profilErrors.changed && (
          <span className="text-error-red flex justify-center">
            {profilErrors.changed}
          </span>
        )}
        <div className="mb-6 flex w-full justify-end border-b">
          <div className="mb-6 h-[40px] w-1/2 sm:w-[100px]">
            <Button label="Edit" type="submit" />
          </div>
        </div>
      </form>
      <div className="bg-lightest-gray mb-6 flex flex-col rounded-lg p-6">
        <SuscriptionWrapper />
      </div>
    </div>
  );
};

export default Profile;
