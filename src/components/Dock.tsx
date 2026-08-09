import React, { useState } from "react";
import { useWindowStore } from "../lib/window-manager";

interface DockItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

interface DockProps {
  items: DockItem[];
}

export const Dock: React.FC<DockProps> = ({ items }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { windows, restoreWindow } = useWindowStore();

  const handleDockItemClick = (item: DockItem) => {
    const window = windows[item.id];
    if (window && window.isMinimized) {
      restoreWindow(item.id);
    } else {
      item.onClick();
    }
  };

  return (
    <div className="fixed bottom-1 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white/10 backdrop-blur-2xl rounded-[22px] px-2 py-1.5 shadow-2xl border border-white/20">
        <div className="flex items-end gap-1">
          {items.map((item) => {
            const isMinimized = windows[item.id]?.isMinimized;
            const isHovered = hoveredId === item.id;
            const scale = isHovered ? "scale-[1.4]" : "scale-100";

            return (
              <button
                key={item.id}
                onClick={() => handleDockItemClick(item)}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`relative transition-all duration-300 ease-out ${scale} hover:scale-[1.4] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-xl hover:-translate-y-2 group`}
                aria-label={item.label}
              >
                <div className="w-14 h-14 flex items-center justify-center drop-shadow-2xl">
                  {item.icon}
                </div>
                {isMinimized && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white/80 rounded-full shadow-lg" />
                )}
                {isHovered && (
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-900/95 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-lg shadow-xl border border-white/10">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
