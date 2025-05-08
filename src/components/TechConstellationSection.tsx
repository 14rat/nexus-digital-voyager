
import React, { useState } from "react";

interface TechNode {
  id: string;
  name: string;
  description: string;
  icon: string;
  x: number;
  y: number;
  size: number;
  color: string;
  connections: string[];
}

const technologies: TechNode[] = [
  {
    id: "ai",
    name: "Inteligência Artificial",
    description: "Sistemas que podem simular inteligência humana, aprender e tomar decisões complexas com base em dados.",
    icon: "🧠",
    x: 50,
    y: 30,
    size: 16,
    color: "#00F5FF",
    connections: ["ml", "robotics", "blockchain"]
  },
  {
    id: "ml",
    name: "Machine Learning",
    description: "Sistemas que melhoram automaticamente com a experiência, identificando padrões complexos em dados.",
    icon: "🔄",
    x: 25,
    y: 40,
    size: 14,
    color: "#FF00F5",
    connections: ["ai", "data"]
  },
  {
    id: "blockchain",
    name: "Blockchain",
    description: "Tecnologia de registro distribuído que permite transações seguras, transparentes e imutáveis.",
    icon: "⛓️",
    x: 70,
    y: 50,
    size: 14,
    color: "#FF00F5",
    connections: ["ai", "crypto"]
  },
  {
    id: "robotics",
    name: "Robótica",
    description: "Combinação de engenharia mecânica, eletrônica e ciência da computação para criar máquinas autônomas.",
    icon: "🤖",
    x: 60,
    y: 20,
    size: 12,
    color: "#00F5FF", 
    connections: ["ai", "iot"]
  },
  {
    id: "iot",
    name: "Internet das Coisas",
    description: "Rede de dispositivos físicos conectados que compartilham dados e interagem através da internet.",
    icon: "📱",
    x: 80,
    y: 30,
    size: 14,
    color: "#0A74E6",
    connections: ["robotics", "data"]
  },
  {
    id: "data",
    name: "Big Data",
    description: "Conjuntos de dados extremamente grandes que podem ser analisados para revelar padrões e tendências.",
    icon: "📊",
    x: 40,
    y: 60,
    size: 13,
    color: "#0A74E6",
    connections: ["ml", "iot"]
  },
  {
    id: "crypto",
    name: "Criptomoedas",
    description: "Moedas digitais que utilizam criptografia para segurança e operam independentemente de bancos centrais.",
    icon: "💰",
    x: 85,
    y: 60,
    size: 12,
    color: "#FF00F5",
    connections: ["blockchain"]
  }
];

const TechConstellationSection: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<TechNode | null>(null);
  const [isHovered, setIsHovered] = useState<string | null>(null);
  
  const handleNodeClick = (tech: TechNode) => {
    setSelectedTech(tech === selectedTech ? null : tech);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          <span className="text-gradient">Constelação Tecnológica</span>
        </h2>
        <p className="text-lg text-gray-300 text-center mb-10 max-w-2xl mx-auto">
          Explore a interconexão das tecnologias emergentes que estão redefinindo o panorama digital.
        </p>
        
        {/* Constellation Visualization */}
        <div className="h-[500px] sm:h-[600px] bg-nexus-space relative rounded-lg border border-gray-800 overflow-hidden mb-8">
          {/* Lines connecting nodes (connections) */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
            {technologies.map(tech => 
              tech.connections.map(connectionId => {
                const connectedTech = technologies.find(t => t.id === connectionId);
                if (!connectedTech) return null;
                
                const isActive = 
                  (selectedTech?.id === tech.id || selectedTech?.id === connectionId) ||
                  (isHovered === tech.id || isHovered === connectionId);
                
                return (
                  <line 
                    key={`${tech.id}-${connectionId}`}
                    x1={`${tech.x}%`} 
                    y1={`${tech.y}%`} 
                    x2={`${connectedTech.x}%`} 
                    y2={`${connectedTech.y}%`}
                    stroke={isActive ? "#ffffff" : "#ffffff33"}
                    strokeWidth={isActive ? 2 : 1}
                    strokeDasharray={isActive ? "none" : "4,4"}
                    className="transition-all duration-300"
                  />
                );
              })
            )}
          </svg>
          
          {/* Tech nodes */}
          <div className="absolute inset-0">
            {technologies.map(tech => (
              <div 
                key={tech.id}
                className={`absolute rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center ${
                  selectedTech?.id === tech.id ? 'animate-pulse-glow z-20' : 'z-10'
                }`}
                style={{
                  left: `${tech.x}%`,
                  top: `${tech.y}%`,
                  width: `${tech.size * (selectedTech?.id === tech.id ? 1.5 : 1)}px`,
                  height: `${tech.size * (selectedTech?.id === tech.id ? 1.5 : 1)}px`,
                  backgroundColor: tech.color,
                  boxShadow: `0 0 10px ${tech.color}`,
                  transform: 'translate(-50%, -50%)'
                }}
                onClick={() => handleNodeClick(tech)}
                onMouseEnter={() => setIsHovered(tech.id)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <span className="text-sm md:text-base">{tech.icon}</span>
              </div>
            ))}
          </div>
          
          {/* Detail panel */}
          <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-nexus-space via-nexus-space/95 to-transparent transition-all duration-500 ${
            selectedTech ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
            {selectedTech && (
              <div className="backdrop-blur-sm bg-nexus-space/50 border border-gray-800 rounded-md p-4">
                <h3 className="text-lg md:text-xl font-bold mb-2" style={{ color: selectedTech.color }}>
                  {selectedTech.name}
                </h3>
                <p className="text-sm md:text-base text-gray-300">{selectedTech.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechConstellationSection;
