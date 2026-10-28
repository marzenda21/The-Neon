import React, { useState } from 'react'
import { Code2, Cpu, ExternalLink, Github, Layers, ArrowUpRight, Sparkles, Filter } from 'lucide-react'
import ProjectModal from './ProjectModal'

export default function ProjectSection({ projects }) {
  const [filter, setFilter] = useState('all') // 'all' | 'web' | 'iot'
  const [selectedProject, setSelectedProject] = useState(null)

  const filteredProjects = projects.filter(item => {
    if (filter === 'all') return true
    return item.category === filter
  })

  return (
    <section id="proyek" className="py-20 bg-midnight-900 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title & Description */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
              Karya <span className="text-neon">Web Terukur</span> & <span className="text-lemon">Hardware IoT</span>
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
              Arsitektur sistem yang mengutamakan reliabilitas data, optimalisasi daya sensor, serta performa rendering antarmuka frontend berlatensi rendah.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 bg-midnight-850 p-1.5 rounded-2xl border border-slate-800 self-start md:self-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                filter === 'all'
                  ? 'bg-neon text-midnight-950 shadow-neon font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Semua ({projects.length})
            </button>

            <button
              onClick={() => setFilter('web')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                filter === 'web'
                  ? 'bg-neon text-midnight-950 shadow-neon font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Web Apps</span>
            </button>

            <button
              onClick={() => setFilter('iot')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                filter === 'iot'
                  ? 'bg-neon text-midnight-950 shadow-neon font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>IoT & Embedded</span>
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between group hover:border-slate-700 transition-all duration-300 hover:shadow-glass hover:-translate-y-1"
            >
              {/* Card Thumbnail */}
              <div>
                <div className="relative aspect-video w-full overflow-hidden bg-midnight-950 border-b border-slate-800">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-900/90 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold backdrop-blur-md ${
                      project.category === 'iot'
                        ? 'bg-midnight-900/80 text-neon border border-neon/40 shadow-neon-pill'
                        : 'bg-midnight-900/80 text-lemon border border-lemon/40'
                    }`}>
                      {project.category === 'iot' ? <Cpu className="w-3 h-3" /> : <Code2 className="w-3 h-3" />}
                      <span>{project.badge || (project.category === 'iot' ? 'IoT System' : 'Web App')}</span>
                    </span>
                  </div>

                  {/* Featured Marker */}
                  {project.featured && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-neon/20 text-neon border border-neon/40 backdrop-blur-md">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-neon transition-colors line-clamp-1">
                    {project.title}
                  </h3>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-2">
                    {project.summary}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.techStack?.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-midnight-800 border border-slate-800 text-[11px] font-mono text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack?.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded-md bg-midnight-950 text-[10px] font-mono text-slate-500">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-5 pt-0 mt-2 border-t border-slate-800/60 flex items-center justify-between text-xs">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="font-mono text-lemon hover:text-lemon-bright font-semibold inline-flex items-center gap-1 transition-colors group/btn py-2"
                >
                  <span>Detail Sistem</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>

                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-midnight-800 border border-slate-800 text-slate-400 hover:text-slate-100 hover:border-slate-700 transition-colors"
                      title="Lihat Source Code GitHub"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neon/10 hover:bg-neon text-neon hover:text-midnight-950 font-semibold transition-all duration-200 border border-neon/30 hover:border-neon"
                    >
                      <span>Demo</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Modal Detail Popup - Hanya dimount saat ada proyek yang dipilih */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}

      </div>
    </section>
  )
}
