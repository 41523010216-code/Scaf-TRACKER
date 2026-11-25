'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { MobileShell } from '@/components/MobileShell'
import { Note, PageHeader, primaryBtn } from '@/components/ProfileUi'
import { useProfile, type Profile } from '@/lib/profile'

const OPTIONS: { code: Profile['language']; badge: string; name: string; native: string }[] = [
  { code: 'id', badge: 'ID', name: 'Bahasa Indonesia', native: 'Indonesia' },
  { code: 'en', badge: 'EN', name: 'Bahasa Inggris', native: 'English' },
]

export default function BahasaPage() {
  const router = useRouter()
  const { profile, update } = useProfile()
  const [lang, setLang] = useState(profile.language)
  return (
    <MobileShell>
      <PageHeader title="Bahasa" back="/profil" />
      <main className="flex flex-1 flex-col gap-6 px-6 pb-10 pt-3">
        <p className="text-[12px] leading-[1.6] text-muted">Pilih bahasa yang digunakan untuk menu, pengingat, dan informasi di aplikasi.</p>
        <div role="radiogroup" aria-label="Bahasa aplikasi" className="flex flex-col gap-2">
          <p className="text-[11px] font-semibold text-muted">BAHASA APLIKASI</p>
          {OPTIONS.map((o) => {
            const on = lang === o.code
            return (
              <button key={o.code} type="button" role="radio" aria-checked={on} onClick={() => setLang(o.code)} className="flex min-h-[68px] cursor-pointer items-center gap-[14px] border-b border-mint py-[15px] text-left outline-none focus-visible:ring-2 focus-visible:ring-brand/40">
                <span className="flex h-[34px] w-[42px] items-center justify-center rounded-md bg-mint text-[11px] font-semibold text-ink">{o.badge}</span>
                <span className="flex flex-1 flex-col gap-1">
                  <span className={`text-[13px] text-ink ${on ? 'font-semibold' : ''}`}>{o.name}</span>
                  <span className="text-[11px] text-muted">{o.native}</span>
                </span>
                <span className={`size-[19px] rounded-full ${on ? 'border-[6px] border-brand' : 'border-[1.5px] border-mint'}`} />
              </button>
            )
          })}
        </div>
        <Note icon="e0441">Mengubah bahasa tidak mengubah mata uang maupun catatan transaksi yang telah kamu buat.</Note>
        <button type="button" onClick={() => { update({ language: lang }); router.push('/profil') }} className={`${primaryBtn} mt-2`}>Simpan Pilihan</button>
      </main>
    </MobileShell>
  )
}
