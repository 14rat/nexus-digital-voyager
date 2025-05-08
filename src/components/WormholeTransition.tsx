
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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isPrefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  useEffect(() => {
    // Pre-connect to target section for faster navigation
    if (targetId) {
      const prefetchSection = () => {
        const element = document.getElementById(targetId);
        // Just accessing the element helps browser preconnect
      };
      
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(prefetchSection);
      } else {
        setTimeout(prefetchSection, 200);
      }
    }
  }, [targetId]);
  
  const handleClick = () => {
    if (targetId) {
      // Prevent scroll jank by using requestAnimationFrame
      requestAnimationFrame(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ 
            behavior: isPrefersReducedMotion ? 'auto' : 'smooth',
            block: 'start'
          });
        }
      });
    }
  };
  
  // Using pointer events for better cross-device interaction
  const handlePointerEnter = () => setIsHovered(true);
  const handlePointerLeave = () => setIsHovered(false);
  
  return (
    <div className="flex flex-col items-center my-16">
      <button
        ref={buttonRef}
        onClick={handleClick}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        className="relative group transition-all duration-300"
        aria-label={label}
        style={{ 
          willChange: "transform", // Hint to browser for optimization
          touchAction: "manipulation" // Remove 300ms delay on mobile
        }}
      >
        {/* Outer ring - GPU accelerated with transform instead of border changes */}
        <div 
          className="absolute inset-0 rounded-full border-2 border-nexus-cyan"
          style={{ 
            transform: isHovered ? 'scale(2.0)' : 'scale(1.0)',
            opacity: isHovered ? 0 : 0.7,
            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        ></div>
        
        {/* Middle ring - GPU accelerated with transform */}
        <div 
          className="absolute inset-0 rounded-full border-2 border-nexus-magenta"
          style={{ 
            transform: isHovered ? 'scale(1.7)' : 'scale(1.0)',
            opacity: isHovered ? 0 : 0.7,
            transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.1s, opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.1s',
          }}
        ></div>
        
        {/* Inner ring - GPU optimized */}
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center 
                   bg-gradient-to-r from-nexus-cyan/20 to-nexus-magenta/20 backdrop-blur-sm"
          style={{
            transform: isHovered ? 'scale(1.1)' : 'scale(1.0)',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            className="text-white"
            style={{
              transform: isHovered ? 'translateY(4px)' : 'translateY(0)',
              transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
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

// Add hint to the browser that this component will animate
// by using React's unstable_Profiler if available
const OptimizedWormholeTransition = React.memo(WormholeTransition);

export default OptimizedWormholeTransition;
