import React, { useState } from 'react'
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Image as ImageIcon, 
  ExternalLink, 
  Github, 
  Layers, 
  Check, 
  X, 
  Loader2, 
  Upload,
  Sparkles,
  AlertTriangle
} from 'lucide-react'
import { compressImageToBase64 } from '../../utils/imageCompressor'
import { createFirestoreDocument, updateFirestoreDocument, deleteFirestoreDocument } from '../../services/firebase'

export default function ProjectManager({ projects, onDataChanged, onShowToast }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)
  const [compressing, setCompressing] = useState(false)

  // Form State
  const initialFormState = {
    title: '',
    category: 'web', // 'web' | 'iot'
    badge: 'Web Application',
    summary: '',
    problem: '',
    solution: '',
    metrics: '',
    techStack: 'React 18, Vite, Tailwind CSS',
    image: '',
    demoUrl: '',
    githubUrl: '',
    featured: false,
    order: 1
  }

  const [formData, setFormData] = useState(initialFormState)
  const [imageSizeKb, setImageSizeKb] = useState(null)

  const handleOpenAdd = () => {
    setEditingProject(null)
    setFormData({
      ...initialFormState,
      order: (projects?.length || 0) + 1
    })
    setImageSizeKb(null)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (project) => {
    setEditingProject(project)
    setFormData({
      title: project.title || '',
      category: project.category || 'web',
      badge: project.badge || '',
      summary: project.summary || '',
      problem: project.problem || '',
      solution: project.solution || '',
      metrics: project.metrics || '',
      techStack: Array.isArray(project.techStack) ? project.techStack.join(', ') : (project.techStack || ''),
      image: project.image || '',
      demoUrl: project.demoUrl || '',
      githubUrl: project.githubUrl || '',
      featured: Boolean(project.featured),
      order: project.order || 1
    })
    setImageSizeKb(null)
    setIsModalOpen(true)
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setCompressing(true)
    try {
      const result = await compressImageToBase64(file, 800, 800, 0.75)
      setFormData(prev => ({ ...prev, image: result.base64 }))
      setImageSizeKb(result.sizeKb)
      onShowToast({
        type: 'success',
        title: 'Gambar Berhasil Dikompres!',
        message: `Ukuran dioptimalkan menjadi ${result.sizeKb} KB (Aman untuk Firestore).`
      })
    } catch (err) {
      onShowToast({
        type: 'error',
        title: 'Gagal Memproses Gambar',
        message: err.message
      })
    } finally {
      setCompressing(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title || !formData.summary) {
      onShowToast({
        type: 'error',
        title: 'Formulir Belum Lengkap',
        message: 'Judul dan ringkasan proyek wajib diisi.'
      })
      return
    }

    setSubmitting(true)
    try {
      // Parse techStack string menjadi array
      const techArray = formData.techStack
        .split(',')
        .map(t => t.trim())
        .filter(Boolean)

      const payload = {
        title: formData.title,
        category: formData.category,
        badge: formData.badge,
        summary: formData.summary,
        problem: formData.problem,
        solution: formData.solution,
        metrics: formData.metrics,
        techStack: techArray,
        image: formData.image || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
        demoUrl: formData.demoUrl,
        githubUrl: formData.githubUrl,
        featured: formData.featured,
        order: Number(formData.order) || 1
      }

      if (editingProject) {
        await updateFirestoreDocument('projects', editingProject.id, payload)
        onShowToast({
          type: 'success',
          title: 'Proyek Diperbarui',
          message: `Proyek "${payload.title}" berhasil diupdate di Firestore.`
        })
      } else {
        await createFirestoreDocument('projects', payload)
        onShowToast({
          type: 'success',
          title: 'Proyek Ditambahkan',
          message: `Proyek "${payload.title}" berhasil disimpan ke Firestore.`
        })
      }

      setIsModalOpen(false)
      if (onDataChanged) onDataChanged()
    } catch (err) {
      onShowToast({
        type: 'error',
        title: 'Gagal Menyimpan Proyek',
        message: err.message
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id, title) => {
    try {
      await deleteFirestoreDocument('projects', id)
      setDeleteConfirmId(null)
      onShowToast({
        type: 'success',
        title: 'Proyek Dihapus',
        message: `Proyek "${title}" telah dihapus dari database.`
      })
      if (onDataChanged) onDataChanged()
    } catch (err) {
      onShowToast({
        type: 'error',
        title: 'Gagal Menghapus Proyek',
        message: err.message
      })
    }
  }

  return (
    <div className="space-y-6">
      
      {/* Top Bar Manager */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-midnight-850 p-4 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-neon" />
            <span>Manajemen Portofolio Proyek</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Kelola karya Web Development & IoT yang tampil di halaman portofolio utama ({projects?.length || 0} item).
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neon text-midnight-950 font-bold text-xs hover:bg-neon-hover transition-colors shadow-neon shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Tambah Proyek Baru</span>
        </button>
      </div>

      {/* Projects List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects?.map((item) => (
          <div
            key={item.id}
            className="glass-card rounded-2xl border border-slate-800 p-4 flex flex-col justify-between hover:border-slate-700 transition-colors"
          >
            <div>
              {/* Thumbnail & Badges */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-midnight-950 border border-slate-800 mb-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <span className={`absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                  item.category === 'iot'
                    ? 'bg-neon text-midnight-950'
                    : 'bg-lemon text-midnight-950'
                }`}>
                  {item.category === 'iot' ? 'IoT System' : 'Web App'}
                </span>

                {item.featured && (
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-mono bg-midnight-900/90 text-neon border border-neon/40">
                    Featured
                  </span>
                )}
              </div>

              <h3 className="text-sm font-bold text-slate-100 line-clamp-1">
                {item.title}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                {item.summary}
              </p>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-1 mt-2.5">
                {item.techStack?.slice(0, 3).map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-midnight-950 border border-slate-800 text-[10px] font-mono text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-500">
                Urutan: #{item.order || 1}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-1.5 rounded-lg bg-midnight-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors"
                  title="Edit Proyek"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>

                {deleteConfirmId === item.id ? (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleDelete(item.id, item.title)}
                      className="px-2 py-1 rounded bg-rose-500 text-white text-[10px] font-bold"
                    >
                      Hapus
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(null)}
                      className="p-1 text-slate-400 hover:text-slate-200 text-[10px]"
                    >
                      Batal
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirmId(item.id)}
                    className="p-1.5 rounded-lg bg-midnight-800 hover:bg-rose-900/60 text-rose-400 text-xs transition-colors"
                    title="Hapus Proyek"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form Tambah / Edit Proyek */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl glass-card rounded-2xl border border-slate-700 bg-midnight-900 shadow-glass my-8 p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Layers className="w-4 h-4 text-neon" />
                <span>{editingProject ? 'Edit Data Proyek' : 'Tambah Proyek Baru'}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-slate-300 mb-1">
                    Judul Proyek *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(p => ({ ...p, title: e.target.value }))}
                    required
                    placeholder="e.g. Smart Agri-Aquaponics Hub"
                    className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-neon"
                  />
                </div>

                <div>
                  <label className="block font-mono text-slate-300 mb-1">
                    Kategori Proyek
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(p => ({ 
                      ...p, 
                      category: e.target.value,
                      badge: e.target.value === 'iot' ? 'IoT Telemetry' : 'Web Application'
                    }))}
                    className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-neon"
                  >
                    <option value="web">Web Development</option>
                    <option value="iot">IoT & Embedded Systems</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-slate-300 mb-1">
                    Label Badge Mini
                  </label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData(p => ({ ...p, badge: e.target.value }))}
                    placeholder="e.g. Industry 4.0 / SaaS"
                    className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-neon"
                  />
                </div>

                <div>
                  <label className="block font-mono text-slate-300 mb-1">
                    Capaian Teknis / Metrics
                  </label>
                  <input
                    type="text"
                    value={formData.metrics}
                    onChange={(e) => setFormData(p => ({ ...p, metrics: e.target.value }))}
                    placeholder="e.g. Latensi < 250ms, 99.8% Uptime"
                    className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-neon"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-slate-300 mb-1">
                  Ringkasan Singkat (Summary) *
                </label>
                <textarea
                  rows="2"
                  value={formData.summary}
                  onChange={(e) => setFormData(p => ({ ...p, summary: e.target.value }))}
                  required
                  placeholder="Ringkasan 1-2 kalimat tentang fungsi proyek..."
                  className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-neon resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-slate-300 mb-1">
                    Latar Masalah (Problem)
                  </label>
                  <textarea
                    rows="2"
                    value={formData.problem}
                    onChange={(e) => setFormData(p => ({ ...p, problem: e.target.value }))}
                    placeholder="Masalah industri/pengguna yang dipecahkan..."
                    className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-neon resize-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-slate-300 mb-1">
                    Solusi Rekayasa (Solution)
                  </label>
                  <textarea
                    rows="2"
                    value={formData.solution}
                    onChange={(e) => setFormData(p => ({ ...p, solution: e.target.value }))}
                    placeholder="Bagaimana arsitektur software/hardware memecahkannya..."
                    className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-neon resize-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-slate-300 mb-1">
                  Komponen & Tech Stack (Pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  value={formData.techStack}
                  onChange={(e) => setFormData(p => ({ ...p, techStack: e.target.value }))}
                  placeholder="e.g. React 18, ESP32, FreeRTOS, MQTT, Tailwind"
                  className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-neon"
                />
              </div>

              {/* Upload Gambar dengan Kompresi Otomatis ke Base64 */}
              <div className="p-4 rounded-xl bg-midnight-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-mono text-lemon font-semibold flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5 text-neon" />
                    <span>Upload & Kompres Gambar (Tersimpan di Firestore)</span>
                  </label>
                  {imageSizeKb && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neon/15 text-neon border border-neon/30">
                      Ukuran: {imageSizeKb} KB
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={compressing}
                    className="text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-midnight-800 file:text-neon hover:file:bg-midnight-700 cursor-pointer"
                  />
                  {compressing && (
                    <span className="text-xs text-neon flex items-center gap-1 font-mono">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span>Mengompres...</span>
                    </span>
                  )}
                </div>

                {formData.image && (
                  <div className="relative aspect-video rounded-lg overflow-hidden border border-slate-800 max-h-40 w-fit">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="h-full object-cover"
                    />
                  </div>
                )}

                <div className="pt-1">
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">
                    Atau gunakan URL Gambar Eksternal:
                  </label>
                  <input
                    type="url"
                    value={formData.image.startsWith('data:') ? '' : formData.image}
                    onChange={(e) => setFormData(p => ({ ...p, image: e.target.value }))}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-1.5 rounded-lg bg-midnight-900 border border-slate-800 text-slate-300 text-xs focus:outline-none focus:border-neon"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-slate-300 mb-1">
                    Tautan Demo Live (Opsional)
                  </label>
                  <input
                    type="url"
                    value={formData.demoUrl}
                    onChange={(e) => setFormData(p => ({ ...p, demoUrl: e.target.value }))}
                    placeholder="https://proyek-anda.vercel.app"
                    className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-neon"
                  />
                </div>

                <div>
                  <label className="block font-mono text-slate-300 mb-1">
                    Tautan Repositori GitHub (Opsional)
                  </label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData(p => ({ ...p, githubUrl: e.target.value }))}
                    placeholder="https://github.com/username/repo"
                    className="w-full px-3.5 py-2 rounded-xl bg-midnight-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-neon"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData(p => ({ ...p, featured: e.target.checked }))}
                    className="w-4 h-4 rounded bg-midnight-950 border-slate-800 text-neon focus:ring-neon accent-neon"
                  />
                  <label htmlFor="featured" className="text-slate-300 text-xs font-mono cursor-pointer">
                    Tandai Sebagai Featured Project
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-slate-400 text-xs font-mono">Urutan:</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData(p => ({ ...p, order: e.target.value }))}
                    className="w-16 px-2 py-1 rounded bg-midnight-950 border border-slate-800 text-slate-100 text-xs text-center font-mono"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-midnight-800 hover:bg-slate-800 text-slate-300 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting || compressing}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-neon text-midnight-950 font-bold hover:bg-neon-hover transition-colors shadow-neon disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Menyimpan ke Firestore...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>{editingProject ? 'Simpan Perubahan' : 'Buat Proyek'}</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  )
}
