import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallpaper } from '../components/Wallpaper';
import { LOCK_PASSWORD } from '../lib/constants';
import { trapFocus } from '../lib/keyboard';

export const LockPage: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [showUnlock, setShowUnlock] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (showUnlock && dialogRef.current) {
      const cleanup = trapFocus(dialogRef.current);
      inputRef.current?.focus();
      return cleanup;
    }
  }, [showUnlock]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleUnlock = () => {
    if (password === LOCK_PASSWORD) {
      sessionStorage.setItem('unlocked', 'true');
      navigate('/desktop');
    } else {
      setError(true);
      setPassword('');
      setTimeout(() => setError(false), 500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleUnlock();
    } else if (e.key === 'Escape') {
      setShowUnlock(false);
      setPassword('');
      setError(false);
    }
  };

  return (
    <Wallpaper>
      <div className="w-full h-full flex flex-col text-white animate-fade-in">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-44 h-8 bg-black rounded-b-2xl z-50 shadow-lg">
          {/* Camera dot */}
          <div className="absolute top-2.5 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-blue-900 rounded-full"></div>
        </div>

        {/* Date and Time at Top */}
        <div className="text-center pt-16">
          <p className="text-2xl font-semibold tracking-wide drop-shadow-md mb-2">{formatDate(time)}</p>
          <h1 className="text-8xl font-semibold tracking-tight drop-shadow-lg">{formatTime(time)}</h1>
        </div>

        {/* User Profile and Login - Bottom Center */}
        <div className="flex-1 flex items-end justify-center pb-32">
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => !showUnlock && setShowUnlock(true)}
          >
            {/* Profile Picture */}
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 mb-6 flex items-center justify-center shadow-xl">
              <svg className="w-12 h-12 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>

            {!showUnlock ? (
              <>
                {/* Username */}
                <h2 className="text-2xl font-medium mb-3 drop-shadow-md">Apoorv Mishra</h2>
                {/* Touch ID prompt */}
                <p className="text-sm font-light opacity-60 drop-shadow-md">Touch ID or Enter Password</p>
              </>
            ) : (
              <div
                ref={dialogRef}
                role="dialog"
                aria-labelledby="unlock-title"
                className="flex flex-col items-center"
              >
                {/* Password Input */}
                <input
                  ref={inputRef}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className={`w-48 px-3 py-1 rounded-full bg-white/30 backdrop-blur-xl border ${
                    error ? 'border-red-400/30' : 'border-white/10'
                  } text-white text-center placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/20 mb-2 text-sm font-medium shadow-xl ${
                    error ? 'animate-shake' : ''
                  }`}
                  placeholder="Enter Password"
                  aria-label="Password input"
                  aria-invalid={error}
                />
                
                {error && (
                  <p className="text-red-200 text-sm font-medium drop-shadow-md" role="alert">
                    Incorrect password
                  </p>
                )}
                
                <p className="text-xs opacity-70 mt-4 drop-shadow-md">
                  Hint: What sound does a cat make?
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Wallpaper>
  );
};
