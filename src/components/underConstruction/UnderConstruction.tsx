import React from 'react';

const UnderConstruction = () => {
  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-24 lg:justify-center lg:pt-0">
      <h1 className="mb-4 text-center text-2xl font-bold text-gray-800 sm:text-3xl md:text-4xl">
        This page is under construction
      </h1>
      <p className="text-center text-base text-gray-600 sm:text-lg md:text-xl">
        Please check back later!
      </p>
    </div>
  );
};

export default UnderConstruction;
