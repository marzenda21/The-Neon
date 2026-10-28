import React, { useState } from 'react'
import { Briefcase, Plus, Edit3, Trash2, X, Check, Loader2, Calendar, MapPin, Upload, Image as ImageIcon } from 'lucide-react'
import { compressImageToBase64 } from '../../utils/imageCompressor'
import { createFirestoreDocument, updateFirestoreDocument, deleteFirestoreDocument } from '../../services/firebase'

export default function ExperienceManager({ experiences, onDataChanged, onShowToast }) {
  const [activeTab, setActiveTab] = useState('work') // 'work' | 'org' | 'act'
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)
  const [compressing, setCompressing] = useState(false)
  const [imageSizeKb, setImageSizeKb] = useState(null)

  const getCollectionName = () => {
    if (activeTab === 'work') return 'experiences_work'
    if (activeTab === 'org') return 'experiences_org'
    return 'experiences_activities'
  }

  const getActiveItems = () => {
    if (activeTab === 'work') return experiences?.work || []
    if (activeTab === 'org') return experiences?.organization || []
    return experiences?.activities || []
  }

  const [formData, setFormData] = useState({
    role: '',
    company: '',
    period: '',
    location: '',
    image: '',
    description: '',
    achievements: '',
    order: 1
  })

  const handleOpenAdd = () => {
    setEditingItem(null)
    setFormData({
      role: '',
      company: '',
      period: '',
      location: '',
      image: '',
      description: '',
      achievements: '',
      order: (getActiveItems().length || 0) + 1
    })
    setImageSizeKb(null)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (item) => {
    setEditingItem(item)
    setFormData({
      role: item.role || item.title || '',
      company: item.company || item.organizer || '',
      period: item.period || '',
      location: item.location || '',
      image: item.image || '',
      description: item.description || '',
      achievements: Array.isArray(item.achievements) ? item.achievements.join('\n') : (item.achievements || ''),
      order: item.order || 1
    })
    setImageSizeKb(null)
    setIsModalOpen(true)
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setCompressing(true)
    try {
      const result = await compressImageToBase64(file, 600, 600, 0.75)
      setFormData(prev => ({ ...prev, image: result.base64 }))
      setImageSizeKb(result.sizeKb)
      onShowToast({
        type: 'success',
        title: 'Foto Pengalaman Dikompres!',
        message: `Ukuran dioptimalkan menjadi ${result.sizeKb} KB (Aman untuk Firestore).`
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
    if (!formData.role || !formData.company) {
      onShowToast({
        type: 'error',
        title: 'Formulir Belum Lengkap',
        message: 'Posisi/Judul dan Perusahaan/Penyelenggara wajib diisi.'
      })
      return
    }

    setSubmitting(true)
    const collectionName = getCollectionName()
    try {
      const achList = formData.achievements
        .split('\n')
        .map(a => a.trim())
        .filter(Boolean)

      const payload = {
        role: formData.role,
        company: formData.company,
        title: formData.role,
        organizer: formData.company,
        period: formData.period,
        location: formData.location,
        image: formData.image || '',
        description: formData.description,
        achievements: achList,
        order: Number(formData.order) || 1
      }

      if (editingItem) {
        await updateFirestoreDocument(collectionName, editingItem.id, payload)
        onShowToast({
          type: 'success',
          title: 'Pengalaman Diperbarui',
          message: 'Data pengalaman berhasil diupdate di Firestore.'
        })
      } else {
        await createFirestoreDocument(collectionName, payload)
        onShowToast({
          type: 'success',
          title: 'Pengalaman Ditambahkan',
          message: 'Data pengalaman baru telah disimpan ke Firestore.'
        })
      }

      setIsModalOpen(false)
      if (onDataChanged) onDataChanged()
    } catch (err) {
      onShowToast({
        type: 'error',
        title: 'Gagal Menyimpan Data',
        message: err.message
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    const collectionName = getCollectionName()
    try {
      await deleteFirestoreDocument(collectionName, id)
      setDeleteConfirmId(null)
      onShowToast({
        type: 'success',
        title: 'Data Dihapus',
        message: 'Pengalaman berhasil dihapus dari database.'
      })
      if (onDataChanged) onDataChanged()
    } catch (err) {
      onShowToast({
        type: 'error',
        title: 'Gagal Menghapus Data',
        message: err.message
      })
    }
  }

  const items = getActiveItems()

  return (
    <div className="space-y-6">
      
      {/* Top Header & Sub-Category Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-midnight-850 p-4 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-neon" />
            <span>Manajemen Pengalaman & Aktivitas</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Kelola riwayat kerja, kegiatan organisasi, dan seminar yang tampil di timeline.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neon text-midnight-950 font-bold text-xs hover:bg-neon-hover transition-colors shadow-neon shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Tambah Data Baru</span>
        </button>
      </div>

      {/* Sub Tabs: Kerja / Organisasi / Seminar */}
      <div className="flex items-center gap-2 bg-midnight-950 p-1.5 rounded-xl border border-slate-800 w-fit">
        <button
          onClick={() => setActiveTab('work')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            activeTab === 'work' ? 'bg-neon text-midnight-950 shadow-neon' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Kerja / Magang ({experiences?.work?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab('org')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            activeTab === 'org' ? 'bg-neon text-midnight-950 shadow-neon' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Organisasi ({experiences?.organization?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab('act')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            activeTab === 'act' ? 'bg-neon text-midnight-950 shadow-neon' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Seminar / Workshop ({experiences?.activities?.length || 0})
        </button>
      </div>

      {/* Items List */}
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="glass-card rounded-2xl border border-slate-800 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-colors"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-100">
                  {item.role || item.title}
                </h3>
                <span className="text-[11px] font-mono text-lemon">
                  • {item.company || item.organizer}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
                {item.description}
              </p>
              <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500 pt-1">
                <span>Periode: {item.period}</span>
                {item.location && <span>• {item.location}</span>}
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              <button
                onClick={() => handleOpenEdit(item)}
                className="p-2 rounded-xl bg-midnight-800 hover:bg-slate-700 text-slate-200 transition-colors"
                title="Edit"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>

              {deleteConfirmId === item.id ? (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-2.5 py-1.5 rounded-lg bg-rose-500 text-white text-xs font-bold"
                  >
                    Ya, Hapus
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(null)}
                    className="p-1 text-slate-400 text-xs"
                  >
                    Batal
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setDeleteConfirmId(item.id)}
                  className="p-2 rounded-xl bg-midnight-800 hover:bg-rose-900/60 text-rose-400 transition-colors"
                  title="Hapus"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form Tambah / Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl glass-card rounded-2xl border border-slate-700 bg-midnight-900 shadow-glass my-8 p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-neon" />
                <span>{editingItem ? 'Edit Data Pengalaman' : 'Tambah Pengalaman Baru'}</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-mono text-slate-300 mb-1">
                  Posisi / Peran / Judul Seminar *
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData(p => ({ ...p, role: e.target.value }))}
                  required
                  placeholder="e.g. Lead IoT & Frontend Developer"
                  className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-neon"
                />
              </div>

              <div>
                <label className="block font-mono text-slate-300 mb-1">
                  Nama Perusahaan / Organisasi / Penyelenggara *
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData(p => ({ ...p, company: e.target.value }))}
                  required
                  placeholder="e.g. PT Solusi Telemetri Cerdas"
                  className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-neon"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-slate-300 mb-1">
                    Periode Waktu
                  </label>
                  <input
                    type="text"
                    value={formData.period}
                    onChange={(e) => setFormData(p => ({ ...p, period: e.target.value }))}
                    placeholder="e.g. 2023 — Sekarang / Ags 2024"
                    className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-neon"
                  />
                </div>

                <div>
                  <label className="block font-mono text-slate-300 mb-1">
                    Lokasi (Opsional)
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData(p => ({ ...p, location: e.target.value }))}
                    placeholder="e.g. Bandung, Indonesia (Hybrid)"
                    className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-neon"
                  />
                </div>
              </div>

              {/* Upload Foto / Logo Pengalaman */}
              <div className="p-3.5 rounded-xl bg-midnight-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-mono text-lemon text-[11px] font-semibold flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5 text-neon" />
                    <span>Foto Dokumentasi / Logo Perusahaan (Otomatis Dikompres)</span>
                  </label>
                  {imageSizeKb && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neon/15 text-neon border border-neon/30">
                      {imageSizeKb} KB
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={compressing}
                    className="text-xs text-slate-400 file:mr-2.5 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-midnight-800 file:text-neon hover:file:bg-midnight-700 cursor-pointer"
                  />
                  {compressing && (
                    <span className="text-xs text-neon flex items-center gap-1 font-mono">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span>Mengompres...</span>
                    </span>
                  )}
                </div>

                {formData.image && (
                  <div className="flex items-center gap-3 pt-1">
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-700 bg-midnight-900 shrink-0">
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono truncate max-w-[250px]">
                      Foto terpilih siap disimpan
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block font-mono text-slate-300 mb-1">
                  Deskripsi Tanggung Jawab
                </label>
                <textarea
                  rows="2"
                  value={formData.description}
                  onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))}
                  placeholder="Ringkasan tanggung jawab dan kontribusi..."
                  className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-neon resize-none"
                />
              </div>

              <div>
                <label className="block font-mono text-slate-300 mb-1">
                  Poin Capaian / Kontribusi Utama (1 baris per poin)
                </label>
                <textarea
                  rows="3"
                  value={formData.achievements}
                  onChange={(e) => setFormData(p => ({ ...p, achievements: e.target.value }))}
                  placeholder="Membangun arsitektur telemetri yang memproses 100k data/hari&#10;Mengurangi konsumsi daya mikrokontroler sebesar 40%"
                  className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-neon resize-none leading-relaxed"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-midnight-800 text-slate-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-neon text-midnight-950 font-bold hover:bg-neon-hover transition-colors shadow-neon disabled:opacity-50"
                >
                  {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                  <span>{editingItem ? 'Simpan Perubahan' : 'Tambah Data'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
