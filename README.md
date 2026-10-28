# Web Portofolio Personal & Admin CMS (CRUD)

Web Portofolio personal modern dark theme (*soft deep midnight blue* `#070F1E` / `#0B1325`), aksen neon cyber lime (`#39FF14`), tipografi tajam dengan highlight kuning muda lembut (`#FEF08A`), serta **Panel Admin CMS Terintegrasi** untuk pengelolaan konten secara dinamis via **Firebase Firestore (`neon-49f80`)** dan **Firebase Authentication**.

---

## 🔐 Cara Mengakses Panel Admin CMS

1. **Akses Langsung via URL**: Buka URL portofolio Anda dan tambahkan hash `#admin` di belakangnya:
   ```
   http://localhost:3000/#admin
   ```
   *(atau pada domain Vercel Anda: `https://domain-anda.vercel.app/#admin`)*
2. **Akses via Footer**: Gulir ke bagian paling bawah website portofolio, klik tombol **"Admin 🔒"** di pojok kanan bawah.
3. **Autentikasi Administrator**:
   - Masuk menggunakan **Akun Google (`irfan.marzenda@gmail.com`)** via 1-Click Login.
   - Atau masuk menggunakan **Email & Password** administrator.
   - Sistem secara ketat menolak dan mengunci akses untuk email selain `irfan.marzenda@gmail.com`.

---

## 🚀 Fitur Unggulan Panel Admin

1. **Responsif Dual-Navigation**:
   - **Mode Desktop**: Navigasi tab horizontal lengkap dengan indikator jumlah item.
   - **Mode HP (Smartphone)**: **Floating Bottom Navigation Bar ala Mobile App** di bagian bawah layar (Proyek, Profil, Pengalaman, Pendidikan, Prestasi).
2. **Fitur CRUD Lengkap**:
   - **Proyek (Projects)**: Tambah, edit, hapus, urutkan, dan tandai *featured project*.
   - **Profil & Biodata**: Edit nama, role, bio untuk HR, kontak, media sosial, dan status ketersediaan kerja.
   - **Pengalaman**: Kelola 3 kategori: Kerja/Magang, Organisasi, dan Seminar/Workshop.
   - **Pendidikan & Lisensi**: Kelola ijazah akademik, IPK, dan ID sertifikasi profesional.
   - **Prestasi & Kejuaraan**: Kelola piagam kompetisi dan gelar kehormatan.
3. **Kompresi Gambar Otomatis ke Base64 (Disimpan di Firestore)**:
   - File gambar yang diunggah langsung dikompresi di browser menggunakan Canvas API menjadi string Base64 yang ringan (~30KB - 80KB).
   - Aman disimpan langsung di dalam dokumen Firestore (jauh di bawah batas 1MB per dokumen Firestore).
   - Tampil langsung sebagai gambar tanpa memerlukan CDN/storage eksternal.
4. **Tombol "Isi Data Awal Firestore" (1-Click Seeder)**:
   - Jika database Firestore `neon-49f80` Anda masih baru/kosong, cukup klik tombol **"Isi Data Awal Firestore"** di bagian atas panel admin untuk langsung mengisi seluruh data proyek, profil, pendidikan, dan pengalaman awal secara instan.

---

## 🛡️ Keamanan & Proteksi Cyber

* **Kebal SQL Injection (SQLi)**: Cloud Firestore adalah database dokumen NoSQL yang diakses melalui SDK resmi Google Firebase dengan API berparameter biner (`doc()`, `getDoc()`, `setDoc()`). Tidak ada query string SQL tradisional, sehingga serangan SQL Injection secara fundamental **mustahil terjadi**.
* **Whitelist Email Ketat**: Hanya akun `irfan.marzenda@gmail.com` yang dapat melewati gerbang autentikasi. Akun lain akan langsung diputus sesinya (*force signout*).
* **Proteksi Brute Force**: Client-side rate limiting mengunci percobaan masuk selama 45 detik jika terjadi 5 kali kegagalan berturut-turut, dipadukan dengan proteksi `auth/too-many-requests` dari Google Cloud.
* **Keamanan Vercel Headers**: Konfigurasi `vercel.json` menerapkan `X-Frame-Options: DENY` (anti-Clickjacking), `X-Content-Type-Options: nosniff`, dan `X-XSS-Protection`.

---

## ☁️ Konfigurasi Firebase (`neon-49f80`)

Konfigurasi telah diatur secara baku pada proyek:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDF6gUpD3Nl7XmVKqxrNmb-wL5lKRktJcw",
  authDomain: "neon-49f80.firebaseapp.com",
  projectId: "neon-49f80",
  storageBucket: "neon-49f80.firebasestorage.app",
  messagingSenderId: "37322576033",
  appId: "1:37322576033:web:1c9714cb4f394ed7c3e0e0"
};
```

### Firestore Security Rules yang Digunakan:
```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2026, 11, 25);
    }
  }
}
```

---

## 🛠️ Menjalankan Proyek

```bash
# Jalankan development server lokal
npm run dev

# Kompilasi siap deploy ke Vercel
npm run build
```
Buka browser di `http://localhost:3000` untuk portofolio publik, atau `http://localhost:3000/#admin` untuk mengelola data via CMS.
