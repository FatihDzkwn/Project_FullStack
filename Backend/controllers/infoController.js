/**
 * ============================================================================
 * INFO CONTROLLER (Tentang Kami & Informasi Perusahaan)
 * ============================================================================
 */

const infoController = {
  /**
   * getAboutData
   * Mengambil semua informasi untuk halaman Tentang Kami
   */
  getAboutData: async (req, res) => {
    try {
      const aboutData = {
        // Stats untuk Hero Section
        stats: {
          users: "1.2M+",
          partners: 8,
          routes: "500+"
        },

        // Data Milestone/Timeline
        milestones: [
          { 
            year: '2026', 
            title: 'Lahirnya SkyBooking', 
            desc: 'SkyBooking didirikan oleh tim mahasiswa STT Terpadu Nurul Fikri dengan semangat inovasi, memadukan keahlian pengembangan web terkini.' 
          }
        ],

        // Core Values Perusahaan
        values: [
          { icon: '💎', title: 'Integritas', desc: 'Jujur dan transparan dalam setiap layanan', color: '#0066cc' },
          { icon: '🎖️', title: 'Kualitas', desc: 'Standar layanan tertinggi untuk pengguna', color: '#10b981' },
          { icon: '💡', title: 'Inovasi', desc: 'Terus berkembang mengikuti zaman', color: '#f59e0b' },
          { icon: '❤️', title: 'Pelanggan', desc: 'Kepuasan pelanggan adalah prioritas utama', color: '#ef4444' }
        ],

        // Data Tim (Anggota Kelompok 16 & 5)
        team: [
          {
            id: 1,
            nama: 'Fatih Dzakwan Susilo',
            jabatan: 'Frontend Developer',
            avatar: 'FD',
            color: '#0066cc',
            deskripsi: 'Mengembangkan antarmuka pengguna yang intuitif.',
            social: { linkedin: '#', twitter: '#' }
          },
          {
            id: 2,
            nama: 'Muhammad Aqwam Kamil',
            jabatan: 'Backend Developer',
            avatar: 'MA',
            color: '#10b981',
            deskripsi: 'Membangun sistem backend yang handal dan scalable.',
            social: { linkedin: '#', twitter: '#' }
          },
          {
            id: 3,
            nama: 'Muhammad Fajrul Falah',
            jabatan: 'Backend Developer',
            avatar: 'MF',
            color: '#8b5cf6',
            deskripsi: 'Mengoptimalkan performa server dan database.',
            social: { linkedin: '#', twitter: '#' }
          },
          {
            id: 4,
            nama: 'Eka Purnamasari',
            jabatan: 'Backend Developer',
            avatar: 'EP',
            color: '#f59e0b',
            deskripsi: 'Mengintegrasikan sistem dengan berbagai maskapai.',
            social: { linkedin: '#', twitter: '#' }
          },
          {
            id: 5,
            nama: 'Salwa',
            jabatan: 'Frontend Developer',
            avatar: 'SW',
            color: '#f59e0b',
            deskripsi: 'Mendesain komponen UI modern.',
            social: { linkedin: '#', twitter: '#' }
          }
        ],

        // Informasi Kontak
        contact: {
          address: "Jl. Margonda Raya No. 100, Depok, Jawa Barat",
          phone: "021-1234-5678",
          emails: ["info@skybooking.id", "help@skybooking.id"]
        }
      };

      res.status(200).json({
        success: true,
        data: aboutData
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Gagal memuat data Tentang Kami",
        error: error.message
      });
    }
  }
};

module.exports = infoController;