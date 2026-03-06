'use client'
import { useEffect, useRef, useState } from 'react'

const roles = ['Full Stack Developer', 'React / Next.js Expert', 'Node.js Engineer', 'UI/UX Craftsman', 'System Architect']

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)
  const [lineIndex, setLineIndex] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Typewriter effect
  useEffect(() => {
    const current = roles[roleIndex]
    if (typing) {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setTyping(false), 2000)
        return () => clearTimeout(t)
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30)
        return () => clearTimeout(t)
      } else {
        setRoleIndex((i) => (i + 1) % roles.length)
        setTyping(true)
      }
    }
  }, [displayed, typing, roleIndex])

  // Canvas particle field
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let animId: number

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    interface Particle {
      x: number; y: number; vx: number; vy: number; size: number; opacity: number
    }

    const particles: Particle[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw connections
      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach(q => {
          const dist = Math.hypot(p.x - q.x, p.y - q.y)
          if (dist < 120) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.15 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()
          }
        })
      })

      // Draw particles
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`
        ctx.fill()
        
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
      })

      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  const terminalLines = [
    { cmd: '$ whoami', out: 'fullstack_developer' },
    { cmd: '$ uptime', out: '3+ years of shipping products' },
    { cmd: '$ cat skills.txt', out: 'TS · React · Node · PostgreSQL · Redis · Docker · AWS' },
    { cmd: '$ git log --oneline', out: '47 public repos, 1200+ commits' },
  ]

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden grid-bg">
      {/* Canvas particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60"
      />

      {/* Glowing orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,96,255,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.06)_0%,transparent_70%)] pointer-events-none animate-pulse-slow" />

      {/* Scan line */}
      <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff33] to-transparent animate-[scan_8s_linear_infinite] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Main content */}
          <div className="space-y-8">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 glass rounded-sm border-l-2 border-[#00d4ff]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs text-slate-400 tracking-widest">AVAILABLE FOR WORK</span>
            </div>

            {/* Name */}
            <div>
              <p className="font-mono text-[#00d4ff] text-sm tracking-widest mb-3 opacity-70">{'// HELLO WORLD'}</p>
              <h1 className="font-display text-5xl md:text-7xl font-800 leading-none tracking-tight text-white mb-4">
                YOUR
                <br />
                <span className="gradient-text">NAME</span>
                <span className="text-[#00d4ff33]">.</span>
              </h1>

              {/* Typewriter */}
              <div className="flex items-center gap-1 h-8">
                <span className="font-mono text-base text-slate-300">{displayed}</span>
                <span className="w-0.5 h-5 bg-[#00d4ff] blink" />
              </div>
            </div>

            {/* Description */}
            <p className="font-body text-slate-400 text-lg leading-relaxed max-w-md">
              I craft digital experiences that sit at the intersection of{' '}
              <span className="text-white">engineering precision</span> and{' '}
              <span className="text-[#00d4ff]">creative design</span>. From idea to deployment.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="group relative px-6 py-3 bg-[#00d4ff] text-[#020818] font-mono text-sm font-bold tracking-widest overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
              >
                <span className="relative z-10">VIEW WORK</span>
                <div className="absolute inset-0 bg-white translate-x-full group-hover:translate-x-0 transition-transform duration-300 opacity-20" />
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border border-[#00d4ff33] text-slate-300 font-mono text-sm tracking-widest hover:border-[#00d4ff] hover:text-[#00d4ff] transition-all duration-300"
              >
                GET IN TOUCH
              </a>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-[#00d4ff0f]">
              {[['3+', 'Years Exp'], ['20+', 'Projects'], ['10+', 'Clients']].map(([num, label]) => (
                <div key={label}>
                  <div className="font-display text-3xl font-bold text-[#00d4ff]">{num}</div>
                  <div className="font-mono text-xs text-slate-500 tracking-wider mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Terminal */}
          <div className="relative">
            {/* Decorative corner */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-[#00d4ff33]" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-[#00d4ff33]" />

            <div className="glass rounded-sm p-0 overflow-hidden border border-[#00d4ff15]">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#00d4ff15] bg-[#020818]">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                <span className="font-mono text-xs text-slate-500 ml-2">~/portfolio.sh</span>
              </div>

              {/* Terminal body */}
              <div className="p-6 space-y-3 min-h-[280px]">
                {terminalLines.map((line, i) => (
                  <div key={i} className="space-y-1">
                    <div className="font-mono text-sm text-[#00d4ff]">{line.cmd}</div>
                    <div className="font-mono text-sm text-slate-300 pl-2">{line.out}</div>
                  </div>
                ))}
                <div className="font-mono text-sm text-[#00d4ff] flex items-center gap-1 mt-4">
                  $<span className="blink ml-1">▋</span>
                </div>
              </div>
            </div>

            {/* Floating tech badges */}
            <div className="absolute -right-6 top-1/4 flex flex-col gap-2 hidden lg:flex">
              {['React', 'Next.js', 'TypeScript', 'Node.js'].map((tech, i) => (
                <div
                  key={tech}
                  className="tech-tag animate-float"
                  style={{ animationDelay: `${i * 0.5}s` }}
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-mono text-xs text-slate-600 tracking-widest">SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#00d4ff44] to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  )
}
