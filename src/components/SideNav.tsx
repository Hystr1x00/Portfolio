"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
    id: string;
    label: string;
    icon: React.ReactNode;
}

// Pixel-art style SVG icons — all 16x16 viewBox for crisp pixelated look
const PixelHomeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" className="pixelated" style={{ imageRendering: "pixelated" }}>
        <rect x="7" y="1" width="2" height="2" fill="currentColor" />
        <rect x="5" y="3" width="2" height="2" fill="currentColor" />
        <rect x="9" y="3" width="2" height="2" fill="currentColor" />
        <rect x="3" y="5" width="2" height="2" fill="currentColor" />
        <rect x="11" y="5" width="2" height="2" fill="currentColor" />
        <rect x="1" y="7" width="2" height="2" fill="currentColor" />
        <rect x="13" y="7" width="2" height="2" fill="currentColor" />
        <rect x="3" y="7" width="10" height="2" fill="currentColor" />
        <rect x="3" y="9" width="2" height="6" fill="currentColor" />
        <rect x="11" y="9" width="2" height="6" fill="currentColor" />
        <rect x="5" y="13" width="6" height="2" fill="currentColor" />
        <rect x="7" y="11" width="2" height="2" fill="currentColor" />
    </svg>
);

const PixelUserIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" className="pixelated" style={{ imageRendering: "pixelated" }}>
        <rect x="6" y="1" width="4" height="2" fill="currentColor" />
        <rect x="5" y="3" width="6" height="4" fill="currentColor" />
        <rect x="4" y="2" width="2" height="4" fill="currentColor" />
        <rect x="10" y="2" width="2" height="4" fill="currentColor" />
        <rect x="7" y="8" width="2" height="2" fill="currentColor" />
        <rect x="4" y="10" width="8" height="2" fill="currentColor" />
        <rect x="3" y="12" width="10" height="2" fill="currentColor" />
        <rect x="2" y="14" width="12" height="2" fill="currentColor" />
    </svg>
);

const PixelBriefcaseIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" className="pixelated" style={{ imageRendering: "pixelated" }}>
        <rect x="5" y="1" width="6" height="2" fill="currentColor" />
        <rect x="5" y="3" width="2" height="2" fill="currentColor" />
        <rect x="9" y="3" width="2" height="2" fill="currentColor" />
        <rect x="1" y="5" width="14" height="2" fill="currentColor" />
        <rect x="1" y="7" width="2" height="6" fill="currentColor" />
        <rect x="13" y="7" width="2" height="6" fill="currentColor" />
        <rect x="1" y="13" width="14" height="2" fill="currentColor" />
        <rect x="7" y="7" width="2" height="4" fill="currentColor" />
        <rect x="3" y="9" width="4" height="2" fill="currentColor" />
        <rect x="9" y="9" width="4" height="2" fill="currentColor" />
    </svg>
);

const PixelStackIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" className="pixelated" style={{ imageRendering: "pixelated" }}>
        {/* Stacked layers - code/stack icon */}
        <rect x="3" y="2" width="10" height="2" fill="currentColor" />
        <rect x="2" y="4" width="12" height="2" fill="currentColor" opacity="0.8" />
        <rect x="1" y="6" width="14" height="2" fill="currentColor" opacity="0.6" />
        {/* Code brackets < > */}
        <rect x="3" y="10" width="2" height="2" fill="currentColor" />
        <rect x="1" y="12" width="2" height="2" fill="currentColor" />
        <rect x="3" y="14" width="2" height="2" fill="currentColor" />
        <rect x="11" y="10" width="2" height="2" fill="currentColor" />
        <rect x="13" y="12" width="2" height="2" fill="currentColor" />
        <rect x="11" y="14" width="2" height="2" fill="currentColor" />
        {/* Dot */}
        <rect x="7" y="12" width="2" height="2" fill="currentColor" />
    </svg>
);

const navItems: NavItem[] = [
    { id: "hero", label: "Home", icon: <PixelHomeIcon /> },
    { id: "introduction", label: "About", icon: <PixelUserIcon /> },
    { id: "techstack", label: "Stack", icon: <PixelStackIcon /> },
    { id: "experience", label: "Work", icon: <PixelBriefcaseIcon /> },
];

export default function SideNav() {
    const [activeSection, setActiveSection] = useState("hero");
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    // Track which section is currently in view
    useEffect(() => {
        const observerOptions: IntersectionObserverInit = {
            root: null,
            rootMargin: "-40% 0px -40% 0px",
            threshold: 0,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, observerOptions);

        navItems.forEach((item) => {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav
            className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-[9999] flex flex-col items-center gap-1"
            aria-label="Section Navigation"
        >
            {/* Pixel border frame with dark background */}
            <div
                className="relative p-1.5"
                style={{
                    backgroundColor: "rgba(0,0,0,0.75)",
                    border: "2px solid rgba(255,255,255,0.25)",
                    clipPath:
                        "polygon(6px 0%, calc(100% - 6px) 0%, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0% calc(100% - 6px), 0% 6px)",
                    boxShadow: "0 0 20px rgba(0,0,0,0.5), inset 0 0 8px rgba(0,0,0,0.3)",
                }}
            >
                {/* Inner content */}
                <div className="flex flex-col items-center gap-0.5 py-2 px-1.5">
                    {navItems.map((item, index) => {
                        const isActive = activeSection === item.id;
                        const isHovered = hoveredItem === item.id;

                        return (
                            <div key={item.id} className="flex flex-col items-center">
                                {/* Separator pixel dots */}
                                {index > 0 && (
                                    <div className="flex flex-col items-center gap-[3px] my-1">
                                        <div className="w-[3px] h-[3px] bg-white/20" />
                                        <div className="w-[3px] h-[3px] bg-white/10" />
                                        <div className="w-[3px] h-[3px] bg-white/20" />
                                    </div>
                                )}

                                {/* Nav button */}
                                <div className="relative group">
                                    <motion.button
                                        onClick={() => scrollToSection(item.id)}
                                        onMouseEnter={() => setHoveredItem(item.id)}
                                        onMouseLeave={() => setHoveredItem(null)}
                                        className="relative w-10 h-10 flex items-center justify-center cursor-pointer transition-colors duration-150"
                                        style={{
                                            color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
                                            backgroundColor: isActive
                                                ? "rgba(0,0,128,0.9)"
                                                : isHovered
                                                    ? "rgba(255,255,255,0.08)"
                                                    : "transparent",
                                        }}
                                        whileHover={{ scale: 1.15 }}
                                        whileTap={{ scale: 0.95 }}
                                        aria-label={`Navigate to ${item.label}`}
                                    >
                                        {/* Active glow */}
                                        {isActive && (
                                            <motion.div
                                                className="absolute inset-0 pointer-events-none"
                                                style={{
                                                    boxShadow:
                                                        "0 0 12px rgba(0,0,128,0.6), 0 0 4px rgba(0,0,128,0.8)",
                                                }}
                                                layoutId="activeGlow"
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            />
                                        )}

                                        {/* Pixel border on active */}
                                        {isActive && (
                                            <div
                                                className="absolute inset-0 border border-white/40"
                                                style={{
                                                    clipPath:
                                                        "polygon(3px 0%, calc(100% - 3px) 0%, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 0% calc(100% - 3px), 0% 3px)",
                                                }}
                                            />
                                        )}

                                        {/* Icon */}
                                        <div className="relative z-10 w-4 h-4 flex items-center justify-center">
                                            {item.icon}
                                        </div>
                                    </motion.button>

                                    {/* Tooltip - pixel style */}
                                    <AnimatePresence>
                                        {isHovered && (
                                            <motion.div
                                                initial={{ opacity: 0, x: 8 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 8 }}
                                                transition={{ duration: 0.15 }}
                                                className="absolute right-full mr-3 top-1/2 -translate-y-1/2 pointer-events-none whitespace-nowrap"
                                            >
                                                <div
                                                    className="bg-black border border-white/30 px-2.5 py-1 flex items-center gap-2"
                                                    style={{
                                                        clipPath:
                                                            "polygon(3px 0%, calc(100% - 3px) 0%, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 0% calc(100% - 3px), 0% 3px)",
                                                    }}
                                                >
                                                    <span
                                                        className="text-white text-[10px] tracking-[0.15em] uppercase pixelated"
                                                        style={{ fontFamily: "'Courier New', monospace" }}
                                                    >
                                                        {item.label}
                                                    </span>
                                                </div>
                                                {/* Arrow pixel */}
                                                <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-[5px] h-[5px] bg-white/30 rotate-45" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
