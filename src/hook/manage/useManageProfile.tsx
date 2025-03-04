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
import useModalStore from '@/store/ui/useModale';
import { ProfileErrors, UserProfile } from '@/types/type';

const useManageProfile = () => {
  const { profile, updateProfile } = useUserStore();

  const initialProfile = useRef(profile);
  const [localProfile, setLocalProfile] = useState(profile);
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
    setLocalProfile((prev) =>
      prev ? { ...prev, [e.target.name]: e.target.value } : null
    );
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
    if (!initialProfile.current || !localProfile) return {};

    const updatedFields: Partial<UserProfile> = {};

    if (localProfile.firstname !== initialProfile.current.firstname)
      updatedFields.firstname = localProfile.firstname;

    if (localProfile.lastname !== initialProfile.current.lastname)
      updatedFields.lastname = localProfile.lastname;

    if (localProfile.email !== initialProfile.current.email)
      updatedFields.email = localProfile.email;

    if (file) updatedFields.image = imagePreview;

    return updatedFields;
  }, [localProfile, file, imagePreview]);

  /**
   * Checks if profile data has changed
   */
  const hasChanges = useMemo(() => {
    return Object.keys(getUpdatedFields()).length > 0;
  }, [getUpdatedFields]);

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

      if (!hasChanges) {
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

        updateProfile(updatedFields as UserProfile);

        initialProfile.current = {
          ...initialProfile.current,
          ...updatedFields,
        } as UserProfile;
        setFile(null);

        console.log('Profil mis à jour:', updatedFields);
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = error.inner.reduce(
            (acc: ProfileErrors, err) => {
              if (err.path) acc[err.path as keyof ProfileErrors] = err.message;
              return acc;
            },
            { firstname: '', lastname: '', email: '', changed: '' }
          );

          setProfilErrors(errors);
          console.log('Erreurs de validation:', errors);
        }
      }
    },
    [hasChanges, getUpdatedFields, updateProfile]
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
