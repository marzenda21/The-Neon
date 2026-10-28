import React, { useState } from 'react'
import { 
  Phone, 
  Mail, 
  Linkedin, 
  Github, 
  Download, 
  Copy, 
  Check, 
  ExternalLink, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  ArrowUpRight,
  FileText
} from 'lucide-react'

export default function ContactSection({ profile, onShowToast, onOpenAtsCv }) {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    const emailToCopy = profile?.email || 'raden.marzenda@example.com'
    navigator.clipboard.writeText(emailToCopy)
    setCopied(true)
    if (onShowToast) {
      onShowToast({
        type: 'success',
        title: 'Surel Berhasil Disalin!',
        message: `${emailToCopy} siap ditempelkan di klien email Anda.`
      })
    }
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <section id="kontak" className="py-20 bg-midnight-900 border-t border-slate-800/80 relative w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full overflow-hidden">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Hubungi Saya <span className="text-neon">Secara Langsung</span>
          </h2>
          <p className="mt-3 text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Untuk kenyamanan dan keamanan, komunikasi dapat dilakukan langsung melalui WhatsApp, Email resmi, atau LinkedIn tanpa perlu mengisi formulir web.
          </p>
        </div>

        {/* 2-Column HR-Friendly Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch max-w-5xl mx-auto w-full">
          
          {/* Kolom Kiri: WhatsApp & Email Utama */}
          <div className="lg:col-span-6 space-y-4 flex flex-col justify-between w-full">
            
            {/* WhatsApp Direct Card */}
            <div className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-800 hover:border-neon/50 hover:shadow-neon transition-all duration-300 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-neon/15 border border-neon/30 flex items-center justify-center text-neon">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-mono px-2.5 py-1 rounded-full bg-neon/10 text-neon border border-neon/30">
                    Respon Cepat
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-100 mb-1">
                  WhatsApp Direct
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  Saluran komunikasi tercepat untuk diskusi tawaran pekerjaan, jadwal interview HR, atau konsultasi proyek teknis.
                </p>

                <p className="text-sm font-mono font-semibold text-slate-200 mb-4 break-all">
                  {profile?.phone || "+62 812-3456-7890"}
                </p>
              </div>

              <a
                href={profile?.whatsappUrl || "https://wa.me/6281234567890"}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-neon text-midnight-950 font-bold text-xs sm:text-sm hover:bg-neon-hover transition-colors shadow-neon"
              >
                <span>Buka Chat WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Email Resmi Card */}
            <div className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-800 hover:border-lemon/50 hover:shadow-lemon transition-all duration-300 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-lemon/15 border border-lemon/30 flex items-center justify-center text-lemon">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-mono px-2.5 py-1 rounded-full bg-lemon/10 text-lemon border border-lemon/30">
                    Surel Kerja
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-100 mb-1">
                  Surel (Email) Resmi
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-3">
                  Cocok untuk pengiriman penawaran resmi (Offering Letter), dokumen NDA, atau undangan wawancara kerja.
                </p>

                <p className="text-xs sm:text-sm font-mono font-semibold text-lemon mb-4 truncate">
                  {profile?.email || "raden.marzenda@example.com"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`mailto:${profile?.email || 'raden.marzenda@example.com'}`}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-midnight-950 border border-slate-700 text-slate-200 hover:text-slate-100 hover:border-slate-500 font-semibold text-xs transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Kirim Email</span>
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-midnight-800 border border-slate-700 text-slate-200 hover:text-lemon hover:border-lemon font-semibold text-xs transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-neon" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Tersalin' : 'Salin Surel'}</span>
                </button>
              </div>
            </div>

          </div>

          {/* Kolom Kanan: LinkedIn, GitHub, CV ATS & Status Ketersediaan */}
          <div className="lg:col-span-6 space-y-4 flex flex-col justify-between w-full">
            
            {/* Download CV ATS Highlight Box */}
            <div className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-800 bg-midnight-850/90 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-neon/15 border border-neon/30 flex items-center justify-center text-neon shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-100">
                      Curriculum Vitae (Standar ATS)
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-400">
                      Format teruji lolos scanner ATS recruiter & siap cetak PDF
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenAtsCv}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-neon hover:text-midnight-950 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 hover:border-neon transition-all duration-200"
              >
                <Download className="w-4 h-4" />
                <span>Lihat & Download CV ATS (PDF)</span>
              </button>
            </div>

            {/* Social Grid (LinkedIn & GitHub) */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <a
                href={profile?.linkedinUrl || "https://linkedin.com"}
                target="_blank"
                rel="noreferrer"
                className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-800 hover:border-neon/40 hover:shadow-neon transition-all duration-200 flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between mb-2">
                  <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-slate-300 group-hover:text-neon transition-colors" />
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-neon transition-colors" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-100 group-hover:text-neon transition-colors">
                    LinkedIn
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">
                    Riwayat profesional
                  </p>
                </div>
              </a>

              <a
                href={profile?.githubUrl || "https://github.com"}
                target="_blank"
                rel="noreferrer"
                className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-800 hover:border-neon/40 hover:shadow-neon transition-all duration-200 flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between mb-2">
                  <Github className="w-5 h-5 sm:w-6 sm:h-6 text-slate-300 group-hover:text-neon transition-colors" />
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-neon transition-colors" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-100 group-hover:text-neon transition-colors">
                    GitHub
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">
                    Repositori kode
                  </p>
                </div>
              </a>
            </div>

            {/* Recruiter Quick Fact Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-midnight-950 border border-slate-800 space-y-2.5 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 text-[11px] sm:text-xs">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-neon" />
                  <span>Domisili:</span>
                </span>
                <span className="text-slate-200 font-semibold">{profile?.location || "Bandung / Jakarta"}</span>
              </div>

              <div className="flex items-center justify-between text-slate-400 text-[11px] sm:text-xs">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-neon" />
                  <span>Ketersediaan:</span>
                </span>
                <span className="text-neon font-semibold">Siap Bergabung Segera</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
