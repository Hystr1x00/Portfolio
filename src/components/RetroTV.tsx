'use client';
import Link from 'next/link';

export default function RetroTV() {
    return (
        <section id="projects" className="py-24 relative flex items-center justify-center bg-gradient-to-b from-[#111] via-[#0d0121] to-[#04010a] overflow-hidden transition-colors duration-1000">
            {/* 1. Dither Pattern Layer */}
            <div className="absolute inset-0 opacity-[0.15] pointer-events-none z-0"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h2v2H0V0zm2 2h2v2H2V2z' fill='%236b21a8' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                    backgroundSize: '4px 4px'
                }}
            />

            {/* 2. Noise/Grain Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-overlay animate-grain"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />

            {/* Background Glow - Cyber Midnight Tones */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-[radial-gradient(circle,rgba(112,26,255,0.08)_0%,transparent_70%)] pointer-events-none" />

            {/* Main TV Container */}
            <div className="relative group perspective-[1000px] z-10 w-full max-w-[800px] px-4 sm:px-8">

                {/* TV Outer Casing */}
                <div className="relative bg-[#222] p-4 sm:p-8 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_4px_10px_rgba(255,255,255,0.1),inset_0_-10px_20px_rgba(0,0,0,0.8)] border-4 border-t-[#333] border-l-[#333] border-r-[#111] border-b-[#111] transform-gpu transition-transform duration-500 group-hover:rotate-x-2 group-hover:-translate-y-2">

                    {/* TV Inner Bezel */}
                    <div className="relative bg-[#050505] p-2 sm:p-4 rounded-[30px] shadow-[inset_0_0_20px_rgba(0,0,0,1)]">

                        {/* Screen Link Wrapper */}
                        <Link href="/projects" className="block relative bg-[#8bb4ff] rounded-[24px] overflow-hidden aspect-[4/3] sm:aspect-[16/10] cursor-pointer shadow-[0_0_40px_rgba(139,180,255,0.2)] hover:shadow-[0_0_60px_rgba(139,180,255,0.4)] transition-shadow duration-300">

                            {/* Inner Screen Shadow/Curve Illusion */}
                            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] pointer-events-none z-30" />

                            {/* Scanlines Effect */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0),rgba(255,255,255,0)_50%,rgba(0,0,0,0.05)_50%,rgba(0,0,0,0.05))] bg-[length:100%_4px] pointer-events-none z-20" />

                            {/* RGB CRT Effect (Slight chromatic aberration edge) */}
                            <div className="absolute inset-0 mix-blend-screen opacity-10 bg-[linear-gradient(90deg,red,green,blue)] pointer-events-none z-20" />

                            {/* Noise overlay */}
                            <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2VGaWx0ZXIpIi8+PC9zdmc+')] z-20 pointer-events-none" />


                            {/* Pixel Clouds / Scenery Background */}
                            {/* Top clouds */}
                            <div className="absolute top-0 left-0 right-0 h-1/2 opacity-60">
                                <div className="absolute top-[10%] left-[10%] w-[80%] h-[30%] bg-white rounded-full blur-[40px] opacity-80" />
                                <div className="absolute top-[20%] left-[-10%] w-[50%] h-[40%] bg-white rounded-full blur-[50px] opacity-60" />
                                <div className="absolute top-[15%] right-[-10%] w-[60%] h-[50%] bg-white rounded-full blur-[60px] opacity-70" />
                            </div>

                            {/* Bottom clouds */}
                            <div className="absolute bottom-[-10%] left-0 right-0 h-[60%] opacity-80">
                                {/* Simulated pixelated cloud shapes */}
                                <div className="absolute bottom-0 left-[5%] w-[30%] h-[60%] bg-[#f0f5ff] rounded-[40px] transform scale-y-75" />
                                <div className="absolute bottom-0 left-[25%] w-[40%] h-[80%] bg-white rounded-[60px] transform scale-y-75" />
                                <div className="absolute bottom-0 right-[10%] w-[35%] h-[70%] bg-[#e0ecff] rounded-[50px] transform scale-y-75" />
                                <div className="absolute bottom-[-10%] left-[40%] w-[20%] h-[40%] bg-[#d0e0ff] rounded-[30px]" />
                            </div>


                            {/* Screen Content Wrapper */}
                            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 animate-pulse-slow">

                                {/* Introducing text */}
                                <div className="flex flex-col items-center mb-2 sm:mb-4 md:mb-6">
                                    <span className="font-mono text-[#004080] text-[6px] sm:text-[8px] md:text-[10px] font-bold tracking-widest uppercase mb-1 sm:mb-2 text-center" style={{ textShadow: '1px 1px 0px rgba(255,255,255,0.5)' }}>
                                        CLICK TO VIEW PORTFOLIO
                                    </span>
                                    <span className="font-pixel text-[#3a6bc0] text-[8px] sm:text-xs md:text-sm animate-bounce" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.1)' }}>
                                        introductory
                                    </span>
                                </div>

                                {/* Main 'Projects' Title in Pixel Font */}
                                <h2 className="font-pixel text-2xl sm:text-4xl md:text-6xl lg:text-[4.5rem] text-[#1a365d] mb-4 sm:mb-6 md:mb-8 text-center"
                                    style={{
                                        lineHeight: '1.2',
                                        textShadow: `
                        3px 3px 0px #2a4365,
                        -1px -1px 0px rgba(255,255,255,0.8),
                        0px 6px 10px rgba(0,0,0,0.2)
                      `
                                    }}>
                                    Projects
                                </h2>

                                {/* Blinking Start Button */}
                                <div className="mt-2 sm:mt-4 md:mt-8 relative group-hover:scale-110 transition-transform duration-300">
                                    <span className="font-pixel text-[#0055ff] text-[6px] sm:text-[8px] md:text-xs bg-white/90 border border-[#0055ff] px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-md shadow-[2px_2px_0px_#0055ff] sm:shadow-[4px_4px_0px_#0055ff] animate-blink inline-block"
                                        style={{ animation: 'blink 1.5s step-end infinite' }}>
                                        Press Start Button
                                    </span>
                                </div>

                            </div>

                            {/* Reflection Highlight */}
                            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[linear-gradient(45deg,transparent_45%,rgba(255,255,255,0.1)_50%,transparent_55%)] pointer-events-none z-30 transform -rotate-12 translate-y-full transition-transform duration-[2s] group-hover:translate-y-[-100%]" />

                        </Link>
                    </div>

                    {/* Subtle TV reflections */}
                    <div className="absolute top-2 left-6 w-[30%] h-2 bg-white/5 rounded-full blur-[2px] pointer-events-none" />
                    <div className="absolute bottom-2 right-6 w-[20%] h-1 bg-white/5 rounded-full blur-[1px] pointer-events-none" />
                </div>

                {/* Shadow under TV */}
                <div className="mx-auto w-[80%] h-8 bg-black/40 blur-[15px] rounded-[100%] mt-8 transform group-hover:scale-95 group-hover:opacity-60 transition-all duration-500" />
            </div>

            <style jsx global>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          20% { transform: translate(-15%, 5%); }
          30% { transform: translate(7%, -25%); }
          40% { transform: translate(-5%, 25%); }
          50% { transform: translate(-15%, 10%); }
          60% { transform: translate(15%, 0%); }
          70% { transform: translate(0%, 15%); }
          80% { transform: translate(3%, 35%); }
          90% { transform: translate(-10%, 10%); }
        }
        .animate-grain {
          animation: grain 8s steps(10) infinite;
        }
      `}</style>
        </section>
    );
}
