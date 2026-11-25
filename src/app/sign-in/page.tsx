'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Logo } from '@/components/Logo'
import { AuthShell, Checkbox, Field, PasswordField, PrimaryButton, SocialSection, SwitchLink } from '@/components/AuthParts'

export default function SignInPage() {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [remember, setRemember] = useState(true)
  const router = useRouter()

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const next: Record<string, string> = {}
    if (!/^\S+@\S+\.\S+$/.test(String(f.get('email')).trim())) next.email = 'Masukkan email yang valid.'
    if (!String(f.get('password'))) next.password = 'Kata sandi wajib diisi.'
    setErrors(next)
    if (Object.keys(next).length === 0) router.push('/beranda')
  }

  return (
    <AuthShell>
      <Logo className="w-[137px]" />
      <h1 className="mt-1 text-[32px] font-bold leading-[1.15] text-ink">Masuk ke Akun</h1>
      <p className="mt-3 text-[15px] leading-[1.6] text-muted">Selamat Datang Kembali!</p>
      <form onSubmit={onSubmit} noValidate className="mt-8 flex flex-col gap-5">
        <Field label="Email" id="email" name="email" type="email" icon="/assets/4524c.svg" placeholder="nama@email.com" autoComplete="email" error={errors.email} />
        <PasswordField label="Kata sandi" id="password" name="password" placeholder="Kata sandi" autoComplete="current-password" error={errors.password} />
        <div className="flex items-center justify-between gap-3">
          <Checkbox id="remember" size={18} checked={remember} onChange={setRemember}>
            <span className="text-[12px] text-muted">Ingat saya</span>
          </Checkbox>
          <Link href="/forgot-password" className="text-[12px] font-bold text-ink hover:underline">
            Lupa kata sandi?
          </Link>
        </div>
        <PrimaryButton type="submit">Masuk</PrimaryButton>
      </form>
      <div className="mt-6 flex flex-col gap-6">
        <SocialSection />
        <SwitchLink text="Belum punya akun?" href="/sign-up" label="Daftar" />
      </div>
    </AuthShell>
  )
}
