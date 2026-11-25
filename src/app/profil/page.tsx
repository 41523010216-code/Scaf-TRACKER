'use client'

import Link from 'next/link'
import { useState } from 'react'
import { BottomNav } from '@/components/BottomNav'
import { Icon, MobileShell } from '@/components/MobileShell'
import { Chevron, Switch } from '@/components/ProfileUi'
import { DEFAULT_AVATAR, useProfile } from '@/lib/profile'

export default function ProfilPage() {
  const { profile, updateNotif } = useProfile()
  const [menu, setMenu] = useState(false)

  const row = 'flex h-[54px] items-center gap-3.5 border-b border-mint outline-none transition hover:bg-mint/40 focus-visible:ring-2 focus-visible:ring-brand/40'
  const items = [
    { href: '/profil/informasi', icon: '1aee4', label: 'Informasi Pribadi' },
    { href: '/profil/keamanan', icon: '8ff6b', label: 'Keamanan' },
    { href: '/profil/bahasa', icon: '6b9d9', label: 'Bahasa', value: profile.language === 'id' ? 'Indonesia' : 'English' },
    { href: '/profil/bantuan', icon: '8093d', label: 'Bantuan & Dukungan' },
    { href: '/profil/tentang', icon: 'f13af', label: 'Tentang Aplikasi' },
  ]

  return (
    <MobileShell>
      <main className="flex-1 pb-[110px]">
        <header className="flex h-[70px] items-center gap-3.5 px-6 pt-4">
          <Link href="/beranda" aria-label="Kembali" className="rounded p-0.5 outline-none focus-visible:ring-2 focus-visible:ring-brand/40"><Icon name="3590e" size={20} /></Link>
          <h1 className="flex-1 text-[24px] font-bold text-ink">Profil</h1>
          <div className="relative">
            <button type="button" onClick={() => setMenu((v) => !v)} aria-label="Menu lainnya" aria-expanded={menu} className="cursor-pointer rounded p-1 outline-none focus-visible:ring-2 focus-visible:ring-brand/40"><Icon name="f8c48" size={20} /></button>
            {menu && (
              <div className="absolute right-0 top-9 z-10 w-44 overflow-hidden rounded-xl border border-mint bg-white shadow-lg" onClick={() => setMenu(false)}>
                <Link href="/profil/edit" className="block px-4 py-3 text-[13px] text-ink hover:bg-mint/60">Edit Profil</Link>
                <Link href="/profil/keluar" className="block px-4 py-3 text-[13px] text-[#d95c5c] hover:bg-mint/60">Keluar</Link>
              </div>
            )}
          </div>
        </header>

        <div className="flex flex-col gap-6 px-6 pb-6 pt-3">
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="Foto profil" src={profile.photo ?? DEFAULT_AVATAR} width={80} height={80} className="size-20 rounded-full object-cover" />
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <p className="truncate text-[22px] font-bold text-ink">{profile.name}</p>
              <p className="truncate text-[12px] text-muted">{profile.email}</p>
              <Link href="/profil/edit" className="text-[11px] font-semibold text-brand hover:underline">Edit Profil</Link>
            </div>
            <Link href="/profil/edit" aria-label="Edit profil" className="rounded p-1 outline-none focus-visible:ring-2 focus-visible:ring-brand/40"><Icon name="2aad4" size={20} /></Link>
          </div>

          <nav aria-label="Pengaturan">
            <Link href={items[0].href} className={row}><Icon name={items[0].icon} size={20} /><span className="flex-1 text-[13px] text-ink">{items[0].label}</span><Chevron /></Link>
            <div className={row}>
              <Link href="/profil/notifikasi" className="flex flex-1 items-center gap-3.5 self-stretch outline-none"><Icon name="ab0bc" size={20} /><span className="flex-1 text-[13px] text-ink">Notifikasi</span></Link>
              <Switch checked={profile.notif.master} onChange={(v) => updateNotif({ master: v })} label="Aktifkan notifikasi" />
            </div>
            {items.slice(1).map((it) => (
              <Link key={it.href} href={it.href} className={row}>
                <Icon name={it.icon} size={20} />
                <span className="flex-1 text-[13px] text-ink">{it.label}</span>
                {it.value && <span className="text-[10px] text-muted">{it.value}</span>}
                <Chevron />
              </Link>
            ))}
          </nav>

          <Link href="/profil/keluar" className="flex h-[50px] items-center gap-3.5 rounded-xl bg-mint px-4 text-[13px] font-semibold text-[#d95c5c] outline-none transition hover:brightness-95 focus-visible:ring-2 focus-visible:ring-brand/40">
            <Icon name="946aa" size={18} /> Keluar
          </Link>

          <div className="flex flex-col items-center gap-1.5 pt-2 text-center">
            <p className="text-[14px] font-bold tracking-wide text-ink">SCAF TRACKER</p>
            <p className="text-[10px] text-muted">Versi 1.0.0</p>
            <p className="text-[10px] text-muted">Kelola keuanganmu, wujudkan impianmu.</p>
          </div>
        </div>
      </main>
      <BottomNav />
    </MobileShell>
  )
}
