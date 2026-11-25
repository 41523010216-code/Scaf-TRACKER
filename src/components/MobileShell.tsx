import type { ReactNode } from 'react'

/** Phone-width column that stays centred on large screens. */
export function MobileShell({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className="min-h-dvh bg-mint/40">
      <div className={`relative mx-auto flex min-h-dvh w-full max-w-[480px] flex-col bg-canvas sm:shadow-[0_0_60px_-20px_rgba(23,107,87,0.25)] ${className}`}>
        {children}
      </div>
    </div>
  )
}

export function Icon({ name, size, className = '' }: { name: string; size: number; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img alt="" src={`/assets/${name}.svg`} width={size} height={size} className={`shrink-0 ${className}`} style={{ width: size, height: size }} />
}

/** Recolourable icon: paints the SVG shape with currentColor. */
export function MaskIcon({ name, size }: { name: string; size: number }) {
  const url = `url(/assets/${name}.svg)`
  return (
    <span
      aria-hidden
      className="inline-block shrink-0 bg-current"
      style={{ width: size, height: size, maskImage: url, WebkitMaskImage: url, maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat', maskSize: 'contain', WebkitMaskSize: 'contain', maskPosition: 'center', WebkitMaskPosition: 'center' }}
    />
  )
}
