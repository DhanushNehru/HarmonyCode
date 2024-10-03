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
    let cleanedResponse = search.length < 0 ? [] : response.split(',').map(title => title.trim());
    if (cleanedResponse.length > 5) {
      cleanedResponse.splice(5);
    }

    setRecommendation(data.filter((item) => cleanedResponse.includes(item.title)));
    
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
    <div className="container mx-auto border border-white shadow-md rounded-xl">
      <h1 className="text-3xl text-center p-2 ">AI Recommendation</h1>
      <div className="flex items-center justify-center gap-4 my-8">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-400 p-2 rounded-md"
        />
        <button 
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={() => run()}>Search</button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4 my-8 w-[90%] mx-auto">
        {transition((style, card) => (
          <animated.div style={style}>
            <Card key={card.title} title={card.title} Icon={card.icon} />
          </animated.div>
        ))}
      </div>
    </div>
  );
};

export default AiRecommendation;
