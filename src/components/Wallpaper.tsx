import React from "react";

interface WallpaperProps {
  src?: string;
  children?: React.ReactNode;
}

export const Wallpaper: React.FC<WallpaperProps> = ({ src, children }) => {
  // macOS Monterey-style wallpaper gradient
  const defaultGradient =
    "linear-gradient(135deg, #1e3a8a 0%, #6366f1 25%, #8b5cf6 50%, #ec4899 75%, #f97316 100%)";

  return (
    <div
      className="w-full h-full bg-cover bg-center bg-no-repeat relative"
      style={{
        background: src ? `url(${src})` : defaultGradient,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {children}
    </div>
  );
};
