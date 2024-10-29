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
        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 
                   bg-gray-800 text-white text-sm rounded-lg shadow-lg 
                   transition-opacity duration-200 ease-in-out opacity-95 z-10 
                   whitespace-nowrap p-2 flex items-center space-x-1"
      >
        {/* Tooltip arrow */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 top-full 
                     w-2 h-2 bg-gray-800 rotate-45"
        ></div>
      
        {/* Tooltip icon (optional) */}
        <span className="text-gray-400">
       
        </span>
      
        {/* Tooltip content */}
        <span className="text-sm ">{text}</span>
      </div>
      
      )}
    </div>
  );
};

export default Tooltip;
