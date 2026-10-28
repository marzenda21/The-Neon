import React from 'react'
import { User, MapPin, Mail, Award, Code2, Cpu, CheckCircle2, ShieldCheck, Zap } from 'lucide-react'

export default function BiodataSection({ profile, skills }) {
  const highlights = [
    {
      title: "Rekayasa Web Modern",
      desc: "Membangun SPA responsif, arsitektur komponen modular, dan visualisasi data real-time dengan React & Vite.",
      icon: Code2
    },
    {
      title: "Integrasi IoT & Embedded",
      desc: "Menghubungkan mikrokontroler (ESP32/STM32) dengan protokol MQTT/Modbus langsung ke dashboard web.",
      icon: Cpu
    },
    {
      title: "Standar Kode Bersih",
      desc: "Menulis kode yang terstruktur, maintainable, dan siap dideploy ke lingkungan produksi cloud.",
      icon: CheckCircle2
    }
  ]

  return (
    <section id="biodata" className="py-20 bg-midnight-900 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Ringkasan Profil & <span className="text-neon">Keahlian Kunci</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Informasi esensial untuk mempermudah HR dan Engineering Lead mengevaluasi kesesuaian profil teknis saya.
          </p>
        </div>

        {/* 3 Pillar Value Highlights for HR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {highlights.map((item, idx) => {
            const Icon = item.icon
            return (
              <div 
                key={idx}
                className="glass-card rounded-2xl p-6 border border-slate-800 hover:border-slate-700 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-midnight-950 border border-slate-800 flex items-center justify-center text-neon mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            )
          })}
        </div>

        {/* 2-Column Detail: Data Diri Ringkas & Tech Stack Chips */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Kolom Kiri: Ringkasan Biodata Ringkas */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-lemon flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-neon" />
                <span>Data Pokok Pengembang</span>
              </h3>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-midnight-950 border border-slate-800/80">
                  <span className="text-slate-400">Nama Lengkap</span>
                  <span className="text-slate-200 font-semibold">{profile?.name}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-midnight-950 border border-slate-800/80">
                  <span className="text-slate-400">Pendidikan</span>
                  <span className="text-slate-200 font-semibold">Sarjana Komputer / Teknik</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-midnight-950 border border-slate-800/80">
                  <span className="text-slate-400">Domisili</span>
                  <span className="text-slate-200 font-semibold">{profile?.location}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-midnight-950 border border-slate-800/80">
                  <span className="text-slate-400">Ketersediaan Kerja</span>
                  <span className="text-neon font-semibold">Full-Time / Hybrid / Remote</span>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-xs text-slate-400 leading-relaxed">
                  Memiliki motivasi tinggi untuk terus belajar teknologi baru dan berkontribusi langsung pada kesuksesan produk perusahaan.
                </p>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Tech Stack Terorganisir Bersih */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-5">
              
              {/* Web Development Chips */}
              <div>
                <h4 className="text-xs font-mono uppercase text-lemon tracking-wider font-semibold mb-3 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-neon" />
                  <span>Web Frontend & Cloud Technologies</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skills?.web?.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-midnight-950 border border-slate-800 text-xs font-mono text-slate-200 hover:border-neon hover:text-neon transition-colors"
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* IoT & Embedded Chips */}
              <div className="pt-2 border-t border-slate-800/80">
                <h4 className="text-xs font-mono uppercase text-lemon tracking-wider font-semibold mb-3 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-neon" />
                  <span>Hardware IoT & Embedded Protocols</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skills?.iot?.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-midnight-950 border border-slate-800 text-xs font-mono text-slate-200 hover:border-neon hover:text-neon transition-colors"
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
