import React, { useState } from 'react'
import { 
  Terminal, 
  LogOut, 
  ExternalLink, 
  Code2, 
  User, 
  Briefcase, 
  GraduationCap, 
  Trophy, 
  Sparkles, 
  Database,
  Loader2,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react'
import { logoutAdmin, ADMIN_EMAIL, createFirestoreDocument } from '../../services/firebase'
import { 
  mockProjects, 
  mockProfile, 
  mockExperiences, 
  mockEducations, 
  mockAwards 
} from '../../data/mockData'
import ProjectManager from './ProjectManager'
import ProfileManager from './ProfileManager'
import ExperienceManager from './ExperienceManager'
import EducationManager from './EducationManager'
import AwardManager from './AwardManager'
import AdminBottomNav from './AdminBottomNav'

export default function AdminDashboard({ 
  user, 
  portfolioData, 
  onBackToPortfolio, 
  onLogout, 
  onShowToast 
}) {
  const [activeTab, setActiveTab] = useState('projects') // 'projects' | 'profile' | 'experiences' | 'educations' | 'awards'
  const [isSeeding, setIsSeeding] = useState(false)

  const handleLogout = async () => {
    try {
      await logoutAdmin()
      if (onLogout) onLogout()
      onShowToast({
        type: 'info',
        title: 'Sesi Diakhiri',
        message: 'Anda telah berhasil keluar dari panel admin.'
      })
    } catch (err) {
      console.error('Logout error:', err)
    }
  }

  // 1-Click Seed Data Awal ke Firestore jika database masih kosong
  const handleSeedInitialData = async () => {
    if (!window.confirm('Apakah Anda ingin mengunggah template data default (Proyek, Pengalaman, dll) ke Firestore Anda (neon-49f80)? Catatan: Data Profil pribadi Anda tidak akan ditimpa.')) {
      return
    }

    setIsSeeding(true)
    try {
      // 1. Seed Profile HANYA jika profil belum dikustomisasi
      if (!portfolioData?.profile?.name || portfolioData?.profile?.name === 'Raden Marzenda') {
        await createFirestoreDocument('profile', mockProfile, 'main')
      }

      // 2. Seed Projects
      for (let i = 0; i < mockProjects.length; i++) {
        const p = mockProjects[i]
        await createFirestoreDocument('projects', { ...p, order: i + 1 }, p.id)
      }

      // 3. Seed Educations
      for (let i = 0; i < mockEducations.length; i++) {
        const edu = mockEducations[i]
        await createFirestoreDocument('educations', { ...edu, order: i + 1 }, edu.id)
      }

      // 4. Seed Awards
      for (let i = 0; i < mockAwards.length; i++) {
        const aw = mockAwards[i]
        await createFirestoreDocument('awards', { ...aw, order: i + 1 }, aw.id)
      }

      // 5. Seed Experiences
      for (let i = 0; i < mockExperiences.work.length; i++) {
        const w = mockExperiences.work[i]
        await createFirestoreDocument('experiences_work', { ...w, order: i + 1 }, w.id)
      }
      for (let i = 0; i < mockExperiences.organization.length; i++) {
        const o = mockExperiences.organization[i]
        await createFirestoreDocument('experiences_org', { ...o, order: i + 1 }, o.id)
      }
      for (let i = 0; i < mockExperiences.activities.length; i++) {
        const a = mockExperiences.activities[i]
        await createFirestoreDocument('experiences_activities', { ...a, order: i + 1 }, a.id)
      }

      onShowToast({
        type: 'success',
        title: 'Data Berhasil Ditanamkan (Seeded)!',
        message: 'Seluruh data portofolio default kini telah tersimpan di Firebase Firestore Anda.'
      })

      if (portfolioData?.refreshData) {
        portfolioData.refreshData()
      }
    } catch (err) {
      onShowToast({
        type: 'error',
        title: 'Gagal Menanamkan Data',
        message: err.message
      })
    } finally {
      setIsSeeding(false)
    }
  }

  const desktopTabs = [
    { id: 'projects', label: 'Proyek', icon: Code2, count: portfolioData?.projects?.length || 0 },
    { id: 'profile', label: 'Profil & Bio', icon: User, count: null },
    { id: 'experiences', label: 'Pengalaman', icon: Briefcase, count: (portfolioData?.experiences?.work?.length || 0) + (portfolioData?.experiences?.organization?.length || 0) },
    { id: 'educations', label: 'Pendidikan', icon: GraduationCap, count: portfolioData?.educations?.length || 0 },
    { id: 'awards', label: 'Prestasi', icon: Trophy, count: portfolioData?.awards?.length || 0 },
  ]

  return (
    <div className="min-h-screen bg-midnight-950 text-slate-100 flex flex-col font-sans relative">
      
      {/* Top Header Administrator */}
      <header className="sticky top-0 z-40 bg-midnight-900/95 backdrop-blur-xl border-b border-slate-800 shadow-glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          
          {/* Brand & Admin Status */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-midnight-800 border border-neon/50 flex items-center justify-center text-neon shadow-neon">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base tracking-tight text-slate-100">
                  CMS Portofolio
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-neon/15 text-neon border border-neon/30">
                  ADMIN LIVE
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-400 truncate max-w-[200px] sm:max-w-none">
                {user?.email || ADMIN_EMAIL}
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* 1-Click Seed Button */}
            <button
              onClick={handleSeedInitialData}
              disabled={isSeeding}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-midnight-800 hover:bg-slate-700 text-slate-200 text-xs font-mono border border-slate-700 hover:border-lemon hover:text-lemon transition-all disabled:opacity-50"
              title="Unggah template data awal jika Firestore Anda masih kosong"
            >
              {isSeeding ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-lemon" />
                  <span className="hidden sm:inline">Sinkronisasi...</span>
                </>
              ) : (
                <>
                  <Database className="w-3.5 h-3.5 text-lemon" />
                  <span className="hidden sm:inline">Isi Data Awal</span>
                </>
              )}
            </button>

            {/* Back to Public Portfolio Website */}
            <button
              onClick={onBackToPortfolio}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-midnight-800 hover:bg-midnight-750 text-slate-200 text-xs font-semibold border border-slate-700 hover:border-neon hover:text-neon transition-colors"
            >
              <span>Lihat Web</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-midnight-800 hover:bg-rose-950/50 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-800 text-xs font-semibold transition-colors flex items-center gap-1.5"
              title="Keluar dari sesi administrator"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>

        </div>

        {/* Desktop Navigation Tabs (Hidden on Mobile) */}
        <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
          <nav className="flex items-center gap-2 py-2">
            {desktopTabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-neon/15 text-neon border border-neon/40 shadow-neon-pill font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.count !== null && (
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-neon text-midnight-950 font-bold' : 'bg-midnight-950 text-slate-500'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              )
            })}
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-12">
        {activeTab === 'projects' && (
          <ProjectManager 
            projects={portfolioData?.projects || []}
            onDataChanged={portfolioData?.refreshData}
            onShowToast={onShowToast}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileManager 
            profile={portfolioData?.profile}
            onDataChanged={portfolioData?.refreshData}
            onShowToast={onShowToast}
          />
        )}

        {activeTab === 'experiences' && (
          <ExperienceManager 
            experiences={portfolioData?.experiences}
            onDataChanged={portfolioData?.refreshData}
            onShowToast={onShowToast}
          />
        )}

        {activeTab === 'educations' && (
          <EducationManager 
            educations={portfolioData?.educations}
            onDataChanged={portfolioData?.refreshData}
            onShowToast={onShowToast}
          />
        )}

        {activeTab === 'awards' && (
          <AwardManager 
            awards={portfolioData?.awards}
            onDataChanged={portfolioData?.refreshData}
            onShowToast={onShowToast}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation Bar (Khusus Mode HP) */}
      <AdminBottomNav 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />

    </div>
  )
}
