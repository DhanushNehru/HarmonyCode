import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVisualization } from '../context/VisualizationContext';
import { useTheme } from 'next-themes';
import { COLOR_PALETTE, GRADIENTS } from '../constants/colors';

const MusicVisualizer = ({ className = '' }) => {
  const canvasRef = useRef(null);
  const { 
    isVisualizationEnabled, 
    visualizationType, 
    intensity, 
    audioData,
    isFullscreen 
  } = useVisualization();
  const { theme } = useTheme();
  const [dominantColor, setDominantColor] = useState(COLOR_PALETTE[0]);
  const animationRef = useRef(null);

  // Get theme-appropriate colors
  const getThemeColors = () => {
    const isDark = theme === 'dark';
    return {
      background: isDark ? '#1a1a1a' : '#ffffff',
      primary: dominantColor,
      secondary: COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)],
      accent: isDark ? '#ffffff' : '#000000'
    };
  };

  // Update dominant color based on audio intensity
  useEffect(() => {
    if (audioData.volume > 0.1) {
      const colorIndex = Math.floor(audioData.volume * COLOR_PALETTE.length);
      setDominantColor(COLOR_PALETTE[colorIndex] || COLOR_PALETTE[0]);
    }
  }, [audioData.volume]);

  // Waveform visualization
  const drawWaveform = (ctx, canvas, colors) => {
    const { timeDomainData, volume, beat } = audioData;
    const width = canvas.width;
    const height = canvas.height;
    const centerY = height / 2;

    ctx.clearRect(0, 0, width, height);
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, colors.background + '20');
    gradient.addColorStop(1, colors.primary + '10');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Waveform
    ctx.beginPath();
    ctx.strokeStyle = colors.primary;
    ctx.lineWidth = beat ? 4 : 2;
    ctx.shadowColor = colors.primary;
    ctx.shadowBlur = beat ? 20 : 10;

    const sliceWidth = width / timeDomainData.length;
    let x = 0;

    for (let i = 0; i < timeDomainData.length; i++) {
      const v = timeDomainData[i] / 128.0;
      const y = (v * height * intensity) / 2;

      if (i === 0) {
        ctx.moveTo(x, centerY + y);
      } else {
        ctx.lineTo(x, centerY + y);
      }

      x += sliceWidth;
    }

    ctx.stroke();

    // Beat pulse effect
    if (beat) {
      ctx.beginPath();
      ctx.arc(width / 2, centerY, 50 * volume * intensity, 0, 2 * Math.PI);
      ctx.fillStyle = colors.primary + '30';
      ctx.fill();
    }
  };

  // Frequency bars visualization
  const drawBars = (ctx, canvas, colors) => {
    const { frequencyData, volume, beat } = audioData;
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const barCount = Math.min(frequencyData.length / 2, 64);
    const barWidth = width / barCount;

    for (let i = 0; i < barCount; i++) {
      const barHeight = (frequencyData[i] / 255) * height * intensity;
      const x = i * barWidth;
      const y = height - barHeight;

      // Bar gradient
      const gradient = ctx.createLinearGradient(0, height, 0, y);
      gradient.addColorStop(0, colors.primary);
      gradient.addColorStop(1, colors.secondary);

      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth - 2, barHeight);

      // Beat effect
      if (beat && barHeight > height * 0.5) {
        ctx.shadowColor = colors.primary;
        ctx.shadowBlur = 20;
        ctx.fillRect(x, y, barWidth - 2, barHeight);
        ctx.shadowBlur = 0;
      }
    }
  };

  // Circular visualization
  const drawCircular = (ctx, canvas, colors) => {
    const { frequencyData, volume, beat } = audioData;
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 4;

    ctx.clearRect(0, 0, width, height);

    // Background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = colors.primary + '30';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Frequency bars in circle
    const barCount = Math.min(frequencyData.length / 4, 64);
    const angleStep = (2 * Math.PI) / barCount;

    for (let i = 0; i < barCount; i++) {
      const angle = i * angleStep;
      const barHeight = (frequencyData[i] / 255) * radius * intensity;
      
      const x1 = centerX + Math.cos(angle) * radius;
      const y1 = centerY + Math.sin(angle) * radius;
      const x2 = centerX + Math.cos(angle) * (radius + barHeight);
      const y2 = centerY + Math.sin(angle) * (radius + barHeight);

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = colors.primary;
      ctx.lineWidth = beat ? 4 : 2;
      ctx.stroke();
    }

    // Center pulse
    if (volume > 0.1) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, volume * 30 * intensity, 0, 2 * Math.PI);
      ctx.fillStyle = colors.primary + (beat ? '60' : '30');
      ctx.fill();
    }
  };

  // Particle system visualization
  const drawParticles = (ctx, canvas, colors) => {
    const { frequencyData, volume, beat } = audioData;
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Create particles based on frequency data
    const particleCount = Math.floor(volume * 50 * intensity);
    
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = (frequencyData[i % frequencyData.length] / 255) * 10 * intensity;
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI);
      ctx.fillStyle = colors.primary + (beat ? '80' : '40');
      ctx.fill();

      if (beat) {
        ctx.shadowColor = colors.primary;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }
  };

  // Main animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisualizationEnabled) return;

    const ctx = canvas.getContext('2d');
    const colors = getThemeColors();

    // Resize canvas to match container
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Draw based on visualization type
    switch (visualizationType) {
      case 'waveform':
        drawWaveform(ctx, canvas, colors);
        break;
      case 'bars':
        drawBars(ctx, canvas, colors);
        break;
      case 'circular':
        drawCircular(ctx, canvas, colors);
        break;
      case 'particles':
        drawParticles(ctx, canvas, colors);
        break;
      default:
        drawWaveform(ctx, canvas, colors);
    }

    animationRef.current = requestAnimationFrame(animate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisualizationEnabled, visualizationType, intensity, audioData, theme]);

  // Start/stop animation
  useEffect(() => {
    if (isVisualizationEnabled && audioData.volume > 0) {
      animate();
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisualizationEnabled, visualizationType, intensity, audioData, theme]);

  if (!isVisualizationEnabled) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`relative overflow-hidden rounded-lg ${className}`}
        style={{
          background: isFullscreen 
            ? 'linear-gradient(45deg, #000000, #1a1a1a)' 
            : 'transparent'
        }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{
            filter: audioData.beat ? 'brightness(1.2) saturate(1.3)' : 'none',
            transition: 'filter 0.1s ease-out'
          }}
        />
        
        {/* Beat pulse overlay */}
        {audioData.beat && (
          <motion.div
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.1, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${dominantColor}20 0%, transparent 70%)`
            }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default MusicVisualizer;