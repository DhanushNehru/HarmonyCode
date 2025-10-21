import Card from './Card';
import { useState, useRef, useEffect } from 'react'
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
	GiCuckooClock,
	GiGuitar,
	GiPianoKeys,
	GiViolin,
	GiDrumKit,
	GiMicrophone,
	GiSpeaker,
	GiHeadphones,
	GiSaxophone,
	GiTrumpet,
	GiHarp
} from 'react-icons/gi';
import { FaUmbrellaBeach, FaMusic, FaCompactDisc } from 'react-icons/fa';
import {
	RiSailboatLine,
	RiLeafLine,
	RiRocketLine,
	RiFootprintLine,
	RiMusic2Line,
	RiSoundModuleLine,
	RiEqualizerLine
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
	BsTelephone,
	BsMusicNoteBeamed,
	BsSoundwave,
	BsVolumeUp
} from 'react-icons/bs';
import {
	AiOutlineClockCircle,
	AiOutlineThunderbolt,
	AiOutlineTrophy,
	AiOutlineQuestion,
	AiOutlineSound
} from 'react-icons/ai';
import { ImSigma } from 'react-icons/im';
import {
	BiCloudRain,
	BiTrain,
	BiMusic
} from 'react-icons/bi';
import { FaHelicopter, FaGhost, FaStop } from 'react-icons/fa';
import { useTransition, animated } from "@react-spring/web";

const Cards = () => {
	const [singleMode, setSingleMode] = useState(false);
	const [playingCard, setPlayingCard] = useState(null);
	const [isPlayingGlobal, setIsPlayingGlobal] = useState(false);

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
		{ title: "Wildcard", icon: AiOutlineQuestion },
		// New Music-themed components
		{ title: "Guitar", icon: GiGuitar },
		{ title: "Piano", icon: GiPianoKeys },
		{ title: "Violin", icon: GiViolin },
		{ title: "Drums", icon: GiDrumKit },
		{ title: "Microphone", icon: GiMicrophone },
		{ title: "Speaker", icon: GiSpeaker },
		{ title: "Headphones", icon: GiHeadphones },
		{ title: "Saxophone", icon: GiSaxophone },
		{ title: "Trumpet", icon: GiTrumpet },
		{ title: "Harp", icon: GiHarp },
		{ title: "Music", icon: FaMusic },
		{ title: "Compact Disc", icon: FaCompactDisc },
		{ title: "Music 2", icon: RiMusic2Line },
		{ title: "Sound Module", icon: RiSoundModuleLine },
		{ title: "Equalizer", icon: RiEqualizerLine },
		{ title: "Music Note Beamed", icon: BsMusicNoteBeamed },
		{ title: "Soundwave", icon: BsSoundwave },
		{ title: "Volume Up", icon: BsVolumeUp },
		{ title: "Sound", icon: AiOutlineSound },
		{ title: "Music 3", icon: BiMusic }
	];

	const handlePlay = (title) => {
		if (title === null) {
			setPlayingCard(null);
			setIsPlayingGlobal(false);
		} else {
			setPlayingCard(title);
			setIsPlayingGlobal(true);
		}
	};

	const playingCardsRef = useRef(new Set());
	const stopAllRef = useRef(null);
	const { currentUser, isFirebaseAvailable } = useAuth();
	useEffect(() => {
		// Only stop all sounds if Firebase is available and user is not signed in
		if (isFirebaseAvailable && !currentUser) {
			handleStopAll();
		}
	}, [currentUser, isFirebaseAvailable]);
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
		<div className="w-[90%] mx-auto my-8">
			<div className="flex justify-between items-center mb-4">

				<button
					className="px-4 py-2 bg-blue-500 text-white rounded"
					onClick={() => setSingleMode(!singleMode)}
				>
					{singleMode ? 'Multiple Mode' : 'Single Mode'}
				</button>
			</div>
			<div className="flex flex-wrap items-center justify-center gap-4">
				<AiRecommendation data={cardsData} />
				{transition((style, card) => (
					<animated.div style={style}>
						<Card
							key={card.title}
							title={card.title}
							Icon={card.icon}
							onPlayStateChange={(isPlaying) => handlePlayStateChange(card.title, isPlaying)}
							singleMode={singleMode}
							playingCard={playingCard}
							handlePlay={handlePlay}
							isPlayingGlobal={singleMode && playingCard === card.title}
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
		</div>
	);
}

export default Cards;
