import React, { useState } from 'react';

interface SafariBrowserProps {
  initialUrl?: string;
  children?: React.ReactNode;
  onClose?: () => void;
  onMinimize?: () => void;
}

export const SafariBrowser: React.FC<SafariBrowserProps> = ({ 
  initialUrl = 'https://blog.apoorv.dev',
  children,
  onClose,
  onMinimize
}) => {
  const [currentUrl, setCurrentUrl] = useState(initialUrl);
  
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Safari Toolbar with Window Controls */}
      <div className="window-titlebar flex items-center gap-3 px-3 py-2.5 bg-[#f6f6f6] border-b border-gray-300/80">
        {/* Window Controls */}
        <div className="flex gap-2">
          <button 
            onClick={onClose}
            className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff4136] transition-colors" 
            title="Close"
          />
          <button 
            onClick={onMinimize}
            className="w-3 h-3 rounded-full bg-[#febc2e] hover:bg-[#ffaa00] transition-colors" 
            title="Minimize"
          />
          <button 
            className="w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#00d14a] transition-colors" 
            title="Maximize"
          />
        </div>

        {/* Show Sidebar Icon */}
        <button 
          className="w-6 h-6 rounded hover:bg-gray-200/60 flex items-center justify-center transition-colors"
          title="Show Sidebar"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Back Button */}
        <button 
          className="w-6 h-6 rounded hover:bg-gray-200/60 flex items-center justify-center transition-colors"
          title="Back"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Forward Button */}
        <button 
          className="w-6 h-6 rounded hover:bg-gray-200/60 flex items-center justify-center transition-colors"
          title="Forward"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* URL Bar - Center, takes most space */}
        <div className="flex-1 flex items-center gap-2 bg-white rounded-md px-3 py-1.5 shadow-sm border border-gray-300/50 hover:border-gray-400/50 transition-colors">
          <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <input
            type="text"
            value={currentUrl}
            onChange={(e) => setCurrentUrl(e.target.value)}
            className="flex-1 text-[13px] text-gray-700 outline-none bg-transparent placeholder-gray-400"
            placeholder="Search or enter website name"
          />
          {/* Refresh Icon - Right corner of URL bar */}
          <button className="p-0.5 hover:bg-gray-100 rounded transition-colors" title="Refresh">
            <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>

        {/* Right Section: Share, Plus, Show Tab Overview */}
        <button 
          className="w-6 h-6 rounded hover:bg-gray-200/60 flex items-center justify-center transition-colors"
          title="Share"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
        </button>

        <button 
          className="w-6 h-6 rounded hover:bg-gray-200/60 flex items-center justify-center transition-colors"
          title="New Tab"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>

        <button 
          className="w-6 h-6 rounded hover:bg-gray-200/60 flex items-center justify-center transition-colors"
          title="Show Tab Overview"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
          </svg>
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto bg-white">
        {children}
      </div>
    </div>
  );
};
