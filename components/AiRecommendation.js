import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useTransition, animated } from "@react-spring/web";
import Card from "./Card";
import { GEMINI_CONFIG, getGeminiModelId } from "../constants/gemini";
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
} from "react-icons/gi";
import { FaUmbrellaBeach } from "react-icons/fa";
import {
  RiSailboatLine,
  RiLeafLine,
  RiRocketLine,
  RiFootprintLine,
} from "react-icons/ri";
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
  BsSearch,
} from "react-icons/bs";
import {
  AiOutlineClockCircle,
  AiOutlineThunderbolt,
  AiOutlineTrophy,
  AiOutlineQuestion,
} from "react-icons/ai";
import { ImSigma } from "react-icons/im";
import { BiCloudRain, BiTrain } from "react-icons/bi";
import { FaHelicopter, FaGhost } from "react-icons/fa";

const AiRecommendation = ({ data }) => {
  const [recommendation, setRecommendation] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Initialize Gemini AI with error handling
  let genAI, model;
  try {
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      throw new Error('Gemini API key is missing');
    }
    genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    model = genAI.getGenerativeModel({
      model: getGeminiModelId(),
    });
  } catch (initError) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('❌ Gemini AI initialization failed:', initError.message);
    }
  }
  
  async function run(searchQuery = null) {
    const queryToUse = searchQuery || search;
    
    // Validate search input
    if (!queryToUse || queryToUse.trim().length === 0) {
      setError("Please enter a search query");
      return;
    }

    // Check if AI is available
    if (!model) {
      setError("AI recommendations are currently unavailable. Please try again later.");
      return;
    }

    // Update search state if query was passed directly
    if (searchQuery && searchQuery !== search) {
      setSearch(searchQuery);
    }

    // Clear previous error and set loading
    setError(null);
    setLoading(true);

    try {
      const chatSession = model.startChat({
        generationConfig: GEMINI_CONFIG.GENERATION_CONFIG,
        history: [
          {
            role: "user",
            parts: [
              {
                text: `You are a sound recommendation expert. I have a list of available sounds with their titles.

Available sounds data: ${JSON.stringify(data)}

Your task:
1. Analyze the user's search query to understand their mood, activity, or preference
2. Match sounds from the available data that best fit their request
3. Return ONLY the exact titles from the data, separated by commas
4. If they search for "peaceful", return sounds like: Rain, Waterfall, Forest, Birds, Ocean, Wind, etc.
5. If they search for "work" or "focus", return sounds like: Coffee Shop, Keyboard, Clock, Train, Office ambience, White noise, etc.
6. If they search for "sleep" or "relax", return calming sounds like: Rain, Ocean, Wind, Night sounds, etc.
7. If they search for "nature", return: Forest, Birds, Waterfall, Ocean, Wind, etc.
8. If they search for "energetic" or "active", return upbeat or rhythmic sounds
9. Match based on keywords, mood, and context
10. Return maximum 5-8 most relevant titles

IMPORTANT: 
- Return ONLY the exact title names from the data
- Separate titles with commas
- Do NOT add any explanations or extra text
- Do NOT modify the title names

Example output format: "Rain, Waterfall, Forest, Birds, Ocean"`,
              },
            ],
          },
        ],
      });

      const result = await chatSession.sendMessage(queryToUse);
      const response = await result.response.text();
      
      if (process.env.NODE_ENV !== 'production') {
        console.log('✅ AI Response:', response);
        console.log('🔍 User Search Query:', queryToUse);
      }
      
      // Clean up the response - remove quotes, newlines, and extra spaces
      let cleanedText = response
        .replace(/["'\n\r]/g, '') // Remove quotes and newlines
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .trim();
      
      // Split by comma and clean each title
      let cleanedResponse = cleanedText
        .split(",")
        .map((title) => title.trim())
        .filter((title) => title.length > 0); // Remove empty strings
      
      if (process.env.NODE_ENV !== 'production') {
        console.log('🎯 Parsed Titles:', cleanedResponse);
      }
      
      // Try exact match first
      let filteredRecommendations = data.filter((item) => 
        cleanedResponse.includes(item.title)
      );
      
      // If no exact matches, try case-insensitive partial matching
      if (filteredRecommendations.length === 0) {
        if (process.env.NODE_ENV !== 'production') {
          console.log('⚠️ No exact matches, trying partial matching...');
        }
        filteredRecommendations = data.filter((item) => 
          cleanedResponse.some(title => 
            item.title.toLowerCase().includes(title.toLowerCase()) ||
            title.toLowerCase().includes(item.title.toLowerCase())
          )
        );
      }
      
      // Limit to 8 recommendations
      if (filteredRecommendations.length > 8) {
        filteredRecommendations = filteredRecommendations.slice(0, 8);
      }

      if (filteredRecommendations.length === 0) {
        setError(`No matching sounds found for "${queryToUse}". Try terms like: peaceful, work, focus, sleep, nature, energetic`);
      } else {
        if (process.env.NODE_ENV !== 'production') {
          console.log(`✅ Found ${filteredRecommendations.length} matching sounds`);
        }
      }

      setRecommendation(filteredRecommendations);
    } catch (error) {
      console.error('❌ AI Recommendation Error:', error.message);
      
      // User-friendly error messages
      if (error.message.includes('not found') || error.message.includes('404')) {
        setError('AI model not available. Please check your API key configuration.');
      } else if (error.message.includes('API key')) {
        setError('Invalid API key. Please check your configuration.');
      } else {
        setError('Failed to get recommendations. Please try again.');
      }
      
      setRecommendation([]);
    } finally {
      setLoading(false);
    }
  }

  // Handle Enter key press in search input
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      run();
    }
  };



  const transition = useTransition(recommendation, {
    from: { opacity: 0.2 },
    enter: { opacity: 1 },
    config: { tension: 220, friction: 120 },
    trail: 130,
  });

  // Define suggestion categories
  const categories = [
    "Work music",
    "Peaceful music",
    "Sleeping music",
    "Nature music",
    "Musical instruments",
    "Weather",
    "Meditation music"
  ];

  const [currentCategory, setCurrentCategory] = useState(0);

  // Rotate through categories every 2 seconds with typing effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCategory((prev) => (prev + 1) % categories.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Animated transition for live category suggestions
  const liveTransition = useTransition(
    [categories[currentCategory]],
    {
      from: { opacity: 0, transform: 'translateX(10px)' },
      enter: { opacity: 1, transform: 'translateX(0px)' },
      leave: { opacity: 0, transform: 'translateX(-10px)' },
      config: { tension: 300, friction: 25 },
    }
  );

  return (
    <div className="container mx-auto border border-white shadow-md rounded-xl p-6">
      <h1 className="text-3xl text-center p-2 text-gray-700 dark:text-gray-400 font-bold">
        🤖 AI Sound Recommendation
      </h1>
      <p className="text-center text-base text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
        Our AI-based Sound Recommendation suggests sounds tailored to your preferences from our available cards
      </p>
      
      <div className="flex items-center justify-center gap-4 my-8">
        <div className="relative flex-1 min-w-[300px] max-w-xl">
          {/* Input with animated gradient border */}
          <div className="relative animated-gradient-border p-[2px] rounded-lg shadow-sm">
            <input
              type="text"
              placeholder={search ? "" : " "}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              aria-label="Search sounds"
              aria-describedby={!search ? "search-suggestion" : undefined}
              className="p-4 pr-14 rounded-[6px] w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 disabled:opacity-50 focus:outline-none transition-colors text-lg border-0"
              style={{ caretColor: '#3B82F6' }}
            />
            
            {/* Animated category text overlay when empty */}
            {!search && (
              <div 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
                id="search-suggestion"
              >
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-lg">Try:</span>
                  <div className="min-w-[200px] relative h-7">
                    {liveTransition((style, category) => (
                      <animated.div 
                        style={style}
                        className="absolute whitespace-nowrap"
                      >
                        <span className="text-lg text-blue-600 dark:text-blue-400 typing-animation">
                          {category}
                        </span>
                      </animated.div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Search icon button */}
        <button
          onClick={() => search && run()}
          disabled={loading || !search}
          className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white p-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[56px]"
          title="Search"
        >
          {loading ? (
            <div className="animate-spin h-6 w-6 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            <BsSearch className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Category suggestions as clickable pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => run(category)}
            disabled={loading}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
              currentCategory === index
                ? 'bg-blue-500 text-white shadow-md scale-105'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-md mb-4 text-center max-w-2xl mx-auto">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-pulse text-gray-600 dark:text-gray-400">
            🤖 AI is thinking...
          </div>
        </div>
      )}

      {/* Recommendations */}
      {!loading && recommendation.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl text-center text-gray-600 dark:text-gray-300 mb-4">
            Recommended Sounds ({recommendation.length})
          </h2>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-4 my-8 w-[90%] mx-auto">
        {transition((style, card) => (
          <animated.div style={style}>
            <Card key={card.title} title={card.title} Icon={card.icon} />
          </animated.div>
        ))}
      </div>

      {/* Empty State */}
      {!loading && !error && recommendation.length === 0 && search.length > 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No recommendations yet. Try searching for a mood or activity!
        </div>
      )}
    </div>
  );
};

export default AiRecommendation;
