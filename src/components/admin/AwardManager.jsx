import React, { useState } from 'react'
import { Trophy, Plus, Edit3, Trash2, X, Check, Loader2, Upload, Image as ImageIcon } from 'lucide-react'
import { compressImageToBase64 } from '../../utils/imageCompressor'
import { createFirestoreDocument, updateFirestoreDocument, deleteFirestoreDocument } from '../../services/firebase'

export default function AwardManager({ awards, onDataChanged, onShowToast }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)
  const [compressing, setCompressing] = useState(false)
  const [imageSizeKb, setImageSizeKb] = useState(null)

  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    year: '',
    rank: '',
    image: '',
    description: '',
    order: 1
  })

  const handleOpenAdd = () => {
    setEditingItem(null)
    setFormData({
      title: '',
      issuer: '',
      year: new Date().getFullYear().toString(),
      rank: '1st Place Gold',
      image: '',
      description: '',
      order: (awards?.length || 0) + 1
    })
    setImageSizeKb(null)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (item) => {
    setEditingItem(item)
    setFormData({
      title: item.title || '',
      issuer: item.issuer || '',
      year: item.year || '',
      rank: item.rank || '',
      image: item.image || '',
      description: item.description || '',
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
      const result = await compressImageToBase64(file, 650, 650, 0.75)
      setFormData(prev => ({ ...prev, image: result.base64 }))
      setImageSizeKb(result.sizeKb)
      onShowToast({
        type: 'success',
        title: 'Foto Prestasi Dikompres!',
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
    if (!formData.title || !formData.issuer) {
      onShowToast({
        type: 'error',
        title: 'Formulir Belum Lengkap',
        message: 'Nama Kejuaraan dan Lembaga Penyelenggara wajib diisi.'
      })
      return
    }

    setSubmitting(true)
    try {
      const payload = {
        title: formData.title,
        issuer: formData.issuer,
        year: formData.year,
        rank: formData.rank,
        image: formData.image || '',
        description: formData.description,
        order: Number(formData.order) || 1
      }

      if (editingItem) {
        await updateFirestoreDocument('awards', editingItem.id, payload)
        onShowToast({
          type: 'success',
          title: 'Prestasi Diperbarui',
          message: 'Data kejuaraan berhasil diupdate di Firestore.'
        })
      } else {
        await createFirestoreDocument('awards', payload)
        onShowToast({
          type: 'success',
          title: 'Prestasi Ditambahkan',
          message: 'Data kejuaraan baru berhasil disimpan ke Firestore.'
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
    try {
      await deleteFirestoreDocument('awards', id)
      setDeleteConfirmId(null)
      onShowToast({
        type: 'success',
        title: 'Prestasi Dihapus',
        message: 'Data kejuaraan berhasil dihapus.'
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

  return (
    <div className="space-y-6">
      
      {/* Top Bar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-midnight-850 p-4 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-neon" />
            <span>Manajemen Prestasi & Gelar Kehormatan</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Kelola piagam kompetisi, hackathon, dan gelar penghargaan ({awards?.length || 0} item).
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neon text-midnight-950 font-bold text-xs hover:bg-neon-hover transition-colors shadow-neon shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Tambah Prestasi Baru</span>
        </button>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {awards?.map((item) => (
          <div
            key={item.id}
            className="glass-card rounded-2xl border border-slate-800 p-5 flex flex-col justify-between hover:border-slate-700 transition-colors"
          >
            {item.image && (
              <div className="w-full aspect-video rounded-xl overflow-hidden border border-slate-700/80 bg-midnight-950 mb-3">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neon/15 text-neon border border-neon/30">
                  {item.rank || 'Penghargaan'}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {item.year}
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-100 leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-lemon font-medium">
                {item.issuer}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed pt-1">
                {item.description}
              </p>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-end gap-1.5">
              <button
                onClick={() => handleOpenEdit(item)}
                className="p-1.5 rounded-lg bg-midnight-800 hover:bg-slate-700 text-slate-200 transition-colors"
                title="Edit"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>

              {deleteConfirmId === item.id ? (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-2 py-1 rounded bg-rose-500 text-white text-[10px] font-bold"
                  >
                    Hapus
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(null)}
                    className="p-1 text-slate-400 text-[10px]"
                  >
                    Batal
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setDeleteConfirmId(item.id)}
                  className="p-1.5 rounded-lg bg-midnight-800 hover:bg-rose-900/60 text-rose-400 transition-colors"
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
          <div className="relative w-full max-w-md glass-card rounded-2xl border border-slate-700 bg-midnight-900 shadow-glass my-8 p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-neon" />
                <span>{editingItem ? 'Edit Data Prestasi' : 'Tambah Prestasi Baru'}</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-mono text-slate-300 mb-1">
                  Nama Kompetisi / Penghargaan *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(p => ({ ...p, title: e.target.value }))}
                  required
                  placeholder="e.g. Juara 1 — National IoT & Smart Innovation Hackathon"
                  className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-neon"
                />
              </div>

              <div>
                <label className="block font-mono text-slate-300 mb-1">
                  Penyelenggara / Lembaga Pemberi *
                </label>
                <input
                  type="text"
                  value={formData.issuer}
                  onChange={(e) => setFormData(p => ({ ...p, issuer: e.target.value }))}
                  required
                  placeholder="e.g. Kementerian Komunikasi & Informatika RI"
                  className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-neon"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-slate-300 mb-1">
                    Tahun
                  </label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData(p => ({ ...p, year: e.target.value }))}
                    placeholder="2023"
                    className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-neon"
                  />
                </div>

                <div>
                  <label className="block font-mono text-slate-300 mb-1">
                    Peringkat (Rank)
                  </label>
                  <input
                    type="text"
                    value={formData.rank}
                    onChange={(e) => setFormData(p => ({ ...p, rank: e.target.value }))}
                    placeholder="e.g. 1st Place Gold / Best Innovation"
                    className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-neon"
                  />
                </div>
              </div>

              {/* Upload Foto Piagam / Piala Prestasi */}
              <div className="p-3.5 rounded-xl bg-midnight-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-mono text-lemon text-[11px] font-semibold flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5 text-neon" />
                    <span>Foto Piagam / Piala Prestasi (Otomatis Dikompres)</span>
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
                    <div className="w-16 h-12 rounded-lg overflow-hidden border border-slate-700 bg-midnight-900 shrink-0">
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono truncate max-w-[250px]">
                      Foto piagam siap disimpan ke Firestore
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block font-mono text-slate-300 mb-1">
                  Deskripsi Karya / Prestasi
                </label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))}
                  placeholder="Ringkasan inovasi yang diajukan dan dampak hasil kejuaraan..."
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
