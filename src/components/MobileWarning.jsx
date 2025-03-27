import React from 'react';
import logo from '../public/logo.png';

const MobileWarning = () => {
  return (
    <div className="fixed inset-0 bg-gray-900 text-white flex items-center justify-center z-50 p-6 overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 scale-150 pointer-events-none">
        <img src={logo} className="w-50 h-50" />
      </div>
      
      {/* Content */}
      <div className="text-center relative z-10">
        <h1 className="text-2xl font-bold mb-4">Desktop Only</h1>
        <p className="text-lg">This website is not available on mobile devices. Please visit us on a desktop computer.</p>
      </div>
    </div>
  );
};

export default MobileWarning;