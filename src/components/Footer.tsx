"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// ─── Pixel Star (reused from other sections) ────────────────────────────────

const PixelStar = ({
    className,
    delay = "0s",
    duration = "4s",
}: {
    className?: string;
    delay?: string;
    duration?: string;
}) => (
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

const SmallStar = ({
    className,
    delay = "0s",
}: {
    className?: string;
    delay?: string;
}) => (
    <div
        className={`absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white pointer-events-none animate-pulse ${className}`}
        style={{ animationDelay: delay }}
    />
);

// ─── Pixel Social Icons ─────────────────────────────────────────────────────

const PixelGithubIcon = () => (
    <svg width="20" height="20" viewBox="0 0 16 16" className="pixelated" style={{ imageRendering: "pixelated" }}>
        <rect x="5" y="0" width="6" height="2" fill="currentColor" />
        <rect x="3" y="2" width="2" height="2" fill="currentColor" />
        <rect x="11" y="2" width="2" height="2" fill="currentColor" />
        <rect x="1" y="4" width="2" height="2" fill="currentColor" />
        <rect x="13" y="4" width="2" height="2" fill="currentColor" />
        <rect x="1" y="6" width="2" height="4" fill="currentColor" />
        <rect x="13" y="6" width="2" height="4" fill="currentColor" />
        <rect x="3" y="10" width="2" height="2" fill="currentColor" />
        <rect x="11" y="10" width="2" height="2" fill="currentColor" />
        <rect x="5" y="10" width="2" height="2" fill="currentColor" />
        <rect x="9" y="10" width="2" height="2" fill="currentColor" />
        <rect x="3" y="12" width="4" height="2" fill="currentColor" />
        <rect x="9" y="12" width="4" height="2" fill="currentColor" />
        <rect x="3" y="14" width="2" height="2" fill="currentColor" />
        <rect x="5" y="6" width="6" height="4" fill="currentColor" />
    </svg>
);

const PixelLinkedinIcon = () => (
    <svg width="20" height="20" viewBox="0 0 16 16" className="pixelated" style={{ imageRendering: "pixelated" }}>
        <rect x="1" y="1" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="3" y="3" width="2" height="2" fill="currentColor" />
        <rect x="3" y="7" width="2" height="6" fill="currentColor" />
        <rect x="7" y="7" width="2" height="6" fill="currentColor" />
        <rect x="9" y="9" width="2" height="4" fill="currentColor" />
        <rect x="11" y="7" width="2" height="6" fill="currentColor" />
        <rect x="9" y="7" width="2" height="2" fill="currentColor" />
    </svg>
);

const PixelMailIcon = () => (
    <svg width="20" height="20" viewBox="0 0 16 16" className="pixelated" style={{ imageRendering: "pixelated" }}>
        <rect x="1" y="3" width="14" height="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="1" y="3" width="2" height="2" fill="currentColor" />
        <rect x="13" y="3" width="2" height="2" fill="currentColor" />
        <rect x="3" y="5" width="2" height="2" fill="currentColor" />
        <rect x="11" y="5" width="2" height="2" fill="currentColor" />
        <rect x="5" y="7" width="2" height="2" fill="currentColor" />
        <rect x="9" y="7" width="2" height="2" fill="currentColor" />
        <rect x="7" y="9" width="2" height="2" fill="currentColor" />
    </svg>
);

const PixelInstagramIcon = () => (
    <svg width="20" height="20" viewBox="0 0 16 16" className="pixelated" style={{ imageRendering: "pixelated" }}>
        <rect x="1" y="1" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="5" y="5" width="6" height="6" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="11" y="3" width="2" height="2" fill="currentColor" />
    </svg>
);

// ─── Social link data ────────────────────────────────────────────────────────

interface SocialLink {
    label: string;
    href: string;
    icon: React.ReactNode;
    color: string;
    glowColor: string;
}

const socialLinks: SocialLink[] = [
    {
        label: "GitHub",
        href: "https://github.com/Hystr1x00",
        icon: <PixelGithubIcon />,
        color: "#a78bfa",
        glowColor: "rgba(167,139,250,0.5)",
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/faridghani04/",
        icon: <PixelLinkedinIcon />,
        color: "#38bdf8",
        glowColor: "rgba(56,189,248,0.5)",
    },
    {
        label: "Email",
        href: "mailto:faridghani.12@gmail.com",
        icon: <PixelMailIcon />,
        color: "#fb923c",
        glowColor: "rgba(251,146,60,0.5)",
    },
    {
        label: "Instagram",
        href: "https://www.instagram.com/faridghani.04/",
        icon: <PixelInstagramIcon />,
        color: "#f472b6",
        glowColor: "rgba(244,114,182,0.5)",
    },
];

// ─── Quick nav data ──────────────────────────────────────────────────────────

const quickNav = [
    { label: "About", id: "introduction" },
    { label: "Tech Stack", id: "tech-stack" },
    { label: "Organizations", id: "organizations" },
];


// ─── Footer Component ────────────────────────────────────────────────────────

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: footerRef,
        offset: ["start end", "start 0.6"],
    });

    const y = useSpring(useTransform(scrollYProgress, [0, 1], [60, 0]), {
        stiffness: 100,
        damping: 22,
    });
    const opacity = useSpring(useTransform(scrollYProgress, [0, 0.8], [0, 1]), {
        stiffness: 100,
        damping: 22,
    });

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <footer
            ref={footerRef}
            id="footer"
            className="relative w-full bg-[#0a0a1a] overflow-hidden"
        >
            {/* Twinkle keyframes */}
            <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8) translateY(0px); }
          50% { opacity: 1; transform: scale(1.1) translateY(-10px); }
        }
        .animate-twinkle { animation: twinkle infinite ease-in-out; }
        @keyframes scanline-move {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>

            {/* ─── Background Decorations ────────────────────────────────────── */}
            {/* Grid Pattern */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="footer-grid-s" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#footer-grid-s)" />
                </svg>
            </div>

            {/* Stars */}
            <PixelStar className="top-[10%] left-[5%] opacity-50" delay="0s" duration="4s" />
            <PixelStar className="top-[20%] right-[8%] opacity-40 scale-75" delay="1.5s" duration="5s" />
            <PixelStar className="bottom-[30%] left-[15%] opacity-30 scale-50" delay="0.8s" duration="3.5s" />
            <SmallStar className="top-[15%] left-[40%]" delay="0.5s" />
            <SmallStar className="bottom-[40%] right-[20%]" delay="1.8s" />
            <SmallStar className="top-[35%] right-[45%]" delay="2.2s" />

            {/* Colorful ambient glow orbs */}
            <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)",
                    filter: "blur(60px)",
                }}
            />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)",
                    filter: "blur(60px)",
                }}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(244,114,182,0.05) 0%, transparent 70%)",
                    filter: "blur(80px)",
                }}
            />

            {/* CRT scanline overlay */}
            <div className="absolute inset-0 pointer-events-none z-10"
                style={{
                    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)",
                }}
            />

            {/* ─── Main Content ──────────────────────────────────────────────── */}
            <motion.div
                style={{ y, opacity }}
                className="relative z-20 max-w-5xl mx-auto px-6 sm:px-10 py-14 sm:py-20"
            >
                {/* Top Section: Brand + Navigation + Social */}
                <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-8 mb-14">

                    {/* ── Brand Column ───────────────────────────────────────── */}
                    <div className="flex flex-col items-center md:items-start gap-5 max-w-xs">
                        {/* Custom Logo */}
                        <div className="flex items-center gap-3">
                            <motion.div
                                animate={{ y: [0, -4, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <img
                                    src="/logo ghani.png"
                                    alt="Farid Ghani Logo"
                                    className="w-8 h-8 sm:w-10 sm:h-10 object-contain filter drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]"
                                />
                            </motion.div>
                            <h3
                                className="text-white text-sm sm:text-base tracking-widest uppercase pixelated"
                                style={{
                                    textShadow: "0 0 12px rgba(167,139,250,0.5), 2px 2px 0px rgba(0,0,0,1)",
                                }}
                            >
                                Farid Ghani
                            </h3>
                        </div>
                        <p
                            className="text-[10px] sm:text-xs text-gray-400 leading-relaxed text-center md:text-left tracking-wide"
                            style={{ fontFamily: "'Courier New', monospace" }}
                        >
                            Crafting digital experiences from the cosmos.
                            <br />
                            One pixel at a time. ✦
                        </p>
                    </div>

                    {/* ── Quick Nav Column ────────────────────────────────────── */}
                    <div className="flex flex-col items-center md:items-start gap-3">
                        <h4
                            className="text-[10px] sm:text-xs tracking-[0.25em] uppercase mb-2 pixelated"
                            style={{
                                color: "#34d399",
                                textShadow: "0 0 8px rgba(52,211,153,0.4)",
                                fontFamily: "'Courier New', monospace",
                            }}
                        >
                            ── Navigate ──
                        </h4>
                        <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-3 flex-wrap justify-center">
                            {quickNav.map((item, i) => (
                                <motion.button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className="group flex items-center gap-2 cursor-pointer"
                                    whileHover={{ x: 6 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                >
                                    <motion.div
                                        className="w-1.5 h-1.5"
                                        style={{ backgroundColor: ["#f472b6", "#a78bfa", "#38bdf8"][i] }}
                                        animate={{ opacity: [0.4, 1, 0.4] }}
                                        transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                                    />
                                    <span
                                        className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider group-hover:text-white transition-colors duration-200 pixelated"
                                        style={{ fontFamily: "'Courier New', monospace" }}
                                    >
                                        {item.label}
                                    </span>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* ── Social Column ──────────────────────────────────────── */}
                    <div className="flex flex-col items-center md:items-start gap-3">
                        <h4
                            className="text-[10px] sm:text-xs tracking-[0.25em] uppercase mb-2 pixelated"
                            style={{
                                color: "#fbbf24",
                                textShadow: "0 0 8px rgba(251,191,36,0.4)",
                                fontFamily: "'Courier New', monospace",
                            }}
                        >
                            ── Connect ──
                        </h4>
                        <div className="flex items-center gap-3">
                            {socialLinks.map((link) => (
                                <motion.a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative group flex items-center justify-center w-10 h-10 border-2 cursor-pointer"
                                    style={{
                                        borderColor: link.color,
                                        backgroundColor: "rgba(0,0,0,0.5)",
                                        color: link.color,
                                        clipPath:
                                            "polygon(4px 0%, calc(100% - 4px) 0%, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0% calc(100% - 4px), 0% 4px)",
                                    }}
                                    whileHover={{
                                        scale: 1.2,
                                        boxShadow: `0 0 20px ${link.glowColor}, 0 0 8px ${link.glowColor}`,
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                    aria-label={link.label}
                                >
                                    {link.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ─── Status Bar ──────────────────────────────────────────── */}
                <div className="flex flex-col items-center gap-4">
                    {/* Pixel divider bar */}
                    <div className="flex justify-center gap-0.5 items-center w-full max-w-md">
                        {[6, 10, 18, 28, 44, 28, 18, 10, 6].map((w, i) => (
                            <div
                                key={i}
                                className="h-0.5"
                                style={{
                                    width: w,
                                    backgroundColor:
                                        i === 4 ? "#a78bfa" : i === 3 || i === 5 ? "#f472b6" : "rgba(255,255,255,0.1)",
                                    boxShadow: i === 4 ? "0 0 8px #a78bfa, 0 0 16px #a78bfa44" : "none",
                                }}
                            />
                        ))}
                    </div>

                    {/* Status text + blinking cursor */}
                    {/* <div className="flex items-center gap-2">
                        <motion.div
                            className="w-1.5 h-1.5"
                            style={{ backgroundColor: "#34d399", boxShadow: "0 0 6px #34d399" }}
                            animate={{ opacity: [1, 0.2, 1] }}
                            transition={{ duration: 1.2, repeat: Infinity }}
                        />
                        <span
                            className="text-[8px] sm:text-[10px] tracking-[0.2em] uppercase text-gray-500 pixelated"
                            style={{ fontFamily: "'Courier New', monospace" }}
                        >
                            System Online · All Services Operational
                        </span>
                    </div> */}

                    {/* Copyright */}
                    <div className="flex flex-col items-center gap-1.5 mt-2">
                        <div className="flex items-center gap-2">
                            <div className="flex gap-0.5">
                                {["#f87171", "#fbbf24", "#34d399", "#38bdf8", "#a78bfa", "#f472b6"].map((c, i) => (
                                    <motion.div
                                        key={i}
                                        className="w-1.5 h-1.5"
                                        style={{ backgroundColor: c }}
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 2.5, delay: i * 0.2, repeat: Infinity }}
                                    />
                                ))}
                            </div>
                            <p
                                className="text-[8px] sm:text-[10px] text-gray-600 tracking-wider pixelated"
                                style={{ fontFamily: "'Courier New', monospace" }}
                            >
                                © {new Date().getFullYear()} Farid Ghani
                            </p>
                            <div className="flex gap-0.5">
                                {["#f472b6", "#a78bfa", "#38bdf8", "#34d399", "#fbbf24", "#f87171"].map((c, i) => (
                                    <motion.div
                                        key={i}
                                        className="w-1.5 h-1.5"
                                        style={{ backgroundColor: c }}
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 2.5, delay: i * 0.2 + 0.6, repeat: Infinity }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </footer>
    );
}
