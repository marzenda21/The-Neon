import React, { useState } from 'react'
import { GraduationCap, Award, CheckCircle2, BookOpen, ExternalLink, Image as ImageIcon, X } from 'lucide-react'

export default function EducationSection({ educations }) {
  const [previewImage, setPreviewImage] = useState(null)

  return (
    <section id="pendidikan" className="py-20 bg-midnight-900 border-t border-slate-800/80 relative w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full overflow-hidden">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Pendidikan Formal & <span className="text-neon">Sertifikasi Teknis</span>
          </h2>
          <p className="mt-3 text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Fondasi teori komputasi yang kokoh dipadukan dengan pembaruan lisensi industri secara berkesinambungan.
          </p>
        </div>

        {/* Dual Layout: Formal Education & Certifications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Kolom Kiri: Riwayat Pendidikan Formal */}
          <div className="lg:col-span-6 space-y-4 w-full">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2 mb-4">
              <GraduationCap className="w-5 h-5 text-neon" />
              <span>Pendidikan Formal</span>
            </h3>

            {educations?.filter(e => !e.credentialId)?.map((edu) => (
              <div
                key={edu.id}
                className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-800 hover:border-slate-700 transition-all duration-200 space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    {edu.image && (
                      <div 
                        onClick={() => setPreviewImage({ url: edu.image, title: `${edu.degree} - ${edu.institution}` })}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-slate-700 bg-midnight-950 shrink-0 cursor-pointer group/img relative"
                        title="Klik untuk memperbesar foto kampus/ijazah"
                      >
                        <img
                          src={edu.image}
                          alt={edu.institution}
                          className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-midnight-950/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                          <ImageIcon className="w-3.5 h-3.5 text-neon" />
                        </div>
                      </div>
                    )}

                    <div className="min-w-0">
                      <h4 className="text-sm sm:text-base font-bold text-slate-100 leading-tight">
                        {edu.degree}
                      </h4>
                      <p className="text-xs sm:text-sm font-medium text-lemon mt-0.5">
                        {edu.institution}
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-midnight-950 text-slate-300 border border-slate-800 shrink-0">
                    {edu.period}
                  </span>
                </div>

                {edu.gpa && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neon/10 border border-neon/30 text-xs font-mono text-neon">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{edu.gpa}</span>
                  </div>
                )}

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {edu.description}
                </p>

                {edu.thesis && (
                  <div className="p-3 rounded-xl bg-midnight-950 border border-slate-800/90 text-xs font-mono text-slate-300">
                    <span className="text-lemon font-semibold">Tesis / Skripsi: </span>
                    <span className="text-slate-400">{edu.thesis}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Kolom Kanan: Sertifikasi & Lisensi */}
          <div className="lg:col-span-6 space-y-4 w-full">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-lemon" />
              <span>Sertifikasi Profesional & Pelatihan</span>
            </h3>

            {educations?.filter(e => e.credentialId)?.map((cert) => (
              <div
                key={cert.id}
                className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-800 hover:border-neon/40 hover:shadow-neon transition-all duration-200 space-y-3 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    {cert.image && (
                      <div 
                        onClick={() => setPreviewImage({ url: cert.image, title: `${cert.degree} - ${cert.institution}` })}
                        className="w-14 h-14 sm:w-18 sm:h-18 rounded-xl overflow-hidden border border-slate-700 bg-midnight-950 shrink-0 cursor-pointer group/img relative"
                        title="Klik untuk melihat bukti sertifikat"
                      >
                        <img
                          src={cert.image}
                          alt={cert.degree}
                          className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-midnight-950/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                          <ImageIcon className="w-3.5 h-3.5 text-neon" />
                        </div>
                      </div>
                    )}

                    <div className="min-w-0">
                      <h4 className="text-sm sm:text-base font-bold text-slate-100 group-hover:text-neon transition-colors leading-tight">
                        {cert.degree}
                      </h4>
                      <p className="text-xs font-medium text-slate-400 mt-0.5">
                        Penerbit: <span className="text-slate-200">{cert.institution}</span>
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded bg-midnight-950 text-lemon border border-slate-800 shrink-0">
                    {cert.period}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {cert.description}
                </p>

                {cert.credentialId && (
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] font-mono">
                    <span className="text-slate-500 truncate max-w-[180px] sm:max-w-none">ID: {cert.credentialId}</span>
                    <span className="text-neon flex items-center gap-1 font-semibold shrink-0">
                      <span>Verified</span>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Lightbox Preview Modal for Certificate / Education Photos */}
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
