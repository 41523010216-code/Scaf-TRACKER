'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Icon, MobileShell } from '@/components/MobileShell'
import { PageHeader } from '@/components/ProfileUi'
import { DEFAULT_AVATAR, useProfile } from '@/lib/profile'

export default function KeluarPage() {
  const router = useRouter()
  const { profile } = useProfile()
  return (
    <MobileShell>
      <PageHeader title="Keluar" back="/profil" />
      <main className="flex flex-1 flex-col gap-6 px-6 pb-10 pt-3">
        <div className="flex flex-col items-center gap-4 pb-2 pt-7 text-center">
          <span className="flex size-[72px] items-center justify-center rounded-full bg-mint"><Icon name="0833c" size={28} /></span>
          <h2 className="text-[22px] font-bold text-ink">Keluar dari akun?</h2>
          <p className="text-[12px] leading-[1.6] text-muted">Kamu perlu masuk kembali untuk mengakses catatan keuangan di akun ini.</p>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-mint p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src={profile.photo ?? DEFAULT_AVATAR} width={44} height={44} className="size-11 rounded-full object-cover" />
          <div className="flex min-w-0 flex-1 flex-col gap-1.5"><p className="text-[14px] font-semibold text-ink">{profile.name}</p><p className="truncate text-[10px] text-muted">{profile.email}</p></div>
        </div>
        <div className="flex items-start gap-2.5 rounded-xl bg-mint p-[14px]">
          <Icon name="95c1d" size={17} />
          <p className="flex-1 text-[11px] leading-[1.6] text-muted">Data sudah tersinkron pada 4 November 2026, 09.35. Catatanmu tetap tersimpan dengan aman di akun ini.</p>
        </div>
        <p className="text-[12px] leading-[1.6] text-muted">Keluar tidak akan menghapus akun atau riwayat transaksi. Pastikan kamu mengingat alamat email dan kata sandimu.</p>
        <div className="mt-auto flex flex-col gap-3 pt-6">
          <button type="button" onClick={() => router.replace('/sign-in')} className="flex h-[50px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-brand text-[13px] font-semibold text-white transition hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2">
            <Icon name="20d6e" size={18} /> Ya, Keluar
          </button>
          <Link href="/profil" className="flex h-[50px] w-full items-center justify-center rounded-xl bg-mint text-[13px] font-semibold text-ink transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40">Batal</Link>
        </div>
      </main>
    </MobileShell>
  )
}
