'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Icon } from '@/components/MobileShell'
import { formatDate, formatNumber, useTransactions } from '@/lib/transactions'

// [left %, top %, rotation, width-ish] positions taken from the confetti layer in the design.
const CONFETTI: [number, number, number][] = [
  [13, 18, 22], [32, 15, -30], [64, 14, 8], [80, 20, -18], [18, 27, -15], [78, 31, 20],
  [15, 53, -25], [32, 50, 22], [72, 55, -30], [86, 51, 10], [61, 60, 40], [22, 59, 12],
]

export default function BerhasilPage() {
  const router = useRouter()
  const { last } = useTransactions()

  useEffect(() => {
    if (!last) router.replace('/beranda')
  }, [last, router])

  if (!last) return null

  return (
    <div className="min-h-dvh bg-[#124c3d]">
      <main className="relative mx-auto flex min-h-dvh w-full max-w-[480px] flex-col items-center overflow-hidden bg-brand px-6 pb-10 text-white">
        {CONFETTI.map(([l, t, r], i) => (
          <span key={i} aria-hidden className="absolute h-2 w-1 rounded-[1px] bg-mint" style={{ left: `${l}%`, top: `${t}%`, transform: `rotate(${r}deg)` }} />
        ))}
        <div className="flex flex-1 flex-col items-center justify-center gap-7 text-center" role="status">
          <Icon name="fe97f" size={88} />
          <div className="flex flex-col gap-[22px]">
            <p className="text-[18px] font-semibold">Transaksi Berhasil Disimpan</p>
            <p className="text-[30px] font-bold">Rp {formatNumber(last.amount)}</p>
            <p className="text-[13px] text-mint">
              {last.category} · {formatDate(last.date)}
            </p>
          </div>
        </div>
        <button type="button" onClick={() => router.push('/beranda')} className="h-[52px] w-full cursor-pointer rounded-[24px] bg-white text-[14px] font-semibold text-brand transition hover:bg-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-brand">
          Kembali ke Beranda
        </button>
      </main>
    </div>
  )
}
