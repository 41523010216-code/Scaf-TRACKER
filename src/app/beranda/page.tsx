'use client'

import Link from 'next/link'
import { useState } from 'react'
import { BottomNav } from '@/components/BottomNav'
import { Icon, MobileShell } from '@/components/MobileShell'
import { DEFAULT_AVATAR, useProfile } from '@/lib/profile'
import { formatNumber, rupiah, useTransactions } from '@/lib/transactions'

const DOTS: [number, number][] = [
  [3, 2],
  [9, 13],
  [18, 29],
  [30, 43],
  [43, 59],
]
const DATES: [string, number][] = [
  ['01 Okt', 0],
  ['06 Okt', 54],
  ['11 Okt', 109],
  ['21 Okt', 169],
  ['26 Okt', 229],
  ['31 Okt', 286],
]

export default function BerandaPage() {
  const { balance, income, expense } = useTransactions()
  const { profile } = useProfile()
  const [hidden, setHidden] = useState(false)

  const daily = Math.max(0, Math.round(balance / 25.25 / 1000) * 1000)

  return (
    <MobileShell>
      <main className="flex-1 pb-[110px]">
        <section className="flex flex-col gap-5 px-6 pb-7 pt-8">
          <Link href="/profil" aria-label="Buka profil" className="flex items-center justify-between rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-brand/40">
            <div className="flex flex-col gap-[7px]">
              <h1 className="text-[21px] font-bold leading-none text-ink">Halo, {profile.name}</h1>
              <p className="text-[12px] text-muted">Yuk, kelola keuanganmu!</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="Foto profil" src={profile.photo ?? DEFAULT_AVATAR} width={36} height={36} className="size-9 rounded-full object-cover" />
          </Link>

          <div className="flex min-h-[120px] flex-col justify-between gap-[15px] rounded-[14px] bg-brand p-5 text-white">
            <p className="text-[12px]">Total Saldo</p>
            <div className="flex items-center justify-between gap-3">
              <p className="whitespace-nowrap text-[30px] font-bold leading-none" aria-live="polite">
                {hidden ? 'Rp. ••••••' : `Rp. ${formatNumber(balance)}`}
              </p>
              <button type="button" onClick={() => setHidden((v) => !v)} aria-label={hidden ? 'Tampilkan saldo' : 'Sembunyikan saldo'} className="cursor-pointer rounded p-0.5 outline-none focus-visible:ring-2 focus-visible:ring-white/60">
                <Icon name="31a41" size={21} />
              </button>
            </div>
          </div>

          <div className="flex gap-8 pb-1.5 pt-[3px]">
            <div className="flex flex-1 flex-col gap-[9px]">
              <p className="text-[12px] text-muted">Pemasukan bulan ini</p>
              <p className="text-[19px] font-bold text-[#168a63]">{rupiah(income)}</p>
            </div>
            <div className="flex w-[143px] flex-col gap-[9px]">
              <p className="text-[12px] text-muted">Pengeluaran bulan ini</p>
              <p className="text-[19px] font-bold text-[#d95c5c]">{rupiah(expense)}</p>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-[22px] px-6 pb-[26px] pt-3">
          <h2 className="text-[19px] font-bold text-ink">Ringkasan Keuangan</h2>
          <div className="flex gap-4">
            <div className="flex min-w-0 flex-1 flex-col gap-3 rounded-[14px] bg-white p-4">
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-[14px] bg-brand">
                  <Icon name="77d70" size={14} />
                </span>
                <p className="whitespace-nowrap text-[12px] font-semibold text-muted">Batas per hari</p>
              </div>
              <div className="flex flex-col gap-0.5 whitespace-nowrap">
                <p className="text-[24px] font-bold tracking-[-0.8px] text-ink">{rupiah(daily)}</p>
                <p className="text-[12px] font-semibold text-muted">/ hari</p>
              </div>
              <p className="text-[11px] leading-[1.5] text-muted">Batas harian untuk pengeluaran agar saldo tetap aman.</p>
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-3 rounded-[14px] bg-white p-4">
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-[14px] bg-brand">
                  <Icon name="f2027" size={14} />
                </span>
                <p className="whitespace-nowrap text-[12px] font-semibold text-muted">Saldo habis</p>
              </div>
              <p className="whitespace-nowrap text-[28px] font-bold tracking-[-0.8px] text-ink">30 Okt</p>
              <p className="text-[11px] leading-[1.5] text-muted">Perkiraan tanggal saldo mencapai saldo habis berdasarkan pola pengeluaran saat ini.</p>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-5 px-6 pt-4">
          <div className="flex items-center pb-1">
            <h2 className="flex-1 text-[17px] font-bold text-ink">Prediksi saldo</h2>
            <p className="text-[10px] text-muted">Oktober 2026</p>
          </div>
          <div className="flex gap-2 pb-2">
            <div className="flex h-[185px] w-[35px] shrink-0 flex-col justify-between whitespace-nowrap text-[8px] text-muted">
              <span>3 jt</span>
              <span>2,75 jt</span>
              <span>2,5 jt</span>
              <span>2,25 jt</span>
              <span>0</span>
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-3">
              <div className="relative w-full" style={{ aspectRatio: '294 / 180' }}>
                {[0, 45, 90, 135, 179].map((y) => (
                  <div key={y} className="absolute inset-x-0 h-px bg-mint" style={{ top: `${(y / 180) * 100}%` }} />
                ))}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" src="/assets/5f9d1.svg" className="absolute block max-w-none" style={{ left: `${(6 / 294) * 100}%`, top: `${(5 / 180) * 100}%`, width: `${(288.8 / 294) * 100}%`, height: `${(176.4 / 180) * 100}%` }} />
                {DOTS.map(([x, y]) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={x} alt="" src="/assets/90d89.svg" className="absolute" style={{ left: `${(x / 294) * 100}%`, top: `${(y / 180) * 100}%`, width: `${(6 / 294) * 100}%`, aspectRatio: '1' }} />
                ))}
              </div>
              <div className="relative h-[10px] text-[8px] text-muted">
                {DATES.map(([d, x]) => (
                  <span key={d} className="absolute top-0 whitespace-nowrap" style={{ left: `${(x / 294) * 100}%` }}>
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-1.5 pb-2">
            <Icon name="9fa55" size={15} />
            <p className="text-[10px] text-muted">Saldo aktual berdasarkan riwayat pengeluaran</p>
          </div>
        </section>

        <section className="px-6 pb-2 pt-[10px]">
          <div className="flex flex-col gap-[14px] rounded-[14px] bg-mint p-[18px]">
            <div className="flex items-center gap-2">
              <Icon name="c4634" size={19} />
              <h3 className="text-[16px] font-bold text-ink">Tips Keuangan</h3>
            </div>
            <p className="text-[13px] leading-[1.7] text-muted">Sisihkan 20% uang sakumu untuk tabungan agar masa depan lebih aman.</p>
            <div className="flex justify-end pt-1">
              <button type="button" className="cursor-pointer text-[10px] font-bold text-brand">LIHAT TIPS</button>
            </div>
          </div>
        </section>
      </main>

      <BottomNav active="beranda" />
    </MobileShell>
  )
}
