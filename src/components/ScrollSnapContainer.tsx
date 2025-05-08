
import React, { ReactNode, useEffect, useRef, useState } from "react";

interface ScrollSnapContainerProps {
  children: ReactNode;
}

const ScrollSnapContainer: React.FC<ScrollSnapContainerProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Use Passive event listeners for better scroll performance
    const handleScroll = () => {
      // Using requestAnimationFrame to debounce scroll events
      requestAnimationFrame(() => {
        // Implementation details for any scroll-based logic
      });
    };
    
    container.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Set up IntersectionObserver to efficiently track visible sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setActiveSection(entry.target.id);
            
            // Prefetch potential next sections' resources
            const nextSectionId = getNextSectionId(entry.target.id);
            if (nextSectionId) {
              prefetchResources(nextSectionId);
            }
          }
        });
      },
      { 
        threshold: 0.5, // Section is considered active when 50% visible
        root: containerRef.current 
      }
    );
    
    // Observe all sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      observer.observe(section);
    });
    
    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);
  
  // Helper function to determine the next section
  const getNextSectionId = (currentId: string): string | null => {
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const currentIndex = sections.findIndex(section => section.id === currentId);
    if (currentIndex >= 0 && currentIndex < sections.length - 1) {
      return sections[currentIndex + 1].id;
    }
    return null;
  };
  
  // Prefetch potential resources for better performance
  const prefetchResources = (sectionId: string) => {
    // Using requestIdleCallback for non-critical prefetching
    const prefetch = () => {
      // This would be where we'd prefetch images, scripts, etc.
      // Implementation depends on specific resources needed
    };
    
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(prefetch);
    } else {
      setTimeout(prefetch, 200);
    }
  };
  
  return (
    <div 
      ref={containerRef}
      className="scroll-snap-container h-screen overflow-y-scroll snap-y snap-mandatory"
      style={{ 
        willChange: "scroll-position", // GPU hint for smooth scrolling
        WebkitOverflowScrolling: "touch" // Smooth momentum scrolling on iOS
      }}
    >
      {children}
    </div>
  );
};

interface ScrollSnapSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const ScrollSnapSection: React.FC<ScrollSnapSectionProps> = ({ 
  children, 
  className = "", 
  id 
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    
    // Use IntersectionObserver for efficient visibility detection
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // Start preparing when 10% visible
    );
    
    observer.observe(section);
    
    return () => {
      observer.unobserve(section);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id={id}
      className={`min-h-screen w-full snap-start flex flex-col items-center justify-center ${className}`}
      style={{
        transform: "translateZ(0)", // Force GPU acceleration
        opacity: isVisible ? 1 : 0.3, // Fade effect for non-visible sections
        transition: "opacity 0.5s ease" // Smooth transition
      }}
    >
      {children}
    </section>
  );
};

export default ScrollSnapContainer;
