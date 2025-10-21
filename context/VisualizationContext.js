import { createContext, useContext, useState, useRef, useEffect } from 'react';

const VisualizationContext = createContext();

export const useVisualization = () => {
  const context = useContext(VisualizationContext);
  if (!context) {
    throw new Error('useVisualization must be used within a VisualizationProvider');
  }
  return context;
};

export const VisualizationProvider = ({ children }) => {
  const [isVisualizationEnabled, setIsVisualizationEnabled] = useState(true);
  const [visualizationType, setVisualizationType] = useState('waveform'); // waveform, bars, particles, circular
  const [intensity, setIntensity] = useState(0.7);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [audioData, setAudioData] = useState({
    frequencyData: new Uint8Array(256),
    timeDomainData: new Uint8Array(256),
    volume: 0,
    beat: false
  });

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const animationFrameRef = useRef(null);
  const beatDetectionRef = useRef({
    lastBeat: 0,
    threshold: 0.3,
    minInterval: 300
  });

  // Initialize Web Audio API
  const initializeAudioContext = (audioElement) => {
    if (!audioContextRef.current) {
      try {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 512;
        analyserRef.current.smoothingTimeConstant = 0.8;
      } catch (error) {
        console.error('Failed to initialize audio context:', error);
        return false;
      }
    }

    if (audioElement && !sourceRef.current) {
      try {
        sourceRef.current = audioContextRef.current.createMediaElementSource(audioElement);
        sourceRef.current.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);
      } catch (error) {
        console.error('Failed to connect audio source:', error);
        return false;
      }
    }

    return true;
  };

  // Beat detection algorithm
  const detectBeat = (frequencyData) => {
    const bassRange = frequencyData.slice(0, 32);
    const bassSum = bassRange.reduce((sum, value) => sum + value, 0);
    const bassAverage = bassSum / bassRange.length;
    
    const now = Date.now();
    const { lastBeat, threshold, minInterval } = beatDetectionRef.current;
    
    if (bassAverage > threshold * 255 && now - lastBeat > minInterval) {
      beatDetectionRef.current.lastBeat = now;
      return true;
    }
    
    return false;
  };

  // Analyze audio data
  const analyzeAudio = () => {
    if (!analyserRef.current) return;

    const frequencyData = new Uint8Array(analyserRef.current.frequencyBinCount);
    const timeDomainData = new Uint8Array(analyserRef.current.frequencyBinCount);
    
    analyserRef.current.getByteFrequencyData(frequencyData);
    analyserRef.current.getByteTimeDomainData(timeDomainData);

    // Calculate volume
    const volume = frequencyData.reduce((sum, value) => sum + value, 0) / frequencyData.length / 255;
    
    // Detect beat
    const beat = detectBeat(frequencyData);

    setAudioData({
      frequencyData,
      timeDomainData,
      volume,
      beat
    });

    animationFrameRef.current = requestAnimationFrame(analyzeAudio);
  };

  // Start visualization
  const startVisualization = (audioElement) => {
    if (!isVisualizationEnabled) return;
    
    if (initializeAudioContext(audioElement)) {
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
      analyzeAudio();
    }
  };

  // Stop visualization
  const stopVisualization = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  // Cleanup
  useEffect(() => {
    return () => {
      stopVisualization();
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);

  const value = {
    // State
    isVisualizationEnabled,
    visualizationType,
    intensity,
    isFullscreen,
    audioData,
    
    // Actions
    setIsVisualizationEnabled,
    setVisualizationType,
    setIntensity,
    setIsFullscreen,
    startVisualization,
    stopVisualization,
    
    // Audio context info
    isAudioContextReady: !!audioContextRef.current
  };

  return (
    <VisualizationContext.Provider value={value}>
      {children}
    </VisualizationContext.Provider>
  );
};