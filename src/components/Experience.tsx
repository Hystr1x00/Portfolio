'use client'
import { useEffect, useRef } from 'react'

const experiences = [
  {
    company: 'Tech Startup Co.',
    role: 'Senior Full Stack Developer',
    period: '2023 – Present',
    type: 'Full-time',
    desc: 'Leading development of core platform features serving 50K+ users. Architected microservices infrastructure, reduced API latency by 40%, and mentored junior devs.',
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'Docker'],
    highlight: true,
  },
  {
    company: 'Digital Agency XYZ',
    role: 'Full Stack Developer',
    period: '2022 – 2023',
    type: 'Full-time',
    desc: 'Built and shipped 8 client projects across fintech and e-commerce verticals. Introduced TypeScript to the team and improved DX significantly.',
    tech: ['React', 'Express', 'MongoDB', 'Tailwind CSS', 'Stripe'],
    highlight: false,
  },
  {
    company: 'Freelance',
    role: 'Web Developer',
    period: '2021 – 2022',
    type: 'Contract',
    desc: 'Delivered 15+ projects for clients across Southeast Asia. Specialized in Next.js landing pages, REST APIs, and CMS integrations.',
    tech: ['Next.js', 'WordPress', 'MySQL', 'Vercel'],
    highlight: false,
  },
]

const education = [
  {
    school: 'University of Indonesia',
    degree: 'S1 Computer Science',
    period: '2019 – 2023',
    gpa: 'GPA 3.78 / 4.00',
    highlight: true,
  },
  {
    school: 'Bangkit Academy by Google',
    degree: 'Cloud Computing Learning Path',
    period: '2022',
    gpa: 'Top Performer',
    highlight: false,
  },
]

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 120)
            })
          }
        })
      },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="py-32 relative overflow-hidden">
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-[radial-gradient(circle,rgba(0,150,255,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Work Experience */}
        <div className="reveal flex items-center gap-4 mb-16">
          <span className="font-mono text-[#00d4ff] text-sm tracking-widest">02.</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">EXPERIENCE</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-[#00d4ff22] to-transparent max-w-64" />
        </div>

        {/* Timeline */}
        <div className="relative mb-24">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#00d4ff33] via-[#00d4ff22] to-transparent hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <div
                key={exp.company}
                className={`reveal grid md:grid-cols-2 gap-6 md:gap-16 relative ${i % 2 === 0 ? '' : 'md:direction-rtl'}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* Timeline dot */}
                <div className="hidden md:block absolute left-1/2 top-6 w-3 h-3 -translate-x-1/2 z-10">
                  <div className={`w-full h-full rounded-full border-2 ${exp.highlight ? 'bg-[#00d4ff] border-[#00d4ff] shadow-[0_0_15px_rgba(0,212,255,0.6)]' : 'bg-[#020818] border-[#00d4ff44]'}`} />
                </div>

                {/* Left: period (even items), empty (odd items) */}
                <div className={`flex items-start ${i % 2 === 0 ? 'md:justify-end md:text-right' : 'md:order-2'}`}>
                  <div className={i % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}>
                    <div className="font-mono text-[#00d4ff] text-sm">{exp.period}</div>
                    <div className="font-mono text-xs text-slate-500 mt-1">{exp.type}</div>
                  </div>
                </div>

                {/* Right: content */}
                <div className={`${i % 2 === 0 ? '' : 'md:order-1'}`}>
                  <div className={`${i % 2 === 0 ? 'md:pl-8' : 'md:pr-8'} pl-4 border-l md:border-l-0 border-[#00d4ff22]`}>
                    <div className={`glass p-6 hover:border-[#00d4ff22] transition-all duration-300 ${exp.highlight ? 'border-[#00d4ff22] shadow-[0_0_30px_rgba(0,212,255,0.05)]' : ''}`}>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-display text-lg font-bold text-white">{exp.role}</h3>
                          <div className="font-mono text-[#00d4ff] text-sm mt-1">{exp.company}</div>
                        </div>
                        {exp.highlight && (
                          <span className="font-mono text-xs bg-[#00d4ff11] text-[#00d4ff] border border-[#00d4ff33] px-2 py-1">
                            CURRENT
                          </span>
                        )}
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed mt-3 mb-4">{exp.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="reveal flex items-center gap-4 mb-10">
          <span className="font-mono text-[#00d4ff] text-sm tracking-widest">03.</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">EDUCATION</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-[#00d4ff22] to-transparent max-w-64" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {education.map((edu, i) => (
            <div key={edu.school} className="reveal glass p-6 hover:border-[#00d4ff22] transition-all duration-300" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold text-white">{edu.school}</h3>
                  <div className="font-mono text-[#00d4ff] text-sm mt-1">{edu.degree}</div>
                  <div className="font-mono text-xs text-slate-500 mt-2">{edu.period}</div>
                </div>
                <span className="font-mono text-xs text-emerald-400 border border-emerald-400/30 bg-emerald-400/5 px-2 py-1">
                  {edu.gpa}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
