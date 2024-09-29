'use client';
import React from 'react';
/**
 * The component is a loader who is active when we waiting for'data'
 * @returns {JSX.Element} A rotating loading circle.
 */

const Loading = (): JSX.Element => {
  return (
    <div className="flex items-center justify-center min-h-100vh w-full z-11 top-0 left-0 bg-slate-400 opacity-30 my-auto">
      <span className="absolute top-[40vh] border-[10px] border-dark-blue border-t-gray-200 rounded-full mx-auto w-[60px] h-[60px] animate-spin"></span>
    </div>
  );
};

export default Loading;
