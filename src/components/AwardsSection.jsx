import React, { useState } from 'react'
import { Trophy, Award, Medal, Sparkles, CheckCircle2, Image as ImageIcon, X } from 'lucide-react'

export default function AwardsSection({ awards }) {
  const [previewImage, setPreviewImage] = useState(null)

  return (
    <section id="prestasi" className="py-20 bg-midnight-900 border-t border-slate-800/80 relative w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full overflow-hidden">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-midnight-850 border border-slate-800 text-xs font-mono text-lemon mb-3">
            <Trophy className="w-3.5 h-3.5 text-neon" />
            <span>PENGHARGAAN & REKOGNISI</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Prestasi Kompetisi & <span className="text-neon">Gelar Kehormatan</span>
          </h2>
          <p className="mt-3 text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Pengakuan atas inovasi prototipe IoT, keunggulan perancangan perangkat lunak, dan capaian kompetisi teknologi.
          </p>
        </div>

        {/* Awards Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {awards?.map((award) => (
            <div
              key={award.id}
              className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-800 hover:border-lemon/50 hover:shadow-lemon transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Gambar Dokumentasi / Piagam Penghargaan */}
                {award.image && (
                  <div 
                    onClick={() => setPreviewImage({ url: award.image, title: `${award.title} (${award.year})` })}
                    className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-700/80 bg-midnight-950 mb-4 cursor-pointer group/img"
                    title="Klik untuk memperbesar foto penghargaan"
                  >
                    <img
                      src={award.image}
                      alt={award.title}
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500 opacity-90 group-hover/img:opacity-100"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/70 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-midnight-950/30 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                      <span className="p-2 rounded-xl bg-midnight-900/90 text-neon border border-neon/40 text-xs flex items-center gap-1.5 shadow-neon">
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>Lihat Foto</span>
                      </span>
                    </div>
                  </div>
                )}

                {/* Top Badge & Year */}
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-midnight-950 border border-slate-800 group-hover:border-lemon flex items-center justify-center text-lemon transition-colors">
                    <Trophy className="w-4 h-4 text-neon" />
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-midnight-950 text-slate-300 border border-slate-800">
                    {award.year}
                  </span>
                </div>

                <div className="inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-neon/15 text-neon border border-neon/30 mb-2 font-semibold">
                  {award.rank}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-100 group-hover:text-lemon transition-colors leading-snug">
                  {award.title}
                </h3>

                <p className="text-xs text-slate-400 mt-1 mb-3">
                  Penyelenggara: <span className="text-slate-200 font-medium">{award.issuer}</span>
                </p>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {award.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] font-mono text-lemon">
                <Sparkles className="w-3.5 h-3.5 text-neon" />
                <span>Verified Competition Honor</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Preview Modal for Award / Certificate Photos */}
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
                className="max-h-[65vh] max-w-full object-contain rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      )}

    </section>
  )
}
