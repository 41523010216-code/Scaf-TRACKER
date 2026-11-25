'use client'

import Link from 'next/link'
import { useState, type ReactNode } from 'react'

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-dvh justify-center px-7 py-6 sm:items-center sm:py-12">
      <div className="w-full max-w-[440px] sm:rounded-[28px] sm:border sm:border-mint sm:bg-white/60 sm:p-10 sm:shadow-[0_20px_60px_-30px_rgba(23,107,87,0.25)]">
        {children}
      </div>
    </main>
  )
}

const inputWrap =
  'flex h-14 items-center gap-3 rounded-[14px] border border-mint bg-white px-4 transition focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20'

export function Field({
  label,
  id,
  icon,
  error,
  hint,
  type = 'text',
  trailing,
  ...rest
}: {
  label: string
  id: string
  icon: string
  error?: string
  hint?: string
  trailing?: ReactNode
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[14px] font-semibold text-ink">
        {label}
      </label>
      <div className={`${inputWrap} ${error ? 'border-red-500' : ''}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src={icon} width={19} height={19} className="size-[19px] shrink-0" />
        <input
          id={id}
          type={type}
          aria-invalid={!!error}
          className="min-w-0 flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-muted/70"
          {...rest}
        />
        {trailing}
      </div>
      {error ? (
        <p role="alert" className="text-[12px] text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p className="text-[12px] leading-normal text-muted">{hint}</p>
      ) : null}
    </div>
  )
}

export function PasswordField(
  props: Omit<React.ComponentProps<typeof Field>, 'icon' | 'type' | 'trailing'>,
) {
  const [show, setShow] = useState(false)
  return (
    <Field
      {...props}
      icon="/assets/686fb.svg"
      type={show ? 'text' : 'password'}
      trailing={
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
          className="shrink-0 cursor-pointer rounded p-0.5 outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
        >
          {show ? (
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#66736e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img alt="" src="/assets/494fe.svg" width={19} height={19} className="size-[19px]" />
          )}
        </button>
      }
    />
  )
}

export function Checkbox({
  checked,
  onChange,
  size = 20,
  children,
  id,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  size?: number
  children: ReactNode
  id: string
}) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-2.5">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <span
        style={{ width: size, height: size }}
        className="mt-px flex shrink-0 items-center justify-center rounded-[5px] border border-brand/40 bg-white peer-checked:border-brand peer-checked:bg-brand peer-focus-visible:ring-2 peer-focus-visible:ring-brand/40 [&>img]:opacity-0 peer-checked:[&>img]:opacity-100"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src="/assets/961d5.svg" width={14} height={14} className="size-[14px]" />
      </span>
      {children}
    </label>
  )
}

export function PrimaryButton({ children, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className="flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-[14px] bg-brand px-5 text-[15px] font-semibold text-white transition hover:bg-brand-dark active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2"
    >
      {children}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" src="/assets/effb2.svg" width={18} height={18} className="size-[18px]" />
    </button>
  )
}

export function SocialSection() {
  const btn =
    'flex h-[52px] flex-1 cursor-pointer items-center justify-center gap-2.5 rounded-[14px] border border-mint bg-white/60 text-ink transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40'
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3.5">
        <span className="h-px flex-1 bg-mint" />
        <span className="text-[12px] text-muted">atau lanjutkan dengan</span>
        <span className="h-px flex-1 bg-mint" />
      </div>
      <div className="flex gap-3">
        <button type="button" className={btn}>
          <span className="text-[22px] font-bold">G</span>
          <span className="text-[14px] font-semibold">Google</span>
        </button>
        <button type="button" className={btn}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src="/assets/9b7ec.svg" width={18} height={22} className="h-[22px] w-[18px]" />
          <span className="text-[14px] font-semibold">Apple</span>
        </button>
      </div>
    </div>
  )
}

export function SwitchLink({ text, href, label }: { text: string; href: string; label: string }) {
  return (
    <p className="text-center text-[14px] leading-normal text-muted">
      {text}{' '}
      <Link href={href} className="font-semibold text-brand hover:underline">
        {label}
      </Link>
    </p>
  )
}
