import React, { useEffect, useRef } from 'react';
import { Rnd } from 'react-rnd';
import { useWindowStore } from '../lib/window-manager';

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
  noTitleBar?: boolean;
}

export const Window: React.FC<WindowProps> = ({
  id,
  title,
  children,
  onClose,
  onMinimize,
  initialPosition = { x: 80, y: 80 },
  initialSize = { width: 720, height: 520 },
  noTitleBar = false,
}) => {
  const { focusWindow, moveWindow, resizeWindow, windows } = useWindowStore();
  const windowState = windows[id];
  const rndRef = useRef<Rnd>(null);

  useEffect(() => {
    // Focus this window on mount
    focusWindow(id);
  }, [id, focusWindow]);

  if (!windowState || windowState.isMinimized) {
    return null;
  }

  return (
    <Rnd
      ref={rndRef}
      default={{
        x: windowState.x || initialPosition.x,
        y: windowState.y || initialPosition.y,
        width: windowState.width || initialSize.width,
        height: windowState.height || initialSize.height,
      }}
      minWidth={400}
      minHeight={300}
      bounds="parent"
      dragHandleClassName="window-titlebar"
      style={{
        zIndex: windowState.zIndex,
      }}
      onDragStop={(_e, d) => {
        moveWindow(id, d.x, d.y);
      }}
      onResizeStop={(_e, _direction, ref, _delta, position) => {
        resizeWindow(id, parseInt(ref.style.width), parseInt(ref.style.height));
        moveWindow(id, position.x, position.y);
      }}
      onMouseDown={() => {
        if (!windowState.isFocused) {
          focusWindow(id);
        }
      }}
      className="animate-fade-in"
    >
      <div className="h-full flex flex-col rounded-[10px] shadow-2xl overflow-hidden bg-white/95 backdrop-blur-2xl border border-black/10">
        {/* Titlebar */}
        {!noTitleBar && (
          <div className="window-titlebar flex items-center justify-between px-3 py-2.5 bg-gradient-to-b from-white/80 to-white/60 backdrop-blur-xl select-none border-b border-gray-200/50">
            <div className="flex items-center gap-2">
              <button
                aria-label="Close"
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff4136] focus:outline-none border border-black/10 shadow-sm group relative"
              >
                <span className="absolute inset-0 flex items-center justify-center text-[8px] text-black/70 opacity-0 group-hover:opacity-100">✕</span>
              </button>
              <button
                aria-label="Minimize"
                onClick={onMinimize}
                className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffaa00] focus:outline-none border border-black/10 shadow-sm group relative"
              >
                <span className="absolute inset-0 flex items-center justify-center text-[8px] text-black/70 opacity-0 group-hover:opacity-100">−</span>
              </button>
              <button
                aria-label="Zoom"
                className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#00d14a] focus:outline-none border border-black/10 shadow-sm group relative"
              >
                <span className="absolute inset-0 flex items-center justify-center text-[8px] text-black/70 opacity-0 group-hover:opacity-100">+</span>
              </button>
            </div>
            <span className="font-semibold text-[13px] text-gray-700 tracking-tight">{title}</span>
            <div className="w-[52px]" />
          </div>
        )}
        
        {/* Content */}
        <div className={noTitleBar ? "flex-1 overflow-hidden" : "flex-1 overflow-auto custom-scrollbar p-6 bg-gradient-to-b from-white/90 to-white/95"}>
          {children}
        </div>
      </div>
    </Rnd>
  );
};
