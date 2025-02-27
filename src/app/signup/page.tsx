'use client';

import Link from 'next/link';
import React from 'react';
import Button from '../../components/button/Button';
import Input from '../../components/form/Input';
import useSignUp from '../../hook/auth/useSignup';
import Loading from '@/components/loading/Loading';
import { iconsMap } from '@/constantes/iconsMap';

/**
 * Signup page component
 * @returns The signup page component
 */

const SignUp = (): JSX.Element => {
  const {
    handleSubmit,
    handleChange,
    handleGoogleSignIn,
    formData,
    signupErrors,
    isLoading,
  } = useSignUp();

  return (
    <main>
      <section className="sm:bg-lightest-gray flex h-screen w-full flex-col bg-white sm:mt-5 ">
        <div className="sm:mt:0 mt-5 flex w-full flex-col items-center gap-[51px]  sm:px-0">
          <iconsMap.Iconlogo />
          <div className="flex w-full flex-col items-start gap-[40px] bg-white px-[5%] sm:w-[476px] sm:rounded-lg sm:p-[40px]">
            <div className="flex flex-col gap-[24px]">
              <h1 className="text-titleSmall sm:text-title text-darkest-blue">
                Create account
              </h1>
              <p>Let&apos;s get you started sharing your links!</p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col gap-[20px] "
            >
              <div className="input-wrapper">
                <Input
                  name="email"
                  label="Email address"
                  placeholder="Write your email"
                  type="text"
                  handleChange={handleChange}
                  value={formData.email}
                  error={signupErrors.email}
                  autoComplete={'email'}
                  IconComponent={iconsMap.Iconemail}
                />
              </div>
              <div className="input-wrapper">
                <Input
                  name="password"
                  label="Password"
                  placeholder="At least 8 characters"
                  type="password"
                  handleChange={handleChange}
                  value={formData.password}
                  error={signupErrors.password}
                  autoComplete={'new-password'}
                  IconComponent={iconsMap.Iconpassword}
                />
              </div>
              <div className="input-wrapper mb-2">
                <Input
                  name="repeat"
                  label="Confirm password"
                  placeholder="At least 8 characters"
                  type="password"
                  handleChange={handleChange}
                  value={formData.repeat}
                  error={signupErrors.repeat}
                  autoComplete={'new-password'}
                  IconComponent={iconsMap.Iconpassword}
                />
              </div>

              {isLoading && <Loading />}
              <div className="mt-4 h-[46px] w-full">
                <Button
                  label={'Create a new account'}
                  color={'full'}
                  type="submit"
                  disabled={isLoading}
                />
              </div>
              <div className="h-[46px] w-full">
                <Button
                  label={'Signup with Google'}
                  onClick={handleGoogleSignIn}
                  color={'empty'}
                  IconComponent={iconsMap.Icongoogle}
                  disabled={isLoading}
                />
              </div>
              <p className="px-[5%] text-center text-base sm:px-[10%] ">
                Already have an account?{' '}
                <Link href="/login">
                  <span className="text-darkest-blue font-semibold">Login</span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SignUp;
