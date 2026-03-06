"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [text, setText] = useState("");
  const fullText = "Hallooo everyone!!!";

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (text.length < fullText.length) {
      timeout = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1));
      }, 100);
    } else {
      timeout = setTimeout(() => {
        setText("");
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [text]);

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center overflow-hidden bg-[#87CEEB] pixelated selection:bg-pink-500 selection:text-white">
      {/* Background Layer */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat w-full h-full pixelated"
        style={{ backgroundImage: "url('/hero_bg.jpg')" }}
      />

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center w-full min-h-screen flex-1 pt-8 sm:pt-10 sm:px:10 pb-5">
        {/* Giant Title */}
        <h1
          className="text-black text-[12vw] sm:text-[12vw] md:text-[11.5vw] lg:text-[12vw] tracking-tighter uppercase text-center leading-[0.8] w-full m-0 p-0"
          style={{
            textShadow: '8px 8px 0 #fff, -8px -8px 0 #fff, 8px -8px 0 #fff, -8px 8px 0 #fff, 0 8px 0 #fff, 8px 0 0 #fff, 0 -8px 0 #fff, -8px 0 0 #fff, 12px 12px 0 #fff, -12px 0 0 #fff, 0 12px 0 #fff, 0 -12px 0 #fff, -12px -12px 0 #fff, 12px -12px 0 #fff, -12px 12px 0 #fff'
          }}
        >
          PORTFOLIO
        </h1>

        {/* Info Box / Highlighted Text */}
        <div className="-mt-16 sm:-mt-24 md:-mt-32 lg:-mt-36 max-w-2xl text-center mx-4 z-20 flex flex-col items-center gap-0">
          <span className="bg-[#fcee6d] text-black text-[10px] sm:text-[12px] md:text-sm px-2 py-1 uppercase inline-block">
            Your pixelated developer, your creative
          </span>
          <span className="bg-[#fcee6d] text-black text-[10px] sm:text-[12px] md:text-sm px-2 py-1 uppercase inline-block">
            code, your nostalgia.
          </span>
          <span className="bg-[#fcee6d] text-black text-[10px] sm:text-[12px] md:text-sm px-2 py-1 uppercase inline-block">
            Discover how small ideas conquer the world!
          </span>
        </div>

        {/* Center Character & Dialogue Box */}
        <div className="flex-1 flex flex-col items-center justify-center w-full mt-0 mb-24 z-10 relative">

          {/* Character */}
          <div className="relative w-full max-w-[400px] sm:max-w-[700px] lg:max-w-[800px] h-[55vh] sm:h-[65vh] lg:h-[75vh] hover:scale-105 transition-transform duration-200 cursor-pointer">
            <Image
              src="/noy.png"
              alt="Pixel Character"
              fill
              className="object-contain pixelated drop-shadow-[0_8px_0_rgba(0,0,0,0.5)]"
              priority
            />
          </div>

          {/* Dialogue Box */}
          <div className="absolute bottom-12 sm:bottom-16 lg:bottom-50 z-20 w-[100%] md:w-[600px] lg:w-[800px] flex flex-col items-start">
            {/* Name Tag */}
            <div className="bg-black border-2 border-white px-3 py-1 mb-1 shadow-[0_0_0_2px_#000]">
              <span className="text-white text-[10px] sm:text-xs tracking-widest">Ghani</span>
            </div>

            {/* Main Dialogue Box */}
            <div className="bg-black border-2 border-white w-full p-4 sm:p-6 shadow-[0_0_0_2px_#000] relative flex justify-between items-center">
              <p className="text-white text-[10px] sm:text-sm lg:text-base tracking-widest min-h-[1.5em]">
                {text}
              </p>
              <span className="text-gray-400 animate-pulse text-sm sm:text-xl ml-4">▼</span>
            </div>
          </div>

        </div>
      </div>

      {/* Decorative Pixels for bottom transition */}
      <div className="absolute bottom-0 w-full h-[256px] z-50 pointer-events-none overflow-hidden">

        {/* Base dark bar */}
        <div className="absolute bottom-0 w-full h-[32px] bg-[#1a1a1a]"></div>

        {/* Randomized scattered blocks */}

        {/* Far Left */}
        <div className="absolute bottom-[32px] left-0 flex items-end">
          <div className="w-[64px] h-[32px] bg-[#1a1a1a]"></div>
          <div className="w-[32px] h-[64px] bg-[#1a1a1a]"></div>
          <div className="w-[32px] h-[32px] bg-[#000080]"></div>
          <div className="w-[32px] h-[32px] bg-[#1a1a1a] ml-[32px]"></div>
        </div>
        <div className="absolute bottom-[64px] left-[64px] w-[32px] h-[32px] bg-[#000080]"></div>
        <div className="absolute bottom-[128px] left-[10%] w-[32px] h-[32px] bg-[#1a1a1a]"></div>

        {/* Left-Mid Area 1 */}
        <div className="absolute bottom-[32px] left-[18%] flex flex-col items-start gap-0">
          <div className="w-[32px] h-[32px] bg-[#000080] ml-[32px]"></div>
          <div className="flex">
            <div className="w-[32px] h-[64px] bg-[#1a1a1a]"></div>
            <div className="w-[64px] h-[32px] mt-auto bg-[#1a1a1a]"></div>
          </div>
        </div>
        <div className="absolute bottom-[160px] left-[22%] w-[32px] h-[32px] bg-[#000080]"></div>

        {/* Left-Mid Area 2 */}
        <div className="absolute bottom-[32px] left-[28%] flex items-end">
          <div className="w-[32px] h-[32px] bg-[#1a1a1a]"></div>
          <div className="w-[32px] h-[32px] bg-[#000080]"></div>
        </div>
        <div className="absolute bottom-[96px] left-[31%] w-[32px] h-[32px] bg-[#1a1a1a]"></div>
        <div className="absolute bottom-[192px] left-[35%] w-[32px] h-[32px] bg-[#1a1a1a]"></div>

        {/* Center Area (Overlapping Character) */}
        <div className="absolute bottom-[32px] left-[45%] flex items-end">
          <div className="w-[32px] h-[64px] bg-[#1a1a1a]"></div>
          <div className="flex flex-col">
            <div className="w-[32px] h-[32px] bg-[#000080]"></div>
            <div className="w-[32px] h-[32px] bg-[#1a1a1a]"></div>
          </div>
        </div>
        <div className="absolute bottom-[64px] left-[52%] w-[32px] h-[32px] bg-[#000080]"></div>
        <div className="absolute bottom-[128px] left-[48%] w-[32px] h-[64px] bg-[#1a1a1a]"></div>
        <div className="absolute bottom-[160px] left-[54%] w-[32px] h-[32px] bg-[#000080]"></div>

        {/* Right-Mid Area */}
        <div className="absolute bottom-[32px] right-[35%] flex flex-col items-end">
          <div className="flex">
            <div className="w-[32px] h-[32px] bg-[#1a1a1a]"></div>
            <div className="w-[32px] h-[32px] bg-[#000080]"></div>
          </div>
          <div className="flex">
            <div className="w-[64px] h-[64px] bg-[#1a1a1a]"></div>
          </div>
        </div>
        <div className="absolute bottom-[130px] right-[40%] w-[64px] h-[32px] bg-[#1a1a1a]"></div>
        <div className="absolute bottom-[200px] right-[45%] w-[32px] h-[32px] bg-[#000080]"></div>

        {/* Right Area 2 */}
        <div className="absolute bottom-[32px] right-[20%] flex items-end">
          <div className="w-[32px] h-[32px] bg-[#000080]"></div>
          <div className="w-[32px] h-[64px] bg-[#1a1a1a]"></div>
          <div className="w-[32px] h-[32px] bg-[#1a1a1a]"></div>
        </div>
        <div className="absolute bottom-[64px] right-[18%] w-[32px] h-[32px] bg-[#000080]"></div>
        <div className="absolute bottom-[140px] right-[25%] w-[32px] h-[64px] bg-[#1a1a1a]"></div>

        {/* Far Right */}
        <div className="absolute bottom-[32px] right-[2%] flex items-end">
          <div className="flex flex-col items-start gap-0">
            <div className="w-[32px] h-[32px] bg-[#000080] ml-[64px]"></div>
            <div className="flex items-end">
              <div className="w-[32px] h-[32px] bg-[#1a1a1a]"></div>
              <div className="w-[32px] h-[64px] bg-[#1a1a1a]"></div>
              <div className="w-[32px] h-[32px] bg-[#1a1a1a]"></div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-[128px] right-[8%] w-[32px] h-[32px] bg-[#1a1a1a]"></div>

      </div>
    </main>
  );
}
