import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useTransition, animated } from "@react-spring/web";
import Card from "./Card";
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
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  async function run() {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {
              text:
                "const data =" +
                JSON.stringify(data) +
                " you have given data , recommend blend of these sound, according to prompt given in next output,  return a string contain titles separated by comma from data",
            },
          ],
        },
      ],
    });

    const result = await chatSession.sendMessage(search);
    const response = await result.response.text();
    console.log(result.response.text());
    let cleanedResponse =
      search.length < 0 ? [] : response.split(",").map((title) => title.trim());
    if (cleanedResponse.length > 5) {
      cleanedResponse.splice(5);
    }

    setRecommendation(
      data.filter((item) => cleanedResponse.includes(item.title))
    );
  }

  useEffect(() => {
    run();
  }, []);

  const transition = useTransition(recommendation, {
    from: { opacity: 0.2 },
    enter: { opacity: 1 },
    config: { tension: 220, friction: 120 },
    trail: 130,
  });

  return (
    <div className="container mx-auto rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-md transition-colors duration-300 px-4 sm:px-6 py-4">
      <h1 className="text-3xl font-semibold text-center p-2 text-gray-800 dark:text-gray-200 transition-colors duration-300">
        AI Recommendation
      </h1>
      <div className="flex items-center justify-center gap-3 sm:gap-4 my-6 sm:my-8">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") run();
          }}
          aria-label="Search prompt for AI recommendation"
          className="w-10/12 sm:w-1/2 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 p-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-colors duration-300"
        />
        <button
          className="inline-flex items-center justify-center rounded-lg bg-gray-900 dark:bg-gray-200 text-white dark:text-gray-900 px-3 sm:px-4 py-2 shadow-sm hover:bg-gray-800 dark:hover:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 active:scale-[.98] transition-all duration-200"
          onClick={() => run()}
          aria-label="Run AI search"
        >
          <BsSearch className="h-[1.5em]" />
        </button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 my-6 sm:my-8 w-[92%] sm:w-[90%] mx-auto">
        {transition((style, card) => (
          <animated.div style={style} key={card.title}>
            <Card title={card.title} Icon={card.icon} />
          </animated.div>
        ))}
      </div>
    </div>
  );
};

export default AiRecommendation;
