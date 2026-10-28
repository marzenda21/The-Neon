import React, { useState } from 'react'
import { 
  ShieldCheck, 
  Lock, 
  ArrowLeft, 
  AlertCircle, 
  Loader2, 
  CheckCircle2, 
  ShieldAlert,
  Sparkles,
  ExternalLink,
  Shield
} from 'lucide-react'
import { loginAdminWithGoogle, ADMIN_EMAIL } from '../../services/firebase'

export default function AdminLogin({ onBackToPortfolio, onLoginSuccess }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [unauthorizedEmail, setUnauthorizedEmail] = useState(null)

  const handleGoogleLogin = async () => {
    setError(null)
    setUnauthorizedEmail(null)
    setLoading(true)

    try {
      const user = await loginAdminWithGoogle()
      if (onLoginSuccess) onLoginSuccess(user)
    } catch (err) {
      console.error('Google Auth Error:', err)
      const message = err.message || ''

      if (message.includes('Akses Ditolak') || message.includes('tidak berhak')) {
        setUnauthorizedEmail(true)
        setError(`Akses Ilegal Dicegah: Akun Google yang Anda pilih bukan '${ADMIN_EMAIL}'. Sesi langsung ditutup demi keamanan sistem.`)
      } else if (err.code === 'auth/popup-closed-by-user') {
        setError('Jendela otentikasi Google ditutup sebelum proses verifikasi selesai.')
      } else if (err.code === 'auth/configuration-not-found') {
        setError('Provider Google belum diaktifkan di Firebase Console. Pastikan tab Authentication > Sign-in method > Google sudah di-Enable.')
      } else {
        setError(message || 'Gagal melakukan otentikasi dengan Google.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-midnight-950 flex flex-col justify-center items-center p-4 relative overflow-hidden bg-tech-grid py-12">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-neon/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Tombol Kembali ke Portofolio */}
      <div className="w-full max-w-md mb-4 flex justify-between items-center z-10">
        <button
          onClick={onBackToPortfolio}
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-neon transition-colors py-1.5 px-3 rounded-lg bg-midnight-900 border border-slate-800"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Website Portofolio</span>
        </button>

        <span className="text-[11px] font-mono text-slate-500">
          Login PORTAL
        </span>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md glass-card rounded-3xl border border-slate-800 bg-midnight-900/95 shadow-glass p-6 sm:p-8 relative z-10 space-y-6">
        
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-midnight-800 border border-neon/50 text-neon shadow-neon mb-2">
            <ShieldCheck className="w-7 h-7" />
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
            Masuk Admin
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
            Mau Ngapain ha?
          </p>

          {/* Admin Email Whitelist Badge */}
        </div>

        {/* Error / Unauthorized Warning */}
        {error && (
          <div className={`p-4 rounded-2xl border text-xs flex items-start gap-3 animate-fade-in ${
            unauthorizedEmail 
              ? 'bg-rose-500/15 border-rose-500/50 text-rose-200' 
              : 'bg-amber-500/15 border-amber-500/40 text-amber-200'
          }`}>
            <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed font-sans">{error}</div>
          </div>
        )}

        {/* Single Secure Google Login Action Button */}
        <div className="space-y-4">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3.5 px-5 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm transition-all duration-200 shadow-neon hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-slate-800" />
                <span>Memverifikasi Token Google...</span>
              </>
            ) : (
              <>
                {/* Official Google Icon */}
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span className="tracking-tight">Masuk dengan Akun Google</span>
              </>
            )}
          </button>
        </div>

        {/* Cyber Security Assurance Card */}

      </div>
    </div>
  )
}
