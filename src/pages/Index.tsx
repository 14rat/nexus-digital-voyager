
import React, { useEffect, useState, lazy, Suspense } from "react";
import ParticlesBackground from "@/components/ParticlesBackground";
import Header from "@/components/Header";
import ScrollSnapContainer, { ScrollSnapSection } from "@/components/ScrollSnapContainer";
import WormholeTransition from "@/components/WormholeTransition";

// Lazy load non-critical components
const HeroSection = lazy(() => import("@/components/HeroSection"));
const ParallaxScrollSection = lazy(() => import("@/components/ParallaxScrollSection"));
const TechConstellationSection = lazy(() => import("@/components/TechConstellationSection"));
const NeonTimelineSection = lazy(() => import("@/components/NeonTimelineSection"));
const QuantumCardsSection = lazy(() => import("@/components/QuantumCardsSection"));
const ContactWormholeSection = lazy(() => import("@/components/ContactWormholeSection"));
const Footer = lazy(() => import("@/components/Footer"));

// Loading fallback that doesn't cause layout shifts
const SectionLoader = () => (
  <div className="flex items-center justify-center min-h-screen w-full">
    <div className="backdrop-blur-sm bg-nexus-space/40 border border-nexus-cyan/30 rounded-lg box-neon-cyan p-6">
      <div className="h-8 w-8 border-t-2 border-b-2 border-nexus-cyan rounded-full animate-spin"></div>
    </div>
  </div>
);

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({
    hero: true,
    parallax: false,
    'tech-constellation': false,
    timeline: false,
    'quantum-cards': false,
    contact: false
  });

  // Track visible sections to optimize rendering
  const observeSections = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.target.id) {
            setVisibleSections(prev => ({
              ...prev,
              [entry.target.id]: entry.isIntersecting
            }));
          }
        });
      },
      { threshold: 0.2 }
    );

    // Observe all sections
    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  };

  useEffect(() => {
    // Set loaded state after a short delay to allow for smooth animations
    const timeoutId = setTimeout(() => {
      setIsLoaded(true);
      // Set up section visibility tracking after initial load
      const cleanup = observeSections();
      return cleanup;
    }, 300);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div 
      className={`min-h-screen bg-nexus-space transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      style={{ willChange: 'opacity' }}
    >
      {/* Particles Background */}
      <ParticlesBackground />
      
      {/* Header */}
      <Header />
      
      <ScrollSnapContainer>
        {/* Hero Section - Always load this one immediately */}
        <ScrollSnapSection id="hero">
          <Suspense fallback={<SectionLoader />}>
            <HeroSection />
          </Suspense>
          <WormholeTransition targetId="parallax" label="Explorar o Cosmos" />
        </ScrollSnapSection>
        
        {/* Parallax Scroll Section - Load when needed */}
        <ScrollSnapSection id="parallax">
          <Suspense fallback={<SectionLoader />}>
            {(visibleSections.parallax || visibleSections.hero) && <ParallaxScrollSection />}
          </Suspense>
          <WormholeTransition targetId="tech-constellation" label="Ver Constelação Tech" />
        </ScrollSnapSection>
        
        {/* Tech Constellation */}
        <ScrollSnapSection id="tech-constellation">
          <Suspense fallback={<SectionLoader />}>
            {(visibleSections['tech-constellation'] || visibleSections.parallax) && <TechConstellationSection />}
          </Suspense>
          <WormholeTransition targetId="timeline" label="Visualizar Timeline" />
        </ScrollSnapSection>
        
        {/* Neon Timeline */}
        <ScrollSnapSection id="timeline">
          <Suspense fallback={<SectionLoader />}>
            {(visibleSections.timeline || visibleSections['tech-constellation']) && <NeonTimelineSection />}
          </Suspense>
          <WormholeTransition targetId="quantum-cards" label="Explorar Inovações" />
        </ScrollSnapSection>
        
        {/* Quantum Cards */}
        <ScrollSnapSection id="quantum-cards">
          <Suspense fallback={<SectionLoader />}>
            {(visibleSections['quantum-cards'] || visibleSections.timeline) && <QuantumCardsSection />}
          </Suspense>
          <WormholeTransition targetId="contact" label="Contato" />
        </ScrollSnapSection>
        
        {/* Contact Wormhole */}
        <ScrollSnapSection id="contact" className="pb-20">
          <Suspense fallback={<SectionLoader />}>
            {(visibleSections.contact || visibleSections['quantum-cards']) && <ContactWormholeSection />}
          </Suspense>
        </ScrollSnapSection>
      </ScrollSnapContainer>
      
      {/* Footer */}
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
