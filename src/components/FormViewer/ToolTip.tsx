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
                     bg-gray-500 text-white text-sm rounded-lg shadow-lg 
                     transition-opacity duration-200 ease-in-out opacity-95 z-10 
                     whitespace-nowrap p-2 flex items-center space-x-1"
        >
          {/* Tooltip icon (optional) */}
          <span className="text-gray-200">
            {/* You can add an icon here if needed, for example: */}
            {/* <FontAwesomeIcon icon={faInfoCircle} /> */}
          </span>

          {/* Tooltip content */}
          <span className="">{text}</span>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
