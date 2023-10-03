import { useState, useEffect } from "react";
// import GoogleSignIn from "./GoogleSignIn";

const Header = () => {
	const [stars, setStars] = useState(0);
	// Fetch the number of stargazers of the repository (harmonycode)
	useEffect(() => {
		const perPage = 100; // Number of repositories per page (maximum is often 100)
		const page = 1;

		const fetchStars = async () => {
			const response = await fetch(
				`https://api.github.com/users/DhanushNehru/repos?per_page=${perPage}&page=${page}`
			);
			const repos = await response.json();

			const repo = repos.filter((repo) => repo.name === "HarmonyCode");

			const stars = repo[0].stargazers_count;

			setStars(stars);
		};

		fetchStars();
	}, []);

	return (
		<header className="w-full bg-[#fafafa] flex items-center justify-between shadow-sm p-2 dark:bg-[#1a1a1a]">
			{/* Logo */}
			<div>
				<h1 className="font-bold text-md md:text-2xl lg:text-2xl text-gray-700 dark:text-gray-300">
					Harmony Code 🎶
				</h1>
			</div>
			
			<div className="flex items-center space-x-2">
				{/* Google Login */}
					{/* <GoogleSignIn/> */}
				{/* Github Card */}
				<a
					href="https://www.github.com/DhanushNehru"
					className="hidden md:block lg:block"
				>
					<div className="flex items-center border border-gray-300 rounded-md px-2 py-1 bg-white transition-all duration-250 hover:bg-yellow-100 dark:bg-black dark:border-gray-500">
						{/* GitHub Icon */}
						<div className="px-2">
							<svg
								height="32"
								width="32"
								aria-hidden="true"
								viewBox="0 0 16 16"
								version="1.1"
								className="dark:invert-[1]"
							>
								<path
									fillRule="evenodd"
									d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
								></path>
							</svg>
						</div>

						<div className="flex flex-col">
							<h2 className="font-bold text-gray-700 dark:text-gray-400">
								Star on GitHub
							</h2>
							<h3 className="text-yellow-500 text-sm text-semibold flex items-center">
								{stars} {stars === 1 ? "star" : "stars"} ⭐
							</h3>
						</div>
					</div>
				</a>
			</div>
		</header>
	);
};

export default Header;

