
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

interface TactileFeedbackButtonProps extends ButtonProps {
  feedbackType?: "bounce" | "pulse" | "scale" | "depth" | "glow";
  haptic?: boolean;
  intensity?: "light" | "medium" | "strong";
  color?: "cyan" | "magenta" | "gradient";
}

const TactileFeedbackButton: React.FC<TactileFeedbackButtonProps> = ({ 
  children, 
  className, 
  feedbackType = "bounce", 
  haptic = true,
  intensity = "medium",
  color = "cyan",
  ...props 
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Dynamic classes based on feedback type
  const feedbackClasses = {
    bounce: "active:translate-y-1 active:shadow-inner transition-transform duration-150",
    pulse: "active:ring-4 active:ring-nexus-cyan/30 transition-all duration-150",
    scale: "active:scale-95 transition-transform duration-150",
    depth: "transform-gpu transition-all duration-200 active:translate-y-0.5 active:shadow-inner shadow-lg",
    glow: "transition-all duration-200 active:shadow-inner shadow-lg"
  };

  // Intensity classes
  const intensityMap = {
    light: {
      hapticDuration: 10,
      shadowSize: "shadow-sm",
      animationDuration: "duration-100"
    },
    medium: {
      hapticDuration: 15,
      shadowSize: "shadow-md",
      animationDuration: "duration-150"
    },
    strong: {
      hapticDuration: 25,
      shadowSize: "shadow-lg",
      animationDuration: "duration-200"
    }
  };

  // Color classes
  const colorClasses = {
    cyan: "bg-nexus-cyan/10 border-nexus-cyan text-nexus-cyan hover:bg-nexus-cyan/20 shadow-nexus-cyan/20",
    magenta: "bg-nexus-magenta/10 border-nexus-magenta text-nexus-magenta hover:bg-nexus-magenta/20 shadow-nexus-magenta/20",
    gradient: "bg-gradient-to-r from-nexus-cyan/20 to-nexus-magenta/20 border-nexus-cyan hover:from-nexus-cyan/30 hover:to-nexus-magenta/30 text-white shadow-nexus-cyan/10"
  };

  const handleTouchStart = () => {
    setIsActive(true);
    
    // Haptic feedback using Vibration API if available and requested
    if (haptic && 'vibrate' in navigator) {
      navigator.vibrate(intensityMap[intensity].hapticDuration);
    }

    // For glow effect, add animation
    if (feedbackType === "glow") {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const handleTouchEnd = () => {
    setIsActive(false);
  };

  // Special effect for 3D depth buttons
  const depthEffect = feedbackType === "depth" && !isActive 
    ? "translate-y-[-2px]" 
    : "";

  // Special effect for glow buttons
  const glowEffect = feedbackType === "glow" 
    ? `${isAnimating ? 'animate-pulse-glow ring-2' : ''} ${color === 'cyan' ? 'ring-nexus-cyan/50' : color === 'magenta' ? 'ring-nexus-magenta/50' : 'ring-nexus-cyan/30'}`
    : "";

  return (
    <Button
      className={cn(
        "transform-gpu will-change-transform backdrop-blur-sm border",
        "relative overflow-hidden transition-all", 
        feedbackClasses[feedbackType],
        intensityMap[intensity].shadowSize,
        intensityMap[intensity].animationDuration,
        colorClasses[color],
        depthEffect,
        glowEffect,
        className
      )}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
      onMouseLeave={() => isActive && setIsActive(false)}
      {...props}
    >
      {/* For glow effect, add pseudo elements */}
      {feedbackType === "glow" && (
        <span 
          className={cn(
            "absolute inset-0 opacity-0",
            isAnimating ? "animate-pulse-glow opacity-30" : ""
          )}
          style={{
            background: color === 'cyan' 
              ? 'radial-gradient(circle at center, hsl(188, 100%, 50%), transparent 70%)' 
              : color === 'magenta' 
                ? 'radial-gradient(circle at center, hsl(301, 100%, 50%), transparent 70%)'
                : 'radial-gradient(circle at center, rgba(255,255,255,0.8), transparent 70%)'
          }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </Button>
  );
};

export default TactileFeedbackButton;
