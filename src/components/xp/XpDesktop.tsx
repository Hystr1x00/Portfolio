'use client'
import { useState, useEffect, useRef } from 'react';
import { projects, Project } from '@/data/projects';
import XpWindow from './XpWindow';

// Adding Lucide icons for the start menu
import { Monitor, Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { SiArduino, SiBlender, SiFigma } from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';

export default function XpDesktop() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [time, setTime] = useState('');

    // Audio Player State
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.volume = 0.5; // Set a default volume
                audioRef.current.play().catch(e => console.error("Audio play failed:", e));
            }
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        };
        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 w-full h-full overflow-hidden bg-[#225ad9] selection:bg-[#316ac5] selection:text-white font-sans text-white">
            {/* Wallpapper Background */}
            <div
                className="absolute inset-0 bg-cover bg-center pointer-events-none"
                style={{
                    backgroundImage: `url('/walp.png')`
                }}
            />
            {/* Desktop Icons Grid */}
            <div className="absolute inset-0 p-4 pb-16 flex flex-col flex-wrap gap-6 items-start content-start overflow-y-auto">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        onClick={() => setSelectedProject(project)}
                        className="group w-[80px] flex flex-col items-center gap-1 cursor-pointer p-1"
                    >
                        {/* Folder Icon SVG */}
                        <div className={`w-12 h-12 relative flex items-center justify-center transition-transform group-active:scale-95 group-hover:brightness-110 drop-shadow-md`}>
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-white">
                                <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" fill="#ffca28" />
                                {/* Folder details */}
                                <path d="M4 8v10h16V8H4zm14 8H6v-6h12v6z" fill="#ffecb3" />
                            </svg>
                        </div>

                        {/* Label */}
                        <span className="text-center text-xs text-white bg-transparent leading-tight w-full break-words
                             group-hover:bg-[#316ac5]/50 group-hover:border-transparent border border-transparent 
                             group-active:bg-[#316ac5] px-1 py-[2px] rounded-sm"
                            style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                            {project.title}
                        </span>
                    </div>
                ))}

                {/* Home Shortcut */}
                <a
                    href="/"
                    className="group w-[80px] flex flex-col items-center gap-1 cursor-pointer p-1 mt-auto lg:mt-0"
                >
                    <div className={`w-12 h-12 relative flex items-center justify-center transition-transform group-active:scale-95 group-hover:brightness-110 drop-shadow-md bg-blue-500 rounded text-white border-2 border-white/20 shadow-inner`}>
                        <Monitor size={24} />
                    </div>
                    <span className="text-center text-xs text-white bg-transparent leading-tight w-full break-words
                             group-hover:bg-[#316ac5]/50 group-hover:border-transparent border border-transparent 
                             group-active:bg-[#316ac5] px-1 py-[2px] rounded-sm"
                        style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                        Return to Base
                    </span>
                </a>
            </div>

            {/* Widgets Section (Right side) */}
            <div className="absolute right-6 top-6 flex flex-col gap-6 z-10 w-64 pointer-events-auto">
                {/* Cute Sticky Note */}
                <div className="bg-[#feff9c] text-black p-4 shadow-lg w-full -rotate-2 transform hover:rotate-0 transition-transform cursor-pointer border-t-4 border-[#ffeb3b]">
                    <div className="flex justify-between items-start mb-2">
                        <div className="w-12 h-4 bg-red-400/30 -mt-6 mx-auto absolute left-1/2 -translate-x-1/2 rounded shadow-sm"></div>
                        <span className="font-pixel text-xs text-gray-500">Note.txt</span>
                    </div>
                    <p className="font-sans text-sm leading-relaxed whitespace-pre-line tracking-wide">
                        Hi there! (づ｡◕‿‿◕｡)づ

                        Welcome to my portfolio!
                        Feel free to explore my projects.

                        Stay awesome! ✨
                    </p>
                </div>

                {/* Mini Retro Music Player */}
                <div className="bg-gradient-to-b from-gray-200 to-gray-300 rounded shadow-lg border border-gray-400 p-3 w-full backdrop-blur-sm bg-opacity-90">
                    <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-400/50">
                        <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">WinAmp Mini</span>
                        <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-red-400"></div>
                            <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                        </div>
                    </div>

                    <div className="bg-black/90 rounded p-2 mb-3 shadow-inner">
                        <div className="text-[#00ff00] text-xs font-pixel truncate animate-pulse">
                            Now Playing: Lofi Beats to Code To...
                        </div>
                        <div className="mt-2 h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-[#00ff00] w-1/3"></div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center text-gray-700">
                        <div className="flex gap-3">
                            <button className="hover:text-black hover:scale-110 transition-all active:scale-95"><SkipBack size={16} /></button>
                            <button
                                onClick={togglePlay}
                                className="hover:text-black hover:scale-110 transition-all active:scale-95"
                            >
                                {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                            </button>
                            <button className="hover:text-black hover:scale-110 transition-all active:scale-95"><SkipForward size={16} /></button>
                        </div>
                        <Volume2 size={16} className="text-gray-500 cursor-pointer hover:text-black" />
                    </div>

                    {/* Hidden Audio Element - Using a royalty free lofi track as placeholder */}
                    <audio
                        ref={audioRef}
                        src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
                        loop
                    />
                </div>
            </div>

            {/* Popup Window */}
            {selectedProject && (
                <XpWindow project={selectedProject} onClose={() => setSelectedProject(null)} />
            )}

            {/* Taskbar */}
            <div className="absolute bottom-0 left-0 right-0 h-9 bg-[linear-gradient(180deg,#245edb_0%,#3f8cf3_9%,#245edb_18%,#245edb_92%,#333_100%)] flex items-center justify-between shadow-[0_-1px_3px_rgba(0,0,0,0.5)] z-50 text-white select-none">

                <div className="flex h-full items-center">
                    {/* Start Button */}
                    <div className="h-full bg-[linear-gradient(180deg,#3e9c52_0%,#46b55e_9%,#3e9c52_18%,#3e9c52_92%,#2f7a3f_100%)] hover:bg-[linear-gradient(180deg,#4ccf66_0%,#55e975_9%,#4ccf66_18%,#4ccf66_92%,#3a964e_100%)] flex items-center gap-2 pl-2 pr-6 rounded-r-2xl cursor-pointer shadow-[2px_0_4px_rgba(0,0,0,0.3)]">
                        <span className="font-bold text-white italic tracking-wider px-1 drop-shadow-md text-lg transition-transform hover:scale-105 active:scale-95">start</span>
                    </div>

                    {/* Taskbar App Icons */}
                    <div className="hidden sm:flex items-center pl-2 gap-1 h-full">
                        <div className="flex items-center justify-center w-12 h-full hover:bg-white/10 cursor-pointer transition-all border-b-[3px] border-transparent hover:border-blue-300" title="VS Code">
                            <VscVscode size={22} className="text-[#4fb0ff] drop-shadow-md" />
                        </div>
                        <div className="flex items-center justify-center w-12 h-full hover:bg-white/10 cursor-pointer transition-all border-b-[3px] border-transparent hover:border-blue-300" title="Arduino IDE">
                            <SiArduino size={22} className="text-[#10e6ed] drop-shadow-md" />
                        </div>
                        <div className="flex items-center justify-center w-12 h-full hover:bg-white/10 cursor-pointer transition-all border-b-[3px] border-transparent hover:border-blue-300" title="Blender">
                            <SiBlender size={22} className="text-[#ff9d42] drop-shadow-md" />
                        </div>
                        <div className="flex items-center justify-center w-12 h-full hover:bg-white/10 cursor-pointer transition-all border-b-[3px] border-transparent hover:border-blue-300" title="Figma">
                            <SiFigma size={22} className="text-[#ff7262] drop-shadow-md" />
                        </div>
                    </div>

                    {/* Open App Tab (if project is selected) */}
                    {selectedProject && (
                        <div className="flex items-center">
                            <div className="w-[1px] h-full bg-[#1b4db1] mx-1"></div>
                            <div className="w-[1px] h-full bg-[#3f8cf3] mr-1"></div>
                            <div className="h-full w-36 sm:w-48 bg-[#1849b2] hover:bg-[#2358c9] border border-t-0 border-b-0 border-[#103a94] flex items-center px-3 gap-2 cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                                <div className="w-4 h-4 text-orange-200">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" fill="#ffca28" />
                                    </svg>
                                </div>
                                <span className="text-white text-xs truncate drop-shadow-sm font-semibold tracking-wide">{selectedProject.title}</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* System Tray */}
                <div className="h-full bg-[linear-gradient(180deg,#0a8ce3_0%,#18b2fe_9%,#0a8ce3_18%,#0a8ce3_92%,#055f9e_100%)] border-l border-[#103a94] flex items-center px-4 rounded-l-md shadow-[inset_1px_0_1px_rgba(255,255,255,0.2)] gap-3">
                    {/* XP Mute Icon */}
                    <div className="w-5 h-5 flex flex-col items-center justify-center p-[2px] bg-[#0a8ce3] border border-blue-300/30 rounded-sm relative" title="Volume: Muted">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-white">
                            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                        </svg>
                    </div>
                    <span className="text-xs">{time}</span>
                </div>

            </div>
        </div>
    );
}
