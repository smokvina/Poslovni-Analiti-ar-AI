
import React from 'react';
import { SparkIcon } from './icons/SparkIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center gap-3">
        <SparkIcon className="w-8 h-8 text-brand-primary" />
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Poslovni Analitičar <span className="text-brand-primary">AI</span>
        </h1>
      </div>
    </header>
  );
};

export default Header;
