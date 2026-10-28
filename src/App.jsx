import React, { useState, useEffect } from 'react'
import { useFetchPortfolioData } from './hooks/useFetchPortfolioData'
import { subscribeToAuth, isUserAdmin } from './services/firebase'
import Navbar from './components/Navbar'
import BottomNav from './components/BottomNav'
import HeroSection from './components/HeroSection'
import BiodataSection from './components/BiodataSection'
import ProjectSection from './components/ProjectSection'
import ExperienceSection from './components/ExperienceSection'
import EducationSection from './components/EducationSection'
import AwardsSection from './components/AwardsSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import NotificationToast from './components/NotificationToast'
import AtsCvModal from './components/AtsCvModal'
import AdminLogin from './components/admin/AdminLogin'
import AdminDashboard from './components/admin/AdminDashboard'
import { Cpu } from 'lucide-react'

export default function App() {
  const portfolioData = useFetchPortfolioData()
  const {
    loading,
    isFirebaseLive,
    profile,
    skills,
    projects,
    experiences,
    educations,
    awards,
    refreshData
  } = portfolioData

  const [currentView, setCurrentView] = useState('portfolio') // 'portfolio' | 'admin'
  const [adminUser, setAdminUser] = useState(null)
  const [activeSection, setActiveSection] = useState('beranda')
  const [toast, setToast] = useState(null)
  const [isAtsCvOpen, setIsAtsCvOpen] = useState(false)

  // Listen to URL Hash untuk routing #admin atau beranda
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash === '#admin') {
        setCurrentView('admin')
      } else {
        setCurrentView('portfolio')
      }
    }

    // Periksa hash saat halaman pertama kali dimuat
    handleHashChange()

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Subscribe ke sesi autentikasi Firebase
  useEffect(() => {
    const unsubscribe = subscribeToAuth((user) => {
      if (user && isUserAdmin(user)) {
        setAdminUser(user)
      } else {
        setAdminUser(null)
      }
    })
    return () => unsubscribe()
  }, [])

  // Scrollspy observer for tracking active section in portfolio view
  useEffect(() => {
    if (currentView !== 'portfolio') return

    const sectionIds = ['beranda', 'biodata', 'proyek', 'pengalaman', 'pendidikan', 'prestasi', 'kontak']
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i])
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [currentView])

  const handleShowToast = (toastConfig) => {
    setToast(toastConfig)
    setTimeout(() => {
      setToast(null)
    }, 4500)
  }

  const navigateToPortfolio = () => {
    window.location.hash = ''
    setCurrentView('portfolio')
  }

  const navigateToAdmin = () => {
    window.location.hash = '#admin'
    setCurrentView('admin')
  }

  // Loading Screen Awal
  if (loading) {
    return (
      <div className="min-h-screen bg-midnight-900 flex flex-col items-center justify-center text-slate-100 p-4 font-mono w-full">
        <div className="relative mb-4">
          <div className="w-16 h-16 rounded-2xl bg-midnight-850 border border-neon/40 flex items-center justify-center text-neon shadow-neon animate-pulse">
            <Cpu className="w-8 h-8" />
          </div>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-neon rounded-full animate-ping"></span>
        </div>
        <p className="text-sm font-semibold tracking-wider text-lemon">
          MEMUAT PORTOFOLIO...
        </p>
      </div>
    )
  }

  // =========================================================================
  // TAMPILAN ADMIN CMS (CRUD PANEL)
  // =========================================================================
  if (currentView === 'admin') {
    return (
      <div className="min-h-screen bg-midnight-950 text-slate-100 font-sans selection:bg-neon selection:text-midnight-950 w-full overflow-x-hidden">
        <NotificationToast 
          toast={toast} 
          onClose={() => setToast(null)} 
        />

        {adminUser ? (
          <AdminDashboard 
            user={adminUser}
            portfolioData={portfolioData}
            onBackToPortfolio={navigateToPortfolio}
            onLogout={() => setAdminUser(null)}
            onShowToast={handleShowToast}
          />
        ) : (
          <AdminLogin 
            onBackToPortfolio={navigateToPortfolio}
            onLoginSuccess={(user) => {
              setAdminUser(user)
              handleShowToast({
                type: 'success',
                title: 'Autentikasi Berhasil',
                message: `Selamat datang di CMS Portofolio, ${user.email}!`
              })
            }}
          />
        )}
      </div>
    )
  }

  // =========================================================================
  // TAMPILAN PUBLIK WEBSITE PORTOFOLIO
  // =========================================================================
  return (
    <div className="min-h-screen bg-midnight-900 text-slate-100 selection:bg-neon selection:text-midnight-950 font-sans relative w-full overflow-x-hidden">
      
      {/* Toast Notification Container */}
      <NotificationToast 
        toast={toast} 
        onClose={() => setToast(null)} 
      />

      {/* Dynamic ATS CV Preview & PDF Print Modal */}
      <AtsCvModal
        isOpen={isAtsCvOpen}
        onClose={() => setIsAtsCvOpen(false)}
        data={portfolioData}
      />

      {/* Desktop Sticky & Floating Navbar */}
      <Navbar 
        profile={profile} 
        isFirebaseLive={isFirebaseLive} 
        activeSection={activeSection}
        onOpenAtsCv={() => setIsAtsCvOpen(true)}
      />

      {/* Main Sections */}
      <main className="w-full overflow-x-hidden">
        <HeroSection 
          profile={profile} 
          onOpenAtsCv={() => setIsAtsCvOpen(true)}
        />
        <BiodataSection profile={profile} skills={skills} />
        <ProjectSection projects={projects} />
        <ExperienceSection experiences={experiences} />
        <EducationSection educations={educations} />
        <AwardsSection awards={awards} />
        <ContactSection 
          profile={profile} 
          onShowToast={handleShowToast}
          onOpenAtsCv={() => setIsAtsCvOpen(true)}
        />
      </main>

      {/* Site Footer dengan Tautan Admin Portal */}
      <Footer 
        profile={profile} 
        onOpenAdmin={navigateToAdmin}
      />

      {/* Mobile Bottom Navigation Bar (Android/iOS App Style) */}
      <BottomNav activeSection={activeSection} />

    </div>
  )
}
