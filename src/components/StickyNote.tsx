import React, { useState, useRef, useEffect } from "react";

interface Link {
  text: string;
  url: string;
}

interface StickyNoteProps {
  initialX: number;
  initialY: number;
  initialWidth?: number;
  initialHeight?: number;
  color: "yellow" | "pink" | "green" | "blue" | "purple";
  content: string;
  links?: Link[];
  onClose?: () => void;
}

const colorClasses = {
  yellow: {
    bg: "bg-yellow-100",
    topBar: "bg-yellow-200/80",
    button: "bg-yellow-400/60 border-yellow-500/30",
  },
  pink: {
    bg: "bg-pink-100",
    topBar: "bg-pink-200/80",
    button: "bg-pink-400/60 border-pink-500/30",
  },
  green: {
    bg: "bg-green-100",
    topBar: "bg-green-200/80",
    button: "bg-green-400/60 border-green-500/30",
  },
  blue: {
    bg: "bg-blue-100",
    topBar: "bg-blue-200/80",
    button: "bg-blue-400/60 border-blue-500/30",
  },
  purple: {
    bg: "bg-purple-100",
    topBar: "bg-purple-200/80",
    button: "bg-purple-400/60 border-purple-500/30",
  },
};

export const StickyNote: React.FC<StickyNoteProps> = ({
  initialX,
  initialY,
  initialWidth = 250,
  initialHeight = 250,
  color,
  content,
  links = [],
  onClose,
}) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [size, setSize] = useState({
    width: initialWidth,
    height: initialHeight,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [preZoomState, setPreZoomState] = useState({
    width: initialWidth,
    height: initialHeight,
    x: initialX,
    y: initialY,
  });
  const noteRef = useRef<HTMLDivElement>(null);

  const colors = colorClasses[color];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      } else if (isResizing) {
        const newWidth = Math.max(200, e.clientX - position.x);
        const newHeight = Math.max(150, e.clientY - position.y);
        setSize({ width: newWidth, height: newHeight });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragOffset, position]);

  const handleTopBarMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Don't start dragging if clicking on buttons or their parent container
    if (
      target.closest(".sticky-button") ||
      target.classList.contains("sticky-button")
    ) {
      return;
    }

    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClose) onClose();
  };

  const handleCollapse = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsCollapsed(!isCollapsed);
  };

  const handleZoom = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isZoomed) {
      // Restore to previous size and position
      setSize({ width: preZoomState.width, height: preZoomState.height });
      setPosition({ x: preZoomState.x, y: preZoomState.y });
      setIsZoomed(false);
    } else {
      // Save current size and position
      setPreZoomState({ ...size, ...position });

      // Calculate zoom size
      const targetWidth = 500;
      const targetHeight = 500;

      // Check if the note is on the right side of the screen
      const isOnRightSide = position.x > window.innerWidth / 2;

      if (isOnRightSide) {
        // Expand towards the left
        const newX = Math.max(40, position.x + size.width - targetWidth);
        setPosition({ x: newX, y: position.y });
      }

      // Set the new size (keeping within viewport)
      const maxWidth = Math.min(targetWidth, window.innerWidth - 80);
      const maxHeight = Math.min(
        targetHeight,
        window.innerHeight - position.y - 40,
      );
      setSize({ width: maxWidth, height: maxHeight });
      setIsZoomed(true);
    }
  };

  return (
    <div
      ref={noteRef}
      className={`absolute ${colors.bg} shadow-lg rounded-md overflow-hidden select-none`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: isCollapsed ? "auto" : `${size.height}px`,
        cursor: isDragging ? "grabbing" : "default",
      }}
    >
      {/* Top Bar */}
      <div
        className={`h-5 ${colors.topBar} flex items-center justify-between px-2 cursor-grab active:cursor-grabbing`}
        onMouseDown={handleTopBarMouseDown}
      >
        <div className="flex items-center gap-1.5">
          {/* Close button - square */}
          <button
            className={`sticky-button w-2.5 h-2.5 ${colors.button} border hover:opacity-80 transition-opacity`}
            onMouseDown={handleClose}
            title="Close"
          />
        </div>
        <div className="flex items-center gap-1.5">
          {/* Zoom button - right-angled triangle */}
          <button
            className="sticky-button relative w-2.5 h-2.5 hover:opacity-80 transition-opacity"
            onMouseDown={handleZoom}
            title={isZoomed ? "Restore" : "Zoom"}
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              className="absolute top-0 left-0"
            >
              <path
                d="M 0 10 L 10 10 L 10 0 Z"
                fill={
                  colors.button.includes("yellow")
                    ? "rgba(251, 191, 36, 0.6)"
                    : colors.button.includes("pink")
                      ? "rgba(244, 114, 182, 0.6)"
                      : colors.button.includes("green")
                        ? "rgba(74, 222, 128, 0.6)"
                        : colors.button.includes("blue")
                          ? "rgba(96, 165, 250, 0.6)"
                          : "rgba(192, 132, 252, 0.6)"
                }
              />
            </svg>
          </button>
          {/* Collapse button */}
          <button
            className={`sticky-button w-4 h-1.5 ${colors.button} hover:opacity-80 transition-opacity`}
            onMouseDown={handleCollapse}
            title={isCollapsed ? "Expand" : "Collapse"}
          />
        </div>
      </div>

      {/* Content */}
      {!isCollapsed && (
        <div
          className="p-4 overflow-auto"
          style={{ height: `calc(${size.height}px - 20px)` }}
        >
          <div className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap font-sans">
            {content.split("\n").map((line, index) => {
              // Check if this line contains a link
              const link = links.find((l) => line.includes(l.text));
              if (link) {
                const parts = line.split(link.text);
                return (
                  <div key={index}>
                    {parts[0]}
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {link.text}
                    </a>
                    {parts[1]}
                  </div>
                );
              }
              // Handle empty lines to preserve spacing
              return <div key={index}>{line || "\u00A0"}</div>;
            })}
          </div>
        </div>
      )}

      {/* Resize Handle */}
      {!isCollapsed && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize"
          onMouseDown={handleResizeMouseDown}
          title="Resize"
        >
          <svg
            className="w-full h-full text-gray-400 opacity-50"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path
              d="M14 14L14 10M14 14L10 14M14 14L8 8M14 6L6 14"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      )}
    </div>
  );
};
