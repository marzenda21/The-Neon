import React from 'react'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'

export default function NotificationToast({ toast, onClose }) {
  if (!toast) return null

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-neon shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-lemon shrink-0" />
  }

  const borderColors = {
    success: 'border-neon/40 shadow-neon',
    error: 'border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.2)]',
    info: 'border-lemon/40 shadow-lemon'
  }

  return (
    <div className="fixed top-20 right-4 md:right-8 z-50 animate-bounce-in max-w-sm w-full">
      <div className={`glass-card p-4 rounded-xl border ${borderColors[toast.type || 'info']} flex items-start gap-3 bg-midnight-850/95 shadow-glass backdrop-blur-xl`}>
        {icons[toast.type || 'info']}
        <div className="flex-1 text-sm">
          <p className="font-semibold text-slate-100">{toast.title}</p>
          <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">{toast.message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-200 transition-colors p-1"
          aria-label="Tutup notifikasi"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
