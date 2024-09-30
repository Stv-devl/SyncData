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
  <main className="w-full h-full p-5">
    <Banner />
    <section className="w-full h-full ">{children}</section>
  </main>
);

export default MainLayout;
