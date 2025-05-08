
// Worker to handle particle calculations
const particleWorker = () => {
  self.onmessage = (e: MessageEvent) => {
    const { canvasWidth, canvasHeight } = e.data;
    
    // Calculate particle positions
    const particles = calculateParticlePositions(canvasWidth, canvasHeight);
    
    // Send back to main thread
    self.postMessage({ particles });
  };
  
  function calculateParticlePositions(width: number, height: number) {
    const particleCount = Math.min(100, Math.max(30, width * height / 15000));
    const particles = [];
    const colors = ["#00F5FF", "#FF00F5", "#0A74E6", "#ffffff"];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    
    return particles;
  }
};

export default particleWorker;
