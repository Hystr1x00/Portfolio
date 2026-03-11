"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Pixel Loading Bar ───────────────────────────────────────────────────────

function PixelLoadingBar({ progress }: { progress: number }) {
    const totalBlocks = 20;
    const filledBlocks = Math.floor((progress / 100) * totalBlocks);

    return (
        <div className="flex flex-col items-center gap-3">
            {/* Loading bar container */}
            <div
                className="relative"
                style={{
                    border: "2px solid rgba(255,255,255,0.15)",
                    padding: 3,
                    backgroundColor: "rgba(0,0,20,0.8)",
                    boxShadow: "0 0 15px rgba(0,100,255,0.1), inset 0 0 8px rgba(0,0,0,0.5)",
                }}
            >
                <div className="flex gap-[2px]">
                    {Array.from({ length: totalBlocks }).map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scaleY: 0 }}
                            animate={{
                                opacity: i < filledBlocks ? 1 : 0.08,
                                scaleY: i < filledBlocks ? 1 : 0.5,
                            }}
                            transition={{ duration: 0.15, delay: i * 0.02 }}
                            style={{
                                width: 8,
                                height: 14,
                                backgroundColor: i < filledBlocks
                                    ? getBlockColor(i, totalBlocks)
                                    : "rgba(255,255,255,0.03)",
                                boxShadow: i < filledBlocks
                                    ? `0 0 8px ${getBlockColor(i, totalBlocks)}66`
                                    : "none",
                                imageRendering: "pixelated" as const,
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Percentage text */}
            <div className="flex items-center gap-2">
                <span
                    className="text-white/60 text-xs tracking-[0.2em] uppercase pixelated"
                    style={{ fontFamily: "'Courier New', monospace" }}
                >
                    Launching
                </span>
                <span
                    className="text-[#61dafb] text-xs pixelated"
                    style={{
                        fontFamily: "'Courier New', monospace",
                        textShadow: "0 0 8px rgba(97,218,251,0.5)",
                    }}
                >
                    {Math.floor(progress)}%
                </span>
            </div>
        </div>
    );
}

function getBlockColor(index: number, total: number): string {
    const ratio = index / total;
    if (ratio < 0.33) return "#3178c6"; // deep blue
    if (ratio < 0.66) return "#00cfff"; // cyan
    return "#61dafb"; // light blue
}

// ─── Pixel Rocket ────────────────────────────────────────────────────────────

function PixelRocket() {
    return (
        <div className="relative">
            {/* Rocket flame exhaust — animated */}
            <motion.div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
                animate={{ scaleY: [0.8, 1.2, 0.8], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 0.3, repeat: Infinity }}
            >
                <svg width="24" height="32" viewBox="0 0 24 32" className="pixelated" style={{ imageRendering: "pixelated" }}>
                    <rect x="8" y="0" width="8" height="4" fill="#f5c400" />
                    <rect x="6" y="4" width="12" height="4" fill="#ff6b2d" />
                    <rect x="8" y="8" width="8" height="4" fill="#ff2d20" />
                    <rect x="10" y="12" width="4" height="4" fill="#ff2d20" opacity="0.7" />
                    <rect x="10" y="16" width="4" height="4" fill="#ff6b2d" opacity="0.4" />
                    <rect x="10" y="20" width="4" height="4" fill="#f5c400" opacity="0.2" />
                </svg>
            </motion.div>

            {/* Rocket body */}
            <svg width="48" height="64" viewBox="0 0 48 64" className="pixelated" style={{ imageRendering: "pixelated" }}>
                {/* Nose cone */}
                <rect x="20" y="0" width="8" height="4" fill="#e0e0e0" />
                <rect x="16" y="4" width="16" height="4" fill="#cccccc" />
                <rect x="14" y="8" width="20" height="4" fill="#b0b0b0" />

                {/* Body */}
                <rect x="12" y="12" width="24" height="4" fill="#ffffff" />
                <rect x="12" y="16" width="24" height="4" fill="#f0f0f0" />
                <rect x="12" y="20" width="24" height="4" fill="#ffffff" />
                <rect x="12" y="24" width="24" height="4" fill="#f0f0f0" />
                <rect x="12" y="28" width="24" height="4" fill="#ffffff" />

                {/* Window */}
                <rect x="20" y="16" width="8" height="8" fill="#0a0a2e" />
                <rect x="22" y="18" width="4" height="4" fill="#00cfff" opacity="0.6" />
                <rect x="22" y="18" width="2" height="2" fill="#61dafb" />

                {/* Body stripe */}
                <rect x="12" y="30" width="24" height="2" fill="#ff2d20" />

                {/* Lower body */}
                <rect x="12" y="32" width="24" height="4" fill="#e8e8e8" />
                <rect x="12" y="36" width="24" height="4" fill="#d0d0d0" />

                {/* Fins */}
                <rect x="4" y="36" width="8" height="4" fill="#ff2d20" />
                <rect x="6" y="32" width="6" height="4" fill="#ff2d20" />
                <rect x="36" y="36" width="8" height="4" fill="#ff2d20" />
                <rect x="36" y="32" width="6" height="4" fill="#ff2d20" />

                {/* Fin tips */}
                <rect x="4" y="40" width="4" height="4" fill="#cc0000" />
                <rect x="40" y="40" width="4" height="4" fill="#cc0000" />

                {/* Engine nozzle */}
                <rect x="16" y="40" width="16" height="4" fill="#888" />
                <rect x="18" y="44" width="12" height="4" fill="#666" />
            </svg>
        </div>
    );
}

// ─── Twinkling Stars Background ──────────────────────────────────────────────

function StarField() {
    const stars = [
        { x: "8%", y: "12%", size: 3, delay: 0, duration: 2.5 },
        { x: "15%", y: "65%", size: 2, delay: 0.3, duration: 3 },
        { x: "22%", y: "35%", size: 4, delay: 0.8, duration: 2 },
        { x: "30%", y: "80%", size: 2, delay: 1.2, duration: 3.5 },
        { x: "38%", y: "18%", size: 3, delay: 0.5, duration: 2.8 },
        { x: "45%", y: "55%", size: 2, delay: 1.8, duration: 3.2 },
        { x: "52%", y: "8%", size: 3, delay: 0.2, duration: 2.3 },
        { x: "58%", y: "72%", size: 2, delay: 1.5, duration: 3.8 },
        { x: "65%", y: "42%", size: 4, delay: 0.7, duration: 2.1 },
        { x: "72%", y: "88%", size: 2, delay: 2.0, duration: 3.3 },
        { x: "78%", y: "25%", size: 3, delay: 0.4, duration: 2.6 },
        { x: "85%", y: "60%", size: 2, delay: 1.0, duration: 3.6 },
        { x: "92%", y: "15%", size: 3, delay: 1.6, duration: 2.4 },
        { x: "5%", y: "90%", size: 2, delay: 0.9, duration: 3.1 },
        { x: "48%", y: "92%", size: 3, delay: 2.2, duration: 2.7 },
        { x: "88%", y: "78%", size: 2, delay: 0.6, duration: 3.4 },
        { x: "35%", y: "5%", size: 2, delay: 1.4, duration: 2.9 },
        { x: "62%", y: "32%", size: 3, delay: 0.1, duration: 3.7 },
        { x: "18%", y: "48%", size: 2, delay: 1.9, duration: 2.2 },
        { x: "75%", y: "52%", size: 2, delay: 1.1, duration: 3.0 },
    ];

    return (
        <>
            {stars.map((star, i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    style={{
                        left: star.x,
                        top: star.y,
                        width: star.size,
                        height: star.size,
                        backgroundColor: "#fff",
                    }}
                    animate={{ opacity: [0.1, 0.9, 0.1] }}
                    transition={{
                        duration: star.duration,
                        delay: star.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </>
    );
}

// ─── Pixel Planet (small decorative) ─────────────────────────────────────────

function PixelPlanet() {
    return (
        <motion.div
            className="absolute bottom-[15%] right-[12%] opacity-40"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
            <svg width="32" height="32" viewBox="0 0 32 32" className="pixelated" style={{ imageRendering: "pixelated" }}>
                <rect x="10" y="4" width="12" height="4" fill="#3178c6" />
                <rect x="6" y="8" width="20" height="4" fill="#3178c6" />
                <rect x="4" y="12" width="24" height="4" fill="#4a90d9" />
                {/* Ring */}
                <rect x="0" y="14" width="32" height="2" fill="#61dafb" opacity="0.5" />
                <rect x="4" y="16" width="24" height="4" fill="#3178c6" />
                <rect x="6" y="20" width="20" height="4" fill="#2a5f9e" />
                <rect x="10" y="24" width="12" height="4" fill="#2a5f9e" />
            </svg>
        </motion.div>
    );
}

// ─── Pixel Cross Star (decorative) ───────────────────────────────────────────

function PixelCross({ className, color = "#fff", delay = 0 }: { className?: string; color?: string; delay?: number }) {
    return (
        <motion.div
            className={`absolute pointer-events-none ${className}`}
            animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.1, 0.8] }}
            transition={{ duration: 3, delay, repeat: Infinity, ease: "easeInOut" }}
        >
            <svg width="12" height="12" viewBox="0 0 12 12" className="pixelated" style={{ imageRendering: "pixelated" }}>
                <rect x="4" y="0" width="4" height="4" fill={color} />
                <rect x="0" y="4" width="4" height="4" fill={color} opacity="0.7" />
                <rect x="4" y="4" width="4" height="4" fill={color} />
                <rect x="8" y="4" width="4" height="4" fill={color} opacity="0.7" />
                <rect x="4" y="8" width="4" height="4" fill={color} />
            </svg>
        </motion.div>
    );
}

// ─── CRT Scanlines ───────────────────────────────────────────────────────────

function ScanlineOverlay() {
    return (
        <div
            className="absolute inset-0 pointer-events-none z-[2]"
            style={{
                backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 4px)",
            }}
        />
    );
}

// ─── Main Splash Screen ─────────────────────────────────────────────────────

interface SplashScreenProps {
    children: React.ReactNode;
}

export default function SplashScreen({ children }: SplashScreenProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let animationProgress = 0;
        const progressInterval = setInterval(() => {
            if (animationProgress < 85) {
                animationProgress += Math.random() * 3 + 0.5;
                animationProgress = Math.min(animationProgress, 85);
                setProgress(animationProgress);
            }
        }, 100);

        const handleLoad = () => {
            clearInterval(progressInterval);

            let current = animationProgress;
            const finishInterval = setInterval(() => {
                current += 5;
                if (current >= 100) {
                    current = 100;
                    setProgress(100);
                    clearInterval(finishInterval);
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 600);
                } else {
                    setProgress(current);
                }
            }, 40);
        };

        if (document.readyState === "complete") {
            setTimeout(() => handleLoad(), 800);
        } else {
            window.addEventListener("load", handleLoad);
        }

        return () => {
            clearInterval(progressInterval);
            window.removeEventListener("load", handleLoad);
        };
    }, []);

    return (
        <>
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        key="splash"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden"
                        style={{ backgroundColor: "#060612" }}
                    >
                        {/* Deep space gradient */}
                        <div
                            className="absolute inset-0 z-0"
                            style={{
                                background: "radial-gradient(ellipse at 50% 60%, #0a0a2e 0%, #060612 50%, #020208 100%)",
                            }}
                        />

                        {/* CRT Scanlines */}
                        <ScanlineOverlay />

                        {/* Starfield */}
                        <StarField />

                        {/* Pixel cross stars */}
                        <PixelCross className="top-[20%] left-[18%]" color="#61dafb" delay={0} />
                        <PixelCross className="top-[12%] right-[22%]" color="#f5c400" delay={1.2} />
                        <PixelCross className="bottom-[30%] left-[10%]" color="#00cfff" delay={0.6} />
                        <PixelCross className="top-[45%] right-[8%]" color="#ff2d20" delay={1.8} />

                        {/* Decorative planet */}
                        <PixelPlanet />

                        {/* Nebula glow */}
                        <div
                            className="absolute top-[20%] left-[30%] w-[300px] h-[300px] rounded-full pointer-events-none z-0"
                            style={{
                                background: "radial-gradient(circle, rgba(0,0,128,0.08) 0%, transparent 70%)",
                                filter: "blur(40px)",
                            }}
                        />
                        <div
                            className="absolute bottom-[30%] right-[20%] w-[250px] h-[250px] rounded-full pointer-events-none z-0"
                            style={{
                                background: "radial-gradient(circle, rgba(97,218,251,0.06) 0%, transparent 70%)",
                                filter: "blur(40px)",
                            }}
                        />

                        {/* Vignette */}
                        <div
                            className="absolute inset-0 pointer-events-none z-[3]"
                            style={{
                                background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.6) 100%)",
                            }}
                        />

                        {/* Pixel grid - subtle */}
                        <div className="absolute inset-0 pointer-events-none z-[1]">
                            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern id="splash-grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                                        <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#splash-grid)" />
                            </svg>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 flex flex-col items-center gap-6">
                            {/* Rocket with float animation */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: [0, -8, 0] }}
                                transition={{
                                    opacity: { duration: 0.6, delay: 0.2 },
                                    y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                                }}
                                className="scale-90 sm:scale-100"
                            >
                                <PixelRocket />
                            </motion.div>

                            {/* Title */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="text-center mt-4"
                            >
                                <h1
                                    className="text-white text-sm sm:text-lg tracking-[0.3em] uppercase pixelated mb-1"
                                    style={{
                                        textShadow: "0 0 20px rgba(97,218,251,0.4), 2px 2px 0px rgba(0,0,0,1)",
                                    }}
                                >
                                    PREPARING LAUNCH
                                </h1>
                                <div
                                    className="text-[10px] tracking-[0.2em] uppercase pixelated"
                                    style={{
                                        color: "#555e8a",
                                        fontFamily: "'Courier New', monospace",
                                    }}
                                >
                                    ── ENTERING ORBIT ──
                                </div>
                            </motion.div>

                            {/* Loading Bar */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                            >
                                <PixelLoadingBar progress={progress} />
                            </motion.div>

                            {/* Blinking status text */}
                            <motion.p
                                className="text-[8px] sm:text-[10px] tracking-[0.15em] uppercase pixelated"
                                style={{
                                    color: "#3a3a5a",
                                    fontFamily: "'Courier New', monospace",
                                }}
                                animate={{ opacity: [0.3, 0.7, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                Calibrating systems...
                            </motion.p>
                        </div>

                        {/* Corner pixel decorations */}
                        {[
                            "top-4 left-4",
                            "top-4 right-4",
                            "bottom-4 left-4",
                            "bottom-4 right-4",
                        ].map((pos, i) => (
                            <div key={i} className={`absolute ${pos} z-10 flex flex-col gap-[2px]`}>
                                <div className="flex gap-[2px]">
                                    <div className="w-2 h-2 bg-white/15" />
                                    <div className="w-2 h-2 bg-white/08" />
                                    <div className="w-2 h-2 bg-white/04" />
                                </div>
                                <div className="flex gap-[2px]">
                                    <div className="w-2 h-2 bg-white/08" />
                                    <div className="w-2 h-2 bg-white/04" />
                                </div>
                                <div className="flex gap-[2px]">
                                    <div className="w-2 h-2 bg-white/04" />
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Actual page content — always rendered behind splash so resources load */}
            {children}
        </>
    );
}
