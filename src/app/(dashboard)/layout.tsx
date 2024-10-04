'use client';
import Banner from '@/components/banner/Banner';
import React from 'react';

/**
 * MainLayout provides the main structure of the application, including the Banner, content section, and Modal.
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - Child components to render within the layout.
 * @returns {JSX.Element} The MainLayout component.
 */

const MainLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => (
  <div className="flex h-screen flex-col lg:flex-row">
    <Banner />
    <main className="relative flex size-full flex-col gap-10 overflow-y-auto pl-0 lg:pl-5">
      {children}
    </main>
  </div>
);

export default MainLayout;
