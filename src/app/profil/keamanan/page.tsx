'use client'

import { Icon, MobileShell } from '@/components/MobileShell'
import { Chevron, Note, PageHeader, SectionLabel, SettingRow, Switch } from '@/components/ProfileUi'
import { useProfile } from '@/lib/profile'

const LOCKS = ['Segera', '1 menit', '5 menit', '15 menit']

function PickerRow({ title, value, options, onChange, disabled }: { title: string; value: string; options: string[]; onChange: (v: string) => void; disabled?: boolean }) {
  return (
    <div className="relative">
      <SettingRow disabled={disabled} title={title} trailing={<><span className="text-[11px] text-muted">{value}</span><Chevron /></>} />
      <select aria-label={title} value={value} disabled={disabled} onChange={(e) => onChange(e.target.value)} className="absolute inset-0 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed">
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}

export default function KeamananPage() {
  const { profile, updateSecurity } = useProfile()
  const s = profile.security
  return (
    <MobileShell>
      <PageHeader title="Keamanan" back="/profil" />
      <main className="flex flex-1 flex-col gap-3 px-6 pb-10 pt-3">
        <Note icon="85469">Lindungi akses ke akun dan catatan keuanganmu dengan lapisan keamanan tambahan.</Note>

        <SectionLabel>Akses akun</SectionLabel>
        <SettingRow href="/forgot-password" leading={<Icon name="eb298" size={20} />} title="Ubah kata sandi" subtitle="Gunakan kombinasi yang kuat dan unik" trailing={<Chevron />} />
        <SettingRow title="Verifikasi dua langkah" subtitle="Tambahkan kode verifikasi saat masuk" trailing={<Switch checked={s.twoStep} onChange={(v) => updateSecurity({ twoStep: v })} label="Verifikasi dua langkah" />} />

        <SectionLabel>Kunci aplikasi</SectionLabel>
        <SettingRow title="PIN aplikasi" subtitle="Minta PIN untuk membuka aplikasi" trailing={<Switch checked={s.pin} onChange={(v) => updateSecurity({ pin: v })} label="PIN aplikasi" />} />
        <PickerRow title="Ubah PIN" disabled={!s.pin} value={`${s.pinLength} digit`} options={['4 digit', '6 digit']} onChange={(v) => updateSecurity({ pinLength: v.startsWith('4') ? 4 : 6 })} />
        <SettingRow title="Face ID / sidik jari" subtitle="Gunakan biometrik perangkat" trailing={<Switch checked={s.biometric} onChange={(v) => updateSecurity({ biometric: v })} label="Face ID atau sidik jari" />} />
        <PickerRow title="Kunci otomatis" value={s.autoLock} options={LOCKS} onChange={(v) => updateSecurity({ autoLock: v })} />

        <p className="pt-4 text-[12px] leading-[1.6] text-muted">Jangan bagikan kata sandi, PIN, atau kode verifikasi kepada siapa pun, termasuk pihak yang mengatasnamakan SCAF TRACKER.</p>
      </main>
    </MobileShell>
  )
}
