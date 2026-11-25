'use client'

import { CATEGORIES, type Category } from '@/lib/articles'

export type Filter = Category | 'Semua'

export function CategoryChips({ value, onChange }: { value: Filter; onChange: (f: Filter) => void }) {
  return (
    <div role="tablist" aria-label="Kategori artikel" className="-mx-6 flex gap-1.5 overflow-x-auto px-6 [scrollbar-width:none]">
      {(['Semua', ...CATEGORIES] as Filter[]).map((c) => {
        const on = c === value
        return (
          <button key={c} type="button" role="tab" aria-selected={on} onClick={() => onChange(c)} className={`h-[34px] shrink-0 cursor-pointer whitespace-nowrap rounded-full px-[10px] text-[10px] transition ${on ? 'bg-brand font-semibold text-white' : 'bg-mint text-muted hover:text-ink'}`}>
            {c}
          </button>
        )
      })}
    </div>
  )
}
