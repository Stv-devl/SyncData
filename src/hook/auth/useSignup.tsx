import { FormEvent, useCallback, useState } from 'react';
import apiSignup from '../../service/apiSignup';
import { FormDataSignUp, UseSignUpReturn } from '../../types/type';
import { useRouter } from 'next/navigation';
import { signupValidationSchema } from '../../utils/validationShema';
import * as Yup from 'yup';
import { signIn } from 'next-auth/react';

/**
 * Custom hook for handling user sign-up functionality.
 * Manages form state, validates form data, and submits the sign-up request.
 * @returns {UseSignUpReturn} An object containing:
 * - `handleSubmit`: Function to handle form submission for signing up a new user.
 * - `handleChange`: Function to handle changes to the form inputs.
 * - `formData`: The current state of the sign-up form data.
 * - `signupErrors`: An object containing any validation errors from the sign-up form.
 * - `isLoading`: A boolean indicating if a request is currently being processed.
 */

const useSignUp = (): UseSignUpReturn => {
  const [formData, setFormData] = useState<FormDataSignUp>({
    email: '',
    password: '',
    repeat: '',
  });

  const [signupErrors, setSignupErrors] = useState<FormDataSignUp>({
    email: '',
    password: '',
    repeat: '',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setSignupErrors({ email: '', password: '', repeat: '' });
  }, []);

  const handleError = (error: unknown) => {
    if (error instanceof Yup.ValidationError) {
      const fieldErrors = error.inner.reduce((acc, err) => {
        if (err.path) acc[err.path as keyof FormDataSignUp] = err.message;
        return acc;
      }, {} as FormDataSignUp);
      setSignupErrors(fieldErrors);
    } else {
      console.error('signup error:', error);
      setSignupErrors((prev) => ({
        ...prev,
        general: 'An error occur during signup',
      }));
    }
  };

  const redirectToHome = () => {
    router.push('/home');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signupValidationSchema.validate(formData, { abortEarly: false });

      const newUser = await apiSignup(formData.email, formData.password);
      console.log('Signup successful', newUser);

      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.ok) {
        redirectToHome();
      } else {
        console.error('Signup failed:', result?.error);
        setSignupErrors((prev) => ({
          ...prev,
          general: 'Signup process encountered an error',
        }));
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const result = await signIn('google', { callbackUrl: '/home' });
      if (result?.error) {
        setSignupErrors((prev) => ({
          ...prev,
          general: 'Signup with Google failed',
        }));
      } else {
        redirectToHome();
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleSubmit,
    handleChange,
    handleGoogleSignIn,
    formData,
    signupErrors,
    isLoading,
  };
};

export default useSignUp;
