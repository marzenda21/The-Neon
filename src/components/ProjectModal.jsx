import React, { useEffect } from 'react'
import { X, ExternalLink, Github, Cpu, Code2, AlertTriangle, CheckCircle2, Zap } from 'lucide-react'

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow || 'auto'
    }
  }, [project, onClose])

  if (!project) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-midnight-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl glass-card rounded-2xl border border-slate-700/80 bg-midnight-900 shadow-glass overflow-hidden my-8"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-midnight-850">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium ${
              project.category === 'iot' 
                ? 'bg-neon/15 text-neon border border-neon/30' 
                : 'bg-lemon/15 text-lemon border border-lemon/30'
            }`}>
              {project.category === 'iot' ? <Cpu className="w-3.5 h-3.5" /> : <Code2 className="w-3.5 h-3.5" />}
              <span>{project.badge || project.category.toUpperCase()}</span>
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
            aria-label="Tutup Detail Proyek"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Project Image */}
          <div className="relative rounded-xl overflow-hidden border border-slate-800 max-h-72">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-100">
                {project.title}
              </h3>
            </div>
          </div>

          {/* Key Metrics / Highlights */}
          {project.metrics && (
            <div className="p-3.5 rounded-xl bg-neon/10 border border-neon/30 flex items-center gap-3">
              <Zap className="w-5 h-5 text-neon shrink-0" />
              <div className="text-xs text-slate-200">
                <span className="font-semibold text-neon">Capaian Teknis: </span>
                <span>{project.metrics}</span>
              </div>
            </div>
          )}

          {/* Problem & Solution Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-midnight-850/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-semibold uppercase">
                <AlertTriangle className="w-4 h-4" />
                <span>Masalah (Problem)</span>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {project.problem || project.summary}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-midnight-850/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-neon text-xs font-mono font-semibold uppercase">
                <CheckCircle2 className="w-4 h-4" />
                <span>Solusi Arsitektur</span>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {project.solution || project.summary}
              </p>
            </div>
          </div>

          {/* Technology Stack Tags */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase text-lemon tracking-wider font-semibold">
              Komponen & Stack Teknologi
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack?.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-midnight-800 border border-slate-700 text-xs font-mono text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neon text-midnight-950 font-bold text-xs hover:bg-neon-hover transition-colors shadow-neon"
              >
                <span>Lihat Live Demo</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-700 bg-midnight-800 text-slate-200 hover:text-slate-100 hover:border-slate-500 font-semibold text-xs transition-colors"
              >
                <Github className="w-4 h-4 text-neon" />
                <span>Source Code GitHub</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
