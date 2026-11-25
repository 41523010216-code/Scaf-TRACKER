
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Logo } from '@/components/Logo'

export default function SplashPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/onboarding')
    }, 2500)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <main className="flex min-h-dvh flex-col">
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
        <div className="mb-4 flex items-center justify-center gap-3">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-mint border-t-brand" />

          <p className="text-[13px] text-muted">
            Menyiapkan pengalamanmu...
          </p>
        </div>

        <div className="mx-auto h-1.5 w-full max-w-3xl overflow-hidden rounded-[3px] bg-mint/60">
          <div
            className="h-full rounded-[3px] bg-brand"
            style={{
              width: '0%',
              animation: 'splashProgress 2.5s linear forwards',
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes splashProgress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </main>
  )
}
