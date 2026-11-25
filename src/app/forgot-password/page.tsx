'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { AuthShell, Field, PrimaryButton, SwitchLink } from '@/components/AuthParts'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const email = String(new FormData(e.currentTarget).get('email')).trim()
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Masukkan email yang valid.')
      setSent(false)
      return
    }
    setError('')
    setSent(true)
  }

  return (
    <AuthShell>
      <div className="flex flex-col gap-8">
        <button type="button" onClick={() => router.back()} aria-label="Kembali" className="-ml-2 w-fit cursor-pointer rounded p-2 outline-none focus-visible:ring-2 focus-visible:ring-brand/40">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src="/assets/88c6c.svg" width={10.5} height={20} className="h-5 w-[10.5px] rotate-180" />
        </button>
        <div className="flex flex-col gap-6">
          <div className="flex size-16 items-center justify-center rounded-[20px] bg-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="" src="/assets/e86d2.svg" width={28} height={28} className="size-7" />
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-[32px] font-bold leading-[1.15] text-ink">
              Lupa kata
              <br />
              sandi?
            </h1>
            <p className="text-[15px] leading-[1.6] text-muted">
              Tenang, kami bantu. Masukkan email yang terdaftar untuk menerima tautan reset kata sandi.
            </p>
          </div>
        </div>
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
          <Field label="Email" id="email" name="email" type="email" icon="/assets/4524c.svg" placeholder="nama@email.com" autoComplete="email" error={error} />
          <PrimaryButton type="submit">Kirim tautan reset</PrimaryButton>
          {sent && (
            <p role="status" className="text-center text-[13px] text-brand">
              Tautan reset telah dikirim. Periksa kotak masukmu.
            </p>
          )}
        </form>
        <div className="flex items-start gap-3 rounded-[14px] bg-mint p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src="/assets/32a0a.svg" width={18} height={18} className="size-[18px] shrink-0" />
          <p className="text-[12px] leading-[1.6] text-muted">
            Periksa folder spam jika email dari Sela belum muncul di kotak masukmu.
          </p>
        </div>
      </div>
      <div className="mt-4">
      </div>
    </AuthShell>
  )
}
