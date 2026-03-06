'use client'
import { useEffect, useRef, useState } from 'react'

// Simulated Spotify data - replace with actual Spotify API
const spotifyTrack = {
  name: 'HUMBLE.',
  artist: 'Kendrick Lamar',
  album: 'DAMN.',
  isPlaying: true,
  progress: 65,
}

const currentlyDoing = [
  { icon: '📚', label: 'Learning', desc: 'Rust for system programming' },
  { icon: '🔨', label: 'Building', desc: 'AI-powered code review tool' },
  { icon: '🎧', label: 'Listening', desc: 'Hip-hop & lo-fi while coding' },
  { icon: '☕', label: 'Fueled by', desc: 'Black coffee, no sugar' },
]

export default function Fun() {
  const sectionRef = useRef<HTMLElement>(null)
  const [barProgress, setBarProgress] = useState(65)
  const [eqBars, setEqBars] = useState([40, 60, 30, 80, 50])

  // Animate equalizer bars
  useEffect(() => {
    const interval = setInterval(() => {
      setEqBars(prev => prev.map(() => Math.random() * 70 + 20))
    }, 400)
    return () => clearInterval(interval)
  }, [])

  // Animate progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setBarProgress(prev => prev >= 100 ? 0 : prev + 0.5)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100)
            })
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,96,255,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="reveal flex items-center gap-4 mb-12">
          <span className="font-mono text-[#00d4ff] text-sm tracking-widest">05.</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">THE HUMAN SIDE</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-[#00d4ff22] to-transparent max-w-64" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Spotify card */}
          <div className="reveal glass p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle,rgba(30,215,96,0.08)_0%,transparent_70%)]" />
            
            <div className="flex items-center gap-2 mb-6">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#1DB954]">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              <span className="font-mono text-xs text-slate-400 tracking-widest">SPOTIFY STATUS</span>
              <div className="flex-1" />
              {spotifyTrack.isPlaying && (
                <div className="flex items-end gap-0.5 h-4">
                  {eqBars.map((h, i) => (
                    <div
                      key={i}
                      className="w-0.5 bg-[#1DB954] rounded-t transition-all duration-300"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-4 items-center mb-4">
              {/* Album art placeholder */}
              <div className="w-16 h-16 rounded-sm flex-shrink-0 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl">🎵</span>
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-display font-bold text-white truncate">{spotifyTrack.name}</div>
                <div className="font-mono text-sm text-slate-400 truncate">{spotifyTrack.artist}</div>
                <div className="font-mono text-xs text-slate-600 truncate">{spotifyTrack.album}</div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-3">
              <div className="h-1 bg-[#ffffff11] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1DB954] rounded-full transition-all duration-1000"
                  style={{ width: `${barProgress}%` }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="font-mono text-[10px] text-slate-600">
                  {Math.floor(barProgress / 100 * 215)}s
                </span>
                <span className="font-mono text-[10px] text-slate-600">3:35</span>
              </div>
            </div>

            <p className="font-mono text-xs text-slate-600 mt-4">
              * Real-time via Spotify API. Connect yours in production.
            </p>
          </div>

          {/* Currently doing */}
          <div className="reveal space-y-4">
            {currentlyDoing.map((item, i) => (
              <div
                key={item.label}
                className="glass p-4 flex items-center gap-4 hover:border-[#00d4ff22] transition-all duration-300 group"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <span className="text-2xl w-8 text-center flex-shrink-0">{item.icon}</span>
                <div>
                  <div className="font-mono text-xs text-[#00d4ff] tracking-widest">{item.label.toUpperCase()}</div>
                  <div className="font-body text-slate-300 text-sm mt-0.5">{item.desc}</div>
                </div>
                <div className="ml-auto w-2 h-2 rounded-full bg-[#00d4ff] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>

        {/* Fun fact marquee */}
        <div className="reveal mt-12 overflow-hidden border border-[#00d4ff0f] py-3 relative">
          <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]">
            {Array.from({ length: 4 }).flatMap(() => [
              'CLEAN CODE > CLEVER CODE',
              '·',
              'SHIPPED IS BETTER THAN PERFECT',
              '·',
              'ALWAYS BE DEPLOYING',
              '·',
              'TYPE SAFETY IS NON-NEGOTIABLE',
              '·',
              'COFFEE → CODE → REPEAT',
              '·',
            ]).map((text, i) => (
              <span key={i} className={`font-mono text-xs px-4 ${text === '·' ? 'text-[#00d4ff]' : 'text-slate-600'}`}>
                {text}
              </span>
            ))}
          </div>
          <style jsx>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
        </div>
      </div>
    </section>
  )
}
