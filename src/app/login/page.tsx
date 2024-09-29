'use client';

import React from 'react';
import useLogin from '../../hook/auth/useLogin';
import Input from '../../components/input/Input';
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
      <section className="flex flex-col bg-white sm:bg-lightest-gray justify-center w-full h-screen">
        <div className="flex flex-col items-center gap-[51px] w-full px-[8%] sm:px-[0]">
          <div>
            <p className="text-title">Icone</p>
          </div>

          <div className="flex flex-col items-start gap-[40px] sm:p-[40px] sm:w-[476px] bg-white">
            <div className="flex flex-col gap-[24px]">
              <h1 className="text-titleSmall sm:text-title text-darkest-gray">
                Login
              </h1>
              <p>Add your details below to get back into the app</p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-[24px] w-full"
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
              <Button
                label={'Login'}
                color={'full'}
                type="submit"
                disabled={isLoading}
              />
              <Button
                label={'Login with Google'}
                onClick={handleGoogleSignIn}
                color={'empty'}
                IconComponent={icones.Icongoogle}
                disabled={isLoading}
              />
              <p className="text-base px-[5%] sm:px-[10%] text-center ">
                Don&apos;t have an account?{' '}
                <Link href="/signup">
                  <span className="font-semibold text-darkest-blue">
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
