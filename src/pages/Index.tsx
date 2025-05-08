
import React, { useEffect, useState } from "react";
import ParticlesBackground from "@/components/ParticlesBackground";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TechConstellationSection from "@/components/TechConstellationSection";
import NeonTimelineSection from "@/components/NeonTimelineSection";
import QuantumCardsSection from "@/components/QuantumCardsSection";
import ContactWormholeSection from "@/components/ContactWormholeSection";
import Footer from "@/components/Footer";

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
      
      <main>
        {/* Hero Section */}
        <HeroSection />
        
        {/* Tech Constellation */}
        <TechConstellationSection />
        
        {/* Neon Timeline */}
        <NeonTimelineSection />
        
        {/* Quantum Cards */}
        <QuantumCardsSection />
        
        {/* Contact Wormhole */}
        <ContactWormholeSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
