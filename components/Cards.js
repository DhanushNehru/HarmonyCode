import Card from './Card';

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
	GiFlute
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
	BsTropicalStorm
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

const Cards = () => {
	return (
		<div className="flex flex-wrap items-center justify-center gap-4 my-8 w-[90%] mx-auto">
			<Card
				title="Battle"
				Icon={GiBattleAxe}
			/>
			<Card
				title="Beach"
				Icon={FaUmbrellaBeach}
			/>
			<Card
				title="Birds"
				Icon={GiBirdTwitter}
			/>
			<Card
				title="Boat"
				Icon={RiSailboatLine}
			/>
			<Card
				title="Book"
				Icon={BsBook}
			/>
			<Card
				title="Campfire"
				Icon={GiCampfire}
			/>
			<Card
				title="Chill"
				Icon={BsEmojiSunglasses}
			/>
			<Card
				title="Clock"
				Icon={AiOutlineClockCircle}
			/>
			<Card
				title="Drinking"
				Icon={GiDrinking}
			/>
			<Card
				title="Dripping Water"
				Icon={BsDroplet}
			/>
			<Card
				title="Energy"
				Icon={GiRollingEnergy}
			/>
			<Card
				title="Farm"
				Icon={GiFarmTractor}
			/>
			<Card
				title="Fireworks"
				Icon={GiFireworkRocket}
			/>
			<Card
				title="Flute"
				Icon={GiFlute}
			/>
			<Card
				title="Footsteps"
				Icon={RiFootprintLine}
			/>
			<Card
				title="Forest"
				Icon={GiForest}
			/>
			<Card
				title="Grind"
				Icon={GiRockingChair}
			/>
			<Card
				title="Keyboard"
				Icon={BsKeyboard}
			/>
			<Card
				title="Leaves"
				Icon={RiLeafLine}
			/>
			<Card
				title="Mouse"
				Icon={BsMouse}
			/>
			<Card
				title="Polozhenie"
				Icon={ImSigma}
			/>
			<Card
				title="Rain"
				Icon={BiCloudRain}
			/>
			<Card
				title="Retro"
				Icon={BsSunglasses}
			/>
			<Card
				title="River"
				Icon={GiWaterfall}
			/>
			<Card
				title="Road"
				Icon={GiRoad}
			/>
			<Card
				title="Rocket"
				Icon={RiRocketLine}
			/>
			<Card
				title="Snow"
				Icon={BsCloudSnow}
			/>
			<Card
				title="Storm"
				Icon={BsTropicalStorm}
			/>
			<Card
				title="Thunder"
				Icon={AiOutlineThunderbolt}
			/>
			<Card
				title="Train"
				Icon={BiTrain}
			/>
			<Card
				title="Victory"
				Icon={AiOutlineTrophy}
			/>
			<Card
				title="Wildcard"
				Icon={AiOutlineQuestion}
			/>
		</div>
	);
}

export default Cards;
