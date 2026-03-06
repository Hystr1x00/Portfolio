"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// ─── Pixel-Art SVG Logos (24×24 viewBox) ────────────────────────────────────

const PixelReactLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" className="pixelated" style={{ imageRendering: "pixelated" }}>
        <rect x="11" y="11" width="2" height="2" fill="currentColor" />
        {/* Orbit 1 - horizontal */}
        <rect x="5" y="11" width="2" height="2" fill="currentColor" />
        <rect x="17" y="11" width="2" height="2" fill="currentColor" />
        <rect x="3" y="11" width="2" height="2" fill="currentColor" opacity="0.6" />
        <rect x="19" y="11" width="2" height="2" fill="currentColor" opacity="0.6" />
        {/* Orbit 2 - diagonal TL to BR */}
        <rect x="7" y="5" width="2" height="2" fill="currentColor" />
        <rect x="15" y="17" width="2" height="2" fill="currentColor" />
        <rect x="5" y="3" width="2" height="2" fill="currentColor" opacity="0.6" />
        <rect x="17" y="19" width="2" height="2" fill="currentColor" opacity="0.6" />
        {/* Orbit 3 - diagonal TR to BL */}
        <rect x="15" y="5" width="2" height="2" fill="currentColor" />
        <rect x="7" y="17" width="2" height="2" fill="currentColor" />
        <rect x="17" y="3" width="2" height="2" fill="currentColor" opacity="0.6" />
        <rect x="5" y="19" width="2" height="2" fill="currentColor" opacity="0.6" />
        {/* Mid orbit points */}
        <rect x="9" y="7" width="2" height="2" fill="currentColor" opacity="0.7" />
        <rect x="13" y="7" width="2" height="2" fill="currentColor" opacity="0.7" />
        <rect x="9" y="15" width="2" height="2" fill="currentColor" opacity="0.7" />
        <rect x="13" y="15" width="2" height="2" fill="currentColor" opacity="0.7" />
    </svg>
);

const PixelNextLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" className="pixelated" style={{ imageRendering: "pixelated" }}>
        {/* N shape */}
        <rect x="4" y="4" width="3" height="16" fill="currentColor" />
        <rect x="7" y="7" width="2" height="2" fill="currentColor" />
        <rect x="9" y="9" width="2" height="2" fill="currentColor" />
        <rect x="11" y="11" width="2" height="2" fill="currentColor" />
        <rect x="13" y="13" width="2" height="2" fill="currentColor" />
        <rect x="15" y="15" width="2" height="2" fill="currentColor" />
        <rect x="17" y="4" width="3" height="16" fill="currentColor" />
        {/* Bottom accent */}
        <rect x="17" y="17" width="3" height="3" fill="currentColor" opacity="0.5" />
    </svg>
);

const PixelTSLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" className="pixelated" style={{ imageRendering: "pixelated" }}>
        {/* Background square */}
        <rect x="2" y="2" width="20" height="20" fill="currentColor" opacity="0.15" />
        {/* T */}
        <rect x="3" y="5" width="8" height="2" fill="currentColor" />
        <rect x="6" y="7" width="2" height="8" fill="currentColor" />
        {/* S */}
        <rect x="13" y="5" width="6" height="2" fill="currentColor" />
        <rect x="13" y="7" width="2" height="3" fill="currentColor" />
        <rect x="13" y="10" width="6" height="2" fill="currentColor" />
        <rect x="17" y="12" width="2" height="3" fill="currentColor" />
        <rect x="13" y="15" width="6" height="2" fill="currentColor" />
    </svg>
);

const PixelJSLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" className="pixelated" style={{ imageRendering: "pixelated" }}>
        {/* Background square */}
        <rect x="2" y="2" width="20" height="20" fill="currentColor" opacity="0.15" />
        {/* J */}
        <rect x="11" y="5" width="2" height="10" fill="currentColor" />
        <rect x="7" y="13" width="4" height="2" fill="currentColor" />
        <rect x="7" y="15" width="2" height="2" fill="currentColor" opacity="0.6" />
        {/* S */}
        <rect x="15" y="5" width="4" height="2" fill="currentColor" />
        <rect x="15" y="7" width="2" height="2" fill="currentColor" />
        <rect x="15" y="9" width="4" height="2" fill="currentColor" />
        <rect x="17" y="11" width="2" height="2" fill="currentColor" />
        <rect x="15" y="13" width="4" height="2" fill="currentColor" />
    </svg>
);

const PixelPHPLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" className="pixelated" style={{ imageRendering: "pixelated" }}>
        {/* Ellipse outline */}
        <rect x="6" y="4" width="12" height="2" fill="currentColor" opacity="0.3" />
        <rect x="4" y="6" width="2" height="2" fill="currentColor" opacity="0.3" />
        <rect x="18" y="6" width="2" height="2" fill="currentColor" opacity="0.3" />
        <rect x="2" y="8" width="2" height="8" fill="currentColor" opacity="0.3" />
        <rect x="20" y="8" width="2" height="8" fill="currentColor" opacity="0.3" />
        <rect x="4" y="16" width="2" height="2" fill="currentColor" opacity="0.3" />
        <rect x="18" y="16" width="2" height="2" fill="currentColor" opacity="0.3" />
        <rect x="6" y="18" width="12" height="2" fill="currentColor" opacity="0.3" />
        {/* P */}
        <rect x="6" y="8" width="2" height="8" fill="currentColor" />
        <rect x="8" y="8" width="4" height="2" fill="currentColor" />
        <rect x="10" y="10" width="2" height="2" fill="currentColor" />
        <rect x="8" y="12" width="2" height="2" fill="currentColor" />
        {/* H */}
        <rect x="14" y="8" width="2" height="8" fill="currentColor" />
        <rect x="16" y="12" width="2" height="2" fill="currentColor" />
        <rect x="18" y="8" width="2" height="8" fill="currentColor" />
    </svg>
);

const PixelLaravelLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" className="pixelated" style={{ imageRendering: "pixelated" }}>
        {/* L shape - main stroke */}
        <rect x="4" y="3" width="3" height="14" fill="currentColor" />
        <rect x="7" y="14" width="6" height="3" fill="currentColor" />
        {/* Decorative accent lines */}
        <rect x="14" y="3" width="2" height="2" fill="currentColor" opacity="0.8" />
        <rect x="16" y="5" width="2" height="2" fill="currentColor" opacity="0.8" />
        <rect x="18" y="7" width="2" height="2" fill="currentColor" opacity="0.8" />
        <rect x="16" y="9" width="2" height="2" fill="currentColor" opacity="0.6" />
        <rect x="18" y="11" width="2" height="2" fill="currentColor" opacity="0.6" />
        <rect x="16" y="13" width="2" height="2" fill="currentColor" opacity="0.4" />
        {/* Bottom accent */}
        <rect x="4" y="19" width="16" height="2" fill="currentColor" opacity="0.2" />
    </svg>
);

const PixelExpressLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" className="pixelated" style={{ imageRendering: "pixelated" }}>
        {/* E shape */}
        <rect x="4" y="4" width="2" height="16" fill="currentColor" />
        <rect x="6" y="4" width="8" height="2" fill="currentColor" />
        <rect x="6" y="11" width="6" height="2" fill="currentColor" />
        <rect x="6" y="18" width="8" height="2" fill="currentColor" />
        {/* x accent */}
        <rect x="16" y="8" width="2" height="2" fill="currentColor" opacity="0.7" />
        <rect x="20" y="8" width="2" height="2" fill="currentColor" opacity="0.7" />
        <rect x="18" y="10" width="2" height="2" fill="currentColor" />
        <rect x="16" y="12" width="2" height="2" fill="currentColor" opacity="0.7" />
        <rect x="20" y="12" width="2" height="2" fill="currentColor" opacity="0.7" />
    </svg>
);

const PixelTailwindLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" className="pixelated" style={{ imageRendering: "pixelated" }}>
        {/* Wind wave 1 */}
        <rect x="4" y="7" width="2" height="2" fill="currentColor" opacity="0.6" />
        <rect x="6" y="5" width="2" height="2" fill="currentColor" />
        <rect x="8" y="7" width="2" height="2" fill="currentColor" />
        <rect x="10" y="5" width="2" height="2" fill="currentColor" />
        <rect x="12" y="7" width="2" height="2" fill="currentColor" />
        <rect x="14" y="5" width="2" height="2" fill="currentColor" />
        <rect x="16" y="7" width="2" height="2" fill="currentColor" />
        <rect x="18" y="5" width="2" height="2" fill="currentColor" opacity="0.6" />
        {/* Wind wave 2 */}
        <rect x="2" y="15" width="2" height="2" fill="currentColor" opacity="0.6" />
        <rect x="4" y="13" width="2" height="2" fill="currentColor" />
        <rect x="6" y="15" width="2" height="2" fill="currentColor" />
        <rect x="8" y="13" width="2" height="2" fill="currentColor" />
        <rect x="10" y="15" width="2" height="2" fill="currentColor" />
        <rect x="12" y="13" width="2" height="2" fill="currentColor" />
        <rect x="14" y="15" width="2" height="2" fill="currentColor" />
        <rect x="16" y="13" width="2" height="2" fill="currentColor" opacity="0.6" />
        {/* Connector dots */}
        <rect x="8" y="9" width="2" height="2" fill="currentColor" opacity="0.3" />
        <rect x="12" y="9" width="2" height="2" fill="currentColor" opacity="0.3" />
        <rect x="6" y="11" width="2" height="2" fill="currentColor" opacity="0.3" />
        <rect x="10" y="11" width="2" height="2" fill="currentColor" opacity="0.3" />
    </svg>
);

const PixelArduinoLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" className="pixelated" style={{ imageRendering: "pixelated" }}>
        {/* Circuit board / chip shape */}
        <rect x="6" y="4" width="12" height="2" fill="currentColor" />
        <rect x="6" y="18" width="12" height="2" fill="currentColor" />
        <rect x="6" y="6" width="2" height="12" fill="currentColor" />
        <rect x="16" y="6" width="2" height="12" fill="currentColor" />
        {/* Infinity/loop symbol in center */}
        <rect x="8" y="10" width="2" height="4" fill="currentColor" />
        <rect x="10" y="9" width="2" height="2" fill="currentColor" />
        <rect x="10" y="13" width="2" height="2" fill="currentColor" />
        <rect x="12" y="9" width="2" height="2" fill="currentColor" />
        <rect x="12" y="13" width="2" height="2" fill="currentColor" />
        <rect x="14" y="10" width="2" height="4" fill="currentColor" />
        {/* Pins */}
        <rect x="4" y="8" width="2" height="2" fill="currentColor" opacity="0.6" />
        <rect x="4" y="14" width="2" height="2" fill="currentColor" opacity="0.6" />
        <rect x="18" y="8" width="2" height="2" fill="currentColor" opacity="0.6" />
        <rect x="18" y="14" width="2" height="2" fill="currentColor" opacity="0.6" />
        <rect x="9" y="2" width="2" height="2" fill="currentColor" opacity="0.6" />
        <rect x="13" y="2" width="2" height="2" fill="currentColor" opacity="0.6" />
        <rect x="9" y="20" width="2" height="2" fill="currentColor" opacity="0.6" />
        <rect x="13" y="20" width="2" height="2" fill="currentColor" opacity="0.6" />
    </svg>
);

// ─── Tech Data ───────────────────────────────────────────────────────────────

interface TechItem {
    name: string;
    color: string;
    glowColor: string;
    icon: React.ReactNode;
}

const techStack: TechItem[] = [
    { name: "React JS", color: "#61dafb", glowColor: "rgba(97,218,251,0.35)", icon: <PixelReactLogo /> },
    { name: "Next.js", color: "#ffffff", glowColor: "rgba(255,255,255,0.25)", icon: <PixelNextLogo /> },
    { name: "TypeScript", color: "#3178c6", glowColor: "rgba(49,120,198,0.35)", icon: <PixelTSLogo /> },
    { name: "JavaScript", color: "#f7df1e", glowColor: "rgba(247,223,30,0.35)", icon: <PixelJSLogo /> },
    { name: "PHP", color: "#777bb4", glowColor: "rgba(119,123,180,0.35)", icon: <PixelPHPLogo /> },
    { name: "Laravel", color: "#ff2d20", glowColor: "rgba(255,45,32,0.35)", icon: <PixelLaravelLogo /> },
    { name: "Express", color: "#68a063", glowColor: "rgba(104,160,99,0.35)", icon: <PixelExpressLogo /> },
    { name: "Tailwind", color: "#38bdf8", glowColor: "rgba(56,189,248,0.35)", icon: <PixelTailwindLogo /> },
    { name: "Arduino", color: "#00979d", glowColor: "rgba(0,151,157,0.35)", icon: <PixelArduinoLogo /> },
];

// ─── Reused Background Components ────────────────────────────────────────────

const PixelStar = ({ className, delay = "0s", duration = "4s" }: { className?: string; delay?: string; duration?: string }) => (
    <div
        className={`absolute flex flex-col items-center pointer-events-none animate-twinkle ${className}`}
        style={{ animationDelay: delay, animationDuration: duration }}
    >
        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#e5e5e5]" />
        <div className="flex">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#e5e5e5]" />
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white" />
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#e5e5e5]" />
        </div>
        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#e5e5e5]" />
    </div>
);

const SmallStar = ({ className, delay = "0s" }: { className?: string; delay?: string }) => (
    <div
        className={`absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white pointer-events-none animate-pulse ${className}`}
        style={{ animationDelay: delay }}
    />
);

function PixelGrid() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="ts-pg-s" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                        <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />
                    </pattern>
                    <pattern id="ts-pg-b" x="0" y="0" width="96" height="96" patternUnits="userSpaceOnUse">
                        <path d="M 96 0 L 0 0 0 96" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#ts-pg-s)" />
                <rect width="100%" height="100%" fill="url(#ts-pg-b)" />
            </svg>
        </div>
    );
}

// ─── Tech Card ───────────────────────────────────────────────────────────────

function TechCard({ tech, index }: { tech: TechItem; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
            whileHover={{ scale: 1.08, y: -4 }}
            className="relative group cursor-default"
        >
            {/* Outer glow */}
            <div
                className="absolute inset-0 pointer-events-none transition-all duration-300 group-hover:opacity-100 opacity-50"
                style={{
                    boxShadow: `0 0 20px 2px ${tech.glowColor}, 4px 4px 0px rgba(0,0,0,0.85)`,
                }}
            />

            {/* Card body */}
            <div
                className="relative border-2 overflow-hidden transition-all duration-300"
                style={{
                    borderColor: tech.color,
                    backgroundColor: "rgba(4,4,18,0.92)",
                    clipPath:
                        "polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0% calc(100% - 8px), 0% 8px)",
                    backdropFilter: "blur(8px)",
                }}
            >
                {/* Top color bar */}
                <div
                    className="h-[2px] w-full"
                    style={{ backgroundColor: tech.color, boxShadow: `0 0 8px ${tech.color}` }}
                />

                {/* CRT scanlines */}
                <div
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)",
                    }}
                />

                <div className="p-4 sm:p-5 flex flex-col items-center gap-3 relative z-20">
                    {/* Icon */}
                    <div
                        className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                        style={{
                            color: tech.color,
                            filter: `drop-shadow(0 0 6px ${tech.glowColor})`,
                        }}
                    >
                        <div className="scale-[1.8] sm:scale-[2]">{tech.icon}</div>
                    </div>

                    {/* Name */}
                    <span
                        className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase pixelated text-center leading-tight"
                        style={{
                            color: tech.color,
                            fontFamily: "'Courier New', monospace",
                            textShadow: `0 0 10px ${tech.glowColor}`,
                        }}
                    >
                        {tech.name}
                    </span>

                    {/* Pixel bar indicator */}
                    <div className="flex gap-[2px] items-end">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div
                                key={i}
                                style={{
                                    width: 3,
                                    height: 2 + (i % 3) * 2,
                                    backgroundColor: tech.color,
                                    opacity: 0.3 + (i / 5) * 0.7,
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Pixel corner cuts */}
                {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, i) => (
                    <div key={i} className={`absolute ${pos} w-2 h-2`} style={{ backgroundColor: "#040412" }} />
                ))}
            </div>
        </motion.div>
    );
}

// ─── Main Section ────────────────────────────────────────────────────────────

export default function TechStack() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "start start"],
    });

    const titleY = useSpring(
        useTransform(scrollYProgress, [0, 1], [50, 0]),
        { stiffness: 100, damping: 20 }
    );
    const titleOpacity = useSpring(
        useTransform(scrollYProgress, [0, 0.7], [0, 1]),
        { stiffness: 100, damping: 20 }
    );

    return (
        <section
            ref={sectionRef}
            id="techstack"
            className="relative w-full min-h-[60vh] bg-[#111] flex flex-col items-center py-24 overflow-hidden"
        >
            {/* Twinkle keyframes */}
            <style jsx global>{`
                @keyframes twinkle {
                    0%, 100% { opacity: 0.3; transform: scale(0.8) translateY(0px); }
                    50% { opacity: 1; transform: scale(1.1) translateY(-10px); }
                }
                .animate-twinkle { animation: twinkle infinite ease-in-out; }
            `}</style>

            {/* Background */}
            <PixelGrid />

            {/* Stars */}
            <PixelStar className="top-[10%] left-[8%] opacity-70" delay="0.5s" duration="4s" />
            <PixelStar className="top-[20%] right-[12%] opacity-50 scale-75" delay="1.5s" duration="5s" />
            <PixelStar className="bottom-[15%] left-[15%] opacity-60 scale-50" delay="2s" duration="3.5s" />
            <PixelStar className="bottom-[25%] right-[8%] opacity-80 scale-125" delay="0s" duration="4.5s" />

            <SmallStar className="top-[30%] left-[25%]" delay="0.3s" />
            <SmallStar className="top-[15%] right-[30%]" delay="1s" />
            <SmallStar className="bottom-[20%] left-[40%]" delay="1.8s" />
            <SmallStar className="bottom-[35%] right-[20%]" delay="0.7s" />

            {/* Title */}
            <motion.div
                style={{ y: titleY, opacity: titleOpacity }}
                className="mb-16 text-center relative z-10"
            >
                {/* Decorative pixel steps */}
                <div className="flex justify-center mb-4 opacity-40">
                    <svg width="128" height="28" viewBox="0 0 128 28" style={{ imageRendering: "pixelated" }}>
                        {[0, 1, 2, 3].map((i) => (
                            <rect
                                key={i}
                                x={i * 32}
                                y={28 - (i + 1) * 7}
                                width="32"
                                height={(i + 1) * 7}
                                fill="#00cfff"
                                opacity={0.12 + i * 0.14}
                            />
                        ))}
                    </svg>
                </div>

                <h2
                    className="text-white text-3xl md:text-5xl font-bold leading-none tracking-widest uppercase pixelated"
                    style={{ textShadow: "0 0 32px rgba(0,207,255,0.4), 4px 4px 0px rgba(0,0,0,1)" }}
                >
                    My Stack
                </h2>
                <div
                    className="text-xs tracking-widest uppercase mt-2 mb-4"
                    style={{ color: "#555e8a", fontFamily: "'Courier New', monospace" }}
                >
                    ── TECH ARSENAL ──
                </div>

                {/* Glow bar */}
                <div className="flex justify-center gap-0.5 items-center">
                    {[6, 10, 18, 28, 44, 28, 18, 10, 6].map((w, i) => (
                        <div
                            key={i}
                            className="h-1"
                            style={{
                                width: w,
                                backgroundColor:
                                    i === 4 ? "#00cfff" : i === 3 || i === 5 ? "#61dafb" : "rgba(255,255,255,0.15)",
                                boxShadow: i === 4 ? "0 0 10px #00cfff, 0 0 20px #00cfff66" : "none",
                            }}
                        />
                    ))}
                </div>
            </motion.div>

            {/* Tech Grid */}
            <div className="max-w-4xl w-full px-6 relative z-10">
                <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
                    {techStack.map((tech, index) => (
                        <TechCard key={tech.name} tech={tech} index={index} />
                    ))}
                </div>
            </div>

            {/* Decorative bottom scanline fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#111] to-transparent pointer-events-none z-[5]" />
        </section>
    );
}
