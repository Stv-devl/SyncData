import { getCsrfToken } from 'next-auth/react';
import React from 'react';
import { convertBlobToFile } from '@/helpers/ConvertBlobToFile';
import { UserProfile } from '@/types/type';

/**
 * patchProfile function
 * @param {string} userId - The user ID
 * @param {   UserProfileFormData} updatedProfile - The updated profile
 * @returns {Promise<UpdateProfileResponse>} The response from the API
 */
const patchProfile = async (userId: string, updatedProfile: UserProfile) => {
  try {
    const csrfToken = await getCsrfToken();
    if (!csrfToken) {
      throw new Error('Could not retrieve CSRF token from NextAuth');
    }

    const profilFormData = new FormData();
    profilFormData.append('userId', userId);

    if (updatedProfile.firstname !== undefined) {
      profilFormData.append('firstname', updatedProfile.firstname);
    }
    if (updatedProfile.lastname !== undefined) {
      profilFormData.append('lastname', updatedProfile.lastname);
    }
    if (updatedProfile.email !== undefined) {
      profilFormData.append('email', updatedProfile.email);
    }

    let imageFile: File | null = null;

    if (updatedProfile.image) {
      const image = updatedProfile.image;

      if (typeof image === 'string' && image.startsWith('blob:')) {
        const convertedFile = await convertBlobToFile(
          image,
          'profile-image.png'
        );
        if (convertedFile) {
          imageFile = convertedFile;
        }
      }
    }
    if (imageFile) {
      profilFormData.append('image', imageFile);
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users?userId=${userId}`,
      {
        method: 'PATCH',
        body: profilFormData,
        headers: {
          'X-CSRF-Token': csrfToken,
        },
        credentials: 'include',
      }
    );

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Failed to update the profile: ${errorDetails}`);
    }
    const data = await response.json();
    console.log('Profile updated successfully:', data);
    return data.profile || data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export default patchProfile;
