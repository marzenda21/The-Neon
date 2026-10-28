import React, { useState } from 'react'
import { Download, Send, ArrowRight, Github, Linkedin, Mail, Phone, FileText } from 'lucide-react'

export default function HeroSection({ profile, onOpenAtsCv }) {
  // Support local profile image with graceful fallback
  const [imgSrc, setImgSrc] = useState(profile?.avatarUrl || '/images/profile.png')

  const handleImageError = () => {
    // If local image fails to load, fallback to high-res developer portrait
    setImgSrc('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80')
  }

  return (
    <section id="beranda" className="relative pt-24 pb-14 md:pt-32 md:pb-20 overflow-hidden w-full max-w-full bg-tech-grid">
      {/* Ambient Neon Glow Backdrops - strictly contained to avoid horizontal scroll on mobile */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-neon/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Kolom Kiri: Informasi Inti Ramah HR (Clean, Clear, High-Impact) */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left order-2 lg:order-1">
            
            {/* Status Ketersediaan Kerja (HR Quick Check) */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-midnight-850/90 border border-slate-800 text-xs font-mono">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon shadow-[0_0_8px_#39FF14]"></span>
              </span>
              <span className="text-slate-300 font-medium">Status:</span>
              <span className="text-neon font-semibold">{profile?.status || "Open to Work / Freelance"}</span>
            </div>

            {/* Headline Sederhana & Tegas */}
            <div className="space-y-1.5">
              <p className="text-slate-300 text-base sm:text-lg font-medium flex items-center justify-center lg:justify-start gap-2">
                <span>Halo</span>
                <span className="text-xl animate-bounce">👋</span>
                <span>, Saya</span>
              </p>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-100 leading-[1.1] break-words">
                {profile?.name || "Raden Marzenda"}
              </h1>

              <p className="text-sm sm:text-lg font-semibold text-lemon tracking-tight pt-1">
                {profile?.title || "Full-Stack Web Developer & IoT Systems Engineer"}
              </p>
            </div>

            {/* Ringkasan Eksekutif Ringkas */}
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto lg:mx-0">
              {profile?.summary || "Praktisi teknologi yang berfokus membangun aplikasi web modern (React & Vite) yang cepat serta mengintegrasikan sistem perangkat keras cerdas berbasis IoT (ESP32/STM32) yang andal dan terukur."}
            </p>

            {/* Tombol Aksi Utama (Download CV ATS & Kontak Cepat) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              {/* Tombol Download CV ATS Dinamis */}
              <button
                type="button"
                onClick={onOpenAtsCv}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-neon text-midnight-950 font-bold text-xs sm:text-sm hover:bg-neon-hover transition-all duration-200 shadow-neon hover:scale-[1.02] active:scale-[0.98]"
              >
                <FileText className="w-4 h-4 stroke-[2.5]" />
                <span>Download CV (ATS PDF)</span>
              </button>

              {/* Tombol Hubungi Saya via WhatsApp */}
              <a
                href={profile?.whatsappUrl || "#kontak"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass-card text-slate-200 font-semibold text-xs sm:text-sm hover:border-neon hover:text-neon transition-all duration-200"
              >
                <span>Hubungi Saya</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Social Media & Direct Channels */}
            <div className="flex items-center justify-center lg:justify-start gap-3 pt-2 text-slate-400">
              <span className="text-[11px] font-mono text-slate-500 uppercase">Kontak:</span>
              <a 
                href={profile?.whatsappUrl || "#"} 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded-lg bg-midnight-850 border border-slate-800 hover:border-neon hover:text-neon transition-colors"
                title="WhatsApp Direct"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a 
                href={profile?.linkedinUrl || "https://linkedin.com"} 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded-lg bg-midnight-850 border border-slate-800 hover:border-neon hover:text-neon transition-colors"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href={profile?.githubUrl || "https://github.com"} 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded-lg bg-midnight-850 border border-slate-800 hover:border-neon hover:text-neon transition-colors"
                title="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href={`mailto:${profile?.email || 'raden.marzenda@example.com'}`}
                className="p-2 rounded-lg bg-midnight-850 border border-slate-800 hover:border-lemon hover:text-lemon transition-colors"
                title="Kirim Email Langsung"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Kolom Kanan: Foto Lingkaran Sempurna dengan Efek Orbit Lingkaran di Belakangnya */}
          <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2 py-4">
            <div className="relative flex items-center justify-center p-4 max-w-full">
              
              {/* Efek 1: Cincin Orbit Berputar (Concentric Dashed Ring) */}
              <div className="absolute w-[124%] h-[124%] rounded-full border-2 border-dashed border-neon/30 animate-[spin_25s_linear_infinite] pointer-events-none" />

              {/* Efek 2: Cincin Neon Glowing Berkedip (Pulse Ring) */}
              <div className="absolute w-[112%] h-[112%] rounded-full border border-neon/60 shadow-[0_0_25px_rgba(57,255,20,0.35)] animate-pulse-slow pointer-events-none" />

              {/* Efek 3: Radial Glow Lembut di Belakang Lingkaran */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-neon/30 via-emerald-400/20 to-transparent blur-2xl pointer-events-none" />

              {/* Foto Profil Lingkaran Utama */}
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-neon shadow-neon-lg bg-midnight-950 p-1 group z-10 shrink-0">
                <img
                  src={imgSrc}
                  alt={profile?.name || "Foto Profil"}
                  onError={handleImageError}
                  className="w-full h-full object-cover object-top rounded-full group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                />
              </div>

              {/* Badge Satelit Mengorbit di Bagian Bawah Lingkaran */}
              <div className="absolute -bottom-2 sm:-bottom-3 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-midnight-900/95 border border-neon/60 text-[10px] sm:text-xs font-mono text-neon backdrop-blur-md shadow-neon-pill">
                  <span className="w-2 h-2 rounded-full bg-neon animate-ping" />
                  <span>{profile?.nickname || 'Marzenda'} • Web & IoT</span>
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
