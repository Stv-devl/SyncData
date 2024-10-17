'use client';

import React, { useEffect } from 'react';
import '../../src/globals.css';
import { SessionProvider } from 'next-auth/react';
import Loading from '@/components/loading/Loading';
import { useUserStore } from '@/store/useUserStore';

/**
 * RootLayout component serves as the main layout wrapper for the application.
 * It sets up the HTML structure, including the `<html>`, `<head>`, and `<body>` tags,
 * and applies global styles. The component ensures that all child components are
 * @component
 * @param {Object} props - The properties passed to the RootLayout component.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The rendered RootLayout component containing the application's structure and styles.
 */

const RootLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => (
  <SessionProvider>
    <html lang="en">
      <head>
        <title>SyncData</title>
        <meta name="description" content="SyncData app" />
      </head>
      <body className="text-dark-gray bg-lightest-gray text- leading-12 flex h-screen w-screen max-w-[1950px] flex-col p-0 text-base sm:p-5">
        {children}
      </body>
    </html>
  </SessionProvider>
);

export default RootLayout;
