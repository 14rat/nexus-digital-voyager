
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

interface TactileFeedbackButtonProps extends ButtonProps {
  feedbackType?: "bounce" | "pulse" | "scale";
  haptic?: boolean;
}

const TactileFeedbackButton: React.FC<TactileFeedbackButtonProps> = ({ 
  children, 
  className, 
  feedbackType = "bounce", 
  haptic = true,
  ...props 
}) => {
  const [isActive, setIsActive] = useState(false);
  
  // Dynamic classes based on feedback type
  const feedbackClasses = {
    bounce: "active:translate-y-1 active:shadow-inner transition-transform duration-150",
    pulse: "active:ring-4 active:ring-nexus-cyan/30 transition-all duration-150",
    scale: "active:scale-95 transition-transform duration-150"
  };

  const handleTouchStart = () => {
    setIsActive(true);
    
    // Haptic feedback using Vibration API if available and requested
    if (haptic && 'vibrate' in navigator) {
      navigator.vibrate(15); // Subtle 15ms vibration
    }
  };

  const handleTouchEnd = () => {
    setIsActive(false);
  };

  return (
    <Button
      className={cn(
        "transform will-change-transform", 
        feedbackClasses[feedbackType],
        className
      )}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
      onMouseLeave={() => isActive && setIsActive(false)}
      {...props}
    >
      {children}
    </Button>
  );
};

export default TactileFeedbackButton;
