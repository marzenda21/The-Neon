import React, { useState, useEffect } from 'react'
import { Terminal, Download, Send, Phone, FileText } from 'lucide-react'

export default function Navbar({ profile, isFirebaseLive, activeSection, onOpenAtsCv }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Beranda', href: '#beranda' },
    { name: 'Biodata', href: '#biodata' },
    { name: 'Proyek', href: '#proyek' },
    { name: 'Pengalaman', href: '#pengalaman' },
    { name: 'Pendidikan', href: '#pendidikan' },
    { name: 'Kontak', href: '#kontak' },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 w-full ${
      scrolled 
        ? 'py-3 bg-midnight-900/90 backdrop-blur-xl border-b border-slate-800/80 shadow-glass' 
        : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full overflow-hidden">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand */}
          <a href="#beranda" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-midnight-800 border border-slate-700/80 group-hover:border-neon flex items-center justify-center transition-all duration-300 group-hover:shadow-neon">
              <Terminal className="w-4 h-4 text-neon" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base md:text-lg tracking-tight text-slate-100 group-hover:text-neon transition-colors">
                {profile?.nickname || 'Marzenda'}
              </span>
              <span className="text-neon font-bold">.</span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 bg-midnight-850/80 border border-slate-800/90 rounded-full px-4 py-1.5 backdrop-blur-md">
            {navLinks.map((item) => {
              const isActive = activeSection === item.href.replace('#', '')
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`text-xs font-medium px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-neon/15 text-neon shadow-neon-pill font-semibold'
                      : 'text-slate-300 hover:text-slate-100 hover:bg-slate-800/60'
                  }`}
                >
                  {item.name}
                </a>
              )
            })}
          </nav>

          {/* Quick Action Buttons for HR */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Quick CV Download Modal Trigger */}
            <button
              type="button"
              onClick={onOpenAtsCv}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-midnight-800 border border-slate-700 text-slate-200 hover:border-lemon hover:text-lemon transition-all"
              title="Lihat & Download CV Standar ATS"
            >
              <FileText className="w-3.5 h-3.5 text-lemon" />
              <span>CV ATS</span>
            </button>

            {/* Hubungi WhatsApp Button */}
            <a
              href={profile?.whatsappUrl || "#kontak"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-bold rounded-xl bg-neon text-midnight-950 hover:bg-neon-hover transition-all duration-200 shadow-neon hover:scale-[1.02] active:scale-[0.98]"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Kontak</span>
            </a>
          </div>

        </div>
      </div>
    </header>
  )
}
