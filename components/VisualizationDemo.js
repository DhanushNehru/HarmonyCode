import { useState } from 'react';
import { motion } from 'framer-motion';
import { useVisualization } from '../context/VisualizationContext';
import { BsPlay, BsPause, BsVolumeUp } from 'react-icons/bs';

const VisualizationDemo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { 
    isVisualizationEnabled, 
    visualizationType, 
    audioData 
  } = useVisualization();

  const demoFeatures = [
    {
      title: "Real-time Beat Detection",
      description: "Advanced algorithm detects beats and musical peaks",
      status: audioData.beat ? "🔥 Beat Detected!" : "🎵 Listening..."
    },
    {
      title: "Dynamic Color Adaptation", 
      description: "Colors change based on music intensity and mood",
      status: `🎨 Volume: ${Math.round(audioData.volume * 100)}%`
    },
    {
      title: "Multiple Visualization Types",
      description: "Choose from waveform, bars, circular, or particles",
      status: `🌟 Current: ${visualizationType}`
    },
    {
      title: "Fullscreen Experience",
      description: "Immersive fullscreen mode for maximum impact",
      status: isVisualizationEnabled ? "✅ Enabled" : "⏸️ Disabled"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-md mx-auto mt-8"
    >
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
          🌈 Visualization System
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Experience music like never before with dynamic visuals
        </p>
      </div>

      <div className="space-y-4">
        {demoFeatures.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 dark:text-white text-sm">
                  {feature.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-xs mt-1">
                  {feature.description}
                </p>
              </div>
              <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full ml-2">
                {feature.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          🎵 Play any music card to see the visualizations in action!
        </p>
      </div>
    </motion.div>
  );
};

export default VisualizationDemo;