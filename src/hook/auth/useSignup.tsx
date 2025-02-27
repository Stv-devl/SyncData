import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { FormEvent, useCallback, useState } from 'react';
import * as Yup from 'yup';
import { signupValidationSchema } from '../../helpers/validationShema';
import postSignup from '../../service/postSignup';
import { FormDataSignUp, UseSignUpReturn } from '../../types/type';

/**
 * Custom hook for handling user sign-up functionality.
 * Manages form state, validates form data, and submits the sign-up request.
 * @returns {UseSignUpReturn} An object containing handleSubmit, handleChange, handleGoogleSignIn, formData, signupErrors, isLoading
 **/

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

  /**
   * Handles changes to form input fields
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event
   */
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setSignupErrors({ email: '', password: '', repeat: '' });
  }, []);

  /**
   * Handles validation and other errors during the signup process
   * @param {unknown} error - The error to handle
   */
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

  /**
   * Redirects user to home page after successful signup
   */
  const redirectToHome = () => {
    router.push('/home');
  };

  /**
   * Handles the form submission for user signup
   * @param {FormEvent<HTMLFormElement>} e - The form submission event
   * @returns {Promise<void>}
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signupValidationSchema.validate(formData, { abortEarly: false });

      const newUser = await postSignup(formData.email, formData.password);
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

  /**
   * Handles Google OAuth sign-in process
   * @returns {Promise<void>}
   */
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
