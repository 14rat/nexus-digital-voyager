
import React, { ReactNode } from "react";

interface ScrollSnapContainerProps {
  children: ReactNode;
}

const ScrollSnapContainer: React.FC<ScrollSnapContainerProps> = ({ children }) => {
  return (
    <div className="scroll-snap-container h-screen overflow-y-scroll snap-y snap-mandatory">
      {children}
    </div>
  );
};

interface ScrollSnapSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const ScrollSnapSection: React.FC<ScrollSnapSectionProps> = ({ 
  children, 
  className = "", 
  id 
}) => {
  return (
    <section 
      id={id}
      className={`min-h-screen w-full snap-start flex flex-col items-center justify-center ${className}`}
    >
      {children}
    </section>
  );
};

export default ScrollSnapContainer;
