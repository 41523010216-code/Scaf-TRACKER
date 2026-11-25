'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { Icon } from '@/components/MobileShell'

export function PageHeader({ title, back, right }: { title: string; back: string; right?: ReactNode }) {
  return (
    <header className="flex h-[70px] items-center gap-[14px] px-6 pt-4">
      <Link href={back} aria-label="Kembali" className="rounded p-0.5 outline-none focus-visible:ring-2 focus-visible:ring-brand/40">
        <Icon name="82bea" size={20} />
      </Link>
      <h1 className="flex-1 text-[21px] font-bold text-ink">{title}</h1>
      {right}
    </header>
  )
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wide text-muted">{children}</p>
}

export function Switch({ checked, onChange, label, disabled }: { checked: boolean; onChange: (v: boolean) => void; label: string; disabled?: boolean }) {
  return (
    <button type="button" role="switch" aria-checked={checked} aria-label={label} disabled={disabled} onClick={() => onChange(!checked)} className={`relative h-[26px] w-[46px] shrink-0 cursor-pointer rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${checked ? 'bg-brand' : 'bg-mint'}`}>
      <span className={`absolute top-[3px] size-5 rounded-full bg-white shadow transition-all ${checked ? 'left-[23px]' : 'left-[3px]'}`} />
    </button>
  )
}

/** Row with title, optional subtitle and a trailing control (switch/value). */
export function SettingRow({ title, subtitle, trailing, leading, href, disabled }: { title: string; subtitle?: string; trailing?: ReactNode; leading?: ReactNode; href?: string; disabled?: boolean }) {
  const body = (
    <>
      {leading}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <span className="text-[14px] text-ink">{title}</span>
        {subtitle && <span className="text-[11px] text-muted">{subtitle}</span>}
      </div>
      {trailing}
    </>
  )
  const cls = `flex min-h-[54px] items-center gap-3.5 border-b border-mint py-3 ${disabled ? 'opacity-50' : ''}`
  return href ? (
    <Link href={href} className={`${cls} outline-none transition hover:bg-mint/40 focus-visible:ring-2 focus-visible:ring-brand/40`}>{body}</Link>
  ) : (
    <div className={cls}>{body}</div>
  )
}

export function Chevron() {
  return <Icon name="c320a" size={16} />
}

export function Note({ icon, children }: { icon: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-2.5 rounded-xl bg-mint p-[14px]">
      <Icon name={icon} size={17} />
      <p className="flex-1 text-[11px] leading-[1.6] text-muted">{children}</p>
    </div>
  )
}

export const primaryBtn = 'flex h-[50px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-brand text-[13px] font-semibold text-white transition hover:bg-brand-dark active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2'
