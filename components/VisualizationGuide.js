import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsQuestionCircle, BsX, BsGear, BsFullscreen, BsEye } from 'react-icons/bs';

const VisualizationGuide = () => {
  const [isOpen, setIsOpen] = useState(false);

  const steps = [
    {
      icon: BsEye,
      title: "Enable Visualizations",
      description: "Click the Visualizer button in the top-right corner and toggle 'Enable Visualization' to ON."
    },
    {
      icon: BsGear,
      title: "Choose Your Style",
      description: "Select from 4 visualization types: Waveform, Bars, Circular, or Particles. Each offers a unique visual experience."
    },
    {
      icon: BsFullscreen,
      title: "Go Fullscreen",
      description: "Click 'Enter Fullscreen' for an immersive experience. Press ESC to exit anytime."
    },
    {
      title: "🎵 Play Music",
      description: "Start playing any music card. Watch as the visualizations react to beats, volume, and frequency in real-time!"
    }
  ];

  return (
    <>
      {/* Help Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-40 flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-200"
      >
        <BsQuestionCircle className="w-4 h-4" />
        <span className="text-sm font-medium">Visualization Guide</span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black bg-opacity-50 z-50"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 max-w-md w-full mx-4 z-50"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  🌈 How to Use Visualizations
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <BsX className="w-6 h-6" />
                </button>
              </div>

              {/* Steps */}
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      {step.icon ? (
                        <step.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      ) : (
                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                          {index + 1}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white text-sm">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-xs mt-1">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-6 p-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-lg">
                <p className="text-xs text-center text-gray-700 dark:text-gray-300">
                  💡 <strong>Pro Tip:</strong> Try different visualization types with different music genres for the best experience!
                </p>
              </div>

              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(false)}
                className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors duration-200"
              >
                Got it! Let&apos;s visualize 🎵
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default VisualizationGuide;