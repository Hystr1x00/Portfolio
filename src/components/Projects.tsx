'use client'
import { useEffect, useRef, useState } from 'react'
import projectsData from '@/data/projects.json'
import { Project } from '@/data/projects'

const projects: Project[] = projectsData as Project[];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const [hoveredId, setHoveredId] = useState<number | null>(null)

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
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const featured = projects.filter(p => p.featured)
  const others = projects.filter(p => !p.featured)

  return (
    <section id="projects" ref={sectionRef} className="py-32 relative overflow-hidden">
      <div className="absolute left-1/2 top-0 w-96 h-96 bg-[radial-gradient(circle,rgba(0,212,255,0.04)_0%,transparent_70%)] -translate-x-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="reveal flex items-center gap-4 mb-16">
          <span className="font-mono text-[#00d4ff] text-sm tracking-widest">04.</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">PROJECTS</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-[#00d4ff22] to-transparent max-w-64" />
        </div>

        {/* Featured projects */}
        <div className="space-y-8 mb-16">
          {featured.map((project, i) => (
            <div
              key={project.id}
              className={`reveal group relative grid lg:grid-cols-2 gap-0 overflow-hidden ${i % 2 === 1 ? 'lg:direction-rtl' : ''}`}
              style={{ transitionDelay: `${i * 150}ms` }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Visual panel */}
              <div
                className={`relative h-48 lg:h-auto overflow-hidden ${i % 2 === 1 ? 'lg:order-2' : ''}`}
                style={{ background: `radial-gradient(circle at 50% 50%, ${project.color}11 0%, transparent 70%), #04102a` }}
              >
                {/* Grid pattern */}
                <div className="absolute inset-0 grid-bg opacity-50" />
                {/* Center glow */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    background: hoveredId === project.id
                      ? `radial-gradient(circle at 50% 50%, ${project.color}22 0%, transparent 60%)`
                      : 'transparent',
                    transition: 'background 0.4s ease'
                  }}
                >
                  <div
                    className="font-display text-7xl font-bold opacity-10 group-hover:opacity-20 transition-opacity duration-500 select-none"
                    style={{ color: project.color }}
                  >
                    {String(project.id).padStart(2, '0')}
                  </div>
                </div>

                {/* Metrics */}
                <div className="absolute bottom-4 left-4 right-4 flex gap-4">
                  {project.metrics.map(([val, label]) => (
                    <div key={label} className="glass px-3 py-2 flex-1 text-center">
                      <div className="font-mono text-sm font-bold" style={{ color: project.color }}>{val}</div>
                      <div className="font-mono text-[10px] text-slate-500">{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Content panel */}
              <div className={`glass border-l-0 md:border-l p-8 flex flex-col justify-between ${i % 2 === 1 ? 'lg:order-1 md:border-l-0 md:border-r' : ''}`}>
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="font-mono text-xs tracking-widest mb-2" style={{ color: project.color }}>{project.type}</div>
                      <h3 className="font-display text-3xl font-bold text-white">{project.title}</h3>
                    </div>
                    <span
                      className="font-mono text-xs px-2 py-1 border mt-1"
                      style={{
                        color: project.status === 'LIVE' ? '#00ffcc' : project.status === 'BETA' ? '#f59e0b' : '#7c3aed',
                        borderColor: project.status === 'LIVE' ? '#00ffcc33' : project.status === 'BETA' ? '#f59e0b33' : '#7c3aed33',
                        background: project.status === 'LIVE' ? '#00ffcc08' : project.status === 'BETA' ? '#f59e0b08' : '#7c3aed08',
                      }}
                    >
                      {project.status}
                    </span>
                  </div>
                  <p className="text-slate-400 leading-relaxed mb-6">{project.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-6 pt-6 border-t border-[#00d4ff0a]">
                  <a
                    href={project.link}
                    className="font-mono text-sm tracking-wider hover:text-[#00d4ff] transition-colors flex items-center gap-2 text-slate-300"
                  >
                    <span>LIVE DEMO</span>
                    <span className="text-lg">↗</span>
                  </a>
                  <a
                    href={project.github}
                    className="font-mono text-sm tracking-wider text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    GITHUB
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other projects grid */}
        <div className="reveal mb-8">
          <p className="font-mono text-xs text-slate-500 tracking-widest">OTHER NOTABLE WORK</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {others.map((project, i) => (
            <div
              key={project.id}
              className="reveal glass p-6 group hover:border-opacity-30 transition-all duration-300 relative overflow-hidden"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 50% 0%, ${project.color}08 0%, transparent 60%)` }}
              />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-mono text-xs tracking-widest mb-1" style={{ color: project.color }}>{project.type}</div>
                    <h3 className="font-display text-xl font-bold text-white">{project.title}</h3>
                  </div>
                  <span className="font-mono text-xs text-slate-500 mt-1">{project.metrics[0][0]}<br /><span className="text-[10px]">{project.metrics[0][1]}</span></span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{project.desc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.slice(0, 3).map(t => <span key={t} className="tech-tag">{t}</span>)}
                </div>
                <div className="flex gap-4">
                  <a href={project.link} className="font-mono text-xs text-slate-400 hover:text-[#00d4ff] transition-colors">DEMO ↗</a>
                  <a href={project.github} className="font-mono text-xs text-slate-500 hover:text-slate-300 transition-colors">GITHUB</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
