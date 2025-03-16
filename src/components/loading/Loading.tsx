import React from 'react';
/**
 * The component is a loader who is active when we waiting for'data'
 * @returns {JSX.Element} A rotating loading circle.
 */

const Loading = (): JSX.Element => {
  return (
    <div className="min-h-100vh z-11 left-0 top-0 my-auto flex w-full items-center justify-center bg-slate-400 opacity-30">
      <span className="border-dark-blue absolute top-[40vh] mx-auto size-[60px] animate-spin rounded-full border-[10px] border-t-gray-200"></span>
    </div>
  );
};

export default Loading;
