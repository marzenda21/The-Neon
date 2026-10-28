import React from 'react'
import { Home, Code2, Briefcase, User, Send } from 'lucide-react'

export default function BottomNav({ activeSection }) {
  const navItems = [
    { id: 'beranda', label: 'Home', icon: Home, href: '#beranda' },
    { id: 'biodata', label: 'Biodata', icon: User, href: '#biodata' },
    { id: 'proyek', label: 'Proyek', icon: Code2, href: '#proyek' },
    { id: 'pengalaman', label: 'Pengalaman', icon: Briefcase, href: '#pengalaman' },
    { id: 'kontak', label: 'Kontak', icon: Send, href: '#kontak' },
  ]

  return (
    <div className="fixed bottom-3 left-3 right-3 z-50 md:hidden pointer-events-none">
      <nav 
        className="pointer-events-auto max-w-md mx-auto bg-midnight-850/90 backdrop-blur-xl border border-slate-800/90 rounded-2xl p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex items-center justify-between"
        role="navigation"
        aria-label="Mobile Bottom Navigation"
      >
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id

          return (
            <a
              key={item.id}
              href={item.href}
              className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all duration-200 relative group ${
                isActive
                  ? 'text-neon bg-neon/15 shadow-neon-pill'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {/* Subtle top indicator pip when active */}
              {isActive && (
                <span className="absolute -top-1 w-5 h-0.5 bg-neon rounded-full shadow-[0_0_8px_#39FF14]"></span>
              )}
              
              <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110 stroke-[2.2]' : 'stroke-[1.8]'}`} />
              <span className={`text-[10px] mt-0.5 tracking-tight font-medium ${isActive ? 'font-semibold text-neon' : 'text-slate-400'}`}>
                {item.label}
              </span>
            </a>
          )
        })}
      </nav>
    </div>
  )
}
