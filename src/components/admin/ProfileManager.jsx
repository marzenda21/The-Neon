import React, { useState, useEffect } from 'react'
import { 
  User, 
  Upload, 
  Check, 
  Loader2, 
  MapPin, 
  Mail, 
  Phone, 
  Linkedin, 
  Github, 
  FileText,
  Activity,
  Sparkles
} from 'lucide-react'
import { compressImageToBase64 } from '../../utils/imageCompressor'
import { createFirestoreDocument } from '../../services/firebase'

export default function ProfileManager({ profile, onDataChanged, onShowToast }) {
  const [formData, setFormData] = useState({
    name: profile?.name || 'Raden Marzenda',
    nickname: profile?.nickname || 'Marzenda',
    title: profile?.title || 'Full-Stack Web Developer & IoT Systems Engineer',
    tagline: profile?.tagline || 'Bridging Modern Web Ecosystems & Embedded Hardware Intelligence',
    status: profile?.status || 'Open to Work / Freelance',
    summary: profile?.summary || '',
    location: profile?.location || 'Bandung & Jakarta, Indonesia',
    email: profile?.email || 'raden.marzenda@example.com',
    phone: profile?.phone || '+62 812-3456-7890',
    whatsappUrl: profile?.whatsappUrl || '',
    githubUrl: profile?.githubUrl || '',
    linkedinUrl: profile?.linkedinUrl || '',
    resumeUrl: profile?.resumeUrl || '#',
    avatarUrl: profile?.avatarUrl || ''
  })

  useEffect(() => {
    if (profile) {
      setFormData(prev => ({
        ...prev,
        ...profile
      }))
    }
  }, [profile])

  const [saving, setSaving] = useState(false)
  const [compressing, setCompressing] = useState(false)
  const [avatarSizeKb, setAvatarSizeKb] = useState(null)

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setCompressing(true)
    try {
      // Kompres foto profil ke max 600x600 px
      const result = await compressImageToBase64(file, 600, 600, 0.8)
      setFormData(prev => ({ ...prev, avatarUrl: result.base64 }))
      setAvatarSizeKb(result.sizeKb)
      onShowToast({
        type: 'success',
        title: 'Foto Profil Berhasil Dikompres!',
        message: `Ukuran foto profil dioptimalkan menjadi ${result.sizeKb} KB (Siap disimpan ke Firestore).`
      })
    } catch (err) {
      onShowToast({
        type: 'error',
        title: 'Gagal Memproses Foto',
        message: err.message
      })
    } finally {
      setCompressing(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      // Simpan sebagai dokumen 'main' di koleksi 'profile'
      await createFirestoreDocument('profile', formData, 'main')
      onShowToast({
        type: 'success',
        title: 'Profil Berhasil Disimpan',
        message: 'Informasi biodata & foto telah diperbarui langsung di Cloud Firestore.'
      })
      if (onDataChanged) onDataChanged()
    } catch (err) {
      onShowToast({
        type: 'error',
        title: 'Gagal Menyimpan Profil',
        message: err.message
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-midnight-850 p-4 rounded-2xl border border-slate-800">
        <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
          <User className="w-5 h-5 text-neon" />
          <span>Pengaturan Biodata & Profil Utama</span>
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Perubahan pada bagian ini akan langsung tersinkronisasi ke Hero Section, Navbar, Biodata, dan Footer website.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="glass-card rounded-2xl border border-slate-800 p-6 space-y-6">
        
        {/* Foto Profil Avatar Upload */}
        <div className="p-4 rounded-xl bg-midnight-950 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono text-lemon font-semibold flex items-center gap-1.5">
              <Upload className="w-3.5 h-3.5 text-neon" />
              <span>Foto Profil Diri (Kompresi Otomatis ke Base64)</span>
            </label>
            {avatarSizeKb && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neon/15 text-neon border border-neon/30">
                Ukuran: {avatarSizeKb} KB
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-neon p-0.5 shadow-neon shrink-0 bg-midnight-900">
              <img
                src={formData.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                alt="Avatar Preview"
                className="w-full h-full object-cover rounded-[14px]"
              />
            </div>

            <div className="space-y-2 flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                disabled={compressing}
                className="text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-midnight-800 file:text-neon hover:file:bg-midnight-700 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Pilih foto Anda (format JPG/PNG). Sistem akan otomatis memperkecil ukuran ke rasio optimal & menyimpannya ke database.
              </p>
            </div>
          </div>
        </div>

        {/* Identitas Pokok */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-mono text-slate-300 mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
              required
              className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-neon"
            />
          </div>

          <div>
            <label className="block font-mono text-slate-300 mb-1">
              Nama Panggilan / Brand
            </label>
            <input
              type="text"
              value={formData.nickname}
              onChange={(e) => setFormData(p => ({ ...p, nickname: e.target.value }))}
              className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-neon"
            />
          </div>

          <div>
            <label className="block font-mono text-slate-300 mb-1">
              Headline Peran / Jabatan
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(p => ({ ...p, title: e.target.value }))}
              className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-neon"
            />
          </div>

          <div>
            <label className="block font-mono text-slate-300 mb-1">
              Status Ketersediaan
            </label>
            <input
              type="text"
              value={formData.status}
              onChange={(e) => setFormData(p => ({ ...p, status: e.target.value }))}
              placeholder="e.g. Open to Work / Freelance"
              className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-neon"
            />
          </div>
        </div>

        {/* Ringkasan & Tagline */}
        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-mono text-slate-300 mb-1">
              Tagline Singkat
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData(p => ({ ...p, tagline: e.target.value }))}
              className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-neon"
            />
          </div>

          <div>
            <label className="block font-mono text-slate-300 mb-1">
              Ringkasan Eksekutif (Bio untuk HR / Publik)
            </label>
            <textarea
              rows="3"
              value={formData.summary}
              onChange={(e) => setFormData(p => ({ ...p, summary: e.target.value }))}
              className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-neon resize-none leading-relaxed"
            />
          </div>
        </div>

        {/* Kontak & Socials */}
        <div className="space-y-3 pt-2 border-t border-slate-800">
          <h3 className="text-xs font-mono uppercase text-lemon font-semibold">
            Tautan Kontak & Media Sosial
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-mono text-slate-400 mb-1">Domisili</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(p => ({ ...p, location: e.target.value }))}
                className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-neon"
              />
            </div>

            <div>
              <label className="block font-mono text-slate-400 mb-1">Alamat Email Resmi</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-neon"
              />
            </div>

            <div>
              <label className="block font-mono text-slate-400 mb-1">Nomor Telepon</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-neon"
              />
            </div>

            <div>
              <label className="block font-mono text-slate-400 mb-1">Tautan WhatsApp Direct (https://wa.me/...)</label>
              <input
                type="url"
                value={formData.whatsappUrl}
                onChange={(e) => setFormData(p => ({ ...p, whatsappUrl: e.target.value }))}
                className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-neon"
              />
            </div>

            <div>
              <label className="block font-mono text-slate-400 mb-1">Tautan LinkedIn</label>
              <input
                type="url"
                value={formData.linkedinUrl}
                onChange={(e) => setFormData(p => ({ ...p, linkedinUrl: e.target.value }))}
                className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-neon"
              />
            </div>

            <div>
              <label className="block font-mono text-slate-400 mb-1">Tautan GitHub</label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData(p => ({ ...p, githubUrl: e.target.value }))}
                className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-neon"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            disabled={saving || compressing}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-neon text-midnight-950 font-bold text-xs hover:bg-neon-hover transition-colors shadow-neon disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Menyimpan ke Cloud Firestore...</span>
              </>
            ) : (
              <>
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Simpan Perubahan Profil</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  )
}
