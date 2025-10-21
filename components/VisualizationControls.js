import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVisualization } from '../context/VisualizationContext';
import { 
  BsSoundwave, 
  BsBarChart, 
  BsCircle, 
  BsStars,
  BsEye,
  BsEyeSlash,
  BsFullscreen,
  BsFullscreenExit,
  BsGear
} from 'react-icons/bs';
import { Slider } from '@mui/material';

const VisualizationControls = ({ className = '' }) => {
  const {
    isVisualizationEnabled,
    visualizationType,
    intensity,
    isFullscreen,
    setIsVisualizationEnabled,
    setVisualizationType,
    setIntensity,
    setIsFullscreen
  } = useVisualization();

  const [isExpanded, setIsExpanded] = useState(false);

  const visualizationTypes = [
    { id: 'waveform', name: 'Waveform', icon: BsSoundwave },
    { id: 'bars', name: 'Bars', icon: BsBarChart },
    { id: 'circular', name: 'Circular', icon: BsCircle },
    { id: 'particles', name: 'Particles', icon: BsStars }
  ];

  const toggleVisualization = () => {
    setIsVisualizationEnabled(!isVisualizationEnabled);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleIntensityChange = (event, newValue) => {
    setIntensity(newValue / 100);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Main toggle button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300
          ${isVisualizationEnabled 
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
            : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
          }
          hover:shadow-xl
        `}
      >
        <BsGear className={`w-4 h-4 ${isExpanded ? 'animate-spin' : ''}`} />
        <span className="text-sm font-medium">Visualizer</span>
      </motion.button>

      {/* Expanded controls */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 right-0 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 min-w-[280px] z-50"
          >
            {/* Enable/Disable Toggle */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Enable Visualization
              </span>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={toggleVisualization}
                className={`
                  flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-all
                  ${isVisualizationEnabled 
                    ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }
                `}
              >
                {isVisualizationEnabled ? <BsEye /> : <BsEyeSlash />}
                {isVisualizationEnabled ? 'On' : 'Off'}
              </motion.button>
            </div>

            {isVisualizationEnabled && (
              <>
                {/* Visualization Type Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Visualization Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {visualizationTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <motion.button
                          key={type.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setVisualizationType(type.id)}
                          className={`
                            flex items-center gap-2 p-2 rounded-lg text-sm transition-all
                            ${visualizationType === type.id
                              ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 border-2 border-purple-300 dark:border-purple-600'
                              : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border-2 border-transparent hover:bg-gray-100 dark:hover:bg-gray-600'
                            }
                          `}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{type.name}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Intensity Slider */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Intensity: {Math.round(intensity * 100)}%
                  </label>
                  <Slider
                    value={intensity * 100}
                    onChange={handleIntensityChange}
                    min={10}
                    max={200}
                    step={10}
                    className="text-purple-500"
                    sx={{
                      color: '#8b5cf6',
                      '& .MuiSlider-thumb': {
                        backgroundColor: '#8b5cf6',
                      },
                      '& .MuiSlider-track': {
                        backgroundColor: '#8b5cf6',
                      },
                      '& .MuiSlider-rail': {
                        backgroundColor: '#e5e7eb',
                      },
                    }}
                  />
                </div>

                {/* Fullscreen Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Fullscreen Mode
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleFullscreen}
                    className={`
                      flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-all
                      ${isFullscreen 
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                      }
                    `}
                  >
                    {isFullscreen ? <BsFullscreenExit /> : <BsFullscreen />}
                    {isFullscreen ? 'Exit' : 'Enter'}
                  </motion.button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default VisualizationControls;