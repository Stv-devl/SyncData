'use client';

import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
  useRef,
} from 'react';
import * as Yup from 'yup';
import { profileValidationSchema } from '../../helpers/validationShema';
import { useUserStore } from '../../store/useUserStore';
import { ProfileErrors, UserProfile } from '@/types/type';

const useManageProfile = () => {
  const { profile, updateProfile } = useUserStore();
  const initialProfile = useRef(profile);

  const [localProfile, setLocalProfile] = useState<UserProfile>(
    profile ?? { firstname: '', lastname: '', email: '', image: null }
  );
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    profile?.image ? String(profile.image) : null
  );

  const [profilErrors, setProfilErrors] = useState<ProfileErrors>({
    firstname: '',
    lastname: '',
    email: '',
    changed: '',
  });

  useEffect(() => {
    if (profile) {
      setLocalProfile(profile);
      initialProfile.current = profile;
      if (typeof profile.image === 'string') {
        setImagePreview(profile.image);
      }
    }
  }, [profile]);

  /**
   * Handles input field changes (firstname, lastname, email)
   */
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLocalProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  /**
   * Handles image selection and sets preview
   */
  const handleImageChange = useCallback((selectedFile: File) => {
    setFile(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile));
  }, []);

  /**
   * Extracts only the modified fields
   */
  const getUpdatedFields = useCallback(() => {
    return {
      firstname: localProfile.firstname?.trim() ?? '',
      lastname: localProfile.lastname?.trim() ?? '',
      email: localProfile.email?.trim() ?? '',
      image: file ? imagePreview ?? null : localProfile.image ?? null,
    };
  }, [localProfile, file, imagePreview]);

  /**
   * Filters unchanged fields
   */
  const filterUnchangedFields = (updatedFields: Partial<UserProfile>) => {
    return Object.fromEntries(
      Object.entries(updatedFields).filter(
        ([key, value]) =>
          value !== initialProfile.current?.[key as keyof UserProfile]
      )
    );
  };

  /**
   * Handles form submission
   */
  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setProfilErrors({
        firstname: '',
        lastname: '',
        email: '',
        changed: '',
      });

      const updatedFields = getUpdatedFields();
      const finalUpdatedFields = filterUnchangedFields(updatedFields);

      if (
        Object.keys(finalUpdatedFields).length === 0 &&
        initialProfile.current?.firstname &&
        initialProfile.current?.lastname &&
        initialProfile.current?.email
      ) {
        setProfilErrors((prev) => ({
          ...prev,
          changed: 'You must make some changes',
        }));
        return;
      }

      try {
        await profileValidationSchema.validate(updatedFields, {
          abortEarly: false,
        });

        updateProfile(finalUpdatedFields as UserProfile);
        initialProfile.current = {
          ...initialProfile.current,
          ...finalUpdatedFields,
        } as UserProfile;
        setFile(null);
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          setProfilErrors(
            error.inner.reduce(
              (acc: ProfileErrors, err) => {
                if (err.path)
                  acc[err.path as keyof ProfileErrors] = err.message;
                return acc;
              },
              { firstname: '', lastname: '', email: '', changed: '' }
            )
          );
        }
      }
    },
    [updateProfile, getUpdatedFields]
  );

  return {
    localProfile,
    imagePreview,
    profilErrors,
    handleChange,
    handleImageChange,
    handleSubmit,
  };
};

export default useManageProfile;
