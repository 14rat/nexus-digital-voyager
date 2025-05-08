
import React, { useEffect, useRef, useState } from "react";

interface WormholeTransitionProps {
  targetId?: string;
  label?: string;
}

const WormholeTransition: React.FC<WormholeTransitionProps> = ({ 
  targetId = "", 
  label = "Próxima Seção" 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleClick = () => {
    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  return (
    <div className="flex flex-col items-center my-16">
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative group transition-all duration-300"
        aria-label={label}
      >
        {/* Outer ring */}
        <div 
          className={`absolute inset-0 rounded-full border-2 transition-all duration-500
                     ${isHovered ? 'border-nexus-magenta scale-[2.0] opacity-0' : 'border-nexus-cyan scale-100 opacity-70'}`}
        ></div>
        
        {/* Middle ring */}
        <div 
          className={`absolute inset-0 rounded-full border-2 transition-all duration-700 delay-100
                     ${isHovered ? 'border-nexus-blue scale-[1.7] opacity-0' : 'border-nexus-magenta scale-100 opacity-70'}`}
        ></div>
        
        {/* Inner ring */}
        <div 
          className={`w-16 h-16 rounded-full flex items-center justify-center 
                     bg-gradient-to-r from-nexus-cyan/20 to-nexus-magenta/20 backdrop-blur-sm
                     transition-all duration-300 
                     ${isHovered ? 'transform scale-110' : ''}`}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            className={`text-white transition-transform duration-300 ${isHovered ? 'transform translate-y-1' : ''}`}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </div>
      </button>
      
      <p className="mt-4 text-sm text-gray-400">{label}</p>
    </div>
  );
};

export default WormholeTransition;
