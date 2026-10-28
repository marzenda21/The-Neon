/**
 * Utility: Kompresi Gambar ke String Base64 untuk Disimpan di Firestore
 * Mengubah file gambar lokal menjadi string Base64 yang telah dioptimalkan
 * ukurannya (max ~50KB - 90KB) menggunakan HTML5 Canvas, sehingga aman
 * disimpan langsung di dokumen Firestore tanpa melebihi batas 1MB per dokumen.
 */

export function compressImageToBase64(file, maxWidth = 800, maxHeight = 800, quality = 0.75) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null)

    if (!file.type.startsWith('image/')) {
      return reject(new Error('Berkas yang dipilih harus berupa file gambar (JPG, PNG, WebP)'))
    }

    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = (event) => {
      const img = new Image()
      img.src = event.target.result

      img.onload = () => {
        let width = img.width
        let height = img.height

        // Hitung proporsi aspek rasio
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width)
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height)
            height = maxHeight
          }
        }

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)

        // Kompresi ke format JPEG
        const base64String = canvas.toDataURL('image/jpeg', quality)
        
        // Hitung estimasi ukuran string dalam KB
        const sizeInKb = Math.round((base64String.length * 3 / 4) / 1024)
        console.info(`📸 [ImageCompressor] Gambar dikompres: ${width}x${height}px, estimasi ukuran: ${sizeInKb} KB`)

        resolve({
          base64: base64String,
          sizeKb: sizeInKb,
          width,
          height
        })
      }

      img.onerror = (err) => reject(new Error('Gagal memproses berkas gambar'))
    }

    reader.onerror = (err) => reject(new Error('Gagal membaca berkas'))
  })
}
