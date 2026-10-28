import React from 'react'
import { ArrowUp, Terminal, Lock } from 'lucide-react'

export default function Footer({ profile, onOpenAdmin }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-midnight-950 border-t border-slate-800 text-slate-400 text-xs py-12 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand Info */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-midnight-850 border border-slate-800 flex items-center justify-center text-neon">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-slate-200">
                {profile?.name || "Raden Marzenda"}
              </p>
              <p className="text-[11px] text-slate-500 font-mono">
                Web & IoT Systems Engineer
              </p>
            </div>
          </div>

          {/* Actions: Admin Portal & Back to top button */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenAdmin || (() => { window.location.hash = '#admin' })}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-midnight-850 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-neon transition-all"
              title="Akses Panel Admin Pengelolaan Konten"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-midnight-850 border border-slate-800 hover:border-neon hover:text-neon transition-all"
              aria-label="Kembali ke atas"
            >
              <span>Atas</span>
              <ArrowUp className="w-3.5 h-3.5 text-neon" />
            </button>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} {profile?.name || "Irfan Marzenda"}. All rights reserved.</p>
          <p className="font-mono text-slate-400">
            Crafted with precision for high-reliability systems.
          </p>
        </div>
      </div>
    </footer>
  )
}
