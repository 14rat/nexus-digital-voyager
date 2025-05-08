
import React from "react";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";

type NeonButtonVariant = "cyan" | "magenta";

interface NeonButtonProps extends ButtonProps {
  neonVariant?: NeonButtonVariant;
  withArrow?: boolean;
}

const NeonButton: React.FC<NeonButtonProps> = ({ 
  children, 
  className, 
  neonVariant = "cyan", 
  withArrow = false,
  ...props 
}) => {
  const neonClass = neonVariant === "cyan" 
    ? "bg-nexus-cyan/10 text-nexus-cyan hover:bg-nexus-cyan/20 box-neon-cyan"
    : "bg-nexus-magenta/10 text-nexus-magenta hover:bg-nexus-magenta/20 box-neon-magenta";

  return (
    <Button
      className={cn(
        "relative overflow-hidden border border-opacity-50 transition-all duration-300", 
        neonClass,
        "backdrop-blur-sm",
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {withArrow && (
          <svg 
            className="w-4 h-4 transition-transform duration-300 transform group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M14 5l7 7m0 0l-7 7m7-7H3" 
            />
          </svg>
        )}
      </span>
    </Button>
  );
};

export default NeonButton;
