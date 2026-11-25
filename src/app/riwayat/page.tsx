'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { BottomNav } from '@/components/BottomNav'
import { Icon, MaskIcon, MobileShell } from '@/components/MobileShell'
import { CATEGORY_ICON, formatNumber, useTransactions, type Transaction } from '@/lib/transactions'

const MONTHS_ID = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
const FILTERS = [
  { key: 'semua', label: 'Semua' },
  { key: 'pemasukan', label: 'Pemasukan' },
  { key: 'pengeluaran', label: 'Pengeluaran' },
] as const

const monthLabel = (ym: string) => {
  const [y, m] = ym.split('-').map(Number)
  return `${MONTHS_ID[m - 1]} ${y}`
}
const dayLabel = (iso: string, today: string) => {
  if (iso === today) return 'Hari ini'
  const [y, m, d] = iso.split('-').map(Number)
  return `${d} ${MONTHS_ID[m - 1]} ${y}`
}
const money = (n: number) => `RP.${formatNumber(n)}`

function Row({ tx }: { tx: Transaction }) {
  const income = tx.type === 'pemasukan'
  return (
    <Link href={`/riwayat/${tx.id}`} className="-mx-2 flex min-h-[62px] items-center gap-3 rounded-xl px-2 outline-none transition hover:bg-mint/60 focus-visible:ring-2 focus-visible:ring-brand/40">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-[11px] bg-mint text-brand">
        <MaskIcon name={CATEGORY_ICON[tx.icon ?? tx.category] ?? CATEGORY_ICON.Lainnya} size={20} />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-[5px]">
        <p className="truncate text-[12px] font-semibold text-ink">{tx.note || tx.category}</p>
        <p className="text-[10px] text-muted">
          {tx.category} · {tx.time}
        </p>
      </div>
      <p className={`whitespace-nowrap text-[12px] font-semibold ${income ? 'text-[#168a63]' : 'text-ink'}`}>
        {income ? '+' : ''}
        {money(tx.amount)}
      </p>
    </Link>
  )
}

export default function RiwayatPage() {
  const { history, last, balance } = useTransactions()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<(typeof FILTERS)[number]['key']>('semua')
  const [month, setMonth] = useState(() => (last ? last.date.slice(0, 7) : '2026-10'))
  const [newestFirst, setNewestFirst] = useState(true)

  const [today] = useState(() => {
    const d = new Date()
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  })
  const dailyLimit = Math.round(balance / 25.25 / 1000) * 1000

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase()
    const items = history.filter(
      (t) =>
        t.date.startsWith(month) &&
        (filter === 'semua' || t.type === filter) &&
        (!q || `${t.note} ${t.category}`.toLowerCase().includes(q)),
    )
    const byDay = new Map<string, Transaction[]>()
    items.forEach((t) => byDay.set(t.date, [...(byDay.get(t.date) ?? []), t]))
    return [...byDay.entries()]
      .sort(([a], [b]) => (newestFirst ? b.localeCompare(a) : a.localeCompare(b)))
      .map(([date, txs]) => ({
        date,
        txs: [...txs].sort((a, b) => b.time.localeCompare(a.time)),
        spent: txs.filter((t) => t.type === 'pengeluaran').reduce((n, t) => n + t.amount, 0),
      }))
  }, [history, month, filter, query, newestFirst])

  return (
    <MobileShell>
      <main className="flex-1 pb-[110px]">
        <header className="flex h-[70px] items-center gap-3.5 px-6 pt-4">
          <h1 className="flex-1 text-[21px] font-bold text-ink">Riwayat Transaksi</h1>
          <button type="button" onClick={() => setNewestFirst((v) => !v)} aria-label={newestFirst ? 'Urutkan dari terlama' : 'Urutkan dari terbaru'} className="cursor-pointer rounded p-0.5 outline-none focus-visible:ring-2 focus-visible:ring-brand/40">
            <Icon name="6c4cd" size={20} />
          </button>
        </header>

        <div className="flex flex-col gap-6 px-6 pb-7 pt-3">
          <label className="flex h-[46px] items-center gap-2.5 rounded-xl border border-mint bg-white p-[14px] focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20">
            <Icon name="4858d" size={18} />
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari transaksi..." aria-label="Cari transaksi" className="min-w-0 flex-1 bg-transparent text-[12px] text-ink outline-none placeholder:text-muted" />
          </label>

          <div role="tablist" className="flex gap-1 rounded-xl bg-mint p-1">
            {FILTERS.map((f) => {
              const on = filter === f.key
              return (
                <button key={f.key} type="button" role="tab" aria-selected={on} onClick={() => setFilter(f.key)} className={`h-[37px] flex-1 cursor-pointer rounded-[9px] text-[12px] transition ${on ? 'bg-brand font-semibold text-white' : 'text-muted hover:text-ink'}`}>
                  {f.label}
                </button>
              )
            })}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-[12px] font-semibold text-ink">{monthLabel(month)}</p>
            <span className="relative flex size-[18px]">
              <Icon name="ada7c" size={18} />
              <input type="month" value={month} onChange={(e) => e.target.value && setMonth(e.target.value)} aria-label="Pilih bulan" className="absolute inset-0 size-full cursor-pointer opacity-0" />
            </span>
          </div>

          {groups.length === 0 ? (
            <p className="py-10 text-center text-[13px] text-muted">Belum ada transaksi yang cocok.</p>
          ) : (
            groups.map((g) => (
              <section key={g.date} className="flex flex-col gap-2">
                <div className="flex items-center justify-between pb-[7px] text-[10px] text-muted">
                  <h2 className="font-medium">{dayLabel(g.date, today)}</h2>
                  <div className="flex items-center gap-2">
                    {g.spent > dailyLimit && (
                      <span className="flex h-3 items-center gap-1 rounded-full bg-[#d95c5c] px-[7px] text-[6.6px] font-semibold text-white" title="Pengeluaran melebihi batas harian">
                        <Icon name="6db6f" size={8} />
                        Peringatan
                      </span>
                    )}
                    <span>RP. {formatNumber(g.spent)}</span>
                  </div>
                </div>
                {g.txs.map((t) => (
                  <Row key={t.id} tx={t} />
                ))}
              </section>
            ))
          )}
        </div>
      </main>
      <BottomNav active="transaksi" />
    </MobileShell>
  )
}
