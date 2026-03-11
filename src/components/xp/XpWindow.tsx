import { useState } from 'react';
import { Project } from '@/data/projects';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface XpWindowProps {
    project: Project | null;
    onClose: () => void;
}

export default function XpWindow({ project, onClose }: XpWindowProps) {
    const [activeTab, setActiveTab] = useState<'File' | 'Image' | 'Properties'>('File');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!project) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/50 overflow-hidden">
            {/* Window Container */}
            <div className="relative w-full max-w-2xl max-h-[95svh] h-[auto] bg-[#ece9d8] rounded-t-lg rounded-b-md shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-[#0054e3] flex flex-col font-sans select-none my-2 sm:my-8">

                {/* Title Bar */}
                <div className="flex items-center justify-between px-2 py-1 bg-[linear-gradient(180deg,#0058e6_0%,#3a93ff_8%,#288eff_40%,#127dff_88%,#036bde_100%)] rounded-t-lg"
                    style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>
                    <div className="flex items-center gap-2">
                        {/* Folder Icon minimal representation */}
                        <div className="w-4 h-4 text-orange-200">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" fill="#ffca28" />
                            </svg>
                        </div>
                        <span className="text-white text-sm font-bold tracking-wide">
                            {project.title}
                        </span>
                    </div>

                    <div className="flex items-center gap-[2px]">
                        {/* Minimize */}
                        <button className="w-5 h-5 bg-[linear-gradient(180deg,#fff_0%,#ece9d8_100%)] border border-white hover:bg-[#e0e0e0] flex items-center justify-center rounded-sm shadow-[inset_-1px_-1px_1px_rgba(0,0,0,0.2)]">
                            <span className="w-[10px] h-[2px] bg-black inline-block mt-2"></span>
                        </button>
                        {/* Maximize */}
                        <button className="w-5 h-5 bg-[linear-gradient(180deg,#fff_0%,#ece9d8_100%)] border border-white hover:bg-[#e0e0e0] flex items-center justify-center rounded-sm shadow-[inset_-1px_-1px_1px_rgba(0,0,0,0.2)]">
                            <div className="w-[10px] h-[10px] border-2 border-black border-t-[3px]"></div>
                        </button>
                        {/* Close */}
                        <button
                            onClick={onClose}
                            className="w-5 h-5 bg-[linear-gradient(180deg,#e57065_0%,#d04332_10%,#ca3b2b_40%,#c93a29_50%,#c23120_80%,#e17265_100%)] border border-white hover:brightness-110 flex items-center justify-center rounded-sm shadow-[inset_-1px_-1px_1px_rgba(0,0,0,0.2)] group"
                        >
                            <X size={14} className="text-white/80 group-hover:text-white" strokeWidth={3} />
                        </button>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="flex items-center gap-4 px-2 py-1 bg-[#ece9d8] border-b border-[#aca899] text-xs text-black border-t border-white shadow-[0_1px_0_white] select-none">
                    <span
                        onClick={() => setActiveTab('File')}
                        className={`px-2 py-[2px] cursor-pointer hover:bg-[#316ac5] hover:text-white rounded-sm ${activeTab === 'File' ? 'bg-[#316ac5] text-white' : ''}`}
                    >File</span>
                    <span
                        onClick={() => setActiveTab('Image')}
                        className={`px-2 py-[2px] cursor-pointer hover:bg-[#316ac5] hover:text-white rounded-sm ${activeTab === 'Image' ? 'bg-[#316ac5] text-white' : ''}`}
                    >Image</span>
                    <span
                        onClick={() => setActiveTab('Properties')}
                        className={`px-2 py-[2px] cursor-pointer hover:bg-[#316ac5] hover:text-white rounded-sm ${activeTab === 'Properties' ? 'bg-[#316ac5] text-white' : ''}`}
                    >Properties</span>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 bg-white border-2 border-[inset] border-[#808080] border-t-[#404040] border-l-[#404040] m-1 p-3 sm:p-6 h-full text-black overflow-y-auto sm:min-h-[300px]">

                    {activeTab === 'File' && (
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                            <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto sm:mx-0 shrink-0 shadow-sm border border-gray-200 bg-gray-50 flex items-center justify-center rounded p-2 sm:p-4">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-gray-300">
                                    <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" fill="#ffca28" />
                                </svg>
                            </div>

                            <div className="flex-1 text-xs sm:text-sm text-center sm:text-left">
                                <h3 className="text-xl sm:text-2xl font-bold mb-0.5 sm:mb-1" style={{ color: project.color }}>{project.title}</h3>
                                <div className="text-gray-500 font-semibold mb-2 sm:mb-4 text-[10px] sm:text-xs tracking-wider uppercase">{project.type}</div>

                                <p className="mb-3 sm:mb-6 leading-relaxed text-gray-800 text-[11px] sm:text-sm">{project.desc}</p>

                                <div className="mb-3 sm:mb-6 text-left">
                                    <h4 className="font-bold border-b border-gray-300 pb-0.5 sm:pb-1 mb-1.5 sm:mb-2 text-sm sm:text-base">Technologies</h4>
                                    <div className="flex flex-wrap gap-1 sm:gap-2 justify-center sm:justify-start">
                                        {project.tech.map(t => (
                                            <span key={t} className="bg-gray-100 border border-gray-300 px-1.5 py-0.5 text-[10px] sm:text-xs text-gray-600 rounded-sm">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-1 sm:mb-6 text-left">
                                    <h4 className="font-bold border-b border-gray-300 pb-0.5 sm:pb-1 mb-1.5 sm:mb-2 text-sm sm:text-base">Metrics</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
                                        {project.metrics.map(([val, label]) => (
                                            <div key={label} className="bg-gray-50 p-1 sm:p-2 border border-gray-200 text-center">
                                                <div className="font-bold text-base sm:text-lg leading-tight" style={{ color: project.color }}>{val}</div>
                                                <div className="text-[8px] sm:text-[10px] text-gray-500 uppercase font-semibold mt-0.5">{label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Image' && (
                        <div className="flex flex-col h-full animate-in fade-in duration-300 w-full overflow-hidden">
                            {/* Main Image Display */}
                            <div className="flex-1 flex flex-col items-center justify-center border border-gray-400 p-2 bg-[#ece9d8] shadow-[2px_2px_5px_rgba(0,0,0,0.3)] mb-4 relative min-h-[300px]">
                                <div className="border border-gray-500 bg-white w-full h-full flex items-center justify-center overflow-hidden">
                                    <img
                                        src={project.images[currentImageIndex]}
                                        alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                                        className="max-h-full max-w-full object-contain"
                                    />
                                </div>

                                {/* Navigation Controls */}
                                <div className="absolute inset-y-0 left-4 flex items-center">
                                    <button
                                        onClick={() => setCurrentImageIndex(prev => prev > 0 ? prev - 1 : project.images.length - 1)}
                                        className="bg-[#ece9d8] border-2 border-t-white border-l-white border-b-gray-600 border-r-gray-600 active:border-t-gray-600 active:border-l-gray-600 active:border-b-white active:border-r-white p-1 hover:brightness-105 shadow-md flex items-center justify-center"
                                    >
                                        <ChevronLeft size={24} className="text-black" />
                                    </button>
                                </div>
                                <div className="absolute inset-y-0 right-4 flex items-center">
                                    <button
                                        onClick={() => setCurrentImageIndex(prev => prev < project.images.length - 1 ? prev + 1 : 0)}
                                        className="bg-[#ece9d8] border-2 border-t-white border-l-white border-b-gray-600 border-r-gray-600 active:border-t-gray-600 active:border-l-gray-600 active:border-b-white active:border-r-white p-1 hover:brightness-105 shadow-md flex items-center justify-center"
                                    >
                                        <ChevronRight size={24} className="text-black" />
                                    </button>
                                </div>
                            </div>

                            {/* Thumbnails Gallery */}
                            <div className="flex gap-2 overflow-x-auto pb-2 px-1">
                                {project.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentImageIndex(idx)}
                                        className={`shrink-0 w-20 h-16 border-2 transition-all p-0.5 ${currentImageIndex === idx ? 'border-[#316ac5] bg-[#316ac5]/20 shadow-[0_0_5px_rgba(49,106,197,0.5)]' : 'border-transparent hover:border-gray-400 bg-transparent'}`}
                                    >
                                        <div className="w-full h-full border border-gray-400 bg-white overflow-hidden">
                                            <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                                        </div>
                                    </button>
                                ))}
                            </div>
                            <p className="mt-2 text-xs font-bold text-gray-500 uppercase tracking-widest text-center">
                                Image {currentImageIndex + 1} of {project.images.length}
                            </p>
                        </div>
                    )}

                    {activeTab === 'Properties' && (
                        <div className="h-full flex flex-col gap-4 animate-in fade-in duration-300">
                            <div className="flex items-center gap-4 border-b border-gray-300 pb-4">
                                <div className="w-16 h-16 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.8),inset_-1px_-1px_2px_rgba(0,0,0,0.3)] bg-[linear-gradient(135deg,#f59e0b_0%,#d97706_100%)] rounded flex items-center justify-center text-white font-bold text-3xl font-serif">
                                    {project.title.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">{project.title} Properties</h3>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest">{project.type}</p>
                                </div>
                            </div>

                            <table className="w-full text-sm text-left font-sans border border-gray-300 shadow-sm leading-relaxed">
                                <tbody>
                                    <tr className="border-b border-gray-200 bg-gray-50">
                                        <th className="py-2 px-3 font-semibold text-gray-600 w-1/3">Status:</th>
                                        <td className="py-2 px-3 font-bold" style={{ color: project.color }}>{project.status}</td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <th className="py-2 px-3 font-semibold text-gray-600">Access:</th>
                                        <td className="py-2 px-3">
                                            {project.link !== '#' ? (
                                                <a href={project.link} className="text-[#0000ee] hover:underline" target="_blank" rel="noopener noreferrer">Live Environment ↗</a>
                                            ) : (
                                                <span className="text-gray-400 italic">Not available online</span>
                                            )}
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-200 bg-gray-50">
                                        <th className="py-2 px-3 font-semibold text-gray-600">Repository:</th>
                                        <td className="py-2 px-3">
                                            {project.github !== '#' ? (
                                                <a href={project.github} className="text-[#0000ee] hover:underline" target="_blank" rel="noopener noreferrer">Source Code ↗</a>
                                            ) : (
                                                <span className="text-gray-400 italic">Private / Proprietary</span>
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="py-2 px-3 font-semibold text-gray-600 align-top">Extra Info:</th>
                                        <td className="py-2 px-3 text-gray-700">{project.extra || 'Project details and 3D assets can be attached here in the future.'}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="mt-auto flex justify-end pt-4">
                                <button
                                    onClick={() => setActiveTab('File')}
                                    className="px-8 py-1 bg-[#ece9d8] border-2 border-t-white border-l-white border-b-gray-600 border-r-gray-600 active:border-t-gray-600 active:border-l-gray-600 active:border-b-white active:border-r-white text-black font-sans shadow-sm hover:brightness-105"
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer/Status Bar */}
                <div className="flex items-center justify-between px-2 py-1 bg-[#ece9d8] text-xs text-gray-600 border-t border-[#aca899] shadow-[inset_0_1px_0_white]">
                    <div className="flex items-center gap-2 border-r border-[#aca899] pr-2 shadow-[2px_0_0_white]">
                        <span>1 object(s)</span>
                    </div>
                    <div className="flex gap-4">
                        {project.link !== '#' && (
                            <a href={project.link} className="hover:underline text-blue-700 font-semibold cursor-pointer z-50">View Live ↗</a>
                        )}
                        {project.github !== '#' && (
                            <a href={project.github} className="hover:underline text-blue-700 font-semibold cursor-pointer z-50">GitHub</a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
