'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { FormDataLogin, UseLoginReturn } from '../../types/type';
import { loginSchema } from '../../utils/validationShema';
import * as Yup from 'yup';

const useLogin = (): UseLoginReturn => {
  const [formData, setFormData] = useState<FormDataLogin>({
    email: '',
    password: '',
  });

  const [loginErrors, setLoginErrors] = useState<FormDataLogin>({
    email: '',
    password: '',
    general: '',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setLoginErrors({ email: '', password: '', general: '' });
  };

  const redirectToHome = () => {
    router.push('/home');
  };

  const handleError = (error: unknown) => {
    if (error instanceof Yup.ValidationError) {
      const fieldErrors = error.inner.reduce((acc, err) => {
        if (err.path) acc[err.path as keyof FormDataLogin] = err.message;
        return acc;
      }, {} as FormDataLogin);
      setLoginErrors(fieldErrors);
    } else {
      console.error('Login failed:', error);
      setLoginErrors((prev) => ({ ...prev, general: 'Failed to log in' }));
    }
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await loginSchema.validate(formData, { abortEarly: false });

      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        setLoginErrors((prev) => ({
          ...prev,
          general: result.error || 'Failed to log in',
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

  const handleGoogleSignIn = async (): Promise<void> => {
    setIsLoading(true);

    try {
      const result = await signIn('google', { callbackUrl: '/home' });
      if (result?.error) {
        setLoginErrors((prev) => ({
          ...prev,
          general: result.error || 'Failed to log in with Google',
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
    loginErrors,
    isLoading,
  };
};

export default useLogin;
