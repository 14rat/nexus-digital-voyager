
import React, { useEffect, useRef, useState } from "react";

interface ParallaxObject {
  id: string;
  size: number;
  color: string;
  xOffset: number;
  yOffset: number;
  speed: number;
  icon?: string;
}

const ParallaxScrollSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  
  // Generate celestial objects with different parallax speeds
  const celestialObjects: ParallaxObject[] = [
    { id: "planet-1", size: 50, color: "#00F5FF", xOffset: 15, yOffset: 20, speed: 0.08, icon: "🪐" },
    { id: "planet-2", size: 30, color: "#FF00F5", xOffset: 75, yOffset: 40, speed: 0.12, icon: "🌌" },
    { id: "star-1", size: 10, color: "#FFFFFF", xOffset: 25, yOffset: 60, speed: 0.05 },
    { id: "star-2", size: 8, color: "#0A74E6", xOffset: 85, yOffset: 30, speed: 0.07 },
    { id: "star-3", size: 15, color: "#FF00F5", xOffset: 60, yOffset: 70, speed: 0.09 },
    { id: "star-4", size: 12, color: "#00F5FF", xOffset: 40, yOffset: 25, speed: 0.14 },
    { id: "star-5", size: 6, color: "#FFFFFF", xOffset: 90, yOffset: 85, speed: 0.04 },
    { id: "nebula-1", size: 70, color: "rgba(10, 116, 230, 0.15)", xOffset: 30, yOffset: 50, speed: 0.03 },
    { id: "nebula-2", size: 100, color: "rgba(255, 0, 245, 0.1)", xOffset: 70, yOffset: 15, speed: 0.02 },
  ];
  
  useEffect(() => {
    // Set initial viewport height
    setViewportHeight(window.innerHeight);
    
    // Update viewport height on resize
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };
    
    // Handle scroll events with requestAnimationFrame for smooth performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  // Calculate parallax positions for each object
  const calculateParallaxStyle = (obj: ParallaxObject) => {
    const yMovement = scrollY * obj.speed;
    
    return {
      position: 'absolute' as const,
      left: `${obj.xOffset}%`,
      top: `${obj.yOffset}%`,
      width: `${obj.size}px`,
      height: `${obj.size}px`,
      borderRadius: '50%',
      backgroundColor: obj.icon ? 'transparent' : obj.color,
      boxShadow: obj.icon ? 'none' : `0 0 ${obj.size / 2}px ${obj.color}`,
      transform: `translateY(${yMovement}px)`,
      transition: 'transform 0.1s linear',
      zIndex: -1,
      fontSize: `${obj.size * 0.7}px`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };
  };
  
  return (
    <section 
      ref={sectionRef} 
      className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-[120vh]"
    >
      {/* Parallax objects */}
      {celestialObjects.map(obj => (
        <div 
          key={obj.id}
          style={calculateParallaxStyle(obj)}
          className="select-none pointer-events-none"
        >
          {obj.icon}
        </div>
      ))}
      
      <div className="max-w-3xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          <span className="text-gradient">Explorando o Cosmos</span>
        </h2>
        <p className="text-lg text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Navegue entre as estrelas digitais e descubra o infinito potencial da galáxia tecnológica
        </p>
        
        {/* Content blocks for scrolling */}
        <div className="space-y-32">
          <div className="p-6 backdrop-blur-sm bg-nexus-space/40 border border-nexus-cyan/30 rounded-lg box-neon-cyan">
            <h3 className="text-2xl font-bold mb-4">Mundos Paralelos</h3>
            <p className="text-gray-300">
              À medida que avançamos através do espaço digital, diferentes realidades surgem no horizonte. 
              Cada uma oferece uma nova perspectiva sobre o futuro das interfaces homem-máquina.
            </p>
          </div>
          
          <div className="p-6 backdrop-blur-sm bg-nexus-space/40 border border-nexus-magenta/30 rounded-lg box-neon-magenta">
            <h3 className="text-2xl font-bold mb-4">Dimensões Ocultas</h3>
            <p className="text-gray-300">
              Nas profundezas do espaço digital existem camadas de interação que apenas se revelam 
              com exploração contínua. A interface perfeita é invisível até o momento em que se faz necessária.
            </p>
          </div>
          
          <div className="p-6 backdrop-blur-sm bg-nexus-space/40 border border-nexus-blue/30 rounded-lg shadow-[0_0_10px_rgba(10,116,230,0.5)]">
            <h3 className="text-2xl font-bold mb-4">Constelações Infinitas</h3>
            <p className="text-gray-300">
              Cada ponto de contato em uma experiência digital forma parte de uma constelação maior. 
              O padrão emerge apenas quando se observa o todo, revelando a jornada completa do usuário.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParallaxScrollSection;
