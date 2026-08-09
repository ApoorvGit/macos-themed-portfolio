import React, { useState, useEffect } from "react";

export const MenuBar: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="relative h-10 bg-black/30 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4 text-sm text-white/90 select-none shadow-sm">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-44 h-8 bg-black rounded-b-2xl z-50 shadow-lg">
        {/* Camera dot */}
        <div className="absolute top-2.5 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-blue-900 rounded-full"></div>
      </div>

      {/* Left side - App menu */}
      <div className="flex items-center gap-2">
        <button className="hover:bg-white/10 px-2 py-1 rounded-sm transition-colors font-semibold text-base mr-1">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.94 5.19A4.38 4.38 0 0 0 16 2a4.44 4.44 0 0 0-3 1.52 4.17 4.17 0 0 0-1 3.09 3.69 3.69 0 0 0 2.94-1.42zm2.52 7.44a4.51 4.51 0 0 1 2.16-3.81 4.66 4.66 0 0 0-3.66-2c-1.56-.16-3 .91-3.83.91s-2-.89-3.3-.87A4.92 4.92 0 0 0 4.69 9.39C2.93 12.45 4.24 17 6 19.47c.8 1.21 1.8 2.58 3.12 2.53s1.75-.82 3.28-.82 2 .82 3.3.79 2.22-1.24 3.06-2.45a11 11 0 0 0 1.38-2.85 4.41 4.41 0 0 1-2.68-4.08z" />
          </svg>
        </button>
        <div className="flex gap-1">
          <button className="hover:bg-white/10 px-2.5 py-1 rounded-sm transition-colors font-medium">
            Portfolio
          </button>
          <button className="hover:bg-white/10 px-2.5 py-1 rounded-sm transition-colors">
            File
          </button>
          <button className="hover:bg-white/10 px-2.5 py-1 rounded-sm transition-colors">
            Edit
          </button>
          <button className="hover:bg-white/10 px-2.5 py-1 rounded-sm transition-colors">
            View
          </button>
          <button className="hover:bg-white/10 px-2.5 py-1 rounded-sm transition-colors">
            Window
          </button>
          <button className="hover:bg-white/10 px-2.5 py-1 rounded-sm transition-colors">
            Help
          </button>
        </div>
      </div>

      {/* Right side - Status items */}
      <div className="flex items-center gap-4">
        <button className="hover:bg-white/10 px-2 py-1 rounded-sm transition-colors">
          <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button className="hover:bg-white/10 px-2 py-1 rounded-sm transition-colors">
          <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button className="hover:bg-white/10 px-2 py-1 rounded-sm transition-colors">
          <svg
            className="w-4.5 h-4.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </button>
        <div className="flex items-center gap-2 font-medium">
          <span className="text-[13px]">{formatDate(time)}</span>
          <span>{formatTime(time)}</span>
        </div>
      </div>
    </div>
  );
};
