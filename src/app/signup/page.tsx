'use client';

import React from 'react';
import Link from 'next/link';
import useSignUp from '../../hook/auth/useSignup';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import Loading from '@/components/loading/Loading';
import { icones } from '@/constantes/constantes';

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
      <section className="flex flex-col bg-white sm:bg-lightest-gray sm:justify-center w-full h-screen">
        <div className="flex flex-col items-center gap-[51px] w-full px-[5%] sm:px-[0]">
          <icones.Iconlogo />
          <div className="flex flex-col items-start gap-[40px] sm:p-[40px] sm:w-[476px] bg-white">
            <div className="flex flex-col gap-[24px]">
              <h1 className="text-titleSmall sm:text-title text-darkest-blued">
                Create account
              </h1>
              <p>Let&apos;s get you started sharing your links!</p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-[20px] w-full "
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
                  IconComponent={icones.Iconemail}
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
                  IconComponent={icones.Iconpassword}
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
                  IconComponent={icones.Iconpassword}
                />
              </div>

              {isLoading && <Loading />}
              <Button
                label={'Create a new account'}
                color={'full'}
                type="submit"
                disabled={isLoading}
              />
              <Button
                label={'Signup with Google'}
                onClick={handleGoogleSignIn}
                color={'empty'}
                IconComponent={icones.Icongoogle}
                disabled={isLoading}
              />
              <p className="text-base px-[5%] sm:px-[10%] text-center ">
                Already have an account?{' '}
                <Link href="/login">
                  <span className="text-dark-purple">Login</span>
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
