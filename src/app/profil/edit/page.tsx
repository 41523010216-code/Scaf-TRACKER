'use client'

import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { Icon, MobileShell } from '@/components/MobileShell'
import { PageHeader, primaryBtn } from '@/components/ProfileUi'
import { DEFAULT_AVATAR, useProfile } from '@/lib/profile'
import { formatDateLong } from '@/lib/transactions'

const field = 'flex h-[46px] items-center gap-2 rounded-lg border border-mint bg-white/60 px-[14px] focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20'
const input = 'min-w-0 flex-1 bg-transparent text-[12px] text-ink outline-none placeholder:text-muted'

export default function EditProfilPage() {
  const router = useRouter()
  const { profile, update } = useProfile()
  const [name, setName] = useState(profile.name)
  const [email, setEmail] = useState(profile.email)
  const [phone, setPhone] = useState(profile.phone)
  const [birth, setBirth] = useState(profile.birth)
  const [photo, setPhoto] = useState(profile.photo)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const fileRef = useRef<HTMLInputElement>(null)

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f || !f.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = () => setPhoto(String(reader.result))
    reader.readAsDataURL(f)
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const next: Record<string, string> = {}
    if (!name.trim()) next.name = 'Nama wajib diisi.'
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) next.email = 'Masukkan email yang valid.'
    if (phone && !/^[0-9+\-\s]{8,16}$/.test(phone)) next.phone = 'Nomor telepon tidak valid.'
    setErrors(next)
    if (Object.keys(next).length) return
    update({ name: name.trim(), email: email.trim(), phone: phone.trim(), birth, photo })
    router.push('/profil/informasi')
  }

  const label = 'text-[11px] text-muted'
  return (
    <MobileShell>
      <PageHeader title="Edit Profil" back="/profil/informasi" />
      <form onSubmit={submit} noValidate className="flex flex-1 flex-col gap-6 px-6 pb-10 pt-3">
        <div className="flex flex-col items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="Foto profil" src={photo ?? DEFAULT_AVATAR} width={72} height={72} className="size-[72px] rounded-full object-cover" />
          <button type="button" onClick={() => fileRef.current?.click()} className="cursor-pointer text-[11px] font-semibold text-ink hover:underline">Ubah Foto Profil</button>
          <input ref={fileRef} type="file" accept="image/*" onChange={onFile} className="hidden" aria-label="Pilih foto profil" />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2"><label htmlFor="name" className={label}>Nama</label><div className={field}><input id="name" value={name} onChange={(e) => setName(e.target.value)} className={input} /></div>{errors.name && <p role="alert" className="text-[11px] text-[#d95c5c]">{errors.name}</p>}</div>
          <div className="flex flex-col gap-2"><label htmlFor="email" className={label}>Alamat email</label><div className={field}><input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={input} /></div>{errors.email && <p role="alert" className="text-[11px] text-[#d95c5c]">{errors.email}</p>}</div>
          <div className="flex flex-col gap-2"><label htmlFor="phone" className={label}>Nomor telepon (opsional)</label><div className={field}><input id="phone" type="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Tambahkan nomor telepon" className={input} /></div>{errors.phone && <p role="alert" className="text-[11px] text-[#d95c5c]">{errors.phone}</p>}</div>
          <div className="flex flex-col gap-2">
            <label htmlFor="birth" className={label}>Tanggal lahir (opsional)</label>
            <div className={`${field} relative`}>
              <span className={`flex-1 text-[12px] ${birth ? 'text-ink' : 'text-muted'}`}>{birth ? formatDateLong(birth) : 'Pilih tanggal lahir'}</span>
              <Icon name="1dd7f" size={17} />
              <input id="birth" type="date" value={birth} max={new Date().toISOString().slice(0, 10)} onChange={(e) => setBirth(e.target.value)} className="absolute inset-0 size-full cursor-pointer opacity-0" />
            </div>
          </div>
        </div>

        <p className="text-[12px] leading-[1.6] text-muted">Jika alamat email diubah, kami akan mengirim tautan verifikasi ke alamat email barumu.</p>
        <button type="submit" className={`${primaryBtn} mt-2`}>Simpan Perubahan</button>
      </form>
    </MobileShell>
  )
}
