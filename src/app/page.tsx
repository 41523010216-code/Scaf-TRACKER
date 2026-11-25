'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Logo } from '@/components/Logo'

export default function SplashPage() {
  return (
    <Link
      href="/onboarding"
      aria-label="Ketuk untuk melanjutkan ke onboarding"
      className="flex min-h-dvh cursor-pointer flex-col outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand/50"
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-10 md:flex-row md:gap-16 lg:gap-24">
        <div className="flex flex-col items-center md:items-start">
          <Logo variant="large" className="w-[216px] md:w-[280px]" />
          <p className="-mt-3 max-w-[180px] text-center text-[15px] leading-[1.35] text-muted md:max-w-[240px] md:text-left md:text-[17px]">
            Kelola Keuangan Lebih Efektif Setiap Hari.
          </p>
        </div>
        <Image
          src="/assets/aeb74.png"
          alt="Ilustrasi pelacakan keuangan"
          width={408}
          height={612}
          priority
          className="h-auto w-[min(70vw,300px)] md:w-[340px] lg:w-[380px]"
        />
      </div>
      <div className="px-4 pb-10 sm:px-8">
        <p className="mb-4 animate-pulse text-center text-[13px] text-muted">Ketuk di mana saja untuk melanjutkan</p>
        <div className="mx-auto h-1.5 w-full max-w-3xl overflow-hidden rounded-[3px] bg-mint/60">
          <div className="h-full w-1/2 rounded-[3px] bg-brand" />
        </div>
      </div>
    </Link>
  )
}
