import Link from 'next/link'
import { Icon } from '@/components/MobileShell'
import type { Article } from '@/lib/articles'

export function ArticleRow({ article, size }: { article: Article; size: 70 | 88 }) {
  return (
    <Link href={`/edukasi/artikel/${article.slug}`} className="flex items-center gap-[14px] border-b border-mint py-3 outline-none transition hover:bg-mint/40 focus-visible:ring-2 focus-visible:ring-brand/40">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" src={`/assets/${article.image}.png`} width={size} height={size} className="shrink-0 rounded-[10px] object-cover" style={{ width: size, height: size }} />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <p className={`font-semibold leading-normal text-ink ${size === 88 ? 'text-[13px]' : 'text-[12px]'}`}>{article.title}</p>
        <p className="text-[11px] text-muted">{article.minutes} menit baca</p>
      </div>
      <Icon name="46913" size={14} />
    </Link>
  )
}
