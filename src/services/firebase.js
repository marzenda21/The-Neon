import { initializeApp, getApps } from 'firebase/app'
import { 
  getFirestore, 
  collection, 
  doc,
  getDocs, 
  setDoc,
  addDoc, 
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy 
} from 'firebase/firestore'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

// Konfigurasi Firebase dari Environment Variables atau Nilai Baku (neon-49f80)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDF6gUpD3Nl7XmVKqxrNmb-wL5lKRktJcw",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "neon-49f80.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "neon-49f80",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "neon-49f80.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "37322576033",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:37322576033:web:1c9714cb4f394ed7c3e0e0"
}

// Email Administrator Tunggal yang Diizinkan
export const ADMIN_EMAIL = (import.meta.env.VITE_ADMIN_EMAIL || "irfan.marzenda@gmail.com").toLowerCase().trim()

/**
 * Validasi apakah kredensial Firebase terisi aktif
 */
export const isFirebaseConfigured = () => {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.projectId)
}

// Inisialisasi Firebase App Singleton
let app = null
let db = null
let auth = null
let googleProvider = null

if (isFirebaseConfigured()) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
    db = getFirestore(app)
    auth = getAuth(app)
    googleProvider = new GoogleAuthProvider()
    googleProvider.setCustomParameters({ prompt: 'select_account' })
    console.info('🚀 [Firebase] Firestore & Auth terhubung aktif (Project: neon-49f80).')
  } catch (error) {
    console.warn('⚠️ [Firebase] Gagal inisialisasi Firebase:', error.message)
    app = null
    db = null
    auth = null
  }
}

export { app, db, auth }

// ============================================================================
// AUTHENTICATION & SECURITY SERVICES
// ============================================================================

/**
 * Validasi apakah pengguna adalah administrator yang sah
 * @param {Object} user - Firebase User object
 * @returns {boolean}
 */
export function isUserAdmin(user) {
  if (!user || !user.email) return false
  return user.email.toLowerCase().trim() === ADMIN_EMAIL
}

/**
 * Login Administrator menggunakan Email & Password
 * Dilengkapi pengecekan whitelist email admin
 */
export async function loginAdminWithEmail(email, password) {
  if (!auth) throw new Error('Firebase Auth belum diinisialisasi')

  const normalizedEmail = email.toLowerCase().trim()
  if (normalizedEmail !== ADMIN_EMAIL) {
    throw new Error(`Akses Ditolak: Email '${email}' bukan administrator resmi.`)
  }

  const credential = await signInWithEmailAndPassword(auth, normalizedEmail, password)
  if (!isUserAdmin(credential.user)) {
    await signOut(auth)
    throw new Error('Akses Ditolak: Akun Anda tidak memiliki hak akses administrator.')
  }
  return credential.user
}

/**
 * Mendaftarkan / Setel Password Administrator Pertama Kali
 * Hanya diizinkan untuk email irfan.marzenda@gmail.com
 */
export async function registerAdminWithEmail(email, password) {
  if (!auth) throw new Error('Firebase Auth belum diinisialisasi')

  const normalizedEmail = email.toLowerCase().trim()
  if (normalizedEmail !== ADMIN_EMAIL) {
    throw new Error(`Akses Ditolak: Hanya '${ADMIN_EMAIL}' yang dapat didaftarkan.`)
  }

  const credential = await createUserWithEmailAndPassword(auth, normalizedEmail, password)
  return credential.user
}

/**
 * Login Administrator menggunakan Akun Google (1-Click Popup)
 * Otomatis memverifikasi kecocokan email irfan.marzenda@gmail.com
 */
export async function loginAdminWithGoogle() {
  if (!auth || !googleProvider) throw new Error('Firebase Auth / Google Provider tidak siap')

  const result = await signInWithPopup(auth, googleProvider)
  if (!isUserAdmin(result.user)) {
    await signOut(auth)
    throw new Error(`Akses Ditolak: Akun Google (${result.user.email}) tidak berhak mengakses admin. Gunakan ${ADMIN_EMAIL}.`)
  }
  return result.user
}

/**
 * Logout dari sesi administrator
 */
export async function logoutAdmin() {
  if (!auth) return
  await signOut(auth)
}

/**
 * Listener perubahan status login dengan auto-enforce hak akses admin
 */
export function subscribeToAuth(callback) {
  if (!auth) {
    callback(null)
    return () => {}
  }
  return onAuthStateChanged(auth, (user) => {
    if (user && !isUserAdmin(user)) {
      // Jika ada akun selain admin yang login, paksa signout
      signOut(auth).catch(() => {})
      callback(null)
    } else {
      callback(user)
    }
  })
}

// ============================================================================
// FIRESTORE CRUD SERVICES
// ============================================================================

/**
 * Mengambil seluruh dokumen dari collection
 */
export async function fetchFirestoreCollection(collectionName, orderField = null, orderDirection = 'asc') {
  if (!db) {
    return { data: null, isLive: false, error: 'Firebase not configured' }
  }

  try {
    const colRef = collection(db, collectionName)
    const querySnapshot = await getDocs(colRef)
    const items = []
    querySnapshot.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...docSnap.data() })
    })

    // In-memory sort agar aman dari index error Firestore dan tidak menyembunyikan dokumen yang belum memiliki field order
    if (orderField && items.length > 0) {
      items.sort((a, b) => {
        const valA = a[orderField] !== undefined ? a[orderField] : 0
        const valB = b[orderField] !== undefined ? b[orderField] : 0
        if (orderDirection === 'desc') {
          return valB > valA ? 1 : valB < valA ? -1 : 0
        }
        return valA > valB ? 1 : valA < valB ? -1 : 0
      })
    }

    return { data: items, isLive: true, error: null }
  } catch (err) {
    console.error(`❌ [Firebase] Error saat mengambil collection '${collectionName}':`, err)
    return { data: null, isLive: false, error: err.message }
  }
}

/**
 * Membuat dokumen baru di Firestore
 * @param {string} collectionName
 * @param {Object} data
 * @param {string} [customId]
 */
export async function createFirestoreDocument(collectionName, data, customId = null) {
  if (!db) throw new Error('Firestore tidak aktif')

  const payload = {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  }

  if (customId) {
    const docRef = doc(db, collectionName, customId)
    await setDoc(docRef, payload, { merge: true })
    return { id: customId, ...payload }
  } else {
    const docRef = await addDoc(collection(db, collectionName), payload)
    return { id: docRef.id, ...payload }
  }
}

/**
 * Memperbarui dokumen yang sudah ada di Firestore
 * @param {string} collectionName
 * @param {string} docId
 * @param {Object} data
 */
export async function updateFirestoreDocument(collectionName, docId, data) {
  if (!db) throw new Error('Firestore tidak aktif')
  if (!docId) throw new Error('ID dokumen wajib disertakan')

  const docRef = doc(db, collectionName, docId)
  const payload = {
    ...data,
    updatedAt: serverTimestamp()
  }
  // Gunakan setDoc dengan merge: true agar dokumen selalu tersimpan/terupdate
  // dan mencegah error "No document to update" jika dokumen belum terdaftar
  await setDoc(docRef, payload, { merge: true })
  return { id: docId, ...payload }
}

/**
 * Menghapus dokumen dari Firestore
 * @param {string} collectionName
 * @param {string} docId
 */
export async function deleteFirestoreDocument(collectionName, docId) {
  if (!db) throw new Error('Firestore tidak aktif')
  if (!docId) throw new Error('ID dokumen wajib disertakan')

  const docRef = doc(db, collectionName, docId)
  await deleteDoc(docRef)
  return { success: true, id: docId }
}

/**
 * Menyimpan pesan dari formulir kontak ke Firestore koleksi 'messages'
 */
export async function sendContactMessage(messageData) {
  if (!db) {
    console.log('📬 [Simulasi Pesan Kontak Dikirim]:', messageData)
    return { success: true, simulated: true }
  }

  try {
    const docRef = await addDoc(collection(db, 'messages'), {
      ...messageData,
      createdAt: serverTimestamp(),
      read: false
    })
    return { success: true, id: docRef.id, simulated: false }
  } catch (error) {
    console.error('❌ Gagal mengirim pesan ke Firestore:', error)
    throw error
  }
}
