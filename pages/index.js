import Head from "next/head";
import Header from "../components/Header";
import Cards from "../components/Cards";
import Footer from "../components/Footer";
import ThemeToggler from "../components/ThemeToggler";
import { AuthProvider, useAuth } from "../context/AuthContext";

const Home = () => {
  return (
    <div>
      <AuthProvider>
        <HomeContent />
      </AuthProvider>
    </div>
  );
};

const HomeContent = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <Head>
        {/* Required meta tags */}
        <meta charset="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Music for your coding" />
        <meta
          name="keywords"
          content="coding, programming, music, songs, sound, audio, lofi, Dhanush Nehru, DhanushNehru"
        />
        <meta name="author" content="Dhanush Nehru" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="harmonycode 🎵" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://harmonycode.vercep.app" />
        <meta property="og:description" content="Music for your coding" />
        <meta property="og:site_name" content="harmonycode" />
        <meta property="og:locale" content="en_US" />

        <title>Harmony Code 🎶 Music for your coding 🧑‍💻</title>

        <link rel="icon" href="/favicon.webp" />
      </Head>

      <Header />

      {currentUser ? (
        // Render the content for authenticated users
        <Cards />
      ) : (
        // Render the appropriate sign-in component for non-authenticated users
        <>
          <p className="text-xl text-gray-500 dark:text-gray-200 text-center mt-8 bg-white hover:bg-gray-200 p-4 rounded-lg hover:shadow-2xl shadow-lg hover:translate-y-1 transition-all duration-150 dark:bg-[#252424] hover:dark:bg-[black] flex flex-wrap items-center justify-center my-8 w-[90%] mx-auto">
            Please Sign in to use the app!
          </p>

          <Cards />
        </>
      )}

      <Footer />

      <ThemeToggler />
    </>
  );
};

export default Home;
