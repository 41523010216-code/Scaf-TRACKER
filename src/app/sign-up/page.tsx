'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Logo } from '@/components/Logo'
import { AuthShell, Checkbox, Field, PasswordField, PrimaryButton, SocialSection, SwitchLink } from '@/components/AuthParts'

export default function SignUpPage() {
  const router = useRouter()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [agree, setAgree] = useState(false)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const name = String(f.get('name')).trim()
    const email = String(f.get('email')).trim()
    const password = String(f.get('password'))
    const next: Record<string, string> = {}
    if (!name) next.name = 'Nama lengkap wajib diisi.'
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = 'Masukkan email yang valid.'
    if (password.length < 8 || !/[A-Za-z]/.test(password) || !/\d/.test(password))
      next.password = 'Minimal 8 karakter, dengan huruf dan angka.'
    if (!agree) next.agree = 'Setujui syarat dan kebijakan untuk melanjutkan.'
    setErrors(next)
    if (Object.keys(next).length === 0) router.push('/sign-in')
  }

  return (
    <AuthShell>
      <Logo className="w-[112px]" />
      <h1 className="mt-1 text-[32px] font-bold leading-[1.15] text-ink">Buat Akun Baru</h1>
      <p className="mt-3 text-[15px] leading-[1.6] text-muted">
        Mulai atur keuanganmu sekarang, <br className="hidden min-[380px]:block" />
        Satu langkah kecil untuk awal yang baru.
      </p>
      <form onSubmit={onSubmit} noValidate className="mt-7 flex flex-col gap-[18px]">
        <Field label="Nama lengkap" id="name" name="name" icon="/assets/cfaa2.svg" placeholder="Nama lengkap" autoComplete="name" error={errors.name} />
        <Field label="Email" id="email" name="email" type="email" icon="/assets/4524c.svg" placeholder="nama@email.com" autoComplete="email" error={errors.email} />
        <PasswordField label="Kata sandi" id="password" name="password" placeholder="Kata sandi" autoComplete="new-password" error={errors.password} hint="Minimal 8 karakter, dengan huruf dan angka." />
        <div>
          <Checkbox id="agree" checked={agree} onChange={setAgree}>
            <span className="text-[12px] leading-[1.65] text-muted">
              Saya menyetujui <b className="font-semibold text-ink">Syarat &amp; Ketentuan</b> serta{' '}
              <b className="font-semibold text-ink">Kebijakan Privasi</b> Sela.
            </span>
          </Checkbox>
          {errors.agree && <p role="alert" className="mt-1.5 text-[12px] text-red-600">{errors.agree}</p>}
        </div>
        <PrimaryButton type="submit">Buat akun</PrimaryButton>
      </form>
      <div className="mt-6 flex flex-col gap-4">
        <SocialSection />
        <SwitchLink text="Sudah punya akun?" href="/sign-in" label="Masuk" />
      </div>
    </AuthShell>
  )
}
