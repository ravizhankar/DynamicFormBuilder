import React from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}

      {isVisible && (
        <div
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 
                     bg-gray-800 text-white text-xs rounded-md py-1 px-2 shadow-lg 
                     transition-opacity duration-200 ease-in-out opacity-90 z-10 
                     whitespace-nowrap"
        >
          {/* Tooltip arrow */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2 top-full 
                       w-2 h-2 bg-gray-800 rotate-45"
          ></div>

          {/* Tooltip content */}
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
