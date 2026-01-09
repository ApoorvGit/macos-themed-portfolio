import React from 'react';

interface IconProps {
  src: string;
  alt: string;
  className?: string;
}

export const MacIcon: React.FC<IconProps> = ({ src, alt, className = "w-full h-full" }) => {
  return (
    <img 
      src={src} 
      alt={alt} 
      className={className}
      style={{ 
        objectFit: 'contain',
        filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))'
      }}
      onError={(e) => {
        // Fallback if icon not found - show colored placeholder
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
        const parent = target.parentElement;
        if (parent) {
          parent.innerHTML = `
            <div class="w-full h-full rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              ${alt.charAt(0)}
            </div>
          `;
        }
      }}
    />
  );
};
