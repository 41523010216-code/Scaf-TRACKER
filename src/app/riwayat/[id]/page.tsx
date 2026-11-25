'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Icon, MaskIcon, MobileShell } from '@/components/MobileShell'
import { CATEGORY_ICON, formatDateLong, formatNumber, useTransactions } from '@/lib/transactions'

export default function DetailTransaksiPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { history, remove } = useTransactions()
  const [confirm, setConfirm] = useState(false)
  const tx = history.find((t) => t.id === id)

  useEffect(() => {
    if (!tx && !confirm) router.replace('/riwayat')
  }, [tx, confirm, router])

  if (!tx) return null
  const income = tx.type === 'pemasukan'
  const tone = income ? 'text-[#168a63]' : 'text-[#d95c5c]'

  return (
    <MobileShell>
      <header className="flex h-12 items-center px-6 pt-4">
        <Link href="/riwayat" aria-label="Kembali ke riwayat" className="rounded p-0.5 outline-none focus-visible:ring-2 focus-visible:ring-brand/40">
          <Icon name="9b9c3" size={22} />
        </Link>
      </header>

      <section className="flex flex-col items-center gap-[13px] px-6 py-[30px]">
        <span className="flex size-16 items-center justify-center rounded-full bg-mint text-brand">
          <MaskIcon name={CATEGORY_ICON[tx.icon ?? tx.category] ?? CATEGORY_ICON.Lainnya} size={28} />
        </span>
        <h1 className="text-[20px] font-bold text-ink">{tx.category}</h1>
        <p className={`text-[12px] ${tone}`}>{income ? 'Pemasukan' : 'Pengeluaran'}</p>
        <p className={`text-[32px] font-bold ${tone}`}>
          {income ? '+' : '-'} Rp{formatNumber(tx.amount)}
        </p>
      </section>

      <div className="h-px w-full bg-white" />

      <dl className="flex flex-col gap-[30px] px-7 pt-[30px]">
        <div className="flex items-start gap-[18px]">
          <Icon name="54ce4" size={22} />
          <div className="flex flex-1 flex-col gap-2.5">
            <dt className="text-[12px] text-muted">Tanggal</dt>
            <dd className="text-[14px] font-medium leading-normal text-ink">{formatDateLong(tx.date)}</dd>
          </div>
        </div>
        <div className="flex items-start gap-[18px]">
          <Icon name="30eab" size={22} />
          <div className="flex flex-1 flex-col gap-2.5">
            <dt className="text-[12px] text-muted">Catatan</dt>
            <dd className="text-[14px] font-medium leading-normal text-ink">{tx.note || '-'}</dd>
          </div>
        </div>
      </dl>

      <div className="fixed inset-x-0 bottom-0 mx-auto flex w-full max-w-[480px] gap-3 bg-canvas px-6 pb-[34px] pt-3">
        <Link href={`/riwayat/${tx.id}/edit`} className="flex h-12 flex-1 items-center justify-center rounded-xl border border-mint bg-white text-[13px] font-semibold text-ink transition hover:bg-mint/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40">
          Edit
        </Link>
        <button type="button" onClick={() => setConfirm(true)} className="h-12 flex-1 cursor-pointer rounded-xl border border-brand bg-white text-[13px] font-semibold text-[#d95c5c] transition hover:bg-[#d95c5c]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40">
          Hapus
        </button>
      </div>

      {confirm && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-[rgba(23,33,30,0.2)] px-6 backdrop-blur-[3px]" onClick={() => setConfirm(false)}>
          <div role="alertdialog" aria-modal="true" aria-label="Hapus transaksi" onClick={(e) => e.stopPropagation()} className="w-full max-w-[320px] rounded-[18px] bg-white p-5 shadow-[0_12px_32px_rgba(0,0,0,0.12)]">
            <h2 className="text-[16px] font-bold text-ink">Hapus transaksi?</h2>
            <p className="mt-2 text-[13px] leading-relaxed text-muted">Transaksi ini akan dihapus dan saldo akan disesuaikan kembali.</p>
            <div className="mt-5 flex gap-3">
              <button type="button" onClick={() => setConfirm(false)} className="h-11 flex-1 cursor-pointer rounded-xl border border-mint text-[13px] font-semibold text-ink">
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  remove(tx.id)
                  router.replace('/riwayat')
                }}
                className="h-11 flex-1 cursor-pointer rounded-xl bg-[#d95c5c] text-[13px] font-semibold text-white"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </MobileShell>
  )
}
