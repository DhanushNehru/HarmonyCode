import { useState, useRef, useEffect } from 'react';

import { useAuth } from '../context/AuthContext.js';
import { useVisualization } from '../context/VisualizationContext.js';
import { COLOR_PALETTE } from '../constants/colors.js';
import MusicVisualizer from './MusicVisualizer.js';

import Slider from '@mui/material/Slider';

const Card = ({ 
  title, 
  Icon, 
  onPlayStateChange = () => {}, 
  singleMode = false, 
  playingCard = null, 
  handlePlay = () => {}, 
  isPlayingGlobal = false 
}) => {
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const { currentUser, googleSignIn, isFirebaseAvailable } = useAuth();
  const { startVisualization, stopVisualization, isVisualizationEnabled } = useVisualization();
  useEffect(() => {
    const handleStopAll = () => {
      if (isPlaying && audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
        onPlayStateChange(false);
        stopVisualization();
      }
    };

    window.addEventListener('stopAllSounds', handleStopAll);
    
    return () => {
      window.removeEventListener('stopAllSounds', handleStopAll);
    };
  }, [isPlaying, onPlayStateChange, stopVisualization]);

  // useEffect() for single mode
  useEffect(() => {
    if (singleMode) {
      if (playingCard === title) {
        audioRef.current.play();
        if (isVisualizationEnabled) {
          startVisualization(audioRef.current);
        }
      } else {
        audioRef.current.pause();
        stopVisualization();
      }
    }
  }, [playingCard, singleMode, isVisualizationEnabled, startVisualization, stopVisualization, title]);

  // function to generate random color
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * COLOR_PALETTE.length);
    return COLOR_PALETTE[randomIndex];
  };

  // invoking random color function
  const randomColor = getRandomColor();

  // Create a state variable to track hover state
  const [isHovered, setIsHovered] = useState(false);

  const glowEffectStyles = {
    boxShadow: isHovered
      ? `0 0 10px 5px ${randomColor}, 0 0 10px 5px ${randomColor}`
      : 'none',
    transition: 'all 0.2s ease-in-out',
  };

  const checkAuth = () => {
    // If user is already signed in, allow access
    if (currentUser) {
      return true;
    }
    
    if (!isFirebaseAvailable) {
      // If Firebase is not configured, allow access without authentication
      console.log('Firebase not configured - allowing access without authentication');
      return true;
    }

    // If Firebase is available but user not signed in, try to sign in
    try {
      googleSignIn().then(() => {
        return true;
      }).catch((error) => {
        console.log('Sign-in failed:', error);
        return false;
      });
    } catch (error) {
      console.log('Authentication error:', error);
      return false;
    }
    
    return false;
  };

  const changeVolume = (event) => {
    setVolume(event.target.value / 100);
    audioRef.current.volume = volume;
  };

  const startStopSound = () => {
    if (checkAuth()) {
      if (singleMode) {
        if (playingCard === title) {
          handlePlay(null);
          stopVisualization();
        } else {
          handlePlay(title);
          if (audioRef.current && isVisualizationEnabled) {
            startVisualization(audioRef.current);
          }
        }
      }
      else{
        if (!isPlaying) {
          audioRef.current.play();
          if (isVisualizationEnabled) {
            startVisualization(audioRef.current);
          }
        } else {
          audioRef.current.pause();
          stopVisualization();
        }

        setIsPlaying(!isPlaying);
        onPlayStateChange(!isPlaying);
      }
    }
  };

  const getSrc = (title) => {
    let src = '/sounds/';
    const firstCharacterLower = title[0].toLowerCase();

    if (title.includes(' ')) {
      const spaceIndex = title.indexOf(' ');
      src +=
        firstCharacterLower +
        title.slice(1, spaceIndex) +
        '_' +
        title[spaceIndex + 1].toLowerCase() +
        title.slice(spaceIndex + 2);
    } else {
      src += firstCharacterLower + title.slice(1);
    }
    src += '.mp3';
    return src;
  };

  return (
    <div
      className={`relative bg-white p-4 rounded-2xl w-[240px] h-[220px] shadow-lg hover:shadow-2xl hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-100 hover:translate-y-[-4px] hover:scale-105 cursor-pointer transition-all duration-300 ease-out flex flex-col space-y-4 dark:bg-[#252424] hover:dark:bg-gradient-to-br hover:dark:from-gray-800 hover:dark:to-gray-900 ${
        isPlaying && 'border-4 border-blue-500 ring-4 ring-blue-200 dark:ring-blue-800'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={glowEffectStyles}
    >
      <div onClick={startStopSound} className="h-full">
        <h3
          className="text-gray-600 dark:text-gray-200 font-semibold text-lg"
          style={{
            transition: 'all 0.3s ease-in-out',
            color: isHovered ? randomColor : undefined,
            textShadow: isHovered ? `0 0 10px ${randomColor}40` : 'none',
          }}
        >
          {title}
        </h3>

        <Icon
          className="text-gray-500 w-full h-1/2 mt-4 transition-all duration-300 ease-out"
          style={{
            color: isHovered ? randomColor : undefined,
            transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
            filter: isHovered ? `drop-shadow(0 0 8px ${randomColor}60)` : 'none',
          }}
        />
      </div>

      {(isPlaying || isPlayingGlobal) && (
        <div className="absolute bottom-0 left-0 right-0 bg-[whitesmoke] rounded-b-2xl dark:bg-[#1a1a1a]">
          {/* Mini visualizer */}
          {isVisualizationEnabled && (
            <div className="h-8 mb-2 mx-2 mt-2 rounded overflow-hidden">
              <MusicVisualizer className="w-full h-full" />
            </div>
          )}
          
          {/* Volume control */}
          <div className="flex items-center justify-center p-2">
            <Slider
              aria-label="Volume"
              value={volume * 100}
              onChange={changeVolume}
              className="m-auto"
              style={{ width: '75%' }}
            />
          </div>
        </div>
      )}

      <audio
        src={getSrc(title)}
        controls
        ref={audioRef}
        loop
        className="hidden"
      ></audio>
    </div>
  );
};

export default Card;
