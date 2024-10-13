import { useState } from "react";
import Card from './Card';

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
import { FaHelicopter, FaGhost } from 'react-icons/fa';
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
		{ title: "Wildcard", icon: AiOutlineQuestion }
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
							singleMode={singleMode}
							playingCard={playingCard}
							handlePlay={handlePlay}
							isPlayingGlobal={singleMode && playingCard === card.title}
						/>
					</animated.div>
				))}
			</div>
		</div>
	);
}

export default Cards;
