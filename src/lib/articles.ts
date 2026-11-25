export type Category = 'Tips' | 'Manajemen Uang' | 'Investasi'
export const CATEGORIES: Category[] = ['Tips', 'Manajemen Uang', 'Investasi']

export type Article = {
  slug: string
  title: string
  category: Category
  minutes: number
  date: string
  image: string
  intro: string
  steps: { title: string; body: string }[]
  closing: string
}

export const ARTICLES: Article[] = [
  {
    slug: '5-tips-hemat-mahasiswa',
    title: '5 Tips Hemat untuk Mahasiswa di Era Serba Mahal',
    category: 'Tips',
    minutes: 5,
    date: '19 Okt 2026',
    image: '310bb',
    intro:
      'Sebagai mahasiswa, mengatur keuangan memang tidak selalu mudah. Kebutuhan kuliah, biaya hidup, dan keinginan pribadi sering kali datang bersamaan. Namun, dengan beberapa kebiasaan sederhana, kamu tetap bisa hidup hemat tanpa harus mengurangi kualitas hidup.',
    steps: [
      { title: 'Buat Prioritas Pengeluaran', body: 'Bedakan mana yang kebutuhan dan mana yang keinginan. Fokus pada hal yang benar-benar penting, seperti makan, transportasi, dan kebutuhan kuliah.' },
      { title: 'Manfaatkan Promo dan Diskon', body: 'Jangan ragu untuk mencari promo, diskon pelajar, atau cashback dari aplikasi tertentu. Ini bisa menghemat pengeluaran bulananmu.' },
      { title: 'Bawa Bekal dari Rumah', body: 'Siapkan makanan dan botol minum sendiri. Kebiasaan kecil ini membantu mengurangi biaya jajan setiap hari.' },
      { title: 'Catat Setiap Pengeluaran', body: 'Pantau ke mana uangmu pergi. Catatan sederhana di Cuanly membantumu melihat pengeluaran yang bisa dikurangi.' },
      { title: 'Sisihkan Uang untuk Menabung', body: 'Mulai dari nominal kecil secara rutin. Sisihkan uang di awal, bukan menunggu sisa di akhir bulan.' },
    ],
    closing: 'Hemat bukan berarti serba terbatas. Mulai dari kebiasaan kecil hari ini untuk keuangan yang lebih tenang.',
  },
  {
    slug: 'metode-50-30-20',
    title: 'Cara Membagi Uang Bulanan dengan Metode 50/30/20',
    category: 'Manajemen Uang',
    minutes: 6,
    date: '17 Okt 2026',
    image: '7e6ed',
    intro:
      'Bingung membagi uang bulanan? Metode 50/30/20 adalah cara sederhana untuk membagi pemasukan ke tiga pos utama sehingga keuanganmu tetap seimbang tanpa perhitungan rumit.',
    steps: [
      { title: '50% untuk Kebutuhan', body: 'Alokasikan separuh pemasukan untuk hal wajib seperti makan, transportasi, kos, dan biaya kuliah.' },
      { title: '30% untuk Keinginan', body: 'Gunakan untuk hiburan, jajan, atau belanja yang sifatnya pilihan. Tetap boleh menikmati hidup, asal dalam batas.' },
      { title: '20% untuk Tabungan', body: 'Sisihkan untuk tabungan, dana darurat, atau investasi. Lakukan di awal bulan agar tidak habis terpakai.' },
      { title: 'Sesuaikan dengan Kondisimu', body: 'Pembagian ini bukan aturan baku. Ubah persentasenya sesuai penghasilan dan tujuan keuanganmu.' },
    ],
    closing: 'Mulailah dari pembagian sederhana, lalu evaluasi setiap bulan di halaman Analisis.',
  },
  {
    slug: 'dana-darurat',
    title: 'Mengapa Dana Darurat Itu Penting?',
    category: 'Manajemen Uang',
    minutes: 4,
    date: '14 Okt 2026',
    image: '67373',
    intro:
      'Kebutuhan mendadak bisa datang kapan saja, mulai dari biaya kesehatan hingga laptop yang rusak. Dana darurat membuatmu siap tanpa harus berutang.',
    steps: [
      { title: 'Apa Itu Dana Darurat?', body: 'Uang cadangan yang hanya dipakai untuk keadaan mendesak dan tidak terduga, bukan untuk belanja biasa.' },
      { title: 'Berapa yang Ideal?', body: 'Sebagai awal, targetkan setara 3 bulan pengeluaran. Kalau terasa berat, mulai dari 1 bulan dulu.' },
      { title: 'Simpan Terpisah', body: 'Letakkan di rekening terpisah yang mudah dicairkan agar tidak tercampur dengan uang harian.' },
    ],
    closing: 'Dana darurat adalah bantalan agar satu masalah kecil tidak berubah menjadi masalah keuangan besar.',
  },
  {
    slug: 'menghadapi-kenaikan-harga',
    title: 'Strategi Menghadapi Kenaikan Harga Kebutuhan',
    category: 'Tips',
    minutes: 5,
    date: '10 Okt 2026',
    image: '8cc8a',
    intro:
      'Harga kebutuhan yang terus naik membuat uang saku terasa makin cepat habis. Beberapa strategi berikut bisa membantumu tetap terkendali.',
    steps: [
      { title: 'Bandingkan Harga', body: 'Luangkan waktu membandingkan harga di beberapa tempat sebelum membeli, terutama untuk barang yang sering dipakai.' },
      { title: 'Beli Sesuai Rencana', body: 'Buat daftar belanja dan patuhi. Ini mencegah pembelian impulsif yang diam-diam menggerus saldo.' },
      { title: 'Cari Alternatif', body: 'Pilih merek atau produk pengganti dengan kualitas serupa namun harga lebih ramah.' },
      { title: 'Tinjau Anggaran Rutin', body: 'Perbarui batas pengeluaran per kategori setiap bulan agar sesuai dengan harga terbaru.' },
    ],
    closing: 'Kamu tidak bisa mengendalikan harga, tetapi kamu bisa mengendalikan cara mengelola uangmu.',
  },
  {
    slug: 'investasi-pemula',
    title: 'Investasi untuk Pemula: Mulai dari yang Kecil',
    category: 'Investasi',
    minutes: 7,
    date: '6 Okt 2026',
    image: 'ed95b',
    intro:
      'Investasi tidak harus dimulai dengan nominal besar. Yang terpenting adalah memahami dasarnya dan konsisten melakukannya sejak dini.',
    steps: [
      { title: 'Kenali Tujuanmu', body: 'Tentukan untuk apa kamu berinvestasi, misalnya biaya kuliah lanjutan atau modal usaha, agar pilihanmu lebih terarah.' },
      { title: 'Mulai dari Nominal Kecil', body: 'Banyak produk yang bisa dimulai dari puluhan ribu rupiah. Fokus pada kebiasaan rutin, bukan jumlah.' },
      { title: 'Pahami Risiko', body: 'Setiap investasi punya risiko. Jangan tergiur imbal hasil tinggi tanpa memahami cara kerjanya.' },
      { title: 'Diversifikasi', body: 'Jangan taruh semua uang di satu tempat. Sebarkan ke beberapa jenis instrumen untuk menekan risiko.' },
    ],
    closing: 'Pastikan dana darurat sudah aman sebelum berinvestasi, lalu tambah sedikit demi sedikit setiap bulan.',
  },
  {
    slug: 'keuangan-saat-kuliah',
    title: 'Tips Mengelola Keuangan Saat Kuliah',
    category: 'Tips',
    minutes: 6,
    date: '2 Okt 2026',
    image: '54727',
    intro:
      'Masa kuliah adalah waktu terbaik untuk membangun kebiasaan keuangan yang sehat. Berikut langkah praktis yang bisa langsung kamu terapkan.',
    steps: [
      { title: 'Tentukan Anggaran Bulanan', body: 'Bagi uang saku ke kategori utama seperti makan, transport, dan kuliah supaya pengeluaran lebih terarah.' },
      { title: 'Pantau Pengeluaran Mingguan', body: 'Cek pengeluaranmu tiap minggu agar bisa menyesuaikan sebelum anggaran bulanan habis.' },
      { title: 'Cari Penghasilan Tambahan', body: 'Pekerjaan paruh waktu atau proyek freelance bisa menambah pemasukan tanpa mengganggu kuliah.' },
    ],
    closing: 'Konsisten mencatat adalah kunci. Mulai sekarang, satu transaksi pada satu waktu.',
  },
]

export const getArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug)

export function filterArticles(category: Category | 'Semua', query: string) {
  const q = query.trim().toLowerCase()
  return ARTICLES.filter(
    (a) => (category === 'Semua' || a.category === category) && (!q || `${a.title} ${a.category}`.toLowerCase().includes(q)),
  )
}
