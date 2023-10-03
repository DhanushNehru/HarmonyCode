import Head from "next/head";

import Header from "../components/Header";
import Cards from "../components/Cards";
import Footer from "../components/Footer";
import ThemeToggler from "../components/ThemeToggler";
import { AuthProvider } from "../context/AuthContext";

const Home = () => {
	return (
		<div>
			<AuthProvider>
			<Head>
				{/* Required meta tags */}
				<meta charset="UTF-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<meta name="description" content="Music for your coding" />
				<meta
					name="keywords"
					content="coding, programming, music, songs, sound, audio, lofi, Dhanush Nehru, DhanushNehru"
				/>
				<meta name="author" content="Dhanush Nehru" />

				{/* Open Graph Meta Tags */}
				<meta property="og:title" content="harmonycode 🎵" />
				<meta property="og:type" content="website" />
				<meta
					property="og:url"
					content="https://harmonycode.vercep.app"
				/>
				<meta
					property="og:description"
					content="Music for your coding"
				/>
				<meta property="og:site_name" content="harmonycode" />
				<meta property="og:locale" content="en_US" />

				<title>
					Harmony Code 🎶 Music for your coding 🧑‍💻
				</title>

				<link rel="icon" href="/favicon.webp" />
			</Head>

			<Header />

			<Cards />

			<Footer />

			<ThemeToggler />
			</AuthProvider>
		</div>
	);
};

export default Home;

