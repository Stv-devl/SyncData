import React from 'react';
import '../../src/globals.css';
import SessionWrapper from '@/context/sessionWrappers';

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
  <html lang="en">
    <head>
      <title>SyncData</title>
      <meta name="description" content="SyncData app" />
    </head>
    <body className="text- leading-12 flex h-screen w-screen max-w-[1950px] flex-col bg-lightest-gray p-0 text-base text-dark-gray sm:p-5">
      <SessionWrapper>{children}</SessionWrapper>
    </body>
  </html>
);

export default RootLayout;
