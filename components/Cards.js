import Card from './Card';
import {useRef, useEffect} from 'react'
import { useAuth } from '../context/AuthContext.js';
import AiRecommendation from './AiRecommendation';
import {
	GiBattleAxe,
	GiBirdTwitter,
	GiCampfire,
	GiDrinking,
	GiRollingEnergy,
	GiFarmTractor,
	GiFireworkRocket,
	GiForest,
	GiRockingChair,
	GiWaterfall,
	GiRoad,
	GiFlute,
	GiCuckooClock
} from 'react-icons/gi';
import { FaUmbrellaBeach } from 'react-icons/fa';
import {
	RiSailboatLine,
	RiLeafLine,
	RiRocketLine,
	RiFootprintLine
} from 'react-icons/ri';
import {
	BsBook,
	BsEmojiSunglasses,
	BsDroplet,
	BsKeyboard,
	BsMouse,
	BsSunglasses,
	BsCloudSnow,
	BsTropicalStorm,
	BsTelephone
} from 'react-icons/bs';
import {
	AiOutlineClockCircle,
	AiOutlineThunderbolt,
	AiOutlineTrophy,
	AiOutlineQuestion
} from 'react-icons/ai';
import { ImSigma } from 'react-icons/im';
import {
	BiCloudRain,
	BiTrain
} from 'react-icons/bi';
import { FaHelicopter, FaGhost, FaStop } from 'react-icons/fa';
import { useTransition, animated } from "@react-spring/web";

const Cards = () => {

	const cardsData = [
		{ title: "Battle", icon: GiBattleAxe },
		{ title: "Beach", icon: FaUmbrellaBeach },
		{ title: "Birds", icon: GiBirdTwitter },
		{ title: "Boat", icon: RiSailboatLine },
		{ title: "Book", icon: BsBook },
		{ title: "Campfire", icon: GiCampfire },
		{ title: "Chill", icon: BsEmojiSunglasses },
		{ title: "Clock", icon: AiOutlineClockCircle },
		{ title: "Clock Bell", icon: GiCuckooClock },
		{ title: "Drinking", icon: GiDrinking },
		{ title: "Dripping Water", icon: BsDroplet },
		{ title: "Energy", icon: GiRollingEnergy },
		{ title: "Farm", icon: GiFarmTractor },
		{ title: "Fireworks", icon: GiFireworkRocket },
		{ title: "Flute", icon: GiFlute },
		{ title: "Footsteps", icon: RiFootprintLine },
		{ title: "Forest", icon: GiForest },
		{ title: "Grind", icon: GiRockingChair },
		{ title: "Helicopter", icon: FaHelicopter },
		{ title: "Keyboard", icon: BsKeyboard },
		{ title: "Leaves", icon: RiLeafLine },
		{ title: "Mouse", icon: BsMouse },
		{ title: "Polozhenie", icon: ImSigma },
		{ title: "Rain", icon: BiCloudRain },
		{ title: "Retro", icon: BsSunglasses },
		{ title: "River", icon: GiWaterfall },
		{ title: "Road", icon: GiRoad },
		{ title: "Rocket", icon: RiRocketLine },
		{ title: "Snow", icon: BsCloudSnow },
		{ title: "Spooky", icon: FaGhost },
		{ title: "Storm", icon: BsTropicalStorm },
		{ title: "Telephone", icon: BsTelephone },
		{ title: "Thunder", icon: AiOutlineThunderbolt },
		{ title: "Train", icon: BiTrain },
		{ title: "Victory", icon: AiOutlineTrophy },
		{ title: "Wildcard", icon: AiOutlineQuestion }
	];
	const playingCardsRef = useRef(new Set());
  	const stopAllRef = useRef(null);
	const { currentUser } = useAuth();
	useEffect(() => {
		if (!currentUser) {
		  handleStopAll();
		}
	  }, [currentUser]);
  	const handlePlayStateChange = (title, isPlaying) => {
  	  if (isPlaying) {
  	    playingCardsRef.current.add(title);
  	  } else {
  	    playingCardsRef.current.delete(title);
  	  }
	
  	  // Update stop all button visibility
  	  if (stopAllRef.current) {
  	    if (playingCardsRef.current.size > 0) {
  	      stopAllRef.current.classList.remove('hidden');
  	    } else {
  	      stopAllRef.current.classList.add('hidden');
  	    }
  	  }
  	};

  	const handleStopAll = () => {
  	  const event = new CustomEvent('stopAllSounds');
  	  window.dispatchEvent(event);
  	  playingCardsRef.current.clear();
  	  if (stopAllRef.current) {
  	    stopAllRef.current.classList.add('hidden');
  	  }
  	};

	const transition = useTransition(cardsData, {
		from: { opacity: 0.2 },
		enter: { opacity: 1 },
		config: { tension: 220, friction: 120 },
		trail: 130
	  });

	return (
		<div className="flex flex-wrap items-center justify-center gap-4 my-8 w-[90%] mx-auto">
			<AiRecommendation data = { cardsData } />
			{transition((style, card) => (
				<animated.div style={style}>
					<Card
						key={card.title}
						title={card.title}
						Icon={card.icon}
						onPlayStateChange={(isPlaying) => handlePlayStateChange(card.title, isPlaying)}
					/>
				</animated.div>
            ))}
			<button
        		ref={stopAllRef}
        		onClick={handleStopAll}
        		className="fixed bottom-20 right-4 bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-4 rounded-full shadow-lg transition-all duration-150 transform hover:scale-105 hidden"
      		>
       		 <FaStop />
     		</button>
		</div>
	);
}

export default Cards;
