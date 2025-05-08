
import React, { useEffect, useRef } from "react";
import workerScript from '../workers/particleWorker';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

export const ParticlesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const workerRef = useRef<Worker | null>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReducedMotion) return; // Skip animation for users who prefer reduced motion

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas to full screen with proper device pixel ratio
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    // Create a blob URL from the worker function
    const blob = new Blob(
      [`(${workerScript.toString()})();`],
      { type: 'application/javascript' }
    );
    const workerUrl = URL.createObjectURL(blob);
    
    // Create and setup the worker
    workerRef.current = new Worker(workerUrl);
    workerRef.current.onmessage = (e: MessageEvent) => {
      particlesRef.current = e.data.particles;
    };

    window.addEventListener("resize", handleResize);
    resizeCanvas();
    
    // Initial worker message
    workerRef.current.postMessage({ 
      canvasWidth: window.innerWidth, 
      canvasHeight: window.innerHeight 
    });

    function handleResize() {
      resizeCanvas();
      if (workerRef.current) {
        workerRef.current.postMessage({ 
          canvasWidth: window.innerWidth, 
          canvasHeight: window.innerHeight 
        });
      }
    }

    // Animation function using requestAnimationFrame for optimal performance
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particlesRef.current.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around canvas edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle using only transform and opacity (GPU optimized)
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace(")", `, ${particle.opacity})`).replace("rgb", "rgba");
        ctx.fill();
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate);
    
    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationRef.current);
      if (workerRef.current) {
        workerRef.current.terminate();
        URL.revokeObjectURL(workerUrl);
      }
    };
  }, [prefersReducedMotion]);

  // Return a full-screen canvas with GPU acceleration hints
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 bg-transparent"
      style={{ 
        pointerEvents: "none", 
        transform: "translateZ(0)", // Force GPU acceleration
        willChange: "transform" // Hint to browser for optimization
      }}
      aria-hidden="true"
    />
  );
};

export default ParticlesBackground;
