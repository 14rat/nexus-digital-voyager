
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [startY, setStartY] = useState<number | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const { toast } = useToast();
  
  // Handle scroll events with throttling
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Detect scroll direction to minimize/maximize header
          if (currentScrollY > lastScrollY + 10 && currentScrollY > 100) {
            setIsMinimized(true);
          } else if (currentScrollY < lastScrollY - 10 || currentScrollY < 50) {
            setIsMinimized(false);
          }
          
          setIsScrolled(currentScrollY > 0);
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Touch gestures for mobile navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!startY) return;
    
    const currentY = e.touches[0].clientY;
    const diff = startY - currentY;
    
    // Swipe down to show header, swipe up to hide
    if (diff < -30 && isMinimized) {
      setIsMinimized(false);
    } else if (diff > 30 && !isMinimized && window.scrollY > 100) {
      setIsMinimized(true);
    }
  };

  const handleTouchEnd = () => {
    setStartY(null);
  };

  // Handle edge swipe to open menu
  const handleEdgeSwipe = (e: React.TouchEvent) => {
    const touchX = e.touches[0].clientX;
    
    // If touch starts near left edge of screen
    if (touchX < 20 && !mobileMenuOpen) {
      setMobileMenuOpen(true);
      // Haptic feedback
      if ('vibrate' in navigator) {
        navigator.vibrate(25);
      }
    }
  };

  return (
    <header 
      ref={headerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isMinimized 
          ? "transform -translate-y-16 md:translate-y-0" 
          : "transform translate-y-0",
        isScrolled 
          ? "py-2 bg-nexus-space/90 backdrop-blur-md shadow-md" 
          : "py-4 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#" className="font-rajdhani text-2xl font-bold">
              <span className="text-gradient">NEXUS</span>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-white hover:text-nexus-cyan transition-colors text-shadow">Início</a>
            <a href="#" className="text-gray-300 hover:text-nexus-cyan transition-colors text-shadow">Tecnologias</a>
            <a href="#" className="text-gray-300 hover:text-nexus-cyan transition-colors text-shadow">Linha do Tempo</a>
            <a href="#" className="text-gray-300 hover:text-nexus-cyan transition-colors text-shadow">Inovações</a>
            <a href="#" className="text-gray-300 hover:text-nexus-cyan transition-colors text-shadow">Contato</a>
          </nav>
          
          {/* Mobile Menu Button - with tactile feedback */}
          <button
            type="button"
            className="md:hidden text-gray-200 hover:text-white focus:outline-none active:scale-90 transition-transform"
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              if ('vibrate' in navigator) {
                navigator.vibrate(mobileMenuOpen ? [10] : [15, 30, 15]);
              }
            }}
          >
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu with swipe gestures */}
      <div 
        className={cn(
          "md:hidden fixed inset-0 z-40 bg-nexus-space/95 backdrop-blur-md transition-transform duration-300 ease-in-out",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="px-4 py-6 flex justify-end">
          <button
            type="button"
            className="text-gray-200 hover:text-white focus:outline-none active:scale-90 transition-transform"
            onClick={() => {
              setMobileMenuOpen(false);
              if ('vibrate' in navigator) navigator.vibrate(10);
            }}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 flex flex-col items-center justify-center space-y-8 text-xl">
          {["Início", "Tecnologias", "Linha do Tempo", "Inovações", "Contato"].map((item, i) => (
            <a 
              key={i} 
              href="#" 
              className={cn(
                "transform transition-all duration-300 ease-out",
                "hover:text-nexus-cyan active:scale-95",
                i === 0 ? "text-white" : "text-gray-300"
              )}
              onClick={() => {
                setMobileMenuOpen(false);
                toast({
                  title: `Navegando para ${item}`,
                  description: "Mudando para a nova seção...",
                  duration: 1500
                });
                if ('vibrate' in navigator) navigator.vibrate(15);
              }}
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
      
      {/* Edge swipe detector for menu */}
      <div 
        className="md:hidden fixed left-0 top-0 bottom-0 w-6 z-30"
        onTouchStart={handleEdgeSwipe}
      />
    </header>
  );
};

export default Header;
