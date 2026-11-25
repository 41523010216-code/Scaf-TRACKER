'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Icon, MaskIcon, MobileShell } from '@/components/MobileShell'
import { expenseByCategory, inRange, pct, periodLabel, periodRange, shiftAnchor } from '@/lib/analytics'
import { CATEGORY_ICON, formatNumber, useTransactions } from '@/lib/transactions'

export default function AnggaranPage() {
  const { history, last } = useTransactions()
  const [tab, setTab] = useState<'anggaran' | 'target'>('anggaran')
  const [anchor, setAnchor] = useState(() => last?.date ?? '2026-10-05')
  const range = periodRange('bulan', anchor)
  const { slices } = expenseByCategory(history.filter((t) => inRange(t, range)))

  return (
    <MobileShell>
      <header className="flex h-12 items-center gap-3.5 px-6 pt-8">
        <Link href="/analisis" aria-label="Kembali" className="rounded p-0.5 outline-none focus-visible:ring-2 focus-visible:ring-brand/40">
          <Icon name="a214f" size={22} />
        </Link>
        <h1 className="text-[24px] font-bold text-ink">Anggaran</h1>
      </header>

      <main className="flex flex-1 flex-col gap-5 px-6 pb-10 pt-6">
        <div role="tablist" className="flex h-12 gap-1 rounded-xl bg-mint p-1">
          {([['anggaran', 'Anggaran'], ['target', 'Target']] as const).map(([k, l]) => (
            <button key={k} type="button" role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className={`flex-1 cursor-pointer rounded-[9px] text-[13px] transition ${tab === k ? 'bg-brand font-semibold text-white' : 'text-muted hover:text-ink'}`}>
              {l}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <button type="button" aria-label="Bulan sebelumnya" onClick={() => setAnchor(shiftAnchor('bulan', anchor, -1))} className="cursor-pointer rounded p-1 outline-none focus-visible:ring-2 focus-visible:ring-brand/40"><Icon name="f0011" size={16} /></button>
          <p className="text-[13px] font-semibold text-ink" aria-live="polite">{periodLabel('bulan', anchor)}</p>
          <button type="button" aria-label="Bulan berikutnya" onClick={() => setAnchor(shiftAnchor('bulan', anchor, 1))} className="cursor-pointer rounded p-1 outline-none focus-visible:ring-2 focus-visible:ring-brand/40"><Icon name="08e3d" size={16} /></button>
        </div>

        {tab === 'anggaran' ? (
          slices.length === 0 ? (
            <p className="py-10 text-center text-[13px] text-muted">Belum ada pengeluaran pada bulan ini.</p>
          ) : (
            <ul className="flex flex-col gap-6">
              {slices.map((s, i) => (
                <li key={s.category} className="flex flex-col gap-3.5">
                  <div className="flex items-center gap-3">
                    <span className={`flex size-[42px] shrink-0 items-center justify-center rounded-xl text-muted ${i === 0 ? 'bg-white' : 'bg-mint'}`}>
                      <MaskIcon name={CATEGORY_ICON[s.category] ?? CATEGORY_ICON.Lainnya} size={22} />
                    </span>
                    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                      <p className="text-[15px] font-semibold text-ink">{s.category}</p>
                      <p className="text-[11px] text-muted">Rp{formatNumber(s.amount)}</p>
                    </div>
                    <p className="text-[12px] font-semibold text-muted">{pct(s.pct)}</p>
                  </div>
                  <div className="h-[5px] overflow-hidden rounded-full bg-mint" role="progressbar" aria-valuenow={Math.round(s.pct)} aria-valuemin={0} aria-valuemax={100} aria-label={`${s.category} ${pct(s.pct)}`}>
                    <div className="h-full rounded-full bg-brand" style={{ width: `${s.pct}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          )
        ) : (
          <p className="rounded-xl bg-mint p-4 text-[13px] leading-normal text-muted">Belum ada target keuangan. Atur targetmu agar progres tabungan bisa dipantau di sini.</p>
        )}

        <div className="mt-2 flex flex-col items-center gap-6">
          <Link href="/transaksi/pengeluaran" className="flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-brand text-[14px] font-semibold text-white transition hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2">
            <span className="text-[18px] leading-none">+</span> Tambah Anggaran
          </Link>
          <p className="text-[11px] text-muted">Atur batas pengeluaran, wujudkan target keuanganmu.</p>
        </div>
      </main>
    </MobileShell>
  )
}
