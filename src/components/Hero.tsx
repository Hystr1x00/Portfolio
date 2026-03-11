"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";





interface PixelBirdProps {
  startX: string;
  endX: string;
  yRange: string[];
  duration: number;
  delay: number;
  mobileSize?: string;
  desktopSize?: string;
}

const PixelBird = ({
  startX,
  endX,
  yRange,
  duration,
  delay,
  mobileSize = "w-16 h-16",
  desktopSize = "sm:w-24 sm:h-24 lg:w-32 lg:h-32"
}: PixelBirdProps) => {
  const [frame, setFrame] = useState(1);
  const isFlyingLeft = parseInt(startX) > parseInt(endX);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev % 7) + 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="absolute z-[40] pointer-events-none"
      initial={{ x: startX, y: yRange[0], opacity: 1 }}
      animate={{
        x: [startX, endX],
        y: yRange
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
        y: {
          duration: duration / 4,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
    >
      <div className={`relative ${mobileSize} ${desktopSize}`}>
        <Image
          src={`/bird/${frame}.webp`}
          alt="Flying Bird"
          fill
          // If flying Left (startX > endX), and original faces Left, NO flip.
          // If flying Right (startX < endX), and original faces Left, NEED flip.
          className={`object-contain pixelated ${!isFlyingLeft ? "-scale-x-100" : ""}`}
        />
      </div>
    </motion.div>
  );
};

interface PixelCloudProps {
  src: string;
  x: string;
  y: string;
  duration: number;
  delay: number;
  size: string;
  zIndex?: number;
  bobDistance?: number;
}

const PixelCloud = ({
  src,
  x,
  y,
  duration,
  delay,
  size,
  zIndex = 1,
  bobDistance = 30
}: PixelCloudProps) => {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y, zIndex }}
      initial={{ opacity: 0, y: 0 }}
      animate={{
        y: [0, bobDistance, 0],
        opacity: 0.9
      }}
      transition={{
        y: {
          duration,
          delay,
          repeat: Infinity,
          ease: "easeInOut"
        },
        opacity: {
          duration: 1,
          delay: 0.5
        }
      }}
    >
      <div className={`relative ${size}`}>
        <Image
          src={src}
          alt="Cloud"
          fill
          className="object-contain pixelated"
        />
      </div>
    </motion.div>
  );
};

export default function Hero() {
  const [text, setText] = useState("");
  const fullText = "Hallooo everyone!!!";
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0.7, 1], [1, 0]);
  const yTranslate = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const charY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const cloudFarY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const cloudNearY = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const birdY = useTransform(scrollYProgress, [0, 1], [0, -150]);

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

  // Preload bird frames
  useEffect(() => {
    for (let i = 1; i <= 7; i++) {
      const img = new window.Image();
      img.src = `/bird/${i}.webp`;
    }
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center overflow-hidden bg-[#87CEEB] pixelated"
    >
      {/* Background Layer (Slowest) */}
      <motion.div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat w-full h-full pixelated"
        style={{ backgroundImage: "url('/hero_bg.webp')", y: bgY, scale: 1.3 }}
      />

      {/* Birds Layer */}
      <motion.div style={{ y: birdY }} className="absolute inset-0 pointer-events-none z-50">
        <PixelBird
          startX="150vw"
          endX="-50vw"
          yRange={["20vh", "15vh", "25vh", "20vh"]}
          duration={20}
          delay={0}
          mobileSize="w-20 h-20"
          desktopSize="sm:w-32 sm:h-32 lg:w-40 lg:h-40"
        />
        <PixelBird
          startX="-50vw"
          endX="150vw"
          yRange={["40vh", "45vh", "35vh", "40vh"]}
          duration={30}
          delay={5}
          mobileSize="w-16 h-16"
          desktopSize="sm:w-24 sm:h-24 lg:w-32 lg:h-32"
        />
        <PixelBird
          startX="160vw"
          endX="-60vw"
          yRange={["10vh", "8vh", "12vh", "10vh"]}
          duration={25}
          delay={10}
          mobileSize="w-12 h-12"
          desktopSize="sm:w-16 sm:h-16 lg:w-20 lg:h-20"
        />
      </motion.div>

      {/* Floating Clouds Layer (Parallax Far) */}
      <motion.div style={{ y: cloudFarY }} className="absolute inset-0 pointer-events-none z-5">
        <PixelCloud
          src="/cloud_1.webp"
          x="-15%"
          y="20%"
          duration={5}
          delay={0}
          size="w-[400px] h-[200px] sm:w-[600px] sm:h-[300px] lg:w-[1000px] lg:h-[500px]"
          zIndex={1}
          bobDistance={50}
        />
      </motion.div>

      {/* Floating Clouds Layer (Parallax Near) */}
      <motion.div style={{ y: cloudNearY }} className="absolute inset-0 pointer-events-none z-20">
        <PixelCloud
          src="/cloud_2.webp"
          x="75%"
          y="0%"
          duration={7}
          delay={1}
          size="w-[500px] h-[250px] sm:w-[800px] sm:h-[400px] lg:w-[800px] lg:h-[600px]"
          zIndex={100}
          bobDistance={-60}
        />
        <PixelCloud
          src="/cloud_1.webp"
          x="62%"
          y="50%"
          duration={6}
          delay={2}
          size="w-[300px] h-[150px] sm:w-[500px] sm:h-[250px] lg:w-[800px] lg:h-[400px]"
          zIndex={1}
          bobDistance={40}
        />
        <PixelCloud
          src="/cloud_2.webp"
          x="38%"
          y="65%"
          duration={8}
          delay={0.5}
          size="w-[400px] h-[200px] sm:w-[700px] sm:h-[350px] lg:w-[600px] lg:h-[500px]"
          zIndex={1}
          bobDistance={-45}
        />
        <PixelCloud
          src="/cloud_1.webp"
          x="-5%"
          y="60%"
          duration={9}
          delay={3}
          size="w-[500px] h-[250px] sm:w-[900px] sm:h-[450px] lg:w-[1400px] lg:h-[700px]"
          zIndex={1}
          bobDistance={60}
        />
      </motion.div>

      {/* Content Layer */}
      <motion.div
        style={{ opacity, y: yTranslate }}
        className="relative z-10 flex flex-col items-center w-full min-h-screen flex-1 pt-8 sm:pt-10 sm:px:10 pb-5"
      >
        <style jsx>{`
          .portfolio-title {
            text-shadow: 4px 4px 0 #fff, -4px -4px 0 #fff, 4px -4px 0 #fff, -4px 4px 0 #fff, 0 4px 0 #fff, 4px 0 0 #fff, 0 -4px 0 #fff, -4px 0 0 #fff, 6px 6px 0 #fff, -6px 0 0 #fff, 0 6px 0 #fff, 0 -6px 0 #fff, -6px -6px 0 #fff, 6px -6px 0 #fff, -6px 6px 0 #fff;
          }
          @media (min-width: 640px) {
            .portfolio-title {
              text-shadow: 8px 8px 0 #fff, -8px -8px 0 #fff, 8px -8px 0 #fff, -8px 8px 0 #fff, 0 8px 0 #fff, 8px 0 0 #fff, 0 -8px 0 #fff, -8px 0 0 #fff, 12px 12px 0 #fff, -12px 0 0 #fff, 0 12px 0 #fff, 0 -12px 0 #fff, -12px -12px 0 #fff, 12px -12px 0 #fff, -12px 12px 0 #fff;
            }
          }
        `}</style>
        {/* Giant Title */}
        <motion.h1
          className="portfolio-title text-black text-[12vw] sm:text-[12vw] md:text-[11.5vw] lg:text-[12vw] tracking-tighter uppercase text-center leading-[0.8] w-full m-0 p-0 scale-y-[4] origin-top sm:scale-y-160"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          PORTFOLIO
        </motion.h1>


        {/* Info Box / Highlighted Text */}
        <motion.div
          className="-mt-20sm:-mt-24 md:-mt-32 lg:-mt-36 max-w-[80vw] sm:max-w-2xl text-center mx-4 z-20 flex flex-col items-center gap-0 sm:gap-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
        >
          <motion.span
            className="bg-[#fcee6d] text-black text-[8px] sm:text-[12px] md:text-sm px-2 py-1 uppercase inline-block max-w-[85vw] whitespace-normal leading-tight break-words"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            Pixelated mind!
          </motion.span>
          <motion.span
            className="bg-[#fcee6d] text-black text-[7px] sm:text-[12px] md:text-sm px-2 py-1 uppercase inline-block max-w-[85vw] whitespace-normal leading-tight break-words -mt-[1.5px] sm:mt-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            Creating Code, System, and Ideas.
          </motion.span>
          <motion.span
            className="bg-[#fcee6d] text-black text-[7px] sm:text-[12px] md:text-sm px-2 py-1 uppercase inline-block max-w-[85vw] whitespace-normal leading-tight break-words -mt-[1.5px] sm:mt-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            Welcome to my dev world!
          </motion.span>
        </motion.div>

        {/* Center Character & Dialogue Box */}
        <div className="flex-1 flex flex-col items-center justify-center w-full mt-0 mb-24 z-10 relative">

          {/* Character */}
          <motion.div
            style={{ y: charY }}
            className="relative w-full max-w-[400px] sm:max-w-[700px] lg:max-w-[800px] h-[55vh] sm:h-[65vh] lg:h-[75vh] hover:scale-105 transition-transform duration-200 cursor-pointer -mt-20 sm:mt-0"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 2,
              delay: 0.8,
              ease: "linear",
              opacity: { duration: 1.5, delay: 0.8 }
            }}
          >
            <Image
              src="/noy.webp"
              alt="Pixel Character"
              fill
              className="object-contain pixelated drop-shadow-[0_8px_0_rgba(0,0,0,0.5)]"
              priority
            />
          </motion.div>


          {/* Dialogue Box */}
          <motion.div
            className="absolute bottom-12 sm:bottom-16 lg:bottom-50 z-[60] w-[85%] sm:w-[90%] md:w-[600px] lg:w-[800px] flex flex-col items-start pr-12 sm:pr-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          >
            {/* Name Tag */}
            <div className="bg-black border-2 border-white px-3 py-1 mb-1 shadow-[0_0_0_2px_#000]">
              <span className="text-white text-[10px] sm:text-xs tracking-widest">Ganny</span>
            </div>

            {/* Main Dialogue Box */}
            <div className="bg-black border-2 border-white w-full p-4 sm:p-6 shadow-[0_0_0_2px_#000] relative flex justify-between items-center">
              <p className="text-white text-[10px] sm:text-sm lg:text-base tracking-widest min-h-[1.5em]">
                {text}
              </p>
              <span className="text-gray-400 animate-pulse text-sm sm:text-xl ml-4">▼</span>
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* Decorative Pixels for bottom transition */}
      <div className="absolute bottom-0 w-full h-[256px] z-50 pointer-events-none overflow-hidden">

        {/* Base dark bar */}
        <div className="absolute bottom-0 w-full h-[32px] bg-[#1a1a1a]"></div>

        {/* Randomized scattered blocks */}

        {/* Far Left */}
        <div className="absolute bottom-[31px] left-0 hidden sm:flex items-end">
          <div className="w-[64px] h-[32px] bg-[#1a1a1a]"></div>
          <div className="w-[32px] h-[64px] bg-[#1a1a1a] -ml-[1px]"></div>
          <div className="w-[32px] h-[32px] bg-[#000080] -ml-[1px]"></div>
          <div className="w-[32px] h-[32px] bg-[#1a1a1a] ml-[31px]"></div>
        </div>
        <div className="absolute bottom-[64px] left-[64px] w-[32px] h-[32px] bg-[#000080] hidden sm:block"></div>
        <div className="absolute bottom-[128px] left-[10%] w-[32px] h-[32px] bg-[#1a1a1a] hidden sm:block"></div>

        {/* Left-Mid Area 1 */}
        <div className="absolute bottom-[31px] left-[18%] hidden sm:flex flex-col items-start gap-0">
          <div className="w-[32px] h-[32px] bg-[#000080] ml-[31px]"></div>
          <div className="flex -mt-[1px]">
            <div className="w-[32px] h-[64px] bg-[#1a1a1a]"></div>
            <div className="w-[64px] h-[32px] mt-auto bg-[#1a1a1a] -ml-[1px]"></div>
          </div>
        </div>
        <div className="absolute bottom-[160px] left-[22%] w-[32px] h-[32px] bg-[#000080] hidden sm:block"></div>

        {/* Left-Mid Area 2 */}
        <div className="absolute bottom-[31px] left-[28%] hidden sm:flex items-end">
          <div className="w-[32px] h-[32px] bg-[#1a1a1a]"></div>
          <div className="w-[32px] h-[32px] bg-[#000080] -ml-[1px]"></div>
        </div>
        <div className="absolute bottom-[96px] left-[31%] w-[32px] h-[32px] bg-[#1a1a1a] hidden sm:block"></div>
        <div className="absolute bottom-[192px] left-[35%] w-[32px] h-[32px] bg-[#1a1a1a] hidden sm:block"></div>


        {/* Right-Mid Area */}
        <div className="absolute bottom-[31px] right-[35%] hidden sm:flex flex-col items-end">
          <div className="flex">
            <div className="w-[32px] h-[32px] bg-[#1a1a1a]"></div>
            <div className="w-[32px] h-[32px] bg-[#000080] -ml-[1px]"></div>
          </div>
          <div className="flex -mt-[1px]">
            <div className="w-[64px] h-[64px] bg-[#1a1a1a]"></div>
          </div>
        </div>
        <div className="absolute bottom-[130px] right-[40%] w-[64px] h-[32px] bg-[#1a1a1a] hidden sm:block"></div>
        <div className="absolute bottom-[200px] right-[45%] w-[32px] h-[32px] bg-[#000080] hidden sm:block"></div>

        {/* Right Area 2 */}
        <div className="absolute bottom-[31px] right-[20%] hidden sm:flex items-end">
          <div className="w-[32px] h-[32px] bg-[#000080]"></div>
          <div className="w-[32px] h-[64px] bg-[#1a1a1a] -ml-[1px]"></div>
          <div className="w-[32px] h-[32px] bg-[#1a1a1a] -ml-[1px]"></div>
        </div>
        <div className="absolute bottom-[64px] right-[18%] w-[32px] h-[32px] bg-[#000080] hidden sm:block"></div>
        <div className="absolute bottom-[140px] right-[25%] w-[32px] h-[64px] bg-[#1a1a1a] hidden sm:block"></div>

        {/* Far Right */}
        <div className="absolute bottom-[31px] right-[2%] hidden sm:flex items-end">
          <div className="flex flex-col items-start gap-0">
            <div className="w-[32px] h-[32px] bg-[#000080] ml-[63px]"></div>
            <div className="flex items-end -mt-[1px]">
              <div className="w-[32px] h-[32px] bg-[#1a1a1a]"></div>
              <div className="w-[32px] h-[64px] bg-[#1a1a1a] -ml-[1px]"></div>
              <div className="w-[32px] h-[32px] bg-[#1a1a1a] -ml-[1px]"></div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-[128px] right-[8%] w-[32px] h-[32px] bg-[#1a1a1a] hidden sm:block"></div>

      </div>
    </section>
  );
}
