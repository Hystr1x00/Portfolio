"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import missions from "../data/organizations.json";

// ─── PIXEL ART PLANETS ───────────────────────────────────────────────────────

const PlanetGasGiant = ({ color }: { color: string }) => (
    <div className="relative w-full h-full rounded-full overflow-hidden" style={{ background: `radial-gradient(circle at 30% 30%, ${color}, #000)` }}>
        {/* Striations */}
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(255,255,255,0.2) 4px, rgba(255,255,255,0.2) 6px)` }} />
        <div className="absolute top-1/4 left-0 w-full h-2 bg-white/20 blur-sm" />
    </div>
);

const PlanetRinged = ({ color }: { color: string }) => (
    <div className="relative w-full h-full flex items-center justify-center">
        <div className="w-full h-full rounded-full" style={{ background: `radial-gradient(circle at 30% 30%, ${color}, #111)` }} />
        {/* Rings */}
        <div className="absolute w-[160%] h-[20%] border-2 rounded-[100%] border-white/20 rotate-[-15deg] blur-[1px]" />
        <div className="absolute w-[180%] h-[30%] border-[3px] rounded-[100%] border-white/10 rotate-[-15deg]" />
    </div>
);

const PlanetIce = ({ color }: { color: string }) => (
    <div className="relative w-full h-full rounded-full overflow-hidden" style={{ background: `radial-gradient(circle at 30% 30%, ${color}, #001533)` }}>
        {/* Cracks */}
        <div className="absolute top-[20%] left-[20%] w-[2px] h-8 bg-white/20 rotate-45" />
        <div className="absolute bottom-[30%] right-[10%] w-[1px] h-12 bg-white/30 rotate-[-30deg]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
    </div>
);

// ─── DATA ────────────────────────────────────────────────────────────────────
// Data is now imported from src/data/organizations.json

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

const PhotoCarousel = ({ images }: { images: string[] }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <div
            className="relative w-full h-32 md:h-44 rounded-xl md:rounded-2xl overflow-hidden pointer-events-none isolate"
            style={{ transform: "translateZ(0)", WebkitMaskImage: "-webkit-radial-gradient(white, black)" }}
        >
            <AnimatePresence>
                <motion.img
                    key={index}
                    src={images[index]}
                    alt="Gallery preview"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {images.map((_, i) => (
                    <div
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === index ? 'bg-white scale-125' : 'bg-white/40'}`}
                    />
                ))}
            </div>
        </div>
    );
};

const PixelStar = ({ className, delay = "0s", style }: { className?: string, delay?: string, style?: React.CSSProperties }) => (
    <div
        className={`absolute flex flex-col items-center pointer-events-none animate-twinkle ${className}`}
        style={{ animationDelay: delay, ...style }}
    >
        <div className="w-1 h-1 bg-white/80" />
        <div className="flex">
            <div className="w-1 h-1 bg-white/60" />
            <div className="w-1 h-1 bg-white" />
            <div className="w-1 h-1 bg-white/60" />
        </div>
        <div className="w-1 h-1 bg-white/80" />
    </div>
);

function GalacticNode({ mission, index, isMobile }: { mission: typeof missions[0]; index: number; isMobile: boolean }) {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    };

    const handleMouseEnter = () => {
        if (!isMobile) setIsActive(true);
    };

    const handleMouseLeave = () => {
        if (!isMobile) setIsActive(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
            whileInView={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            viewport={{ amount: 0.5 }}
            className="absolute z-10"
            style={{
                left: isMobile ? '50%' : mission.pos.x,
                top: isMobile ? `calc(${mission.pos.top} - 30px)` : mission.pos.top,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            {/* Aura Glow */}
            <div
                className="absolute inset-0 rounded-full blur-[40px] opacity-40 group-hover:opacity-80 transition-opacity duration-700"
                style={{ background: mission.color, transform: "scale(2)" }}
            />

            {/* Planet */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="relative w-32 h-32 md:w-44 md:h-44 z-10 cursor-pointer group"
            >
                {mission.theme === "GasGiant" && <PlanetGasGiant color={mission.color} />}
                {mission.theme === "Ringed" && <PlanetRinged color={mission.color} />}
                {mission.theme === "Ice" && <PlanetIce color={mission.color} />}

                {/* Internal Glow Overlay */}
                <div className="absolute inset-0 rounded-full shadow-[inset_-10px_-10px_30px_rgba(0,0,0,0.8),inset_10px_10px_30px_rgba(255,255,255,0.2)]" />
            </motion.div>

            {/* PHOTO PREVIEW POPUP */}
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 10 }}
                        transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
                        className="absolute bottom-full mb-6 left-1/2 -translate-x-1/2 w-[280px] md:w-[320px] z-40 pointer-events-none"
                    >
                        <div
                            className="relative p-1 rounded-2xl backdrop-blur-xl bg-black/60 border border-white/20 shadow-2xl overflow-hidden"
                            style={{ boxShadow: `0 10px 40px ${mission.glow}, inset 0 0 15px rgba(255,255,255,0.1)` }}
                        >
                            <PhotoCarousel images={mission.images} />
                        </div>
                        {/* Pointing triangle */}
                        <div
                            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 border-b border-r border-white/20 backdrop-blur-xl bg-black/60"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* HUD DISPLAY (Glassmorphism) */}
            <AnimatePresence>
                {/* HUD is always visible on desktop, or toggled on mobile if clicked? Or always visible? Let's keep it visible so they have the description */}
                <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className={`absolute ${index % 2 === 0 ? 'left-[70%] sm:left-[80%] md:left-[120%]' : 'right-[70%] sm:right-[80%] md:right-[120%]'
                        } top-1/2 -translate-y-1/2 w-[150px] sm:w-[180px] md:w-[350px] z-20 pointer-events-none md:pointer-events-auto`}
                >
                    <div
                        className="relative p-2 md:p-6 rounded-xl md:rounded-2xl backdrop-blur-xl bg-black/40 border border-white/10 overflow-hidden shadow-2xl"
                        style={{
                            boxShadow: `0 0 30px ${mission.glow}, inset 0 0 10px rgba(255,255,255,0.05)`
                        }}
                    >
                        {/* HUD UI Elements */}
                        <div className="absolute top-0 right-0 p-2 opacity-30">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                                <path d="M2 12h20M12 2v20M5 5l14 14M19 5L5 14" />
                            </svg>
                        </div>

                        <div className="flex flex-col gap-0.5 md:gap-1 mb-2 md:mb-4">
                            <span className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-mono" style={{ color: mission.color }}>System Log</span>
                            <h3 className="text-sm md:text-2xl font-black uppercase text-white leading-tight">{mission.org}</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-2 md:gap-4 mb-2 md:mb-4 border-y border-white/5 py-2 md:py-3">
                            <div className="flex flex-col">
                                <span className="text-[8px] md:text-[10px] uppercase text-gray-500 font-mono">Designation</span>
                                <span className="text-[10px] md:text-xs font-bold text-gray-200">{mission.role}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[8px] md:text-[10px] uppercase text-gray-500 font-mono">Period</span>
                                <span className="text-[10px] md:text-xs font-bold text-gray-400 font-mono">{mission.period}</span>
                            </div>
                        </div>

                        <p className="text-[10px] md:text-xs text-gray-300 font-light leading-relaxed mb-2 md:mb-4 line-clamp-2 md:line-clamp-none">
                            {mission.desc}
                        </p>

                        {/* Pixel Pulse Indicator */}
                        <div className="flex gap-1 items-center">
                            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: mission.color }} />
                            <span className="text-[10px] text-gray-400 uppercase font-mono tracking-widest">Active Signal Received</span>
                        </div>
                    </div>

                    {/* HUD Connectors */}
                    <div
                        className={`absolute top-1/2 -translate-y-1/2 ${index % 2 === 0 ? '-left-[15px] sm:-left-[20px] md:-left-8' : '-right-[15px] sm:-right-[20px] md:-right-8'
                            } w-[15px] sm:w-[20px] md:w-8 h-[2px] opacity-40`}
                        style={{ backgroundColor: mission.color }}
                    />
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}

export default function Organizations() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const pathLength = useSpring(useTransform(scrollYProgress, [0.1, 0.8], [0, 1]), {
        stiffness: 100,
        damping: 30,
    });

    // Detect if device is mobile for SVG path
    const [isMobile, setIsMobile] = useState(false);
    const [stars, setStars] = useState<Array<{ id: number, opacity: number, top: string, left: string, scale: number }>>([]);

    useEffect(() => {
        // Generate dynamic stars only on the client
        setStars([...Array(20)].map((_, i) => ({
            id: i,
            opacity: Math.floor(Math.random() * 50 + 20),
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            scale: Math.random() * 0.5 + 0.5,
        })));

        setIsMobile(window.innerWidth < 768);
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Cosmic snaking path SVG data extending longer
    const pathDataDesktop = "M 50,0 C 100,150 100,300 50,400 C 0,550 0,700 50,850 C 100,1000 100,1150 50,1250 C 0,1300 0,1350 50,1400";
    const pathDataMobile = "M 50,0 L 50,1400";
    const pathData = isMobile ? pathDataMobile : pathDataDesktop;

    return (
        <section
            ref={sectionRef}
            id="organizations"
            className="relative w-full min-h-[150vh] bg-[#040412] py-40 overflow-hidden flex flex-col items-center"
        >
            {/* Dynamic Starfield Background */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {stars.map((star) => (
                    <PixelStar
                        key={star.id}
                        delay={`${star.id * 0.5}s`}
                        style={{
                            opacity: star.opacity / 100,
                            top: star.top,
                            left: star.left,
                            transform: `scale(${star.scale})`,
                        }}
                    />
                ))}
                {/* Subtle Nebula Glows */}
                <div className="absolute top-[20%] left-[10%] w-[800px] h-[800px] bg-[#ff45c0]/5 rounded-full blur-[180px] h-32" />
                <div className="absolute bottom-[20%] right-[10%] w-[800px] h-[800px] bg-[#00cfff]/5 rounded-full blur-[180px] h-32" />
            </div>

            <div className="max-w-4xl w-full px-6 z-10 text-center mb-24 md:mb-40 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="relative inline-block"
                >
                    <h2
                        className="text-white text-3xl sm:text-5xl md:text-8xl font-black uppercase tracking-tighter italic"
                        style={{ textShadow: "0 0 40px rgba(0,207,255,0.3)" }}
                    >
                        Galactic Journey
                    </h2>
                    <div className="absolute -bottom-4 left-0 w-full h-[6px] bg-gradient-to-r from-transparent via-[#00cfff] to-transparent shadow-[0_0_20px_#00cfff]" />
                </motion.div>
                <div className="mt-8 md:mt-12 flex justify-center gap-4 sm:gap-8">
                    <div className="flex flex-col items-center">
                        <span className="text-[8px] sm:text-[10px] text-gray-500 font-mono uppercase tracking-[0.2em] sm:tracking-[0.4em] mb-2 leading-none">Voyaging Since</span>
                        <span className="text-sm sm:text-lg md:text-xl font-bold text-white uppercase italic leading-none">2022</span>
                    </div>
                    <div className="w-[1px] h-8 sm:h-12 bg-white/10" />
                    <div className="flex flex-col items-center">
                        <span className="text-[8px] sm:text-[10px] text-gray-500 font-mono uppercase tracking-[0.2em] sm:tracking-[0.4em] mb-2 leading-none">Current Sector</span>
                        <span className="text-sm sm:text-lg md:text-xl font-bold text-white uppercase italic leading-none">Telkom University</span>
                    </div>
                </div>
            </div>

            {/* THE MISSION PATH */}
            <div className="relative w-full h-[1400px] z-10">
                {/* Animated Nebula Line */}
                <svg
                    className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
                    viewBox="0 0 100 1400"
                    preserveAspectRatio="none"
                >
                    {/* Outer Nebula Glow */}
                    <path
                        d={pathData}
                        fill="none"
                        stroke="rgba(0,207,255,0.05)"
                        strokeWidth="30"
                        strokeLinecap="round"
                        className="blur-3xl"
                    />

                    {/* Inner Shimmering Line */}
                    <motion.path
                        d={pathData}
                        fill="none"
                        stroke="url(#pathGradient)"
                        strokeWidth="2"
                        strokeDasharray="1, 8"
                        strokeLinecap="round"
                        style={{ pathLength }}
                    />

                    <defs>
                        <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#ff45c0" />
                            <stop offset="50%" stopColor="#00cfff" />
                            <stop offset="100%" stopColor="#f5c400" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Planet Nodes */}
                {missions.map((mission, index) => (
                    <GalacticNode key={index} mission={mission as any} index={index} isMobile={isMobile} />
                ))}
            </div>

            {/* Global Animations */}
            <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
      `}</style>

            {/* Terminal Fading */}
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#040412] to-transparent z-20 pointer-events-none" />
        </section>
    );
}
