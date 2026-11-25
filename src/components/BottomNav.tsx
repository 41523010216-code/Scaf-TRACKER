'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Icon } from '@/components/MobileShell'

type Tab = 'beranda' | 'analisis' | 'edukasi' | 'transaksi'

function Item({ icon, label, active, href }: { icon: string; label: string; active?: boolean; href?: string }) {
  const cls = `flex min-w-0 flex-1 cursor-pointer flex-col items-center gap-[7px] ${active ? 'text-brand' : 'text-muted'}`
  const inner = (
    <>
      <Icon name={icon} size={21} />
      <span className={`text-[9px] ${active ? 'font-semibold' : ''}`}>{label}</span>
    </>
  )
  return href ? (
    <Link href={href} className={cls} aria-current={active ? 'page' : undefined}>
      {inner}
    </Link>
  ) : (
    <button type="button" className={cls}>
      {inner}
    </button>
  )
}

export function BottomNav({ active }: { active?: Tab }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <nav className="fixed inset-x-0 bottom-0 z-20 mx-auto flex h-[72px] w-full max-w-[480px] items-center gap-[9px] border-t border-mint bg-white px-4 py-2" aria-label="Navigasi utama">
        <Item icon={active === 'beranda' ? '92d3b' : 'ead54'} label="Beranda" href="/beranda" active={active === 'beranda'} />
        <Item icon={active === 'analisis' ? '3c828' : 'cc632'} label="Analisis" href="/analisis" active={active === 'analisis'} />
        <button type="button" onClick={() => setOpen(true)} aria-label="Tambah transaksi" className="shrink-0 cursor-pointer rounded-full outline-none transition active:scale-95 focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2">
          <Icon name="03b90" size={54} />
        </button>
        <Item icon={active === 'edukasi' ? '0c69f' : '18a1c'} label="Edukasi" href="/edukasi" active={active === 'edukasi'} />
        <Item icon={active === 'transaksi' ? '6d2a7' : '2e723'} label="Transaksi" href="/riwayat" active={active === 'transaksi'} />
      </nav>

      {open && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-[rgba(23,33,30,0.08)] px-6 backdrop-blur-[5px]" onClick={() => setOpen(false)}>
          <div role="dialog" aria-modal="true" aria-label="Tambah Transaksi" onClick={(e) => e.stopPropagation()} className="flex w-full max-w-[354px] flex-col gap-4 rounded-[18px] border border-mint bg-white p-5 shadow-[0_12px_32px_rgba(0,0,0,0.1)]">
            <div className="flex items-center justify-between pb-2">
              <h2 className="text-[17px] font-bold text-ink">Tambah Transaksi</h2>
              <button type="button" onClick={() => setOpen(false)} aria-label="Tutup" className="flex size-5 cursor-pointer items-center justify-center">
                <Icon name="4e470" size={16} />
              </button>
            </div>
            <button type="button" onClick={() => router.push('/transaksi/pemasukan')} className="flex h-[94px] cursor-pointer items-center gap-4 rounded-xl bg-mint p-[18px] text-left transition hover:brightness-95">
              <Icon name="43928" size={24} />
              <span className="flex flex-1 flex-col gap-2">
                <span className="text-[15px] font-semibold text-[#168a63]">Pemasukan</span>
                <span className="text-[12px] text-muted">Catat pemasukan</span>
              </span>
              <Icon name="a9348" size={18} />
            </button>
            <button type="button" onClick={() => router.push('/transaksi/pengeluaran')} className="flex h-[94px] cursor-pointer items-center gap-4 rounded-xl bg-mint p-[18px] text-left transition hover:brightness-95">
              <Icon name="40276" size={24} />
              <span className="flex flex-1 flex-col gap-2">
                <span className="text-[15px] font-semibold text-[#d95c5c]">Pengeluaran</span>
                <span className="text-[12px] text-muted">Catat pengeluaran</span>
              </span>
              <Icon name="1b331" size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
