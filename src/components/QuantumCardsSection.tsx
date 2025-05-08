
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface QuantumCard {
  id: string;
  title: string;
  icon: string;
  description: string;
  detail: string;
  color: "cyan" | "magenta" | "blue";
}

const cards: QuantumCard[] = [
  {
    id: "aumented-reality",
    title: "Realidade Aumentada",
    icon: "👓",
    description: "Fusão perfeita entre o mundo digital e físico",
    detail: "A realidade aumentada sobrepõe elementos virtuais ao mundo real, criando experiências imersivas para educação, entretenimento, saúde e indústria. Os avanços em dispositivos wearable e processamento visual estão tornando a AR uma parte cada vez mais integrada ao nosso cotidiano.",
    color: "cyan"
  },
  {
    id: "neurotech",
    title: "Neurotecnologia",
    icon: "🧠",
    description: "Expandindo as capacidades da mente humana",
    detail: "A neurotecnologia está revolucionando como entendemos e interagimos com nossos cérebros. De interfaces neurais a terapias de estimulação cerebral, estas inovações oferecem novos tratamentos para condições neurológicas e potencialmente amplificam nossas capacidades cognitivas e sensoriais.",
    color: "magenta"
  },
  {
    id: "biocomputing",
    title: "Biocomputação",
    icon: "🧬",
    description: "Computadores orgânicos do futuro",
    detail: "A biocomputação utiliza sistemas biológicos para processar informações. DNA, proteínas e células vivas são programados para executar cálculos complexos com eficiência energética extraordinária. Estes sistemas prometem capacidade de computação massiva em escalas microscópicas com aplicações revolucionárias na medicina e ciência de materiais.",
    color: "blue"
  }
];

const QuantumCard: React.FC<{ card: QuantumCard }> = ({ card }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const colorClass = {
    cyan: "border-nexus-cyan shadow-nexus-cyan/20 bg-nexus-cyan/5 hover:bg-nexus-cyan/10",
    magenta: "border-nexus-magenta shadow-nexus-magenta/20 bg-nexus-magenta/5 hover:bg-nexus-magenta/10",
    blue: "border-nexus-blue shadow-nexus-blue/20 bg-nexus-blue/5 hover:bg-nexus-blue/10"
  };
  
  const glowClass = {
    cyan: "box-neon-cyan",
    magenta: "box-neon-magenta",
    blue: "shadow-[0_0_10px_rgba(10,116,230,0.5)]"
  };

  return (
    <div 
      className={cn(
        "border rounded-lg overflow-hidden cursor-pointer transition-all duration-500",
        "backdrop-blur-sm relative",
        colorClass[card.color],
        isExpanded ? "md:scale-105 z-10" : "z-0",
        isExpanded && glowClass[card.color]
      )}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Portal effect overlay when expanded */}
      {isExpanded && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent via-white/5 animate-pulse-glow"></div>
          <div className="absolute -inset-1 opacity-30 bg-gradient-to-r from-transparent via-white to-transparent rotate-45 translate-x-[-200%] animate-[shimmer_2s_ease-in-out_infinite]"></div>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">{card.icon}</span>
          <h3 className="text-xl font-bold">{card.title}</h3>
        </div>
        
        <p className="text-gray-300 mb-4">{card.description}</p>
        
        {/* Expanded content */}
        <div 
          className={cn(
            "overflow-hidden transition-all duration-500",
            isExpanded ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <p className="text-gray-200 mt-4">{card.detail}</p>
        </div>
        
        <div className="mt-4 flex justify-end">
          <span className="text-sm">
            {isExpanded ? 'Clique para fechar' : 'Clique para expandir'}
          </span>
        </div>
      </div>
    </div>
  );
};

const QuantumCardsSection: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          <span className="text-gradient">Inovações Quânticas</span>
        </h2>
        <p className="text-lg text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Tecnologias que transcendem os limites convencionais
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map(card => (
            <QuantumCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuantumCardsSection;
