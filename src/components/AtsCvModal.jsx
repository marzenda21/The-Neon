import React, { useEffect, useState } from 'react'
import { X, Printer, Copy, Check, Download, FileText, Sparkles, ExternalLink, ArrowDownToLine } from 'lucide-react'

export default function AtsCvModal({ isOpen, onClose, data }) {
  const [copied, setCopied] = useState(false)

  const profile = data?.profile || {}
  const skills = data?.skills || {}
  const projects = data?.projects || []
  const experiences = data?.experiences || { work: [], organization: [], activities: [] }
  const educations = data?.educations || []
  const awards = data?.awards || []

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow || 'auto'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  // Helper untuk format teks list ke array
  const formatList = (items) => {
    if (!items) return []
    if (Array.isArray(items)) return items
    return String(items).split('\n').map(s => s.trim()).filter(Boolean)
  }

  // Helper untuk format skills
  const formatSkills = (skillList) => {
    if (!skillList) return ''
    if (Array.isArray(skillList)) {
      return skillList.map(s => (typeof s === 'string' ? s : s?.name)).filter(Boolean).join(', ')
    }
    return String(skillList)
  }

  // Trigger Print to PDF menggunakan isolated iframe (Anti Blank / Anti Halaman Kosong)
  const handlePrint = () => {
    const cvElement = document.getElementById('ats-cv-document')
    if (!cvElement) return

    // Buat iframe terisolasi agar tidak terpengaruh overflow-hidden atau dark mode website
    const iframe = document.createElement('iframe')
    iframe.style.position = 'fixed'
    iframe.style.right = '0'
    iframe.style.bottom = '0'
    iframe.style.width = '0'
    iframe.style.height = '0'
    iframe.style.border = '0'
    document.body.appendChild(iframe)

    const doc = iframe.contentWindow.document
    doc.open()
    doc.write(`
      <!DOCTYPE html>
      <html lang="id">
        <head>
          <meta charset="utf-8">
          <title>${profile.name || 'CV_ATS'} - Curriculum Vitae</title>
          <style>
            @page {
              size: A4;
              margin: 12mm 15mm;
            }
            *, *::before, *::after {
              box-sizing: border-box;
            }
            body {
              font-family: Arial, Helvetica, "Plus Jakarta Sans", sans-serif;
              color: #111827;
              background: #ffffff;
              margin: 0;
              padding: 0;
              font-size: 10.5pt;
              line-height: 1.4;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            h1 {
              font-size: 19pt;
              margin: 0 0 2pt 0;
              text-transform: uppercase;
              font-weight: bold;
              color: #111827;
            }
            .header-subtitle {
              font-size: 11pt;
              font-weight: 600;
              color: #374151;
              margin-bottom: 4pt;
            }
            .contact-line {
              font-size: 9pt;
              color: #4b5563;
              border-top: 1px solid #d1d5db;
              border-bottom: 1.5px solid #111827;
              padding: 4pt 0;
              margin-bottom: 10pt;
              display: flex;
              flex-wrap: wrap;
              gap: 8pt;
            }
            h2 {
              font-size: 11pt;
              text-transform: uppercase;
              border-bottom: 1.5px solid #1f2937;
              margin: 10pt 0 4pt 0;
              padding-bottom: 2pt;
              font-weight: bold;
              letter-spacing: 0.5px;
              color: #111827;
            }
            p {
              margin: 2.5pt 0;
            }
            .item-row {
              margin-bottom: 6pt;
              page-break-inside: avoid;
            }
            .item-header {
              display: flex;
              justify-content: space-between;
              font-weight: bold;
              color: #111827;
            }
            .item-sub {
              display: flex;
              justify-content: space-between;
              font-style: italic;
              color: #374151;
              font-size: 9.5pt;
              margin-bottom: 2pt;
            }
            .date-badge {
              font-family: monospace;
              font-weight: normal;
              font-size: 9pt;
              color: #4b5563;
            }
            ul {
              margin: 2pt 0 4pt 16pt;
              padding: 0;
            }
            li {
              margin-bottom: 2pt;
            }
          </style>
        </head>
        <body>
          ${cvElement.innerHTML}
        </body>
      </html>
    `)
    doc.close()

    iframe.contentWindow.focus()
    setTimeout(() => {
      iframe.contentWindow.print()
      setTimeout(() => {
        document.body.removeChild(iframe)
      }, 1500)
    }, 400)
  }

  // Unduh Berkas CV (.html standalone ATS format)
  const handleDownloadFile = () => {
    const cvElement = document.getElementById('ats-cv-document')
    if (!cvElement) return

    const htmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <title>${profile.name || 'CV_ATS'} - Curriculum Vitae</title>
  <style>
    body {
      font-family: Arial, Helvetica, sans-serif;
      color: #111827;
      background: #ffffff;
      max-width: 800px;
      margin: 20px auto;
      padding: 24px;
      font-size: 11pt;
      line-height: 1.45;
    }
    h1 { font-size: 20pt; margin: 0 0 2pt 0; text-transform: uppercase; font-weight: bold; }
    h2 { font-size: 11pt; text-transform: uppercase; border-bottom: 1.5px solid #111827; margin: 12pt 0 4pt 0; padding-bottom: 2pt; font-weight: bold; }
    .contact-line { font-size: 9.5pt; color: #4b5563; border-top: 1px solid #d1d5db; border-bottom: 1.5px solid #111827; padding: 4pt 0; margin-bottom: 10pt; }
    ul { margin: 2pt 0 4pt 16pt; padding: 0; }
    li { margin-bottom: 2pt; }
  </style>
</head>
<body>
  ${cvElement.innerHTML}
</body>
</html>`

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `CV_ATS_${(profile.name || 'Marzenda').replace(/[^a-zA-Z0-9]/g, '_')}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Copy Plain Text ATS Resume to Clipboard
  const handleCopyText = () => {
    let plainText = `${profile.name || 'Raden Marzenda'}\n`
    plainText += `${profile.title || 'Full-Stack Web Developer & IoT Systems Engineer'}\n`
    plainText += `${profile.email || ''} | ${profile.phone || ''} | ${profile.location || ''}\n`
    if (profile.linkedinUrl) plainText += `LinkedIn: ${profile.linkedinUrl}\n`
    if (profile.githubUrl) plainText += `GitHub: ${profile.githubUrl}\n`
    plainText += `\n`

    plainText += `==================================================\n`
    plainText += `PROFESSIONAL SUMMARY\n`
    plainText += `==================================================\n`
    plainText += `${profile.summary || ''}\n\n`

    plainText += `==================================================\n`
    plainText += `TECHNICAL COMPETENCIES\n`
    plainText += `==================================================\n`
    plainText += `* Web & Cloud: ${formatSkills(skills.web)}\n`
    plainText += `* IoT & Embedded: ${formatSkills(skills.iot)}\n`
    if (skills.softSkills) {
      plainText += `* Methodologies: ${formatSkills(skills.softSkills)}\n`
    }
    plainText += `\n`

    plainText += `==================================================\n`
    plainText += `PROFESSIONAL EXPERIENCE\n`
    plainText += `==================================================\n`
    experiences.work?.forEach(w => {
      plainText += `${w.role || w.title} - ${w.company || w.organizer} (${w.period || ''})\n`
      if (w.location) plainText += `Lokasi: ${w.location}\n`
      if (w.description) plainText += `${w.description}\n`
      formatList(w.achievements).forEach(ach => {
        plainText += `  * ${ach}\n`
      })
      plainText += `\n`
    })

    if (experiences.organization && experiences.organization.length > 0) {
      plainText += `==================================================\n`
      plainText += `ORGANIZATIONAL EXPERIENCE\n`
      plainText += `==================================================\n`
      experiences.organization.forEach(o => {
        plainText += `${o.role || o.title} - ${o.company || o.organizer} (${o.period || ''})\n`
        if (o.description) plainText += `${o.description}\n`
        formatList(o.achievements).forEach(ach => {
          plainText += `  * ${ach}\n`
        })
        plainText += `\n`
      })
    }

    plainText += `==================================================\n`
    plainText += `KEY FEATURED PROJECTS\n`
    plainText += `==================================================\n`
    projects.slice(0, 4).forEach(p => {
      plainText += `${p.title} [${p.badge || p.category || 'Tech'}]\n`
      plainText += `${p.summary || ''}\n`
      if (p.techStack) plainText += `Stack: ${formatSkills(p.techStack)}\n`
      plainText += `\n`
    })

    plainText += `==================================================\n`
    plainText += `EDUCATION & CERTIFICATIONS\n`
    plainText += `==================================================\n`
    educations.filter(e => !e.credentialId).forEach(e => {
      plainText += `${e.degree} - ${e.institution} (${e.period || ''})\n`
      if (e.gpa) plainText += `Nilai/GPA: ${e.gpa}\n`
      if (e.thesis) plainText += `Tugas Akhir: ${e.thesis}\n`
      plainText += `\n`
    })
    educations.filter(e => e.credentialId).forEach(c => {
      plainText += `* ${c.degree} - ${c.institution} (${c.period || ''}) [ID: ${c.credentialId}]\n`
    })

    if (awards && awards.length > 0) {
      plainText += `\n==================================================\n`
      plainText += `HONORS & AWARDS\n`
      plainText += `==================================================\n`
      awards.forEach(a => {
        plainText += `* ${a.title} (${a.rank || 'Honors'}) - ${a.issuer} [${a.year || ''}]\n`
      })
    }

    navigator.clipboard.writeText(plainText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-midnight-950/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-glass overflow-hidden my-4 sm:my-8 flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Control Bar (Hidden when printing) */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 bg-midnight-850 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-neon/15 text-neon border border-neon/30">
              <FileText className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-100 flex items-center gap-2">
                <span>Curriculum Vitae (Standar Format ATS)</span>
                <span className="hidden sm:inline-block px-2 py-0.2 rounded-full text-[10px] font-mono bg-neon/15 text-neon border border-neon/30">
                  Data Terverifikasi
                </span>
              </h3>
              <p className="text-[10px] text-slate-400 font-mono">
                Sinkron langsung dengan data profil & proyek terkini
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Tombol Cetak Langsung / Simpan PDF via Isolated Print */}
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl bg-neon text-midnight-950 font-bold text-xs hover:bg-neon-hover transition-colors shadow-neon"
              title="Cetak langsung atau simpan sebagai PDF A4 bersih"
            >
              <Printer className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Cetak / Unduh PDF</span>
            </button>

            {/* Tombol Unduh File Standalone */}
            <button
              onClick={handleDownloadFile}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-midnight-800 border border-slate-700 text-slate-200 hover:text-neon text-xs font-semibold transition-colors"
              title="Unduh berkas CV berformat dokumen"
            >
              <ArrowDownToLine className="w-3.5 h-3.5" />
              <span>Unduh File</span>
            </button>

            {/* Tombol Salin Teks */}
            <button
              onClick={handleCopyText}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-midnight-800 border border-slate-700 text-slate-200 hover:text-lemon text-xs font-semibold transition-colors"
              title="Salin isi teks ATS ke clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-neon" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin' : 'Salin Teks'}</span>
            </button>

            {/* Tombol Tutup */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
              aria-label="Tutup Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Container for Screen View */}
        <div className="overflow-y-auto p-4 sm:p-8 bg-slate-950/60 flex justify-center">
          
          {/* THE ACTUAL ATS RESUME DOCUMENT */}
          <div 
            id="ats-cv-document"
            className="w-full max-w-[800px] bg-white text-gray-900 p-6 sm:p-10 rounded-xl shadow-lg font-sans text-xs sm:text-[13px] leading-relaxed space-y-5"
            style={{ fontFamily: 'Arial, Helvetica, "Plus Jakarta Sans", sans-serif' }}
          >
            {/* Header: Name & Contact Details */}
            <div className="border-b border-gray-300 pb-3 text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 uppercase">
                {profile.name || "Raden Marzenda"}
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-gray-700 mt-0.5">
                {profile.title || "Full-Stack Web Developer & IoT Systems Engineer"}
              </p>

              <div className="contact-line flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 text-[11px] text-gray-600 font-mono mt-2 pt-1 border-t border-gray-200">
                {profile.email && <span>{profile.email}</span>}
                {profile.phone && (
                  <>
                    <span>•</span>
                    <span>{profile.phone}</span>
                  </>
                )}
                {profile.location && (
                  <>
                    <span>•</span>
                    <span>{profile.location}</span>
                  </>
                )}
                {profile.linkedinUrl && (
                  <>
                    <span>•</span>
                    <span className="text-blue-700">LinkedIn: {profile.linkedinUrl.replace('https://', '')}</span>
                  </>
                )}
                {profile.githubUrl && (
                  <>
                    <span>•</span>
                    <span className="text-gray-800">GitHub: {profile.githubUrl.replace('https://', '')}</span>
                  </>
                )}
              </div>
            </div>

            {/* Section 1: Professional Summary */}
            {profile.summary && (
              <div className="space-y-1.5">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-0.5">
                  Professional Summary
                </h2>
                <p className="text-gray-800 text-justify leading-relaxed">
                  {profile.summary}
                </p>
              </div>
            )}

            {/* Section 2: Core Technical Skills */}
            <div className="space-y-1.5">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-0.5">
                Technical Competencies
              </h2>
              <div className="space-y-1 text-gray-800">
                <div>
                  <span className="font-semibold text-gray-900">Web & Cloud Technologies: </span>
                  <span>{formatSkills(skills.web) || "React 18, Vite, Next.js, Tailwind CSS, TypeScript, Firebase, REST APIs, WebSocket"}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Embedded Systems & Hardware: </span>
                  <span>{formatSkills(skills.iot) || "ESP32, STM32 (ARM Cortex), FreeRTOS, MQTT, Modbus RS-485, C/C++ Embedded, KiCad"}</span>
                </div>
                {skills.softSkills && (
                  <div>
                    <span className="font-semibold text-gray-900">Engineering Methodologies: </span>
                    <span>{formatSkills(skills.softSkills)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Section 3: Professional Work Experience */}
            {experiences.work && experiences.work.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-0.5">
                  Professional Experience
                </h2>
                {experiences.work.map((exp, idx) => (
                  <div key={idx} className="item-row space-y-1">
                    <div className="item-header flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-gray-900">
                      <span className="text-xs sm:text-sm">{exp.role || exp.title}</span>
                      <span className="date-badge text-[11px] font-mono font-medium text-gray-600">{exp.period}</span>
                    </div>
                    <div className="item-sub flex items-center justify-between text-xs font-semibold text-gray-700 italic">
                      <span>{exp.company || exp.organizer}</span>
                      {exp.location && <span className="font-normal text-gray-500">{exp.location}</span>}
                    </div>
                    {exp.description && (
                      <p className="text-gray-800 leading-relaxed text-justify">
                        {exp.description}
                      </p>
                    )}
                    {formatList(exp.achievements).length > 0 && (
                      <ul className="list-disc list-outside ml-4 space-y-0.5 text-gray-800 pt-0.5">
                        {formatList(exp.achievements).map((ach, aIdx) => (
                          <li key={aIdx} className="leading-relaxed">
                            {ach}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Section 3b: Organizational Experience (Jika Ada) */}
            {experiences.organization && experiences.organization.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-0.5">
                  Organizational & Leadership Experience
                </h2>
                {experiences.organization.map((exp, idx) => (
                  <div key={idx} className="item-row space-y-1">
                    <div className="item-header flex flex-col sm:flex-row sm:items-baseline justify-between font-bold text-gray-900">
                      <span className="text-xs sm:text-sm">{exp.role || exp.title}</span>
                      <span className="date-badge text-[11px] font-mono font-medium text-gray-600">{exp.period}</span>
                    </div>
                    <div className="item-sub flex items-center justify-between text-xs font-semibold text-gray-700 italic">
                      <span>{exp.company || exp.organizer}</span>
                    </div>
                    {exp.description && (
                      <p className="text-gray-800 leading-relaxed text-justify">
                        {exp.description}
                      </p>
                    )}
                    {formatList(exp.achievements).length > 0 && (
                      <ul className="list-disc list-outside ml-4 space-y-0.5 text-gray-800 pt-0.5">
                        {formatList(exp.achievements).map((ach, aIdx) => (
                          <li key={aIdx} className="leading-relaxed">
                            {ach}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Section 4: Key Featured Projects */}
            {projects && projects.length > 0 && (
              <div className="space-y-2">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-0.5">
                  Key Engineering Projects
                </h2>
                <div className="space-y-2.5">
                  {projects.slice(0, 4).map((proj, idx) => (
                    <div key={idx} className="item-row space-y-0.5">
                      <div className="item-header flex items-baseline justify-between font-bold text-gray-900">
                        <span>{proj.title}</span>
                        <span className="date-badge text-[11px] font-mono font-normal text-gray-600">[{proj.badge || proj.category}]</span>
                      </div>
                      <p className="text-gray-800 leading-relaxed">
                        {proj.summary}
                      </p>
                      {proj.techStack && (
                        <div className="text-[11px] text-gray-600">
                          <span className="font-semibold text-gray-800">Stack: </span>
                          <span>{formatSkills(proj.techStack)}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 5: Education & Certifications */}
            {educations && educations.length > 0 && (
              <div className="space-y-2">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-0.5">
                  Education & Certifications
                </h2>
                {/* Formal Education */}
                {educations.filter(e => !e.credentialId).map((edu, idx) => (
                  <div key={idx} className="item-row space-y-0.5">
                    <div className="item-header flex items-baseline justify-between font-bold text-gray-900">
                      <span>{edu.degree}</span>
                      <span className="date-badge text-[11px] font-mono font-medium text-gray-600">{edu.period}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-700">
                      <span className="font-semibold">{edu.institution}</span>
                      {edu.gpa && <span className="font-mono">{edu.gpa}</span>}
                    </div>
                    {edu.thesis && (
                      <p className="text-[11px] text-gray-600 italic">
                        {edu.thesis}
                      </p>
                    )}
                  </div>
                ))}

                {/* Certifications */}
                {educations.some(e => e.credentialId) && (
                  <div className="pt-1 space-y-1">
                    <span className="text-[11px] font-bold uppercase text-gray-700 block">
                      Professional Certifications:
                    </span>
                    {educations.filter(e => e.credentialId).map((cert, idx) => (
                      <div key={idx} className="flex items-baseline justify-between text-[11px] text-gray-800">
                        <span>• <strong>{cert.degree}</strong> — {cert.institution}</span>
                        <span className="date-badge font-mono text-gray-500">ID: {cert.credentialId} ({cert.period})</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Section 6: Honors & Awards */}
            {awards && awards.length > 0 && (
              <div className="space-y-1.5">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-0.5">
                  Honors & Awards
                </h2>
                <div className="space-y-1 text-gray-800 text-[11px]">
                  {awards.map((aw, idx) => (
                    <div key={idx} className="flex items-baseline justify-between">
                      <span>• <strong>{aw.title}</strong> ({aw.rank || 'Honor'}) — {aw.issuer}</span>
                      <span className="date-badge font-mono text-gray-500">{aw.year}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  )
}
