'use client';

import React from 'react';
import useLogin from '../../hook/auth/useLogin';
import Input from '../../components/form/Input';
import Link from 'next/link';
import Button from '../../components/button/Button';
import Loading from '@/components/loading/Loading';
import { icones } from '../../constantes/constantes';

const Login = (): JSX.Element => {
  const {
    handleSubmit,
    handleChange,
    handleGoogleSignIn,
    formData,
    loginErrors,
    isLoading,
  } = useLogin();

  return (
    <main>
      <section className="sm:bg-lightest-gray flex h-screen w-full flex-col bg-white sm:justify-center">
        <div className="flex w-full flex-col items-center gap-[51px] px-[8%] sm:px-0">
          <icones.Iconlogo />
          <div className="flex flex-col items-start gap-[40px] bg-white sm:w-[476px] sm:p-[40px]">
            <div className="flex flex-col gap-[24px]">
              <h1 className="text-titleSmall sm:text-title text-darkest-blue">
                Login
              </h1>
              <p>Add your details below to get back into the app</p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col gap-[24px]"
            >
              <div className="flex flex-col gap-[24px]">
                <div className="flex flex-col gap-1">
                  <Input
                    name="email"
                    label="Email address"
                    placeholder="Write your email"
                    type="text"
                    handleChange={handleChange}
                    value={formData.email}
                    error={loginErrors.email}
                    autoComplete={'email'}
                    IconComponent={icones.Iconemail}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Input
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    handleChange={handleChange}
                    value={formData.password}
                    error={loginErrors.password}
                    autoComplete={'current-password'}
                    IconComponent={icones.Iconpassword}
                  />
                </div>
              </div>
              {loginErrors.general && (
                <p className="text-red-500">{loginErrors.general}</p>
              )}
              {isLoading && <Loading />}
              <div className="h-[46px] w-full">
                <Button
                  label={'Login'}
                  color={'full'}
                  type="submit"
                  disabled={isLoading}
                />
              </div>
              <div className="h-[46px] w-full">
                <Button
                  label={'Login with Google'}
                  onClick={handleGoogleSignIn}
                  color={'empty'}
                  IconComponent={icones.Icongoogle}
                  disabled={isLoading}
                />
              </div>
              <p className="px-[5%] text-center text-base sm:px-[10%] ">
                Don&apos;t have an account?{' '}
                <Link href="/signup">
                  <span className="text-darkest-blue font-semibold">
                    Create account
                  </span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
