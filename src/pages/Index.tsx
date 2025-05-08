
import React, { useEffect, useState } from "react";
import ParticlesBackground from "@/components/ParticlesBackground";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TechConstellationSection from "@/components/TechConstellationSection";
import NeonTimelineSection from "@/components/NeonTimelineSection";
import QuantumCardsSection from "@/components/QuantumCardsSection";
import ContactWormholeSection from "@/components/ContactWormholeSection";
import Footer from "@/components/Footer";
import ParallaxScrollSection from "@/components/ParallaxScrollSection";
import ScrollSnapContainer, { ScrollSnapSection } from "@/components/ScrollSnapContainer";
import WormholeTransition from "@/components/WormholeTransition";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set loaded state after a short delay to allow for smooth animations
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);
  }, []);

  return (
    <div className={`min-h-screen bg-nexus-space transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Particles Background */}
      <ParticlesBackground />
      
      {/* Header */}
      <Header />
      
      <ScrollSnapContainer>
        {/* Hero Section */}
        <ScrollSnapSection id="hero">
          <HeroSection />
          <WormholeTransition targetId="parallax" label="Explorar o Cosmos" />
        </ScrollSnapSection>
        
        {/* Parallax Scroll Section */}
        <ScrollSnapSection id="parallax">
          <ParallaxScrollSection />
          <WormholeTransition targetId="tech-constellation" label="Ver Constelação Tech" />
        </ScrollSnapSection>
        
        {/* Tech Constellation */}
        <ScrollSnapSection id="tech-constellation">
          <TechConstellationSection />
          <WormholeTransition targetId="timeline" label="Visualizar Timeline" />
        </ScrollSnapSection>
        
        {/* Neon Timeline */}
        <ScrollSnapSection id="timeline">
          <NeonTimelineSection />
          <WormholeTransition targetId="quantum-cards" label="Explorar Inovações" />
        </ScrollSnapSection>
        
        {/* Quantum Cards */}
        <ScrollSnapSection id="quantum-cards">
          <QuantumCardsSection />
          <WormholeTransition targetId="contact" label="Contato" />
        </ScrollSnapSection>
        
        {/* Contact Wormhole */}
        <ScrollSnapSection id="contact" className="pb-20">
          <ContactWormholeSection />
        </ScrollSnapSection>
      </ScrollSnapContainer>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
