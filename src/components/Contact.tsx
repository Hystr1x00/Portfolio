'use client'
import { useEffect, useRef, useState } from 'react'

const socials = [
  { name: 'GitHub', handle: '@yourusername', url: '#', icon: '⌥' },
  { name: 'LinkedIn', handle: '/in/yourname', url: '#', icon: '⊞' },
  { name: 'Twitter', handle: '@yourhandle', url: '#', icon: '✕' },
  { name: 'Email', handle: 'you@email.com', url: 'mailto:you@email.com', icon: '@' },
]

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [copied, setCopied] = useState(false)
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

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

  const copyEmail = () => {
    navigator.clipboard.writeText('you@email.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = async () => {
    setSending(true)
    await new Promise(r => setTimeout(r, 1500))
    setSending(false)
    setSent(true)
    setFormState({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" ref={sectionRef} className="py-32 relative overflow-hidden bg-[#020818] min-h-screen">
      {/* BG */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,96,255,0.06)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="reveal flex items-center gap-4 mb-16">
          <span className="font-mono text-[#00d4ff] text-sm tracking-widest">06.</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">CONTACT</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-[#00d4ff22] to-transparent max-w-64" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: CTA */}
          <div className="space-y-8">
            <div className="reveal">
              <h3 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
                Let's build<br />
                <span className="gradient-text">something epic</span><br />
                together.
              </h3>
              <p className="text-slate-400 leading-relaxed text-lg">
                Open to full-time roles, freelance projects, and interesting collaborations.
                If you've got something cool in mind, let's talk.
              </p>
            </div>

            {/* Email copy */}
            <div className="reveal">
              <button
                onClick={copyEmail}
                className="group flex items-center gap-3 glass px-5 py-3 hover:border-[#00d4ff33] transition-all duration-300 w-full sm:w-auto"
              >
                <span className="font-mono text-sm text-slate-300 group-hover:text-[#00d4ff] transition-colors">
                  you@email.com
                </span>
                <span className="font-mono text-xs text-slate-500 ml-auto">
                  {copied ? '✓ COPIED' : 'COPY'}
                </span>
              </button>
            </div>

            {/* Socials */}
            <div className="reveal grid grid-cols-2 gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  className="glass p-4 flex items-center gap-3 hover:border-[#00d4ff22] transition-all duration-300 group"
                >
                  <span className="font-mono text-[#00d4ff] text-lg w-6 text-center">{s.icon}</span>
                  <div>
                    <div className="font-mono text-xs text-white group-hover:text-[#00d4ff] transition-colors">{s.name}</div>
                    <div className="font-mono text-[10px] text-slate-600 truncate">{s.handle}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="reveal">
            {sent ? (
              <div className="glass p-8 text-center h-full flex flex-col items-center justify-center min-h-[400px]">
                <div className="text-5xl mb-4">✓</div>
                <h3 className="font-display text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-slate-400 font-mono text-sm">I'll get back to you within 24 hours.</p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 font-mono text-xs text-[#00d4ff] border border-[#00d4ff33] px-4 py-2 hover:bg-[#00d4ff11] transition-colors"
                >
                  SEND ANOTHER
                </button>
              </div>
            ) : (
              <div className="glass p-8 space-y-5">
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-xs text-slate-400 tracking-widest">SECURE FORM · DIRECT TO INBOX</span>
                </div>

                {/* Name */}
                <div>
                  <label className="font-mono text-xs text-slate-500 tracking-widest block mb-2">NAME</label>
                  <input
                    value={formState.name}
                    onChange={e => setFormState(p => ({ ...p, name: e.target.value }))}
                    className="w-full bg-[#020818] border border-[#00d4ff15] focus:border-[#00d4ff44] text-slate-200 font-mono text-sm px-4 py-3 outline-none transition-colors placeholder:text-slate-700"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="font-mono text-xs text-slate-500 tracking-widest block mb-2">EMAIL</label>
                  <input
                    value={formState.email}
                    onChange={e => setFormState(p => ({ ...p, email: e.target.value }))}
                    className="w-full bg-[#020818] border border-[#00d4ff15] focus:border-[#00d4ff44] text-slate-200 font-mono text-sm px-4 py-3 outline-none transition-colors placeholder:text-slate-700"
                    placeholder="john@company.com"
                    type="email"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="font-mono text-xs text-slate-500 tracking-widest block mb-2">MESSAGE</label>
                  <textarea
                    value={formState.message}
                    onChange={e => setFormState(p => ({ ...p, message: e.target.value }))}
                    className="w-full bg-[#020818] border border-[#00d4ff15] focus:border-[#00d4ff44] text-slate-200 font-mono text-sm px-4 py-3 outline-none transition-colors placeholder:text-slate-700 resize-none"
                    placeholder="I'd like to discuss a project..."
                    rows={5}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={sending}
                  className="w-full bg-[#00d4ff] text-[#020818] font-mono text-sm font-bold tracking-widest py-4 hover:shadow-[0_0_30px_rgba(0,212,255,0.3)] transition-all duration-300 disabled:opacity-70 relative overflow-hidden group"
                >
                  {sending ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-[#020818] border-t-transparent rounded-full animate-spin" />
                      SENDING...
                    </span>
                  ) : (
                    <>
                      <span className="relative z-10">SEND MESSAGE →</span>
                      <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-10" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
