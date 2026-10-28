import React from 'react'
import { Code2, User, Briefcase, GraduationCap, Trophy } from 'lucide-react'

export default function AdminBottomNav({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'projects', label: 'Proyek', icon: Code2 },
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'experiences', label: 'Pengalaman', icon: Briefcase },
    { id: 'educations', label: 'Pendidikan', icon: GraduationCap },
    { id: 'awards', label: 'Prestasi', icon: Trophy },
  ]

  return (
    <div className="fixed bottom-3 left-3 right-3 z-50 md:hidden pointer-events-none">
      <nav 
        className="pointer-events-auto max-w-md mx-auto bg-midnight-850/95 backdrop-blur-xl border border-slate-800 shadow-[0_10px_30px_rgba(0,0,0,0.7)] rounded-2xl p-1.5 flex items-center justify-between"
        role="navigation"
        aria-label="Admin Mobile Navigation"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-200 relative ${
                isActive
                  ? 'text-neon bg-neon/15 shadow-neon-pill font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              {isActive && (
                <span className="absolute -top-1 w-6 h-0.5 bg-neon rounded-full shadow-[0_0_8px_#39FF14]"></span>
              )}
              
              <Icon className={`w-4 h-4 transition-transform duration-200 ${isActive ? 'scale-110 stroke-[2.3]' : 'stroke-[1.8]'}`} />
              <span className={`text-[10px] mt-0.5 tracking-tight font-medium ${isActive ? 'text-neon font-semibold' : 'text-slate-400'}`}>
                {tab.label}
              </span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
