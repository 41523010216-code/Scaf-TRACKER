'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArticleRow } from '@/components/ArticleRow'
import { CategoryChips, type Filter } from '@/components/CategoryChips'
import { Icon, MobileShell } from '@/components/MobileShell'
import { filterArticles } from '@/lib/articles'

export default function DaftarArtikelPage() {
  const [category, setCategory] = useState<Filter>('Semua')
  const list = filterArticles(category, '')

  return (
    <MobileShell>
      <header className="flex h-[70px] items-center gap-[14px] px-6 pt-4">
        <Link href="/edukasi" aria-label="Kembali" className="rounded p-0.5 outline-none focus-visible:ring-2 focus-visible:ring-brand/40">
          <Icon name="7920f" size={20} />
        </Link>
        <h1 className="flex-1 text-[21px] font-bold text-ink">Artikel Edukasi</h1>
      </header>
      <main className="flex flex-col gap-6 px-6 pb-10 pt-3">
        <CategoryChips value={category} onChange={setCategory} />
        <div>{list.map((a) => <ArticleRow key={a.slug} article={a} size={88} />)}</div>
      </main>
    </MobileShell>
  )
}
