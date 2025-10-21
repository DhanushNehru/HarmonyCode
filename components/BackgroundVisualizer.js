import { useEffect, useRef, useCallback } from 'react';
import { useVisualization } from '../context/VisualizationContext';
import { useTheme } from 'next-themes';
import { COLOR_PALETTE } from '../constants/colors';

const BackgroundVisualizer = ({ className = '' }) => {
  const canvasRef = useRef(null);
  const { isVisualizationEnabled, audioData } = useVisualization();
  const { theme } = useTheme();
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  // Initialize particles
  useEffect(() => {
    const initParticles = () => {
      particlesRef.current = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1,
        color: COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)]
      }));
    };

    initParticles();
    window.addEventListener('resize', initParticles);
    return () => window.removeEventListener('resize', initParticles);
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisualizationEnabled) return;

    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Update and draw particles
    particlesRef.current.forEach(particle => {
      // Update position based on audio
      const audioInfluence = audioData.volume * 2;
      particle.x += particle.vx + (audioData.beat ? audioInfluence : 0);
      particle.y += particle.vy + (audioData.beat ? audioInfluence : 0);

      // Wrap around screen
      if (particle.x < 0) particle.x = width;
      if (particle.x > width) particle.x = 0;
      if (particle.y < 0) particle.y = height;
      if (particle.y > height) particle.y = 0;

      // Update opacity based on audio
      const baseOpacity = theme === 'dark' ? 0.1 : 0.05;
      particle.opacity = baseOpacity + (audioData.volume * 0.2);

      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, 2 * Math.PI);
      ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
      ctx.fill();

      // Draw connections between nearby particles
      particlesRef.current.forEach(otherParticle => {
        if (particle.id >= otherParticle.id) return;

        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          const connectionOpacity = (1 - distance / 100) * particle.opacity * 0.5;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.strokeStyle = particle.color + Math.floor(connectionOpacity * 255).toString(16).padStart(2, '0');
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [isVisualizationEnabled, audioData, theme]);

  // Start/stop animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    if (isVisualizationEnabled) {
      animate();
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisualizationEnabled, audioData, theme]);

  if (!isVisualizationEnabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{
        mixBlendMode: theme === 'dark' ? 'screen' : 'multiply',
        opacity: 0.6
      }}
    />
  );
};

export default BackgroundVisualizer;