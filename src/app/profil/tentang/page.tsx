'use client'

import { useState } from 'react'
import { Icon, MobileShell } from '@/components/MobileShell'
import { Chevron, PageHeader, SectionLabel } from '@/components/ProfileUi'

const LEGAL = [
  { icon: 'b1b6c', title: 'Kebijakan Privasi', body: 'Data keuangan yang kamu catat hanya digunakan untuk menampilkan ringkasan dan analisis di akunmu. Kami tidak membagikannya kepada pihak lain tanpa persetujuanmu.' },
  { icon: '7290d', title: 'Syarat & Ketentuan', body: 'Dengan menggunakan SCAF TRACKER, kamu setuju menggunakan aplikasi secara wajar dan bertanggung jawab atas keakuratan catatan yang kamu masukkan.' },
  { icon: '92782', title: 'Lisensi Sumber Terbuka', body: 'Aplikasi ini dibangun dengan Next.js, React, dan Tailwind CSS yang dirilis di bawah lisensi sumber terbuka masing-masing.' },
]

export default function TentangPage() {
  const [doc, setDoc] = useState<(typeof LEGAL)[number] | null>(null)
  const line = 'flex items-center justify-between border-b border-mint py-4 text-[14px] text-ink'
  return (
    <MobileShell>
      <PageHeader title="Tentang Aplikasi" back="/profil" />
      <main className="flex flex-1 flex-col gap-6 px-6 pb-10 pt-3">
        <div className="flex flex-col items-center gap-3 pt-4 text-center">
          <span className="flex size-[70px] items-center justify-center rounded-[20px] bg-brand"><Icon name="b39cc" size={34} /></span>
          <p className="pt-1 text-[20px] font-bold tracking-wide text-ink">SCAF TRACKER</p>
          <p className="text-[11px] text-muted">Versi 1.0.0</p>
          <p className="pt-1 text-[12px] text-muted">Kelola keuanganmu, wujudkan impianmu.</p>
        </div>
        <p className="pt-4 text-[12px] leading-[1.7] text-muted">SCAF TRACKER membantumu mencatat pemasukan dan pengeluaran, memahami pola keuangan, serta menjaga anggaran dan target dalam satu tempat.</p>
        <section>
          <SectionLabel>Informasi aplikasi</SectionLabel>
          <div className={line}><span>Versi saat ini</span><span className="text-[11px] text-muted">1.0.0</span></div>
          <div className={line}><span>Pembaruan aplikasi</span><span className="text-[11px] text-muted">Versi terbaru</span></div>
        </section>
        <section>
          <SectionLabel>Legal &amp; informasi</SectionLabel>
          {LEGAL.map((l) => (
            <button key={l.title} type="button" onClick={() => setDoc(l)} className="flex w-full cursor-pointer items-center gap-3 border-b border-mint py-4 text-left text-[14px] text-ink outline-none transition hover:bg-mint/40 focus-visible:ring-2 focus-visible:ring-brand/40">
              <Icon name={l.icon} size={20} /><span className="flex-1">{l.title}</span><Chevron />
            </button>
          ))}
        </section>
        <p className="pt-4 text-center text-[11px] text-muted">© 2026 SCAF TRACKER. Semua hak dilindungi.</p>
      </main>
      {doc && (
        <div className="fixed inset-0 z-30 flex items-end justify-center bg-[rgba(23,33,30,0.25)] sm:items-center" onClick={() => setDoc(null)}>
          <div role="dialog" aria-modal="true" aria-label={doc.title} onClick={(e) => e.stopPropagation()} className="w-full max-w-[480px] rounded-t-[22px] bg-white p-6 sm:rounded-[22px]">
            <h2 className="text-[17px] font-bold text-ink">{doc.title}</h2>
            <p className="mt-3 text-[13px] leading-[1.7] text-muted">{doc.body}</p>
            <button type="button" onClick={() => setDoc(null)} className="mt-5 h-11 w-full cursor-pointer rounded-xl bg-mint text-[13px] font-semibold text-ink">Tutup</button>
          </div>
        </div>
      )}
    </MobileShell>
  )
}
