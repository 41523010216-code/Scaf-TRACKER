'use client'

import Link from 'next/link'
import { notFound, useParams } from 'next/navigation'
import { useState } from 'react'
import { Icon, MobileShell } from '@/components/MobileShell'
import { getArticle } from '@/lib/articles'

export default function DetailArtikelPage() {
  const { slug } = useParams<{ slug: string }>()
  const article = getArticle(slug)
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)
  if (!article) notFound()

  async function share() {
    const url = window.location.href
    if (navigator.share) {
      try { await navigator.share({ title: article!.title, url }) } catch {}
    } else {
      await navigator.clipboard?.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    }
  }

  return (
    <MobileShell>
      <header className="flex h-[70px] items-center gap-[14px] px-6 pt-4">
        <Link href="/edukasi/artikel" aria-label="Kembali" className="rounded p-0.5 outline-none focus-visible:ring-2 focus-visible:ring-brand/40">
          <Icon name="64bb9" size={20} />
        </Link>
        <div className="flex-1" />
        <div className="flex gap-5">
          <button type="button" onClick={() => setSaved((v) => !v)} aria-pressed={saved} aria-label={saved ? 'Hapus dari tersimpan' : 'Simpan artikel'} className={`cursor-pointer rounded outline-none focus-visible:ring-2 focus-visible:ring-brand/40 ${saved ? '[&>img]:[filter:none]' : ''}`}>
            {saved ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#176b57" stroke="#176b57" strokeWidth="1.8" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
            ) : (
              <Icon name="67c9f" size={22} />
            )}
          </button>
          <button type="button" onClick={share} aria-label="Bagikan artikel" className="cursor-pointer rounded outline-none focus-visible:ring-2 focus-visible:ring-brand/40">
            <Icon name="f43b0" size={22} />
          </button>
        </div>
      </header>
      {copied && <p role="status" className="mx-6 -mt-2 mb-2 rounded-lg bg-mint px-3 py-2 text-center text-[12px] text-brand">Tautan disalin</p>}

      <article className="flex flex-col gap-6 px-6 pb-10 pt-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src={`/assets/${article.slug === '5-tips-hemat-mahasiswa' ? 'aae72' : article.image}.png`} className="h-[170px] w-full rounded-[10px] object-cover" />
        <div className="flex flex-col items-start gap-[14px]">
          <span className="rounded-md bg-mint px-[10px] py-1 text-[11px] font-semibold text-ink">{article.category}</span>
          <h1 className="text-[24px] font-bold leading-[1.3] text-ink">{article.title}</h1>
          <div className="flex items-center gap-[18px] text-[11px] text-muted">
            <span className="flex items-center gap-1.5"><Icon name="79b15" size={14} />{article.minutes} menit baca</span>
            <span className="flex items-center gap-1.5"><Icon name="23678" size={14} />{article.date}</span>
          </div>
        </div>
        <p className="text-[14px] leading-[1.6] text-ink">{article.intro}</p>
        <ol className="flex flex-col gap-[22px]">
          {article.steps.map((s, i) => (
            <li key={s.title} className="flex items-start gap-[9px]">
              <span className="w-[17px] text-[13px] font-bold leading-[1.6] text-ink">{i + 1}.</span>
              <div className="flex flex-1 flex-col gap-[5px]">
                <h2 className="text-[14px] font-bold leading-[1.3] text-ink">{s.title}</h2>
                <p className="text-[13px] leading-[1.6] text-muted">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="rounded-[14px] bg-mint p-4">
          <p className="text-[13px] leading-[1.6] text-ink">{article.closing}</p>
        </div>
      </article>
    </MobileShell>
  )
}
