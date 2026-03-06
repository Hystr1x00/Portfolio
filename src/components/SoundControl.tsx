"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const SOUNDS = [
    { id: "pixel-theme", src: "/sound.mp3", label: "Theme 1" },
    { id: "retro-vibe", src: "/sound_2.mp3", label: "Theme 2" },
];

export default function SoundControl() {
    const pathname = usePathname();
    const [isPlaying, setIsPlaying] = useState(true);
    const [volume, setVolume] = useState(0.5);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [showControls, setShowControls] = useState(false);

    const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);

    useEffect(() => {
        // Stop all other audio when switching tracks
        audioRefs.current.forEach((audio, index) => {
            if (audio) {
                if (index === currentTrackIndex && isPlaying) {
                    audio.play().catch(e => console.log("Audio play blocked", e));
                } else {
                    audio.pause();
                }
            }
        });
    }, [currentTrackIndex, isPlaying]);

    useEffect(() => {
        const currentAudio = audioRefs.current[currentTrackIndex];
        if (currentAudio) {
            currentAudio.volume = isMuted ? 0 : volume;
        }
    }, [volume, isMuted, currentTrackIndex]);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const nextTrack = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % SOUNDS.length);
    };

    if (pathname === '/projects') {
        return null;
    }

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3 font-mono">
            {/* Audio elements */}
            {SOUNDS.map((sound, index) => (
                <audio
                    key={sound.id}
                    ref={(el) => { audioRefs.current[index] = el; }}
                    src={sound.src}
                    loop
                />
            ))}

            {/* Control Panel */}
            <AnimatePresence>
                {showControls && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="bg-black border-4 border-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-48 flex flex-col gap-4"
                    >
                        <div className="flex justify-between items-center text-white text-xs uppercase tracking-tighter">
                            <span className="truncate">{SOUNDS[currentTrackIndex].label}</span>
                            <button
                                onClick={nextTrack}
                                className="hover:text-yellow-400 cursor-pointer"
                            >
                                [NEXT]
                            </button>
                        </div>

                        {/* Volume Bar */}
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between text-[10px] text-white uppercase">
                                <span>VOL</span>
                                <span>{Math.round(volume * 100)}%</span>
                            </div>
                            <div className="relative h-4 bg-gray-800 border-2 border-white cursor-pointer group"
                                onClick={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const x = e.clientX - rect.left;
                                    setVolume(Math.max(0, Math.min(1, x / rect.width)));
                                }}
                            >
                                <div
                                    className="h-full bg-yellow-400"
                                    style={{ width: `${volume * 100}%` }}
                                />
                                {/* Pixel markers */}
                                <div className="absolute inset-0 flex justify-between pointer-events-none">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="w-[2px] h-full bg-black/20" />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={togglePlay}
                                className="flex-1 bg-white hover:bg-yellow-400 text-black px-2 py-1 text-xs uppercase font-bold border-2 border-black active:translate-y-[2px] active:shadow-none shadow-[2px_2px_0px_0px_#000] transition-all"
                            >
                                {isPlaying ? "PAUSE" : "PLAY"}
                            </button>
                            <button
                                onClick={toggleMute}
                                className={`flex-1 ${isMuted ? 'bg-red-500 text-white' : 'bg-white text-black'} hover:bg-yellow-400 px-2 py-1 text-xs uppercase font-bold border-2 border-black active:translate-y-[2px] active:shadow-none shadow-[2px_2px_0px_0px_#000] transition-all`}
                            >
                                {isMuted ? "UNMUTE" : "MUTE"}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <button
                onClick={() => setShowControls(!showControls)}
                className="w-12 h-12 bg-black border-4 border-white flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-900 transition-colors group relative"
            >
                <div className="flex items-center justify-center">
                    {/* Simple Pixelated Speaker Icon */}
                    {!isMuted && isPlaying ? (
                        <div className="relative flex items-center">
                            {/* Speaker Body */}
                            <div className="w-3 h-3 bg-white" />
                            <div className="w-2 h-5 bg-white -ml-1" style={{ clipPath: 'polygon(0% 20%, 100% 0%, 100% 100%, 0% 80%)' }} />
                            {/* Sound Waves */}
                            <div className="flex gap-[2px] ml-1">
                                <div className="w-[2px] h-2 bg-yellow-400 animate-pulse" />
                                <div className="w-[2px] h-4 bg-yellow-400 animate-pulse [animation-delay:200ms]" />
                            </div>
                        </div>
                    ) : (
                        <div className="relative flex items-center opacity-50">
                            <div className="w-3 h-3 bg-white" />
                            <div className="w-2 h-5 bg-white -ml-1" style={{ clipPath: 'polygon(0% 20%, 100% 0%, 100% 100%, 0% 80%)' }} />
                            <div className="absolute w-6 h-[2px] bg-red-500 rotate-45 left-1/2 -translate-x-1/2" />
                        </div>
                    )}
                </div>

                {/* Tooltip */}
                {!showControls && (
                    <div className="absolute right-14 bg-black border-2 border-white px-2 py-1 text-[10px] text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        SOUND SETTINGS
                    </div>
                )}
            </button>
        </div>
    );
}
