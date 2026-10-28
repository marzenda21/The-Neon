/**
 * Mock Data Portfolio (High-Fidelity Engineering Data)
 * Berfungsi sebagai fallback otomatis ketika Firebase belum dikonfigurasikan
 * atau ketika mode offline aktif.
 */

export const mockProfile = {
  name: "Irfan Marzenda",
  nickname: "Marzenda",
  title: "Full-Stack Web Developer & IoT Systems Engineer",
  tagline: "Bridging Modern Web Ecosystems & Embedded Hardware Intelligence",
  status: "Open to Work / Freelance",
  statusType: "active", // active | busy
  summary: "Praktisi teknologi dengan fokus pada integrasi arsitektur web modern (React, Vite, Cloud APIs) dan sistem perangkat keras cerdas berbasis mikrokontroler (ESP32, STM32, Industrial Telemetry). Berpengalaman 3+ tahun merancang dashboard web real-time yang mengolah data sensor skala industri secara presisi dan terukur.",
  location: "Bandung & Jakarta, Indonesia",
  email: "irfan.marzenda@example.com",
  phone: "+62 812-3456-7890",
  whatsappUrl: "https://wa.me/6281234567890?text=Halo%20Marzenda,%20saya%20tertarik%20berkolaborasi%20dengan%20Anda.",
  githubUrl: "https://github.com/marzenda",
  linkedinUrl: "https://linkedin.com/in/marzenda",
  resumeUrl: "#",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
  metrics: [
    { label: "Proyek Selesai", value: "24+", highlight: "Web & IoT" },
    { label: "Pengalaman", value: "3+ Thn", highlight: "Engineering" },
    { label: "IoT Uptime Sinyal", value: "99.8%", highlight: "Industrial Standard" },
    { label: "Sertifikasi Teknis", value: "8+", highlight: "Cloud & Embedded" }
  ]
}

export const mockSkills = {
  web: [
    { name: "React 18 / 19", level: "Expert", icon: "Code2" },
    { name: "Vite & Next.js", level: "Advanced", icon: "Flame" },
    { name: "Tailwind CSS", level: "Expert", icon: "Palette" },
    { name: "TypeScript / JavaScript", level: "Advanced", icon: "FileCode" },
    { name: "Firebase & Firestore", level: "Advanced", icon: "Database" },
    { name: "Node.js & Express", level: "Intermediate", icon: "Server" },
    { name: "REST APIs & WebSocket", level: "Expert", icon: "Radio" },
    { name: "TanStack Query", level: "Advanced", icon: "Workflow" }
  ],
  iot: [
    { name: "ESP32 & ESP8266", level: "Expert", icon: "Cpu" },
    { name: "STM32 (ARM Cortex)", level: "Advanced", icon: "Cpu" },
    { name: "FreeRTOS & RTOS", level: "Advanced", icon: "Activity" },
    { name: "MQTT & LoRaWAN", level: "Expert", icon: "Wifi" },
    { name: "Modbus RS-485 / I2C / SPI", level: "Advanced", icon: "Share2" },
    { name: "C / C++ Embedded", level: "Advanced", icon: "Binary" },
    { name: "PlatformIO & Arduino IDE", level: "Expert", icon: "Terminal" },
    { name: "PCB Schematic & KiCad", level: "Intermediate", icon: "Layers" }
  ],
  softSkills: [
    "Problem Solving Sistematis",
    "Arsitektur Data Real-Time",
    "Analisis Skema Hardware & Firmware",
    "Kolaborasi Tim Lintas Disiplin",
    "Manajemen Waktu & Delivery Sprint"
  ]
}

export const mockProjects = [
  {
    id: "smart-agri-hub",
    title: "Smart Agri-Aquaponics Monitoring Hub",
    category: "iot", // 'web' | 'iot'
    badge: "IoT Telemetry",
    summary: "Sistem telemetri presisi berbasis ESP32 dan MQTT untuk otomasi nutrisi pH, DO (Dissolved Oxygen), dan suhu air kolam bioflok dengan visualisasi web dashboard interaktif.",
    problem: "Peternak ikan dan hidroponik kerap mengalami gagal panen mendadak akibat fluktuasi kadar oksigen dan keasaman air yang terlambat terdeteksi manual.",
    solution: "Memasang multi-sensor probe industri yang dibaca mikrokontroler ESP32 setiap 5 detik, disinkronkan via MQTT Broker ke database cloud, dan ditampilkan pada web dashboard responsif dengan auto-alert ke Telegram.",
    techStack: ["ESP32", "FreeRTOS", "MQTT", "React 18", "Tailwind CSS", "Firebase"],
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80",
    demoUrl: "https://smart-agri-hub.demo.vercel.app",
    githubUrl: "https://github.com/marzenda/smart-aquaponics-iot",
    metrics: "12 Node Sensor Aktif, Latensi < 250ms",
    featured: true
  },
  {
    id: "industrial-gateway",
    title: "Industrial Machine Telemetry & Predictive Maintenance Gateway",
    category: "iot",
    badge: "Industry 4.0",
    summary: "Edge computing gateway membaca protokol Modbus RS-485 dari motor boiler industri untuk mendeteksi getaran abnormal dan lonjakan arus sebelum terjadi breakdown mesin.",
    problem: "Downtime mendadak pada mesin pabrik memicu kerugian hingga puluhan juta per jam karena kurangnya pemantauan getaran harmonik dan temperatur kumparan secara prediktif.",
    solution: "Merancang unit gateway berbasis STM32 & ESP32 yang menghitung FFT (Fast Fourier Transform) getaran di level edge, mengirimkan status anomali ke antarmuka web maintenance engineer.",
    techStack: ["STM32", "Modbus RS-485", "C++", "React.js", "Chart.js", "WebSocket"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80",
    demoUrl: "https://industry-telemetry.demo.vercel.app",
    githubUrl: "https://github.com/marzenda/industrial-modbus-gateway",
    metrics: "Mencegah 92% unplanned downtime mesin",
    featured: true
  },
  {
    id: "fleet-tracker-lora",
    title: "Autonomous Cold-Chain Logistics Tracker",
    category: "iot",
    badge: "Embedded & LoRa",
    summary: "Pelacak suhu boks logistik vaksin dan daging beku berbasis LoRaWAN 915MHz dengan GPS geolocation dan konsumsi daya ultra-rendah (deep sleep 1.2uA).",
    problem: "Bahan pangan dan vaksin rentan rusak di perjalanan ketika kontainer pendingin mati mendadak tanpa sinyal GSM di area terpencil.",
    solution: "Transmisi sinyal via jaringan LoRa jarak jauh ke gateway darat, dilanjutkan ke dashboard pusat dengan alert batas deviasi suhu kritis.",
    techStack: ["STM32 Low-Power", "LoRaWAN", "GPS Neo-6M", "React", "Mapbox GL"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80",
    demoUrl: "https://cold-chain-tracker.demo.vercel.app",
    githubUrl: "https://github.com/marzenda/coldchain-lora-tracker",
    metrics: "Baterai bertahan 6 bulan sekali cas",
    featured: false
  },
  {
    id: "enterprise-fleet-saas",
    title: "Logistiq — Enterprise Fleet Management SaaS",
    category: "web",
    badge: "Web Application",
    summary: "Platform web dashboard terpadu untuk monitoring rute armada logistik, estimasi konsumsi bahan bakar, manifest pengiriman, dan telemetri pengemudi secara real-time.",
    problem: "Manajer logistik kesulitan memantau 50+ armada truk pengiriman secara simultan dalam satu dashboard web yang cepat dan ringan.",
    solution: "Membangun SPA modern dengan React 18, arsitektur event-driven, sinkronisasi state instan, dan optimasi query data berkapasitas besar.",
    techStack: ["React 18", "Vite", "Tailwind CSS", "Firebase Firestore", "Lucide React"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
    demoUrl: "https://logistiq-saas.demo.vercel.app",
    githubUrl: "https://github.com/marzenda/logistiq-fleet-saas",
    metrics: "Load time < 0.8s, 100/100 Lighthouse Performance",
    featured: true
  },
  {
    id: "smart-access-camera",
    title: "Edge AI Biometric & Smart Access Terminal",
    category: "iot",
    badge: "Computer Vision & IoT",
    summary: "Terminal pintu pintar berbasis ESP32-CAM dengan sensor inframerah dan face recognition on-device untuk sistem presensi kantor tanpa sentuh.",
    problem: "Sistem absensi sidik jari fisik memicu antrean panjang dan risiko transmisi kuman di area perkantoran berkapasitas tinggi.",
    solution: "Integrasi modul ESP32-CAM dengan server analitik web via WebSockets dan relay magnetic lock berkecepatan 300ms verifikasi.",
    techStack: ["ESP32-CAM", "OpenCV", "WebSockets", "React", "Tailwind"],
    image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1000&q=80",
    demoUrl: "https://smart-access.demo.vercel.app",
    githubUrl: "https://github.com/marzenda/smart-access-terminal",
    metrics: "Waktu respon unlock 0.3 detik",
    featured: false
  },
  {
    id: "fintech-micro-invest",
    title: "InvestPulse — Personal Wealth & Portfolio Tracker",
    category: "web",
    badge: "Fintech Dashboard",
    summary: "Aplikasi web pengelolaan portofolio investasi multi-aset (Saham, Crypto, Reksadana) dengan kalkulator bunga majemuk dan grafik alokasi aset dinamis.",
    problem: "Banyak investor retail kesulitan melacak kinerja portofolio yang tersebar di beragam exchange dan sekuritas secara rapi.",
    solution: "Dashboard terpusat dengan update kurs live, analisis persentase rebalancing, dan penyimpanan histori transaksi aman di cloud.",
    techStack: ["React", "Vite", "Tailwind CSS", "Firebase Auth", "Firestore"],
    image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1000&q=80",
    demoUrl: "https://investpulse.demo.vercel.app",
    githubUrl: "https://github.com/marzenda/investpulse-web",
    metrics: "Mendukung sinkronisasi 15+ mata uang & aset",
    featured: false
  }
]

export const mockExperiences = {
  work: [
    {
      id: "w1",
      role: "Lead IoT & Frontend Developer",
      company: "PT Solusi Telemetri Cerdas",
      period: "2023 — Sekarang",
      location: "Bandung, Indonesia (Hybrid)",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80",
      description: "Memimpin perancangan dashboard web monitoring sensor berskala nasional dan pengembangan firmware ESP32/STM32 untuk klien agrikultur dan manufaktur.",
      achievements: [
        "Membangun arsitektur frontend web telemetri yang memproses 100.000+ data point per hari secara real-time.",
        "Mengurangi pemakaian daya pada node mikrokontroler sebesar 40% melalui implementasi sleep cycle FreeRTOS.",
        "Mengembangkan reusable component library internal berbasis Tailwind CSS & React."
      ]
    },
    {
      id: "w2",
      role: "Full-Stack Web & Embedded System Engineer",
      company: "Lab Inovasi Otomasi Industri",
      period: "2021 — 2023",
      location: "Jakarta, Indonesia",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80",
      description: "Bertanggung jawab atas integrasi protokol Modbus dan MQTT ke web dashboard monitoring untuk optimalisasi energi gedung komersial.",
      achievements: [
        "Mengimplementasikan sistem alert otomatis via Webhook Telegram & Email saat terjadi over-current listrik.",
        "Meningkatkan kecepatan render grafik analitik web hingga 60% menggunakan teknik virtualisasi data."
      ]
    }
  ],
  organization: [
    {
      id: "o1",
      role: "Ketua Divisi Riset & Teknologi",
      company: "Himpunan Mahasiswa Teknik Komputer / Elektro",
      period: "2022 — 2023",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80",
      description: "Mengkoordinasi program inkubasi proyek IoT mahasiswa, lokakarya mikrokontroler, dan pendelegasian tim kompetisi robotik nasional.",
      achievements: [
        "Menyelenggarakan Bootcamp IoT & Web Development bagi 180+ peserta mahasiswa baru.",
        "Membimbing 3 tim binaan hingga lolos babak final kompetisi inovasi teknologi tingkat nasional."
      ]
    },
    {
      id: "o2",
      role: "Koordinator Tim Riset Embedded IoT",
      company: "Komunitas IoT & Open Hardware Indonesia",
      period: "2021 — 2022",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80",
      description: "Berpartisipasi aktif dalam pengujian modul open-source LoRaWAN dan pembuatan dokumentasi firmware ESP-IDF.",
      achievements: [
        "Merilis modul repositori open-source ESP32 MQTT Client yang telah di-fork lebih dari 120 kali."
      ]
    }
  ],
  activities: [
    {
      id: "a1",
      title: "Pemateri: 'Membangun Web Dashboard Real-Time untuk IoT dengan React & MQTT'",
      organizer: "National Tech Developer Summit 2024",
      period: "Agustus 2024",
      type: "Workshop & Seminar",
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=400&q=80",
      description: "Membagikan strategi integrasi broker MQTT ke arsitektur SPA React menggunakan WebSocket client secara efisien."
    },
    {
      id: "a2",
      title: "Instruktur Pelatihan: 'Dasar Pemrograman Embedded C/C++ pada ESP32'",
      organizer: "Pusat Pelatihan Vokasi Teknologi",
      period: "Maret 2024",
      type: "Hands-on Workshop",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=80",
      description: "Memberikan pelatihan praktis penanganan interupsi hardware, protokol komunikasi I2C/SPI, dan task management FreeRTOS."
    },
    {
      id: "a3",
      title: "Delegasi Peserta: 'Southeast Asia Smart City & IoT Conference'",
      organizer: "ASEAN Tech Forum",
      period: "November 2023",
      type: "International Conference",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=400&q=80",
      description: "Mengikuti forum adopsi teknologi sensor kota pintar dan standardisasi infrastruktur edge computing di Asia Tenggara."
    }
  ]
}

export const mockEducations = [
  {
    id: "edu1",
    degree: "Sarjana Teknik (S.T.) — Teknik Komputer / Informatika",
    institution: "Institut Teknologi & Sains Nasional",
    period: "2019 — 2023",
    gpa: "IPK 3.86 / 4.00 (Cum Laude)",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80",
    description: "Fokus studi pada Arsitektur Komputer, Sistem Tertanam (Embedded Systems), Jaringan Sensor Nirkabel, dan Rekayasa Perangkat Lunak Web.",
    thesis: "Tugas Akhir: Desain & Implementasi Edge-Computing Gateway Berbasis STM32 untuk Telemetri Mesin Produksi Real-Time via Protokol MQTT."
  },
  {
    id: "cert1",
    degree: "Sertifikasi Profesi: Cloud & Serverless Architecture",
    institution: "Google Cloud / Dicoding Academy",
    period: "2024",
    credentialId: "GCP-ARCH-2024-8841",
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=400&q=80",
    description: "Validasi keahlian dalam perancangan database cloud NoSQL Firestore, Cloud Run, dan integrasi API aman."
  },
  {
    id: "cert2",
    degree: "Sertifikasi Spesialisasi: Industrial IoT & Embedded Protocol",
    institution: "Cisco Networking Academy & Embedded Lab",
    period: "2023",
    credentialId: "IIOT-CERT-9021",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400&q=80",
    description: "Keahlian dalam standardisasi jaringan sensor, Modbus over TCP/IP, keamanan mikrokontroler, dan troubleshooting protokol bus."
  }
]

export const mockAwards = [
  {
    id: "aw1",
    title: "Juara 1 — National IoT & Smart Innovation Hackathon",
    issuer: "Kementerian Komunikasi & Informatika RI",
    year: "2023",
    rank: "1st Place Gold",
    image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=600&q=80",
    description: "Menciptakan prototipe 'Smart Agri-Aquaponics Monitoring Hub' dengan akurasi pembacaan sensor tinggi dan efisiensi konsumsi daya terbaik."
  },
  {
    id: "aw2",
    title: "Best Capstone Project — Embedded Engineering Excellence",
    issuer: "Fakultas Teknik & Ilmu Komputer",
    year: "2023",
    rank: "Best Innovation",
    image: "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?auto=format&fit=crop&w=600&q=80",
    description: "Penghargaan karya tugas akhir paling aplikatif untuk adopsi industri 4.0 dengan pengujian implementasi langsung di fasilitas manufaktur."
  },
  {
    id: "aw3",
    title: "Juara Harapan 1 — Web Development & UI/UX Challenge",
    issuer: "TechFest Nasional",
    year: "2022",
    rank: "Honorable Mention",
    image: "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?auto=format&fit=crop&w=600&q=80",
    description: "Membangun antarmuka dashboard manajemen bencana alam real-time yang memprioritaskan accessibility dan responsivitas mobile."
  }
]
