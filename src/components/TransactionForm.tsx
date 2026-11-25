'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Icon, MaskIcon, MobileShell } from '@/components/MobileShell'
import { formatDate, formatNumber, useTransactions, type TxType } from '@/lib/transactions'

export const CATEGORIES: Record<TxType, { label: string; icon: string }[]> = {
  pemasukan: [
    { label: 'Uang saku', icon: '1fbad' },
    { label: 'Gaji', icon: '8df5b' },
    { label: 'Freelance', icon: '24587' },
    { label: 'Hadiah', icon: '16ba8' },
    { label: 'Beasiswa', icon: '1e8d4' },
    { label: 'Lainnya', icon: '0e04e' },
  ],
  pengeluaran: [
    { label: 'Makanan', icon: '3d316' },
    { label: 'Transport', icon: 'b55b5' },
    { label: 'Kuliah', icon: '1e8d4' },
    { label: 'Belanja', icon: '4eaec' },
    { label: 'Hiburan', icon: '79097' },
    { label: 'Kesehatan', icon: 'a0fef' },
    { label: 'Tagihan', icon: '96167' },
    { label: 'Lainnya', icon: '0e04e' },
  ],
}

const COPY = {
  pemasukan: { tab: '+ Pemasukan', tabColor: 'text-[#168a63]', amount: 'Nominal pemasukan', note: 'Contoh: uang saku dari orang tua' },
  pengeluaran: { tab: '− Pengeluaran', tabColor: 'text-[#d95c5c]', amount: 'Nominal pengeluaran', note: 'Contoh: makan siang di kantin' },
} as const

export function TransactionForm({ type }: { type: TxType }) {
  const router = useRouter()
  const { add, balance } = useTransactions()
  const copy = COPY[type]
  const cats = CATEGORIES[type]

  const [digits, setDigits] = useState('')
  const [category, setCategory] = useState(cats[0].label)
  const [date, setDate] = useState('')
  const [note, setNote] = useState('')
  const [error, setError] = useState('')
  const dateRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const d = new Date()
    setDate(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`)
  }, [])

  const amount = Number(digits || 0)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (amount <= 0) return setError('Masukkan nominal lebih dari 0.')
    if (type === 'pengeluaran' && amount > balance) return setError('Nominal melebihi saldo yang tersedia.')
    if (!date) return setError('Pilih tanggal transaksi.')
    add({ type, amount, category, date, note: note.trim() })
    router.push('/transaksi/berhasil')
  }

  return (
    <MobileShell>
      <form onSubmit={submit} noValidate className="flex flex-1 flex-col">
        <header className="relative flex h-[54px] items-center px-5 pt-2">
          <button type="button" onClick={() => router.back()} aria-label="Kembali" className="cursor-pointer rounded p-1 outline-none focus-visible:ring-2 focus-visible:ring-brand/40">
            <Icon name="267a7" size={20} />
          </button>
          <h1 className="absolute inset-x-0 text-center text-[15px] font-semibold text-ink pointer-events-none">Tambah Transaksi</h1>
        </header>

        <div className="flex flex-1 flex-col gap-4 px-5 pb-6 pt-2">
          <div className="flex h-[38px] items-center justify-center rounded-xl bg-mint">
            <span className={`text-[11px] font-semibold ${copy.tabColor}`}>{copy.tab}</span>
          </div>

          <label htmlFor="amount" className="flex min-h-[86px] cursor-text items-start justify-between rounded-xl bg-white p-[14px]">
            <span className="flex flex-col gap-2">
              <span className="text-[13px] text-muted">{copy.amount}</span>
              <span className="flex items-center gap-[7px] text-[28px] leading-none">
                <span className="text-ink">Rp</span>
                <input
                  id="amount"
                  inputMode="numeric"
                  autoComplete="off"
                  autoFocus
                  placeholder="0"
                  value={digits ? formatNumber(Number(digits)) : ''}
                  onChange={(e) => {
                    setDigits(e.target.value.replace(/\D/g, '').slice(0, 12))
                    setError('')
                  }}
                  aria-invalid={!!error}
                  className="w-full min-w-0 bg-transparent text-ink caret-brand outline-none placeholder:text-muted/60"
                />
              </span>
            </span>
            <span className="flex size-7 shrink-0 items-center justify-center rounded-[7px] bg-mint">
              <Icon name="1fbad" size={16} />
            </span>
          </label>
          {error && (
            <p role="alert" className="-mt-2 text-[12px] text-[#d95c5c]">
              {error}
            </p>
          )}

          <fieldset className="flex flex-col gap-3">
            <legend className="mb-3 text-[12px] font-semibold text-ink">Kategori</legend>
            <div className="grid grid-cols-4 gap-3">
              {cats.map((c) => {
                const on = c.label === category
                return (
                  <button key={c.label} type="button" onClick={() => setCategory(c.label)} aria-pressed={on} className="flex cursor-pointer flex-col items-center gap-[7px] outline-none">
                    <span className={`flex h-12 w-full items-center justify-center rounded-[10px] transition ${on ? 'bg-brand text-white' : 'bg-mint text-brand hover:brightness-95'}`}>
                      <MaskIcon name={c.icon} size={21} />
                    </span>
                    <span className={`text-[11px] text-ink ${on ? 'font-medium' : ''}`}>{c.label}</span>
                  </button>
                )
              })}
            </div>
          </fieldset>

          <div className="flex flex-col gap-[10px]">
            <label htmlFor="date" className="text-[12px] font-semibold text-ink">Tanggal transaksi</label>
            <div className="relative flex h-10 items-center gap-3 rounded-xl border border-mint px-[13px]">
              <Icon name="386fe" size={18} />
              <span className="flex-1 text-[13px] text-ink">{date ? formatDate(date) : ''}</span>
              <Icon name="6adba" size={14} />
              <input ref={dateRef} id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="absolute inset-0 size-full cursor-pointer opacity-0" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="note" className="text-[12px] font-semibold text-ink">
              Catatan <span className="font-normal text-muted">(opsional)</span>
            </label>
            <textarea id="note" rows={4} value={note} onChange={(e) => setNote(e.target.value)} placeholder={copy.note} className="resize-none rounded-xl border border-mint bg-white/60 px-[14px] py-3 text-[13px] text-ink outline-none transition placeholder:text-muted/60 focus:border-brand focus:ring-2 focus:ring-brand/20" />
          </div>

          <button type="submit" className="mt-auto h-[50px] w-full cursor-pointer rounded-full bg-brand text-[14px] font-semibold text-white transition hover:bg-brand-dark active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2">
            Simpan Transaksi
          </button>
        </div>
      </form>
    </MobileShell>
  )
}
