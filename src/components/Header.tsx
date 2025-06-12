import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Q</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Interview Prep</h1>
              <p className="text-xs text-slate-500">Questions & Answers</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center space-x-4">
            <div className="text-sm text-slate-600">
              <span className="font-medium">Ace your next interview</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;