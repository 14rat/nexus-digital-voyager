
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface FloatingMenuProps {
  position?: "bottom-right" | "bottom-left";
}

const FloatingMenu: React.FC<FloatingMenuProps> = ({ position = "bottom-right" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  // Position classes
  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6"
  };

  const handleAction = (action: string) => {
    setIsOpen(false);
    
    // Visual feedback
    toast({
      title: action,
      description: `Ação ${action} executada com sucesso!`,
      duration: 2000
    });
    
    // Tactile feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(30);
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.floating-menu') && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className={`fixed ${positionClasses[position]} z-50 floating-menu`}>
      {/* Main Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if ('vibrate' in navigator && !isOpen) {
            navigator.vibrate([10, 20, 10]);
          }
        }}
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center",
          "bg-gradient-to-r from-nexus-cyan to-nexus-magenta",
          "shadow-lg box-neon-cyan",
          "transform transition-transform duration-300 ease-in-out",
          isOpen ? "rotate-45 scale-110" : "hover:scale-105 active:scale-95"
        )}
      >
        <svg 
          className="w-6 h-6 text-white" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M12 4v16m8-8H4"} 
          />
        </svg>
      </button>

      {/* Menu Items */}
      <div className={cn(
        "absolute bottom-16 right-0",
        "flex flex-col items-end gap-2",
        "transition-all duration-300",
        isOpen 
          ? "opacity-100 transform translate-y-0" 
          : "opacity-0 transform translate-y-8 pointer-events-none"
      )}>
        {[
          { icon: "⚡", label: "Velocidade" },
          { icon: "🌌", label: "Explorar" },
          { icon: "📱", label: "Contato" }
        ].map((item, index) => (
          <button
            key={index}
            onClick={() => handleAction(item.label)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full",
              "bg-nexus-space/80 backdrop-blur-sm border border-nexus-cyan/30",
              "text-white shadow-lg box-neon-cyan",
              "transform transition-all duration-300 ease-out",
              "active:scale-95 hover:bg-nexus-cyan/20",
              "transition-transform delay-[calc(50ms*var(--delay))]"
            )}
            style={{ "--delay": index } as React.CSSProperties}
          >
            <span>{item.label}</span>
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-nexus-cyan/20">
              {item.icon}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FloatingMenu;
