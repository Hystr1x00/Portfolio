'use client'
import { useEffect, useRef } from 'react'

const skills = {
  Frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
  Backend: ['Node.js', 'Express', 'NestJS', 'PostgreSQL', 'MongoDB', 'Redis'],
  DevOps: ['Docker', 'AWS', 'CI/CD', 'GitHub Actions', 'Nginx', 'Linux'],
  Tools: ['Git', 'Figma', 'Postman', 'VS Code', 'Notion', 'Vercel'],
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

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
    <section id="about" ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[radial-gradient(circle,rgba(0,96,255,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="reveal flex items-center gap-4 mb-16">
          <span className="font-mono text-[#00d4ff] text-sm tracking-widest">01.</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">ABOUT ME</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-[#00d4ff22] to-transparent max-w-64" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Bio */}
          <div className="space-y-6">
            <div className="reveal">
              <p className="text-slate-300 text-lg leading-relaxed">
                Hey, I'm a{' '}
                <span className="text-[#00d4ff] font-semibold">Full Stack Developer</span>{' '}
                based in <span className="text-white font-semibold">Indonesia</span>. I specialize
                in building fast, scalable, and beautiful web applications from ground up.
              </p>
            </div>
            <div className="reveal">
              <p className="text-slate-400 leading-relaxed">
                With 3+ years of experience, I've worked across fintech, e-commerce, and SaaS
                products. I'm passionate about clean code, system architecture, and creating
                experiences that users actually love.
              </p>
            </div>
            <div className="reveal">
              <p className="text-slate-400 leading-relaxed">
                When I'm not shipping code, you'll find me exploring new technologies, contributing
                to open source, or listening to hip-hop while architecting the next big thing.
              </p>
            </div>

            {/* Highlight cards */}
            <div className="reveal grid grid-cols-2 gap-4 mt-8">
              {[
                { icon: '⚡', label: 'Fast Learner', desc: 'New tech in days' },
                { icon: '🏗️', label: 'System Design', desc: 'Scalable architecture' },
                { icon: '🎨', label: 'Design Sense', desc: 'Pixel-perfect UI' },
                { icon: '🔍', label: 'Problem Solver', desc: 'Root cause finder' },
              ].map((item) => (
                <div key={item.label} className="glass p-4 hover:border-[#00d4ff33] transition-colors duration-300 group">
                  <span className="text-xl">{item.icon}</span>
                  <div className="font-mono text-sm text-white mt-2 group-hover:text-[#00d4ff] transition-colors">{item.label}</div>
                  <div className="font-body text-xs text-slate-500 mt-1">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Skills grid */}
          <div className="space-y-6">
            {Object.entries(skills).map(([category, items], ci) => (
              <div key={category} className="reveal" style={{ transitionDelay: `${ci * 100}ms` }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-xs text-[#00d4ff] tracking-widest opacity-70">
                    {String(ci + 1).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-sm text-white tracking-wider">{category.toUpperCase()}</span>
                  <div className="flex-1 h-px bg-[#00d4ff11]" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span key={skill} className="tech-tag hover:bg-[#00d4ff15] transition-colors cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
