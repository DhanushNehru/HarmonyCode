import { useState, useRef, useEffect } from 'react';

import { useAuth } from '../context/AuthContext.js';

import { Slider } from '@mui/material';

const Card = ({ title, Icon, onPlayStateChange }) => {
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const { currentUser, googleSignIn } = useAuth();
  useEffect(() => {
    const handleStopAll = () => {
      if (isPlaying && audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
        onPlayStateChange(false);
      }
    };

    window.addEventListener('stopAllSounds', handleStopAll);
    
    return () => {
      window.removeEventListener('stopAllSounds', handleStopAll);
    };
  }, [isPlaying, onPlayStateChange]);
  const colors = [
    '#00ccff', // Electric Blue
    '#33ff33', // Neon Green
    '#ff3399', // Vibrant Pink
    '#cc33ff', // Electric Purple
    '#ff9933', // Radiant Orange
    '#FFD700', // Gold
    '#ff3333', // Fiery Red
    '#00ffff', // Aqua Blue
    '#33cc33', // Brilliant Green
    '#ff66cc', // Hot Pink
  ];

  // function to generate random color
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
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
    if (currentUser) {
      return true;
    }

    try {
      googleSignIn().then(() => {
        return true;
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const changeVolume = (event) => {
    setVolume(event.target.value / 100);
    audioRef.current.volume = volume;
  };

  const startStopSound = () => {
    if (checkAuth()) {
      if (!isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }

      setIsPlaying(!isPlaying);
      onPlayStateChange(!isPlaying);
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
      className={`relative bg-white p-4 rounded-2xl w-[240px] h-[220px] shadow-lg hover:shadow-2xl hover:bg-gray-200 hover:translate-y-1 cursor-pointer transition-all duration-150 flex flex-col space-y-4 dark:bg-[#252424] hover:dark:bg-[black] ${
        isPlaying && 'border-4 border-blue-500'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={glowEffectStyles}
    >
      <div onClick={startStopSound} className="h-full">
        <h3
          className="text-gray-500 dark:text-gray-200"
          style={{
            transition: 'all 0.2s ease-in-out',
            color: isHovered && randomColor,
          }}
        >
          {title}
        </h3>

        <Icon
          className="text-gray-500 w-full h-1/2 mt-4"
          style={{
            transition: 'all 0.2s ease-in-out',
            color: isHovered && randomColor,
          }}
        />
      </div>

      {isPlaying && (
        <div className="absolute bottom-0 left-0 right-0 bg-[whitesmoke] rounded-b-2xl flex items-center justify-center p-2 dark:bg-[#1a1a1a]">
          <Slider
            aria-label="Volume"
            value={volume * 100}
            onChange={changeVolume}
            className="m-auto"
            style={{ width: '75%' }}
          />
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
