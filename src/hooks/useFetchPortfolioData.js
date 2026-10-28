/**
 * Custom Hook: useFetchPortfolioData
 * Mengambil data portofolio dinamis dari Firebase Firestore dengan
 * otomatis beralih ke Mock Data jika Firebase belum dikonfigurasikan atau offline.
 */

import { useState, useEffect, useCallback } from 'react'
import { isFirebaseConfigured, fetchFirestoreCollection } from '../services/firebase'
import { 
  mockProfile, 
  mockSkills, 
  mockProjects, 
  mockExperiences, 
  mockEducations, 
  mockAwards 
} from '../data/mockData'

export function useFetchPortfolioData() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isFirebaseLive, setIsFirebaseLive] = useState(false)

  const [profile, setProfile] = useState(mockProfile)
  const [skills, setSkills] = useState(mockSkills)
  const [projects, setProjects] = useState(mockProjects)
  const [experiences, setExperiences] = useState(mockExperiences)
  const [educations, setEducations] = useState(mockEducations)
  const [awards, setAwards] = useState(mockAwards)

  const loadData = useCallback(async (isInitial = false) => {
    if (isInitial) {
      setLoading(true)
    }
    setError(null)

    // Jika environment variable Firebase belum diatur, gunakan Mock Data langsung
    if (!isFirebaseConfigured()) {
      setIsFirebaseLive(false)
      setProfile(mockProfile)
      setSkills(mockSkills)
      setProjects(mockProjects)
      setExperiences(mockExperiences)
      setEducations(mockEducations)
      setAwards(mockAwards)
      setLoading(false)
      return
    }

    try {
      // Ambil data dari koleksi Firestore secara simultan
      const [
        projectsRes,
        awardsRes,
        educationsRes,
        workExpRes,
        orgExpRes,
        actExpRes,
        profileRes
      ] = await Promise.allSettled([
        fetchFirestoreCollection('projects', 'order', 'asc'),
        fetchFirestoreCollection('awards', 'year', 'desc'),
        fetchFirestoreCollection('educations', 'order', 'asc'),
        fetchFirestoreCollection('experiences_work', 'order', 'asc'),
        fetchFirestoreCollection('experiences_org', 'order', 'asc'),
        fetchFirestoreCollection('experiences_activities', 'order', 'asc'),
        fetchFirestoreCollection('profile')
      ])

      let anyLiveSuccess = false

      // Sinkronisasi Projects
      if (projectsRes.status === 'fulfilled' && projectsRes.value?.isLive) {
        setProjects(projectsRes.value.data)
        anyLiveSuccess = true
      } else {
        setProjects(mockProjects)
      }

      // Sinkronisasi Awards
      if (awardsRes.status === 'fulfilled' && awardsRes.value?.isLive) {
        setAwards(awardsRes.value.data)
        anyLiveSuccess = true
      } else {
        setAwards(mockAwards)
      }

      // Sinkronisasi Educations
      if (educationsRes.status === 'fulfilled' && educationsRes.value?.isLive) {
        setEducations(educationsRes.value.data)
        anyLiveSuccess = true
      } else {
        setEducations(mockEducations)
      }

      // Sinkronisasi Experiences
      const isWorkLive = workExpRes.status === 'fulfilled' && workExpRes.value?.isLive
      const isOrgLive = orgExpRes.status === 'fulfilled' && orgExpRes.value?.isLive
      const isActLive = actExpRes.status === 'fulfilled' && actExpRes.value?.isLive

      if (isWorkLive || isOrgLive || isActLive) {
        anyLiveSuccess = true
      }

      setExperiences({
        work: isWorkLive ? workExpRes.value.data : mockExperiences.work,
        organization: isOrgLive ? orgExpRes.value.data : mockExperiences.organization,
        activities: isActLive ? actExpRes.value.data : mockExperiences.activities
      })

      // Sinkronisasi Profile
      if (profileRes.status === 'fulfilled' && profileRes.value?.isLive && profileRes.value.data?.length > 0) {
        setProfile(prev => ({ ...prev, ...profileRes.value.data[0] }))
        anyLiveSuccess = true
      } else {
        setProfile(mockProfile)
      }

      setIsFirebaseLive(anyLiveSuccess)
    } catch (err) {
      console.warn('⚠️ Gagal menyinkronkan Firestore, memakai Mock Data:', err)
      setError(err.message)
      setIsFirebaseLive(false)
      // Fallback
      setProjects(mockProjects)
      setExperiences(mockExperiences)
      setEducations(mockEducations)
      setAwards(mockAwards)
      setProfile(mockProfile)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData(true)
  }, [loadData])

  return {
    loading,
    error,
    isFirebaseLive,
    profile,
    skills,
    projects,
    experiences,
    educations,
    awards,
    refreshData: () => loadData(false)
  }
}
