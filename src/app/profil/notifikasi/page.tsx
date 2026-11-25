'use client'

import { MobileShell, Icon } from '@/components/MobileShell'
import { Chevron, PageHeader, SectionLabel, SettingRow, Switch } from '@/components/ProfileUi'
import { formatTime, useProfile } from '@/lib/profile'

export default function NotifikasiPage() {
  const { profile, updateNotif } = useProfile()
  const n = profile.notif
  const off = !n.master
  return (
    <MobileShell>
      <PageHeader title="Notifikasi" back="/profil" />
      <main className="flex flex-1 flex-col gap-3 px-6 pb-10 pt-3">
        <p className="pb-3 text-[12px] leading-[1.6] text-muted">Atur pengingat agar pencatatan keuanganmu tetap terjaga, tanpa notifikasi berlebihan.</p>
        <SettingRow title="Aktifkan notifikasi" subtitle="Terima pemberitahuan dari SCAF TRACKER" trailing={<Switch checked={n.master} onChange={(v) => updateNotif({ master: v })} label="Aktifkan notifikasi" />} />

        <SectionLabel>Pengingat keuangan</SectionLabel>
        <SettingRow disabled={off} title="Pengingat catat transaksi" subtitle="Ingatkan untuk mencatat setiap hari" trailing={<Switch disabled={off} checked={n.reminder} onChange={(v) => updateNotif({ reminder: v })} label="Pengingat catat transaksi" />} />
        <div className={`relative ${off || !n.reminder ? 'opacity-50' : ''}`}>
          <SettingRow leading={<Icon name="982f8" size={20} />} title="Waktu pengingat" trailing={<><span className="text-[11px] text-muted">{formatTime(n.time)}</span><Chevron /></>} />
          <input type="time" aria-label="Waktu pengingat" value={n.time} disabled={off || !n.reminder} onChange={(e) => e.target.value && updateNotif({ time: e.target.value })} className="absolute inset-0 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed" />
        </div>
        <SettingRow disabled={off} title="Peringatan anggaran" subtitle="Saat pengeluaran mencapai 80% anggaran" trailing={<Switch disabled={off} checked={n.budget} onChange={(v) => updateNotif({ budget: v })} label="Peringatan anggaran" />} />

        <SectionLabel>Ringkasan &amp; informasi</SectionLabel>
        <SettingRow disabled={off} title="Ringkasan mingguan" subtitle="Laporan keuangan setiap Senin" trailing={<Switch disabled={off} checked={n.weekly} onChange={(v) => updateNotif({ weekly: v })} label="Ringkasan mingguan" />} />
        <SettingRow disabled={off} title="Tips & edukasi" subtitle="Inspirasi untuk mengelola keuangan" trailing={<Switch disabled={off} checked={n.tips} onChange={(v) => updateNotif({ tips: v })} label="Tips dan edukasi" />} />

        <p className="pt-6 text-[12px] text-muted">Perubahan preferensi tersimpan otomatis.</p>
      </main>
    </MobileShell>
  )
}
