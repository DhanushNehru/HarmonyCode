import { useState, useRef } from 'react';

import { Slider } from '@mui/material';

const Card = ({ title, Icon }) => {
	const [volume, setVolume] = useState(1);
	const [isPlaying, setIsPlaying] = useState(false);
	const audioRef = useRef(null);

	const changeVolume = event => {
		setVolume(event.target.value / 100);
		audioRef.current.volume = volume;
	}

	const startStopSound = () => {
		if(!isPlaying) {
			audioRef.current.play();
		}
		else {
			audioRef.current.pause();
		}

		setIsPlaying(!isPlaying);
	}

	return (
		<div className={`relative bg-white p-4 rounded-2xl w-[240px] h-[220px] shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-150 flex flex-col space-y-4 dark:bg-[#252424] ${isPlaying && 'border-4 border-blue-500'}`}>
			<div onClick={startStopSound} className="h-full">
				<h3 className="text-gray-500 dark:text-gray-200">{title}</h3>

				<Icon className="text-gray-500 w-full h-1/2 mt-4" />
			</div>

			{
				isPlaying && (
					<div className="absolute bottom-0 left-0 right-0 bg-[whitesmoke] rounded-b-2xl flex items-center justify-center p-2 dark:bg-[#1a1a1a]">
						<Slider
							aria-label="Volume"
							value={volume * 100}
							onChange={changeVolume}
							className="m-auto"
							style={{ width: '75%' }}
						/>
					</div>
				)
			}

			<audio
				src={`/sounds/${!title.includes(" ") ? `${title[0].toLowerCase()}${title.slice(1)}` : `${title.slice(0, title.indexOf(" "))}_${title.slice((title.indexOf(" ") + 1))}`}.mp3`}
				controls
				ref={audioRef}
				loop
				className="hidden"
			></audio>
		</div>
	);
}

export default Card;
