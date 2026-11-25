'use client'

import Link from 'next/link'
import { Icon, MobileShell } from '@/components/MobileShell'
import { Note, PageHeader, SectionLabel, primaryBtn } from '@/components/ProfileUi'
import { DEFAULT_AVATAR, useProfile } from '@/lib/profile'
import { formatDateLong } from '@/lib/transactions'

export default function InformasiPribadiPage() {
  const { profile } = useProfile()
  const empty = <span className="text-[11px] text-muted">Belum ditambahkan</span>
  const row = 'flex items-center justify-between gap-4 border-b border-mint py-4 text-[14px] text-ink'
  return (
    <MobileShell>
      <PageHeader title="Informasi Pribadi" back="/profil" />
      <main className="flex flex-1 flex-col gap-6 px-6 pb-10 pt-3">
        <div className="flex flex-col items-center gap-2 pt-2 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="Foto profil" src={profile.photo ?? DEFAULT_AVATAR} width={72} height={72} className="size-[72px] rounded-full object-cover" />
          <p className="pt-2 text-[22px] font-bold text-ink">{profile.name}</p>
          <p className="text-[12px] text-muted">{profile.email}</p>
        </div>
        <section>
          <SectionLabel>Data diri</SectionLabel>
          <div className={row}><span>Nama</span><span className="text-[11px] text-muted">{profile.name}</span></div>
          <div className="flex flex-col gap-1.5 border-b border-mint py-4"><span className="text-[14px] text-ink">Alamat email</span><span className="text-[11px] text-muted">{profile.email}</span></div>
          <div className={row}><span>Nomor telepon</span>{profile.phone ? <span className="text-[11px] text-muted">{profile.phone}</span> : empty}</div>
          <div className={row}><span>Tanggal lahir</span>{profile.birth ? <span className="text-[11px] text-muted">{formatDateLong(profile.birth)}</span> : empty}</div>
        </section>
        <Note icon="dbc5f">Informasi pribadimu hanya digunakan untuk mengelola akun dan tidak ditampilkan ke pengguna lain.</Note>
        <Link href="/profil/edit" className={`${primaryBtn} mt-2`}><Icon name="c9a5d" size={18} /> Edit Profil</Link>
      </main>
    </MobileShell>
  )
}
