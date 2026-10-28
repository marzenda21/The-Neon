import React, { useState } from 'react'
import { Briefcase, Users, Calendar, Award, MapPin, CheckCircle, BookOpen, ExternalLink, Image as ImageIcon, X } from 'lucide-react'

export default function ExperienceSection({ experiences }) {
  const [activeTab, setActiveTab] = useState('work') // 'work' | 'organization' | 'activities'
  const [previewImage, setPreviewImage] = useState(null)

  const tabButtons = [
    { id: 'work', label: 'Kerja & Magang', icon: Briefcase, count: experiences?.work?.length || 0 },
    { id: 'organization', label: 'Organisasi & Komunitas', icon: Users, count: experiences?.organization?.length || 0 },
    { id: 'activities', label: 'Seminar & Workshop', icon: BookOpen, count: experiences?.activities?.length || 0 },
  ]

  return (
    <section id="pengalaman" className="py-20 bg-midnight-900 border-t border-slate-800/80 relative w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full overflow-hidden">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Pengalaman Lapangan, <span className="text-neon">Organisasi</span> & <span className="text-lemon">Aktivitas</span>
          </h2>
          <p className="mt-3 text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Kontribusi nyata dalam kepemimpinan teknologi, rekayasa produk industri, dan transfer wawasan kepada sesama pengembang.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 sm:mb-12">
          {tabButtons.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                  isActive
                    ? 'bg-midnight-800 text-neon border-neon shadow-neon'
                    : 'bg-midnight-850 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'text-neon' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-neon/20 text-neon' : 'bg-midnight-950 text-slate-500'
                }`}>
                  {tab.count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Timeline Content - Responsive with Zero Horizontal Overflow */}
        <div className="max-w-4xl mx-auto w-full">
          
          {/* Work / Internship Timeline */}
          {activeTab === 'work' && (
            <div className="relative border-l-2 border-slate-800 pl-4 sm:pl-8 ml-2 sm:ml-4 space-y-8 sm:space-y-10">
              {experiences?.work?.map((item) => (
                <div key={item.id} className="relative group">
                  {/* Glowing Checkpoint Node */}
                  <div className="absolute -left-[23px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-midnight-900 border-2 border-neon group-hover:bg-neon group-hover:shadow-[0_0_12px_#39FF14] transition-all" />
                  
                  <div className="glass-card rounded-2xl p-4 sm:p-6 border border-slate-800 hover:border-slate-700 transition-all duration-200">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                      
                      {/* Left: Role, Company & Optional Photo */}
                      <div className="flex items-start gap-3 min-w-0">
                        {item.image && (
                          <div 
                            onClick={() => setPreviewImage({ url: item.image, title: `${item.role} @ ${item.company}` })}
                            className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-slate-700 bg-midnight-950 shrink-0 cursor-pointer group/img relative"
                            title="Klik untuk memperbesar foto"
                          >
                            <img
                              src={item.image}
                              alt={item.company}
                              className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-300"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-midnight-950/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                              <ImageIcon className="w-3.5 h-3.5 text-neon" />
                            </div>
                          </div>
                        )}

                        <div className="min-w-0">
                          <h3 className="text-base sm:text-lg font-bold text-slate-100 group-hover:text-neon transition-colors leading-tight">
                            {item.role}
                          </h3>
                          <p className="text-xs sm:text-sm font-medium text-lemon mt-0.5">
                            {item.company}
                          </p>
                        </div>
                      </div>

                      {/* Right: Date Period & Location */}
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 shrink-0">
                        <span className="flex items-center gap-1 bg-midnight-950 px-2.5 py-1 rounded-md border border-slate-800 text-slate-300 text-[11px]">
                          <Calendar className="w-3 h-3 text-neon" />
                          <span>{item.period}</span>
                        </span>
                        {item.location && (
                          <span className="hidden sm:flex items-center gap-1 text-slate-400 text-[11px]">
                            <MapPin className="w-3 h-3" />
                            <span>{item.location}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                      {item.description}
                    </p>

                    {item.achievements && (
                      <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                        <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                          Kontribusi Utama & Capaian:
                        </span>
                        <ul className="space-y-1">
                          {item.achievements.map((ach, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-neon shrink-0 mt-1.5" />
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Organization Timeline */}
          {activeTab === 'organization' && (
            <div className="relative border-l-2 border-slate-800 pl-4 sm:pl-8 ml-2 sm:ml-4 space-y-8 sm:space-y-10">
              {experiences?.organization?.map((item) => (
                <div key={item.id} className="relative group">
                  <div className="absolute -left-[23px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-midnight-900 border-2 border-neon group-hover:bg-neon transition-all" />
                  
                  <div className="glass-card rounded-2xl p-4 sm:p-6 border border-slate-800 hover:border-slate-700 transition-all duration-200">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                      <div className="flex items-start gap-3 min-w-0">
                        {item.image && (
                          <div 
                            onClick={() => setPreviewImage({ url: item.image, title: `${item.role} @ ${item.company}` })}
                            className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-slate-700 bg-midnight-950 shrink-0 cursor-pointer group/img relative"
                            title="Klik untuk memperbesar foto"
                          >
                            <img
                              src={item.image}
                              alt={item.company}
                              className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-300"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-midnight-950/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                              <ImageIcon className="w-3.5 h-3.5 text-neon" />
                            </div>
                          </div>
                        )}

                        <div className="min-w-0">
                          <h3 className="text-base sm:text-lg font-bold text-slate-100 group-hover:text-neon transition-colors leading-tight">
                            {item.role}
                          </h3>
                          <p className="text-xs sm:text-sm font-medium text-lemon mt-0.5">
                            {item.company}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 bg-midnight-950 px-2.5 py-1 rounded-md border border-slate-800 text-[11px] font-mono text-slate-300 self-start sm:self-auto shrink-0">
                        <Calendar className="w-3 h-3 text-neon" />
                        <span>{item.period}</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                      {item.description}
                    </p>

                    {item.achievements && (
                      <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                        <ul className="space-y-1">
                          {item.achievements.map((ach, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-neon shrink-0 mt-1.5" />
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Activities & Workshops */}
          {activeTab === 'activities' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {experiences?.activities?.map((item) => (
                <div key={item.id} className="glass-card rounded-2xl p-5 border border-slate-800 hover:border-neon/40 hover:shadow-neon transition-all duration-200 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-midnight-950 text-lemon border border-slate-800">
                        {item.type}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {item.period}
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      {item.image && (
                        <div 
                          onClick={() => setPreviewImage({ url: item.image, title: item.title })}
                          className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-slate-700 bg-midnight-950 shrink-0 cursor-pointer group/img relative"
                          title="Klik untuk memperbesar foto dokumentasi"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-300"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-midnight-950/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                            <ImageIcon className="w-3.5 h-3.5 text-neon" />
                          </div>
                        </div>
                      )}

                      <div className="min-w-0">
                        <h3 className="text-sm sm:text-base font-bold text-slate-100 leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Penyelenggara: <span className="text-slate-200 font-medium">{item.organizer}</span>
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed pt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

      {/* Lightbox Preview Modal for Experience Photos */}
      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight-950/90 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-2xl w-full glass-card rounded-2xl border border-slate-700 overflow-hidden bg-midnight-900 shadow-glass">
            <div className="flex items-center justify-between p-3.5 border-b border-slate-800 bg-midnight-850">
              <span className="text-xs font-bold text-slate-200 truncate pr-4">
                {previewImage.title}
              </span>
              <button
                onClick={() => setPreviewImage(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-3 max-h-[75vh] flex items-center justify-center bg-midnight-950">
              <img
                src={previewImage.url}
                alt={previewImage.title}
                className="max-h-[65vh] max-w-full object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

    </section>
  )
}
