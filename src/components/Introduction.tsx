"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";


const PixelStar = ({ className, delay = "0s", duration = "4s" }: { className?: string, delay?: string, duration?: string }) => (
    <div
        className={`absolute flex flex-col items-center pointer-events-none animate-twinkle ${className}`}
        style={{ animationDelay: delay, animationDuration: duration }}
    >
        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#e5e5e5]"></div>
        <div className="flex">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#e5e5e5]"></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white"></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#e5e5e5]"></div>
        </div>
        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#e5e5e5]"></div>
    </div>
);


const SmallStar = ({ className, delay = "0s" }: { className?: string, delay?: string }) => (
    <div
        className={`absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white pointer-events-none animate-pulse ${className}`}
        style={{ animationDelay: delay }}
    ></div>
);

const ShootingStar = ({ x, y, opacity, rotate = 0 }: { x: any, y: any, opacity: any, rotate?: number }) => (
    <motion.div
        className="absolute pointer-events-none z-[100]"
        style={{ x, y, opacity, rotate }}
    >
        <div className="flex items-center flex-row">
            {/* The Tail - Now on the LEFT in DOM, will be Top-Right after 135deg rotation */}
            <div className="flex items-center -mr-1">
                <div className="w-32 h-1 bg-gradient-to-r from-transparent to-white/10"></div>
                <div className="w-24 h-1.5 bg-gradient-to-r from-transparent to-white/40 -ml-8"></div>
                <div className="w-16 h-2.5 bg-gradient-to-r from-transparent to-white/80 -ml-4"></div>
            </div>
            {/* The Star "Head" - Now on the RIGHT in DOM, will be Bottom-Left after 135deg rotation */}
            <div className="w-5 h-5 bg-white shadow-[0_0_25px_rgba(255,255,255,1),0_0_12px_rgba(255,255,255,0.9)] relative z-10"></div>
        </div>
    </motion.div>
);

export default function Introduction() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [frameIndex, setFrameIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Map scroll progress to 0-11 index
    const scrollIndex = useTransform(scrollYProgress, [0, 1], [0, 11]);

    useMotionValueEvent(scrollIndex, "change", (latest) => {
        setFrameIndex(Math.round(latest));
    });

    // Preload images
    useEffect(() => {
        for (let i = 0; i <= 11; i++) {
            const img = new window.Image();
            img.src = `/earth-sequence/frame_${i.toString().padStart(2, '0')}_delay-0.2s.gif`;
        }
    }, []);

    const currentFrame = `/earth-sequence/frame_${frameIndex.toString().padStart(2, '0')}_delay-0.2s.gif`;

    // Shooting Stars: Adjusted Y starts to be more "atas" (above the screen)
    // Star 1: Starts early
    const star1X = useTransform(scrollYProgress, [0.0, 0.4], ["120vw", "-50vw"]);
    const star1Y = useTransform(scrollYProgress, [0.0, 0.4], ["-20vh", "110vh"]);
    const star1Opacity = useTransform(scrollYProgress, [0.0, 0.05, 0.35, 0.4], [0, 1, 1, 0]);

    // Star 2: Slightly delayed, starting from high above
    const star2X = useTransform(scrollYProgress, [0.1, 0.5], ["140vw", "-40vw"]);
    const star2Y = useTransform(scrollYProgress, [0.1, 0.5], ["-25vh", "120vh"]);
    const star2Opacity = useTransform(scrollYProgress, [0.1, 0.15, 0.45, 0.5], [0, 1, 1, 0]);

    // Star 3: Mid-scroll, from top
    const star3X = useTransform(scrollYProgress, [0.25, 0.65], ["110vw", "-60vw"]);
    const star3Y = useTransform(scrollYProgress, [0.25, 0.65], ["-15vh", "110vh"]);
    const star3Opacity = useTransform(scrollYProgress, [0.25, 0.3, 0.6, 0.65], [0, 1, 1, 0]);

    // Star 4: Late-scroll, from very top
    const star4X = useTransform(scrollYProgress, [0.4, 0.8], ["150vw", "-20vw"]);
    const star4Y = useTransform(scrollYProgress, [0.4, 0.8], ["-30vh", "130vh"]);
    const star4Opacity = useTransform(scrollYProgress, [0.4, 0.45, 0.75, 0.8], [0, 1, 1, 0]);

    // Star 5: Fast/Long, full diagonal
    const star5X = useTransform(scrollYProgress, [0.05, 0.9], ["160vw", "-100vw"]);
    const star5Y = useTransform(scrollYProgress, [0.05, 0.9], ["-10vh", "140vh"]);
    const star5Opacity = useTransform(scrollYProgress, [0.05, 0.15, 0.8, 0.9], [0, 1, 1, 0]);

    return (
        <section
            id="introduction"
            ref={containerRef}
            className="relative w-full min-h-[100vh] bg-[#111] flex flex-col items-center py-24 sm:py-32 px-6 sm:px-12 md:px-20 overflow-hidden"
        >
            {/* Shooting Stars - Fixed: Head at Bottom-Left, Tail at Top-Right */}
            {/* Using 135deg rotation with [Tail][Head] structure points it Down-Left correctly */}
            <ShootingStar x={star1X} y={star1Y} opacity={star1Opacity} rotate={120} />
            <ShootingStar x={star2X} y={star2Y} opacity={star2Opacity} rotate={130} />
            <ShootingStar x={star3X} y={star3Y} opacity={star3Opacity} rotate={160} />
            <ShootingStar x={star4X} y={star4Y} opacity={star4Opacity} rotate={160} />
            <ShootingStar x={star5X} y={star5Y} opacity={star5Opacity} rotate={160} />

            {/* Animated Stars Background */}
            <PixelStar className="top-[15%] left-[10%] opacity-80" delay="0s" duration="3s" />
            <PixelStar className="top-[5%] right-[20%] opacity-60 scale-75" delay="1s" duration="5s" />
            <PixelStar className="top-[40%] right-[10%] opacity-90 scale-125" delay="2s" duration="4s" />
            <PixelStar className="bottom-[20%] right-[25%] opacity-50" delay="0.5s" duration="6s" />
            <PixelStar className="bottom-[10%] left-[5%] opacity-70 scale-50" delay="1.5s" duration="3.5s" />
            <PixelStar className="top-[50%] left-[2%] opacity-40 scale-75" delay="2.5s" duration="4.5s" />

            <SmallStar className="top-[25%] left-[25%]" delay="0s" />
            <SmallStar className="top-[10%] left-[50%]" delay="1.2s" />
            <SmallStar className="bottom-[30%] right-[5%]" delay="0.8s" />
            <SmallStar className="bottom-[40%] left-[15%]" delay="2.1s" />
            <SmallStar className="top-[60%] right-[30%]" delay="1.5s" />

            {/* Global Style for twinkle animation */}
            <style jsx global>{`
                @keyframes twinkle {
                    0%, 100% { opacity: 0.3; transform: scale(0.8) translateY(0px); }
                    50% { opacity: 1; transform: scale(1.1) translateY(-10px); }
                }
                .animate-twinkle {
                    animation: twinkle infinite ease-in-out;
                }
            `}</style>

            <div className="w-full max-w-6xl mx-auto flex flex-col z-10">

                {/* Title Area - CENTERED horizontally */}
                <div className="flex flex-row w-full mb-16 md:mb-24 mt-10 md:mt-0 items-end justify-center relative">
                    <motion.div
                        className="flex flex-col z-20"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ amount: 0.2 }}

                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="text-white text-[15vw] md:text-[8vw] font-bold leading-none tracking-widest uppercase pixelated">
                            WHO
                        </h2>
                        <h2 className="text-white text-[15vw] md:text-[8vw] font-bold leading-none tracking-widest uppercase pixelated">
                            AM
                        </h2>
                        <h2 className="text-[#a3a3a3] text-[15vw] md:text-[8vw] font-bold leading-none tracking-widest uppercase pixelated mt-2">
                            I?
                        </h2>
                    </motion.div>


                    {/* Profile Card - Balanced size and overlapping for 'mepet' effect */}
                    <motion.div
                        className="relative group -ml-18 md:-ml-34 lg:-ml-46 mb-2 md:mb-4 z-10"
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ amount: 0.2 }}

                        transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 100 }}
                    >
                        <Image
                            src="/cardNoy.webp"
                            alt="Profile Card"
                            width={300}
                            height={400}
                            className="w-[150px] md:w-[180px] lg:w-[220px] h-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-transform duration-300 group-hover:scale-105"
                        />
                    </motion.div>

                </div>

                <div className="flex flex-col md:flex-row justify-between w-full relative gap-16 md:gap-12 z-10">
                    {/* Left Column (Intro Text) */}
                    <motion.div
                        className="w-full md:w-[45%] flex flex-col items-center md:items-start relative"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ amount: 0.2 }}

                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <div className="z-20 relative">
                            <p className="text-white text-lg sm:text-xl md:text-2xl font-light leading-relaxed max-w-sm mb-12 md:mb-0 uppercase pixelated">
                                Hi, I am a <br />
                                <span className="bg-[#000080] text-white px-2 py-0.5 leading-loose">passionate developer</span> <br />
                                from Earth, exploring <br />
                                the digital universe.
                            </p>
                        </div>
                    </motion.div>


                    {/* Right Column (Detailed Text Columns) */}
                    <motion.div
                        className="w-full md:w-[50%] flex flex-col md:flex-row gap-8 text-gray-300 text-[10px] sm:text-xs md:text-sm leading-relaxed tracking-wide z-10 px-2 sm:px-0 font-mono items-start"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ amount: 0.2 }}

                        transition={{ duration: 1, delay: 0.6 }}
                    >
                        <div className="flex-1 space-y-8">
                            <p>
                                My coding journey started <span className="bg-[#000080] text-white px-1 py-0.5">in 2023</span> while studying Information Systems
                                at <span className="bg-[#000080] text-white px-1 py-0.5 ml-1">Telkom University</span>.
                            </p>
                            <p>
                                What began as curiosity soon turned into a <span className="bg-[#000080] text-white px-1 py-0.5">passion</span> for building digital
                                solutions and understanding how systems work behind the scenes.
                            </p>
                            <p>
                                Since then, I&apos;ve been exploring <span className="bg-[#000080] text-white px-1 py-0.5">web development</span>, system architecture,
                                and experimenting with technologies like <span className="bg-[#000080] text-white px-1 py-0.5">AI and IoT</span>.
                            </p>
                        </div>
                        <div className="flex-1 space-y-8">
                            <p>
                                I enjoy transforming ideas into <span className="bg-[#000080] text-white px-1 py-0.5">functional applications</span> and learning
                                something new in every project I build.
                            </p>
                            <p>
                                As a student developer, I&apos;m continuously growing, building <span className="bg-[#000080] text-white px-1 py-0.5">real projects</span>,
                                and exploring the endless possibilities of the <span className="bg-[#000080] text-white px-1 py-0.5">digital universe</span>.
                            </p>
                        </div>
                    </motion.div>

                </div>

            </div>

            {/* Earth Graphic container - Positioned at BOTTOM LEFT (background-like) */}
            <motion.div
                className="absolute -bottom-16 -left-16 sm:-bottom-24 sm:-left-24 md:-bottom-32 md:-left-32 lg:-bottom-48 lg:-left-48 z-0 pointer-events-none"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 0.9, scale: 1 }}
                viewport={{ amount: 0.2 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            >
                <Image
                    src={currentFrame}
                    alt="Pixel Earth"
                    width={800}
                    height={800}
                    unoptimized
                    className="w-[300px] sm:w-[450px] md:w-[600px] lg:w-[800px] xl:w-[900px] object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.05)] pixelated"
                />
            </motion.div>


        </section>
    );
}
