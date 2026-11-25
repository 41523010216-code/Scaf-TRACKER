'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Icon, MaskIcon, MobileShell } from '@/components/MobileShell'
import { CATEGORIES } from '@/components/TransactionForm'
import { CATEGORY_ICON, formatDateLong, formatNumber, useTransactions, type TxType } from '@/lib/transactions'

const box = 'flex items-center gap-3 rounded-xl border border-mint bg-white p-4'

export default function EditTransaksiPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { history, update, balance } = useTransactions()
  const tx = history.find((t) => t.id === id)

  const [type, setType] = useState<TxType>('pengeluaran')
  const [digits, setDigits] = useState('')
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')
  const [note, setNote] = useState('')
  const [error, setError] = useState('')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!tx) return router.replace('/riwayat')
    if (ready) return
    setType(tx.type)
    setDigits(String(tx.amount))
    setCategory(tx.category)
    setDate(tx.date)
    setNote(tx.note)
    setReady(true)
  }, [tx, ready, router])

  if (!tx || !ready) return null

  const options = Array.from(new Set([...CATEGORIES[type].map((c) => c.label), ...(type === tx.type ? [tx.category] : [])]))
  const amount = Number(digits || 0)

  function changeType(next: TxType) {
    setType(next)
    const list = CATEGORIES[next].map((c) => c.label)
    if (!(next === tx!.type && category === tx!.category) && !list.includes(category)) setCategory(list[0])
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (amount <= 0) return setError('Masukkan nominal lebih dari 0.')
    // Saldo setelah perubahan = saldo sekarang dikurangi efek lama lalu ditambah efek baru.
    const effect = (t: TxType, n: number) => (t === 'pemasukan' ? n : -n)
    if (balance - effect(tx!.type, tx!.amount) + effect(type, amount) < 0) return setError('Perubahan ini membuat saldo menjadi negatif.')
    if (!date) return setError('Pilih tanggal transaksi.')
    update(tx!.id, { type, amount, category, date, note: note.trim(), icon: category === tx!.category ? tx!.icon : undefined })
    router.replace(`/riwayat/${tx!.id}`)
  }

  return (
    <MobileShell>
      <form onSubmit={submit} noValidate className="flex flex-1 flex-col">
        <header className="flex h-12 items-center gap-3.5 px-6 pt-4">
          <Link href={`/riwayat/${tx.id}`} aria-label="Kembali" className="rounded p-0.5 outline-none focus-visible:ring-2 focus-visible:ring-brand/40">
            <Icon name="c6a26" size={22} />
          </Link>
          <h1 className="text-[20px] font-bold text-ink">Edit Transaksi</h1>
        </header>

        <div className="flex flex-1 flex-col gap-5 px-6 pb-[110px] pt-6">
          <div className="flex flex-col gap-2.5">
            <span className="text-[12px] text-muted">Jenis transaksi</span>
            <div role="tablist" className="flex h-12 gap-1 rounded-xl bg-mint p-1">
              {(['pemasukan', 'pengeluaran'] as const).map((t) => {
                const on = type === t
                return (
                  <button key={t} type="button" role="tab" aria-selected={on} onClick={() => changeType(t)} className={`flex-1 cursor-pointer whitespace-pre rounded-lg text-[13px] transition ${on ? 'bg-brand font-semibold text-white' : 'font-medium text-muted hover:text-ink'}`}>
                    {t === 'pemasukan' ? '+  Pemasukan' : '−  Pengeluaran'}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <label htmlFor="amount" className="text-[12px] text-muted">Nominal</label>
            <div className="flex h-[72px] items-center gap-3 rounded-xl border border-mint bg-white px-4 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20">
              <span className="text-[16px] font-medium text-muted">Rp</span>
              <input id="amount" inputMode="numeric" autoComplete="off" value={digits ? formatNumber(Number(digits)) : ''} placeholder="0" onChange={(e) => { setDigits(e.target.value.replace(/\D/g, '').slice(0, 12)); setError('') }} className="min-w-0 flex-1 bg-transparent text-[28px] font-bold tracking-[-0.7px] text-brand outline-none placeholder:text-muted/50" />
            </div>
            {error && <p role="alert" className="text-[12px] text-[#d95c5c]">{error}</p>}
          </div>

          <div className="flex flex-col gap-2.5">
            <label htmlFor="category" className="text-[12px] text-muted">Kategori</label>
            <div className={`${box} relative h-[54px]`}>
              <span className="text-muted"><MaskIcon name={CATEGORY_ICON[category] ?? CATEGORY_ICON.Lainnya} size={19} /></span>
              <span className="flex-1 text-[14px] font-medium text-ink">{category}</span>
              <Icon name="66523" size={18} />
              <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="absolute inset-0 size-full cursor-pointer opacity-0">
                {options.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <label htmlFor="date" className="text-[12px] text-muted">Tanggal</label>
            <div className={`${box} relative h-[54px]`}>
              <Icon name="03605" size={19} />
              <span className="flex-1 text-[14px] font-medium text-ink">{date ? formatDateLong(date) : ''}</span>
              <Icon name="66523" size={18} />
              <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="absolute inset-0 size-full cursor-pointer opacity-0" />
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <label htmlFor="note" className="text-[12px] text-muted">Catatan</label>
            <textarea id="note" rows={3} value={note} onChange={(e) => setNote(e.target.value)} className="min-h-[94px] resize-none rounded-xl border border-mint bg-white p-4 text-[14px] font-medium leading-[21px] text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" />
          </div>
        </div>

        <div className="fixed inset-x-0 bottom-0 mx-auto w-full max-w-[480px] bg-canvas px-6 pb-[34px] pt-3">
          <button type="submit" className="h-12 w-full cursor-pointer rounded-xl bg-brand text-[13px] font-semibold text-white transition hover:bg-brand-dark active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2">
            Simpan Perubahan
          </button>
        </div>
      </form>
    </MobileShell>
  )
}
