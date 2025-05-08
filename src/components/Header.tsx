
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "py-3 bg-nexus-space/90 backdrop-blur-md shadow-md" 
          : "py-5 bg-transparent"
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
            <a href="#" className="text-white hover:text-nexus-cyan transition-colors">Início</a>
            <a href="#" className="text-gray-300 hover:text-nexus-cyan transition-colors">Tecnologias</a>
            <a href="#" className="text-gray-300 hover:text-nexus-cyan transition-colors">Linha do Tempo</a>
            <a href="#" className="text-gray-300 hover:text-nexus-cyan transition-colors">Inovações</a>
            <a href="#" className="text-gray-300 hover:text-nexus-cyan transition-colors">Contato</a>
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden text-gray-200 hover:text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
      
      {/* Mobile Menu */}
      <div 
        className={cn(
          "md:hidden fixed inset-0 z-40 bg-nexus-space/95 backdrop-blur-md transition-all duration-300 flex flex-col",
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="px-4 py-6 flex justify-end">
          <button
            type="button"
            className="text-gray-200 hover:text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(false)}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 flex flex-col items-center justify-center space-y-8 text-xl">
          <a href="#" 
            className="text-white hover:text-nexus-cyan transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >Início</a>
          <a href="#" 
            className="text-gray-300 hover:text-nexus-cyan transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >Tecnologias</a>
          <a href="#" 
            className="text-gray-300 hover:text-nexus-cyan transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >Linha do Tempo</a>
          <a href="#" 
            className="text-gray-300 hover:text-nexus-cyan transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >Inovações</a>
          <a href="#" 
            className="text-gray-300 hover:text-nexus-cyan transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >Contato</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
