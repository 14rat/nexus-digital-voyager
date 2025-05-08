
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  icon: string;
  color: "cyan" | "magenta" | "blue";
}

const timelineEvents: TimelineEvent[] = [
  {
    id: "web3",
    year: "2025",
    title: "Web 3.0 Revolução",
    description: "A web descentralizada atinge adoção em massa com aplicações baseadas em blockchain.",
    icon: "🌐",
    color: "cyan"
  },
  {
    id: "quantum",
    year: "2027",
    title: "Computação Quântica",
    description: "Computadores quânticos tornam-se comercialmente viáveis, revolucionando criptografia e simulações.",
    icon: "⚛️",
    color: "magenta"
  },
  {
    id: "brain",
    year: "2029",
    title: "Interfaces Cérebro-Máquina",
    description: "Interfaces não-invasivas permitem controle de dispositivos através do pensamento.",
    icon: "🧠",
    color: "blue"
  },
  {
    id: "ai",
    year: "2032",
    title: "IA Consciente",
    description: "Primeiras IAs a desenvolver consciência com compreensão própria e curiosidade autônoma.",
    icon: "🤖",
    color: "cyan"
  },
  {
    id: "meta",
    year: "2035",
    title: "Metaverso Global",
    description: "Realidade virtual e aumentada fundem-se em um metaverso global interoperável.",
    icon: "🔮",
    color: "magenta"
  }
];

const TimelineItem: React.FC<{ 
  event: TimelineEvent; 
  index: number; 
  inView: boolean;
}> = ({ event, index, inView }) => {
  const colorClass = {
    cyan: "border-nexus-cyan bg-nexus-cyan/10 text-nexus-cyan box-neon-cyan",
    magenta: "border-nexus-magenta bg-nexus-magenta/10 text-nexus-magenta box-neon-magenta",
    blue: "border-nexus-blue bg-nexus-blue/10 text-nexus-blue"
  };
  
  const lineColorClass = {
    cyan: "bg-nexus-cyan",
    magenta: "bg-nexus-magenta", 
    blue: "bg-nexus-blue"
  };

  return (
    <div className={cn(
      "flex gap-4 md:gap-8 relative mb-8 opacity-0 translate-y-8",
      inView && "opacity-100 translate-y-0 transition-all duration-700",
      inView && `transition-delay-${index * 100}`
    )}
    style={{ 
      transitionDelay: inView ? `${index * 150}ms` : "0ms"
    }}>
      {/* Year bubble */}
      <div className="flex-shrink-0 flex flex-col items-center">
        <div className={cn(
          "w-16 h-16 rounded-full border-2 flex items-center justify-center",
          colorClass[event.color]
        )}>
          <span className="text-xl font-bold">{event.year}</span>
        </div>
        
        {/* Vertical line that connects to next item */}
        {index < timelineEvents.length - 1 && (
          <div className={cn(
            "w-0.5 h-16", 
            lineColorClass[event.color]
          )}></div>
        )}
      </div>
      
      {/* Content */}
      <div className={cn(
        "flex-1 border rounded-lg p-4 backdrop-blur-sm relative overflow-hidden",
        "border-gray-800 bg-gray-900/30"
      )}>
        {/* Scanline effect */}
        <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-b from-transparent via-white to-transparent bg-[length:100%_8px] animate-[scanline_3s_linear_infinite]"></div>
        </div>
        
        <div className="flex items-start gap-3">
          <span className="text-2xl">{event.icon}</span>
          <div>
            <h3 className="text-xl font-bold mb-1">{event.title}</h3>
            <p className="text-gray-300">{event.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const NeonTimelineSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8" ref={sectionRef}>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          <span className="text-gradient">Linha do Tempo</span>
        </h2>
        <p className="text-lg text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Marcos tecnológicos que definirão o futuro da humanidade
        </p>
        
        <div className="relative">
          {timelineEvents.map((event, index) => (
            <TimelineItem 
              key={event.id} 
              event={event} 
              index={index}
              inView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NeonTimelineSection;
