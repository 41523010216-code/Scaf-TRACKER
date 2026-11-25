'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Logo } from '@/components/Logo'

function ForecastChart() {
  const dots: [number, number][] = [
    [51, 134],
    [96, 114],
    [136, 96],
    [181, 78],
    [226, 82],
    [276, 114],
  ]
  return (
    <div className="w-full max-w-[310px] overflow-hidden rounded-xl bg-[#f0f7f4] shadow-[0_10px_30px_-18px_rgba(23,107,87,0.4)] lg:max-w-[400px]">
      <div className="relative w-full bg-[#eef6f2]" style={{ aspectRatio: '310 / 200' }}>
        {[50, 100, 150].map((y) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={y} alt="" src="/assets/f0151.svg" className="absolute left-0 h-px w-full" style={{ top: `${(y / 200) * 100}%` }} />
        ))}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src="/assets/ca553.svg" className="absolute inset-0 size-full" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src="/assets/6164e.svg" className="absolute inset-0 size-full" />
        {dots.map(([x, y]) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={x} alt="" src="/assets/7dbfa.svg" className="absolute" style={{ left: `${(x / 310) * 100}%`, top: `${(y / 200) * 100}%`, width: '2.58%', aspectRatio: '1' }} />
        ))}
      </div>
      <div className="flex flex-col gap-1.5 bg-white p-5">
        <p className="text-[13px] font-medium text-muted">Prediksi Saldo Akhir Bulan</p>
        <p className="text-[26px] font-bold text-ink">Rp650.000</p>
        <p className="flex items-center gap-1 text-[13px] text-[#e53935]">
          <span className="font-bold">↓</span>
          <span className="font-medium">-20% dari bulan ini</span>
        </p>
      </div>
    </div>
  )
}

const slides = [
  {
    title: 'Kelola Uang Saku Dengan Lebih Mudah',
    desc: 'Catat pemasukan dan pengeluaran dalam satu aplikasi.',
    art: (
      <Image src="/assets/ba885.png" alt="Ilustrasi kartu transaksi" width={482} height={517} priority className="h-auto w-full max-w-[420px] lg:max-w-[520px]" />
    ),
  },
  {
    title: 'Lihat Analisis Pengeluaranmu',
    desc: 'Pahami pola keuangan dengan grafik yang jelas dan mudah dimengerti.',
    art: (
      <Image src="/assets/b2472.png" alt="Ilustrasi analisis pengeluaran" width={305} height={323} className="aspect-[305/323] w-full max-w-[305px] rounded-[41px] object-cover lg:max-w-[400px]" />
    ),
  },
  {
    title: 'Prediksi Saldo Untuk Masa Depan',
    desc: 'Gunakan data dan analisis untuk memperkirakan saldo serta ketahanan keuanganmu.',
    art: <ForecastChart />,
  },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [i, setI] = useState(0)
  const slide = slides[i]
  const last = i === slides.length - 1

  const next = () => (last ? router.push('/sign-in') : setI(i + 1))

  return (
    <main className="mx-auto grid min-h-dvh w-full max-w-6xl grid-cols-1 grid-rows-[auto_1fr_auto] px-7 pb-8 pt-10 lg:grid-cols-2 lg:grid-rows-[1fr_auto] lg:gap-x-16 lg:px-12 lg:py-12">
      <header className="flex flex-col items-center text-center lg:items-start lg:justify-end lg:self-end lg:pb-10 lg:text-left">
        <Logo className="w-[137px] lg:w-[180px]" />
        <h1 key={i} className="mt-9 max-w-[300px] text-[30px] font-bold leading-[1.05] text-ink lg:max-w-md lg:text-[44px] lg:leading-[1.1]">
          {slide.title}
        </h1>
        <p className="mt-6 max-w-[240px] text-[12px] font-medium leading-4 text-muted lg:max-w-sm lg:text-[16px] lg:leading-6">
          {slide.desc}
        </p>
      </header>

      <div key={`art-${i}`} className="flex items-center justify-center py-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:py-0">
        {slide.art}
      </div>

      <nav className="flex items-center justify-between lg:self-start" aria-label="Navigasi onboarding">
        <div className="flex gap-2.5 py-2.5" role="tablist">
          {slides.map((_, n) => (
            <button
              key={n}
              type="button"
              role="tab"
              aria-selected={n === i}
              aria-label={`Halaman ${n + 1}`}
              onClick={() => setI(n)}
              className={`size-2.5 cursor-pointer rounded-full bg-brand transition-opacity ${n === i ? '' : 'opacity-30 hover:opacity-60'}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-5">
          <button type="button" onClick={next} aria-label={last ? 'Mulai' : 'Lanjut'} className="cursor-pointer rounded-full outline-none transition active:scale-95 focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" src="/assets/b33b2.svg" width={50} height={50} className="size-[50px]" />
          </button>
        </div>
      </nav>
    </main>
  )
}
