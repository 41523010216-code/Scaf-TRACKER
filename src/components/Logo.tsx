/* The logo PNG is a padded sprite; these crops mirror the Figma frames. */
const crops = {
  large: { ratio: '216 / 167', img: 'h-[165.87%] left-[-71.88%] top-[-42.51%] w-[192.36%]' },
  small: { ratio: '137 / 77', img: 'h-[228.34%] left-[-71.88%] top-[-58.53%] w-[192.36%]' },
} as const

export function Logo({
  variant = 'small',
  className = '',
}: {
  variant?: keyof typeof crops
  className?: string
}) {
  const crop = crops[variant]
  return (
    <div
      role="img"
      aria-label="Scaf Tracker"
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: crop.ratio }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" src="/assets/832e0.png" className={`pointer-events-none absolute max-w-none ${crop.img}`} />
    </div>
  )
}
