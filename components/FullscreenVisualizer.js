import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVisualization } from '../context/VisualizationContext';
import MusicVisualizer from './MusicVisualizer';
import VisualizationControls from './VisualizationControls';
import { BsX } from 'react-icons/bs';

const FullscreenVisualizer = () => {
  const { isFullscreen, setIsFullscreen, audioData } = useVisualization();
  const containerRef = useRef(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isFullscreen, setIsFullscreen]);

  // Prevent body scroll when fullscreen
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isFullscreen]);

  if (!isFullscreen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 bg-black"
        ref={containerRef}
      >
        {/* Background gradient that responds to music */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at center, 
              rgba(139, 92, 246, ${audioData.volume * 0.3}) 0%, 
              rgba(59, 130, 246, ${audioData.volume * 0.2}) 30%, 
              rgba(0, 0, 0, 0.9) 70%)`
          }}
          animate={{
            scale: audioData.beat ? 1.05 : 1,
          }}
          transition={{ duration: 0.1 }}
        />

        {/* Main visualizer */}
        <MusicVisualizer className="w-full h-full" />

        {/* Controls overlay */}
        <div className="absolute top-4 right-4 flex items-center gap-4">
          <VisualizationControls />
          
          {/* Close button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsFullscreen(false)}
            className="flex items-center justify-center w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full transition-all duration-200"
          >
            <BsX className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Info overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="absolute bottom-4 left-4 text-white"
        >
          <p className="text-sm opacity-70">Press ESC to exit fullscreen</p>
          {audioData.volume > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs opacity-60">Audio detected</span>
            </div>
          )}
        </motion.div>

        {/* Beat indicator */}
        {audioData.beat && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full pointer-events-none"
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default FullscreenVisualizer;