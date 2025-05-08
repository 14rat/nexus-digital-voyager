
import React, { useEffect, useRef } from "react";
import NeonButton from "./NeonButton";

const HeroSection: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  
  // Simple animation for the title
  useEffect(() => {
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    
    if (title) {
      title.style.opacity = "0";
      title.style.transform = "translateY(20px)";
      
      setTimeout(() => {
        title.style.transition = "opacity 1s ease, transform 1s ease";
        title.style.opacity = "1";
        title.style.transform = "translateY(0)";
      }, 300);
    }
    
    if (subtitle) {
      subtitle.style.opacity = "0";
      subtitle.style.transform = "translateY(20px)";
      
      setTimeout(() => {
        subtitle.style.transition = "opacity 1s ease, transform 1s ease";
        subtitle.style.opacity = "1";
        subtitle.style.transform = "translateY(0)";
      }, 600);
    }
  }, []);

  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden">
      {/* Background elements for visual effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-nexus-purple opacity-20 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-60 h-60 bg-nexus-blue opacity-20 rounded-full blur-3xl animate-pulse-glow"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
        >
          <span className="text-gradient neon-cyan-glow">Explore o</span>
          <br />
          <span className="text-gradient neon-magenta-glow">Cosmos Digital</span>
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto animate-float"
        >
          Navegue pela galáxia de inovações que estão moldando o futuro da tecnologia e expandindo os horizontes digitais.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <NeonButton neonVariant="cyan" size="lg" withArrow>
            Iniciar Exploração
          </NeonButton>
          <NeonButton neonVariant="magenta" size="lg" variant="outline">
            Descobrir Tecnologias
          </NeonButton>
        </div>
      </div>
      
      {/* Decorative stars */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full animate-star-glow"></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-nexus-cyan rounded-full animate-star-glow"></div>
      <div className="absolute bottom-20 left-1/3 w-2 h-2 bg-nexus-magenta rounded-full animate-star-glow"></div>
      <div className="absolute bottom-40 right-1/3 w-2 h-2 bg-white rounded-full animate-star-glow"></div>
    </section>
  );
};

export default HeroSection;
