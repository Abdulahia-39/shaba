// components/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative w-16 h-16">
        <div className="absolute w-full h-full rounded-full border-4 border-gray-200 animate-spin-slow"></div>
        <div className="absolute w-full h-full rounded-full border-4 border-t-transparent border-t-4 border-green-500 animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400">
          
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;