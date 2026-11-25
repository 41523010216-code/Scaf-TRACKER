'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { BottomNav } from '@/components/BottomNav'
import { Icon, MobileShell } from '@/components/MobileShell'
import {
  SLICE_COLORS, axisLabel, expenseByCategory, inRange, niceMax, pct, periodLabel, periodRange, shiftAnchor, trend, type PeriodKind,
} from '@/lib/analytics'
import { formatNumber, useTransactions } from '@/lib/transactions'

const KINDS: { key: PeriodKind; label: string }[] = [
  { key: 'minggu', label: 'Minggu' },
  { key: 'bulan', label: 'Bulan' },
  { key: 'tahun', label: 'Tahun' },
]

function Donut({ slices, total }: { slices: { amount: number; pct: number }[]; total: number }) {
  const r = 70
  const c = 2 * Math.PI * r
  let offset = 0
  return (
    <div className="relative size-[164px] shrink-0">
      <svg viewBox="0 0 164 164" className="size-full -rotate-90" role="img" aria-label="Diagram pengeluaran per kategori">
        <circle cx="82" cy="82" r={r} fill="none" stroke="#e8f3ef" strokeWidth="22" />
        {slices.map((s, i) => {
          const len = (s.pct / 100) * c
          const el = <circle key={i} cx="82" cy="82" r={r} fill="none" stroke={SLICE_COLORS[i % SLICE_COLORS.length]} strokeWidth="22" strokeDasharray={`${Math.max(len - 1.5, 0)} ${c}`} strokeDashoffset={-offset} />
          offset += len
          return el
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <p className="text-[9px] text-muted">Total Pengeluaran</p>
        <p className="text-[17px] font-bold text-[#d95c5c]">Rp{formatNumber(total)}</p>
      </div>
    </div>
  )
}

function TrendChart({ points }: { points: ReturnType<typeof trend> }) {
  const W = 300
  const H = 180
  const max = niceMax(Math.max(...points.map((p) => Math.max(p.income, p.expense))))
  const x = (i: number) => (points.length === 1 ? W / 2 : 6 + (i / (points.length - 1)) * (W - 12))
  const y = (v: number) => H - 1 - (v / max) * (H - 4)
  const line = (key: 'income' | 'expense') => points.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(p[key]).toFixed(1)}`).join(' ')
  const ticks = [1, 2 / 3, 1 / 3, 0].map((f) => f * max)
  const step = Math.max(1, Math.ceil(points.length / 6))
  return (
    <div className="flex gap-2">
      <div className="flex h-[185px] shrink-0 flex-col justify-between whitespace-nowrap text-[8px] text-muted">
        {ticks.map((t) => <span key={t}>{axisLabel(t)}</span>)}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full overflow-visible" role="img" aria-label="Tren pemasukan dan pengeluaran">
          {[0, 60, 120, 179].map((g) => <line key={g} x1="0" x2={W} y1={g} y2={g} stroke="#e8f3ef" />)}
          <path d={line('income')} fill="none" stroke="#16ba63" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
          <path d={line('expense')} fill="none" stroke="#d95c5c" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
        <div className="relative h-[10px] text-[8px] text-muted">
          {points.map((p, i) => i % step === 0 && (
            <span key={i} className="absolute top-0 -translate-x-1/2 whitespace-nowrap" style={{ left: `${(x(i) / W) * 100}%` }}>{p.label}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function AnalisisPage() {
  const { history, last } = useTransactions()
  const [kind, setKind] = useState<PeriodKind>('bulan')
  const [anchor, setAnchor] = useState(() => last?.date ?? '2026-10-05')

  const range = periodRange(kind, anchor)
  const list = useMemo(() => history.filter((t) => inRange(t, range)), [history, range[0], range[1]]) // eslint-disable-line react-hooks/exhaustive-deps
  const { total, slices } = expenseByCategory(list)
  const points = trend(kind, anchor, history)
  const top = slices[0]

  return (
    <MobileShell>
      <main className="flex-1 pb-[110px]">
        <header className="flex h-[70px] items-center px-6 pt-4">
          <h1 className="flex-1 text-[21px] font-bold text-ink">Analisis</h1>
        </header>

        <div className="flex flex-col gap-6 px-6 pb-7 pt-3">
          <div role="tablist" className="flex gap-1 rounded-xl bg-mint p-1">
            {KINDS.map((k) => {
              const on = kind === k.key
              return (
                <button key={k.key} type="button" role="tab" aria-selected={on} onClick={() => setKind(k.key)} className={`h-[37px] flex-1 cursor-pointer rounded-[9px] text-[12px] transition ${on ? 'bg-brand font-semibold text-white' : 'text-muted hover:text-ink'}`}>
                  {k.label}
                </button>
              )
            })}
          </div>

          <div className="flex items-center justify-between">
            <button type="button" aria-label="Periode sebelumnya" onClick={() => setAnchor(shiftAnchor(kind, anchor, -1))} className="cursor-pointer rounded p-1 outline-none focus-visible:ring-2 focus-visible:ring-brand/40"><Icon name="f0011" size={16} /></button>
            <p className="text-[13px] font-semibold text-ink" aria-live="polite">{periodLabel(kind, anchor)}</p>
            <button type="button" aria-label="Periode berikutnya" onClick={() => setAnchor(shiftAnchor(kind, anchor, 1))} className="cursor-pointer rounded p-1 outline-none focus-visible:ring-2 focus-visible:ring-brand/40"><Icon name="08e3d" size={16} /></button>
          </div>

          <section className="flex flex-col gap-5">
            <Link href="/anggaran" className="flex items-center justify-between rounded outline-none focus-visible:ring-2 focus-visible:ring-brand/40">
              <h2 className="text-[17px] font-bold text-ink">Pengeluaran per Kategori</h2>
            </Link>
            {total === 0 ? (
              <p className="py-8 text-center text-[13px] text-muted">Belum ada pengeluaran pada periode ini.</p>
            ) : (
              <Link href="/anggaran" aria-label="Lihat anggaran per kategori" className="flex cursor-pointer flex-col gap-5 rounded-xl outline-none transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-brand/40">
                <div className="flex items-center gap-6">
                  <Donut slices={slices} total={total} />
                  <ul className="flex min-w-0 flex-1 flex-col gap-4">
                    {slices.map((s, i) => (
                      <li key={s.category} className="flex items-center gap-[7px]">
                        <span className="size-[7px] shrink-0 rounded-full" style={{ background: SLICE_COLORS[i % SLICE_COLORS.length] }} />
                        <span className="min-w-0 flex-1 truncate text-[11px] text-muted">{s.category}</span>
                        <span className="whitespace-nowrap text-[11px] font-semibold text-ink">{pct(s.pct)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <ul className="flex flex-col gap-[11px] text-[11px]">
                  {slices.map((s) => (
                    <li key={s.category} className="flex justify-between">
                      <span className="text-muted">{s.category}</span>
                      <span className="font-medium text-ink">Rp{formatNumber(s.amount)}</span>
                    </li>
                  ))}
                </ul>
              </Link>
            )}
          </section>

          <section className="flex flex-col gap-[18px]">
            <h2 className="text-[17px] font-bold text-ink">Tren Pemasukan &amp; Pengeluaran</h2>
            <div className="flex justify-center gap-[23px] text-[10px] text-muted">
              <span className="flex items-center gap-1.5"><span className="size-[7px] rounded-full bg-[#16ba63]" />Pemasukan</span>
              <span className="flex items-center gap-1.5"><span className="size-[7px] rounded-full bg-[#d95c5c]" />Pengeluaran</span>
            </div>
            <TrendChart points={points} />
          </section>

          <section className="flex flex-col gap-[14px] rounded-[14px] bg-mint p-[18px]">
            <div className="flex items-center gap-2">
              <Icon name="acd1c" size={19} />
              <h3 className="text-[15px] font-semibold text-ink">Insight Keuangan</h3>
            </div>
            <p className="text-[12px] leading-normal text-muted">
              {top
                ? `Pengeluaran terbesarmu ada di kategori ${top.category.toLowerCase()}. ${top.category === 'Makanan' ? 'Coba kurangi jajan dan sisihkan lebih banyak untuk tabungan.' : 'Coba tinjau lagi apakah semuanya benar-benar perlu, lalu sisihkan lebih banyak untuk tabungan.'}`
                : 'Catat transaksimu agar kami bisa memberi insight keuangan yang sesuai.'}
            </p>
          </section>
        </div>
      </main>
      <BottomNav active="analisis" />
    </MobileShell>
  )
}
