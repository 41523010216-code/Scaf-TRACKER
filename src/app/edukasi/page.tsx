'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArticleRow } from '@/components/ArticleRow'
import { BottomNav } from '@/components/BottomNav'
import { CategoryChips, type Filter } from '@/components/CategoryChips'
import { Icon, MobileShell } from '@/components/MobileShell'
import { filterArticles } from '@/lib/articles'

export default function EdukasiPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<Filter>('Semua')
  const all = filterArticles(category, query)
  const filtering = category !== 'Semua' || query.trim() !== ''
  const list = filtering ? all : all.slice(0, 3)

  return (
    <MobileShell>
      <main className="flex-1 pb-[110px]">
        <header className="flex h-[70px] items-center gap-[14px] px-6 pt-4">
          <h1 className="flex-1 text-[21px] font-bold text-ink">Edukasi Keuangan</h1>
          {/* eslint-disable-next-line @next/next/no-img-element */}
        </header>

        <div className="flex flex-col gap-6 px-6 pb-7 pt-3">
          <p className="text-[14px] leading-[1.6] text-muted">Belajar sedikit, kelola banyak 💡</p>

          <label className="flex h-[46px] items-center gap-2.5 rounded-[14px] bg-white px-[14px] focus-within:ring-2 focus-within:ring-brand/20">
            <Icon name="4858d" size={18} />
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari topik, artikel, atau tips..." aria-label="Cari artikel" className="min-w-0 flex-1 bg-transparent text-[12px] text-ink outline-none placeholder:text-[#9ca3af]" />
          </label>

          <CategoryChips value={category} onChange={setCategory} />

          <section className="flex min-h-[180px] items-center gap-2 rounded-[14px] bg-brand p-5">
            <div className="flex flex-1 flex-col items-start gap-[18px]">
              <p className="max-w-[190px] text-[17px] font-bold leading-[1.4] text-white">Mulai perjalanan keuangan yang lebih baik bersama Cuanly</p>
              <Link href="/edukasi/artikel" className="flex h-8 items-center gap-1.5 rounded-full bg-white px-3 text-[10px] font-semibold text-ink outline-none transition hover:bg-mint focus-visible:ring-2 focus-visible:ring-white/70">
                Jelajahi sekarang <Icon name="aa855" size={12} />
              </Link>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" src="/assets/415eb.png" width={110} height={145} className="h-[145px] w-[110px] shrink-0 rounded-[10px] object-cover" />
          </section>

          <section className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h2 className="text-[19px] font-bold leading-[1.3] text-ink">{filtering ? 'Hasil Pencarian' : 'Artikel Pilihan'}</h2>
              <Link href="/edukasi/artikel" className="text-[11px] font-semibold text-brand hover:underline">Lihat semua →</Link>
            </div>
            {list.length === 0 ? (
              <p className="py-10 text-center text-[13px] text-muted">Artikel tidak ditemukan.</p>
            ) : (
              <div>{list.map((a) => <ArticleRow key={a.slug} article={a} size={70} />)}</div>
            )}
          </section>
        </div>
      </main>
      <BottomNav active="edukasi" />
    </MobileShell>
  )
}
