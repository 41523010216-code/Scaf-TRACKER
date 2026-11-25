'use client'

import { useState } from 'react'
import { Icon, MobileShell } from '@/components/MobileShell'
import { PageHeader, primaryBtn } from '@/components/ProfileUi'

const FAQ = [
  { q: 'Bagaimana cara mencatat transaksi?', a: 'Ketuk tombol + di menu bawah, pilih Pemasukan atau Pengeluaran, lalu isi nominal, kategori, dan tanggal. Ketuk Simpan untuk menyelesaikan.' },
  { q: 'Bagaimana memulihkan data saya?', a: 'Masuk kembali dengan email dan kata sandi yang sama. Catatan transaksimu tersimpan di akun dan akan muncul kembali setelah kamu masuk.' },
  { q: 'Mengapa saldo saya tidak sesuai?', a: 'Periksa Riwayat Transaksi untuk memastikan semua pemasukan dan pengeluaran sudah tercatat dengan nominal dan jenis yang benar. Kamu bisa mengedit atau menghapus transaksi yang keliru.' },
  { q: 'Bagaimana mengganti kata sandi?', a: 'Buka Profil, pilih Keamanan, lalu ketuk Ubah kata sandi. Kami akan mengirim tautan reset ke email terdaftarmu.' },
]
const SUPPORT = 'dukungan@scaftracker.app'

export default function BantuanPage() {
  const [open, setOpen] = useState<number | null>(0)
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()
  const list = FAQ.map((f, i) => ({ ...f, i })).filter((f) => !q || `${f.q} ${f.a}`.toLowerCase().includes(q))
  return (
    <MobileShell>
      <PageHeader title="Bantuan & Dukungan" back="/profil" />
      <main className="flex flex-1 flex-col gap-5 px-6 pb-10 pt-3">
        <div>
          <h2 className="text-[22px] font-bold text-ink">Ada yang bisa kami bantu?</h2>
          <p className="mt-3 text-[12px] leading-[1.6] text-muted">Temukan jawaban untuk penggunaan SCAF TRACKER dan pengelolaan akunmu.</p>
        </div>
        <label className="flex h-[46px] items-center gap-2.5 rounded-xl bg-white px-[14px] focus-within:ring-2 focus-within:ring-brand/20">
          <Icon name="4858d" size={18} />
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari topik bantuan" aria-label="Cari topik bantuan" className="min-w-0 flex-1 bg-transparent text-[12px] text-ink outline-none placeholder:text-muted" />
        </label>

        <section>
          <p className="pb-2 text-[11px] font-semibold text-muted">PERTANYAAN UMUM</p>
          {list.length === 0 && <p className="py-6 text-center text-[13px] text-muted">Topik tidak ditemukan.</p>}
          {list.map((f) => {
            const on = open === f.i || (q !== '' && list.length === 1)
            return (
              <div key={f.i} className="border-b border-mint">
                <button type="button" aria-expanded={on} onClick={() => setOpen(on ? null : f.i)} className="flex w-full cursor-pointer items-center gap-3 py-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-brand/40">
                  <span className={`flex-1 text-[14px] text-ink ${on ? 'font-semibold' : ''}`}>{f.q}</span>
                  <span className={`transition-transform ${on ? '' : 'rotate-180'}`}><Icon name="e8d92" size={16} /></span>
                </button>
                {on && <p className="pb-4 text-[12px] leading-[1.7] text-muted">{f.a}</p>}
              </div>
            )
          })}
        </section>

        <section>
          <p className="pb-1 text-[11px] font-semibold text-muted">BUTUH BANTUAN LAIN?</p>
          <a href={`mailto:${SUPPORT}?subject=Laporan%20masalah%20SCAF%20TRACKER`} className="flex items-center gap-3.5 border-b border-mint py-4 outline-none transition hover:bg-mint/40 focus-visible:ring-2 focus-visible:ring-brand/40">
            <Icon name="11ee3" size={20} />
            <span className="flex flex-1 flex-col gap-1"><span className="text-[14px] text-ink">Laporkan masalah</span><span className="text-[11px] text-muted">Ceritakan kendala yang kamu alami</span></span>
            <Icon name="c320a" size={16} />
          </a>
        </section>

        <div className="mt-2 flex flex-col gap-3">
          <a href={`mailto:${SUPPORT}`} className={primaryBtn}><Icon name="bad6c" size={18} /> Hubungi Dukungan</a>
          <p className="text-[11px] text-muted">Tim kami siap membantu pada Senin–Jumat, 09.00–17.00 WIB.</p>
        </div>
      </main>
    </MobileShell>
  )
}
