import { useEffect } from 'react';

import { useTheme } from 'next-themes';

import { SunIcon, MoonIcon } from '@heroicons/react/outline';

const ThemeToggler = () => {
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		if(theme === 'dark') {
			document.body.style.backgroundColor = "#303030";
		}
		else {
			document.body.style.backgroundColor = "whitesmoke";
		}
	}, []);

	const toggleTheme = () => {
		if(theme === 'dark') {
			document.body.style.backgroundColor = "whitesmoke";
		}
		else {
			document.body.style.backgroundColor = "#303030";
		}

		setTheme(theme === 'dark' ? 'light' : 'dark');
	}

	return (
		<div
			className="h-12 w-12 rounded-full bg-white flex items-center justify-center p-2 shadow-md fixed right-0 bottom-0 m-4 cursor-pointer transition-all duration-100 hover:bg-gray-100 dark:bg-[#1a1a1a]"
			onClick={toggleTheme}
		>
			{
				theme === 'dark' ? <SunIcon className="h-10 text-gray-400" /> : <MoonIcon className="h-10 text-gray-500" />
			}
		</div>
	);
}

export default ThemeToggler;
