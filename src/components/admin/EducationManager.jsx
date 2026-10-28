import React, { useState } from 'react'
import { GraduationCap, Award, Plus, Edit3, Trash2, X, Check, Loader2, Upload, Image as ImageIcon } from 'lucide-react'
import { compressImageToBase64 } from '../../utils/imageCompressor'
import { createFirestoreDocument, updateFirestoreDocument, deleteFirestoreDocument } from '../../services/firebase'

export default function EducationManager({ educations, onDataChanged, onShowToast }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)
  const [compressing, setCompressing] = useState(false)
  const [imageSizeKb, setImageSizeKb] = useState(null)

  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    period: '',
    gpa: '',
    credentialId: '',
    image: '',
    description: '',
    thesis: '',
    order: 1
  })

  const handleOpenAdd = () => {
    setEditingItem(null)
    setFormData({
      degree: '',
      institution: '',
      period: '',
      gpa: '',
      credentialId: '',
      image: '',
      description: '',
      thesis: '',
      order: (educations?.length || 0) + 1
    })
    setImageSizeKb(null)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (item) => {
    setEditingItem(item)
    setFormData({
      degree: item.degree || '',
      institution: item.institution || '',
      period: item.period || '',
      gpa: item.gpa || '',
      credentialId: item.credentialId || '',
      image: item.image || '',
      description: item.description || '',
      thesis: item.thesis || '',
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
        title: 'Foto Sertifikat Dikompres!',
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
    if (!formData.degree || !formData.institution) {
      onShowToast({
        type: 'error',
        title: 'Formulir Belum Lengkap',
        message: 'Gelar/Sertifikasi dan Institusi/Penerbit wajib diisi.'
      })
      return
    }

    setSubmitting(true)
    try {
      const payload = {
        degree: formData.degree,
        institution: formData.institution,
        period: formData.period,
        gpa: formData.gpa,
        credentialId: formData.credentialId,
        image: formData.image || '',
        description: formData.description,
        thesis: formData.thesis,
        order: Number(formData.order) || 1
      }

      if (editingItem) {
        await updateFirestoreDocument('educations', editingItem.id, payload)
        onShowToast({
          type: 'success',
          title: 'Data Diperbarui',
          message: 'Data pendidikan/sertifikasi berhasil diperbarui.'
        })
      } else {
        await createFirestoreDocument('educations', payload)
        onShowToast({
          type: 'success',
          title: 'Data Ditambahkan',
          message: 'Data pendidikan/sertifikasi baru berhasil disimpan ke Firestore.'
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
      await deleteFirestoreDocument('educations', id)
      setDeleteConfirmId(null)
      onShowToast({
        type: 'success',
        title: 'Data Dihapus',
        message: 'Item pendidikan/sertifikasi berhasil dihapus.'
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
            <GraduationCap className="w-5 h-5 text-neon" />
            <span>Manajemen Pendidikan Formal & Sertifikasi</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Kelola data ijazah akademik dan lisensi sertifikasi profesional industri ({educations?.length || 0} item).
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neon text-midnight-950 font-bold text-xs hover:bg-neon-hover transition-colors shadow-neon shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Tambah Pendidikan / Lisensi</span>
        </button>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {educations?.map((item) => (
          <div
            key={item.id}
            className="glass-card rounded-2xl border border-slate-800 p-5 flex flex-col justify-between hover:border-slate-700 transition-colors"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase mb-1.5 ${
                    item.credentialId ? 'bg-lemon/15 text-lemon border border-lemon/30' : 'bg-neon/15 text-neon border border-neon/30'
                  }`}>
                    {item.credentialId ? 'Sertifikasi / Lisensi' : 'Pendidikan Formal'}
                  </span>
                  <h3 className="text-sm font-bold text-slate-100">
                    {item.degree}
                  </h3>
                  <p className="text-xs text-lemon font-medium mt-0.5">
                    {item.institution}
                  </p>
                </div>

                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-midnight-950 text-slate-400 border border-slate-800 shrink-0">
                  {item.period}
                </span>
              </div>

              {item.gpa && (
                <div className="text-[11px] font-mono text-neon font-semibold">
                  Nilai: {item.gpa}
                </div>
              )}

              {item.credentialId && (
                <div className="text-[11px] font-mono text-slate-400">
                  ID: {item.credentialId}
                </div>
              )}

              <p className="text-xs text-slate-400 leading-relaxed pt-1">
                {item.description}
              </p>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-500">
                Urutan: #{item.order || 1}
              </span>

              <div className="flex items-center gap-1.5">
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
          </div>
        ))}
      </div>

      {/* Modal Form Tambah / Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-lg glass-card rounded-2xl border border-slate-700 bg-midnight-900 shadow-glass my-8 p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-neon" />
                <span>{editingItem ? 'Edit Data Pendidikan' : 'Tambah Pendidikan Baru'}</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-mono text-slate-300 mb-1">
                  Gelar Akademik / Nama Sertifikasi *
                </label>
                <input
                  type="text"
                  value={formData.degree}
                  onChange={(e) => setFormData(p => ({ ...p, degree: e.target.value }))}
                  required
                  placeholder="e.g. Sarjana Teknik (S.T.) / Cloud Architecture"
                  className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-neon"
                />
              </div>

              <div>
                <label className="block font-mono text-slate-300 mb-1">
                  Nama Institusi / Lembaga Penerbit *
                </label>
                <input
                  type="text"
                  value={formData.institution}
                  onChange={(e) => setFormData(p => ({ ...p, institution: e.target.value }))}
                  required
                  placeholder="e.g. Institut Teknologi / Google Cloud / Cisco"
                  className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-neon"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-slate-300 mb-1">
                    Periode / Tahun Lulus
                  </label>
                  <input
                    type="text"
                    value={formData.period}
                    onChange={(e) => setFormData(p => ({ ...p, period: e.target.value }))}
                    placeholder="e.g. 2019 — 2023 / 2024"
                    className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-neon"
                  />
                </div>

                <div>
                  <label className="block font-mono text-slate-300 mb-1">
                    IPK / Nilai (Opsional)
                  </label>
                  <input
                    type="text"
                    value={formData.gpa}
                    onChange={(e) => setFormData(p => ({ ...p, gpa: e.target.value }))}
                    placeholder="e.g. IPK 3.86 / 4.00"
                    className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-neon"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-slate-300 mb-1">
                  ID Kredensial / No. Sertifikat (Jika Sertifikasi)
                </label>
                <input
                  type="text"
                  value={formData.credentialId}
                  onChange={(e) => setFormData(p => ({ ...p, credentialId: e.target.value }))}
                  placeholder="e.g. GCP-ARCH-2024-8841"
                  className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-neon"
                />
              </div>

              {/* Upload Foto Sertifikat / Ijazah */}
              <div className="p-3.5 rounded-xl bg-midnight-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-mono text-lemon text-[11px] font-semibold flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5 text-neon" />
                    <span>Foto Sertifikat / Logo Institusi (Otomatis Dikompres)</span>
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
                      Sertifikat siap disimpan ke Firestore
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block font-mono text-slate-300 mb-1">
                  Deskripsi Fokus Studi / Kompetensi
                </label>
                <textarea
                  rows="2"
                  value={formData.description}
                  onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))}
                  placeholder="Fokus studi, mata kuliah inti, atau ruang lingkup pelatihan..."
                  className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-neon resize-none"
                />
              </div>

              <div>
                <label className="block font-mono text-slate-300 mb-1">
                  Judul Tesis / Tugas Akhir (Jika Ada)
                </label>
                <input
                  type="text"
                  value={formData.thesis}
                  onChange={(e) => setFormData(p => ({ ...p, thesis: e.target.value }))}
                  placeholder="e.g. Desain & Implementasi Edge-Computing Gateway..."
                  className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-neon"
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
