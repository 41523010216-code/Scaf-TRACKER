'use client'

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

export type TxType = 'pemasukan' | 'pengeluaran'

export type Transaction = {
  id: string
  type: TxType
  amount: number
  category: string
  date: string // ISO yyyy-mm-dd
  time: string // HH.MM
  note: string
  icon?: string
}

export type NewTransaction = Omit<Transaction, 'id' | 'time'>

type Store = {
  balance: number
  income: number
  expense: number
  last: Transaction | null
  history: Transaction[]
  add: (tx: NewTransaction) => void
  update: (id: string, patch: NewTransaction) => void
  remove: (id: string) => void
}

// Seed values come from the "Beranda" design frame.
const SEED = { balance: 2_600_000, income: 3_000_000, expense: 400_000 }

const seed = (id: string, date: string, note: string, category: string, time: string, amount: number, icon?: string): Transaction => ({
  id, type: 'pengeluaran', amount, category, date, time, note, icon,
})

// Riwayat awal diambil dari frame "Riwayat Transaksi".
const SEED_HISTORY: Transaction[] = [
  { id: 'in1', type: 'pemasukan', amount: 3_000_000, category: 'Uang saku', date: '2026-10-01', time: '08.00', note: 'Uang saku bulanan dari orang tua' },
  seed('s1', '2026-10-05', 'Batre HP', 'Elektronik', '10.00', 70_000),
  seed('s2', '2026-10-05', 'Sarapan', 'Makanan', '09.00', 60_000),
  seed('s3', '2026-10-05', 'Ojek online', 'Transportasi', '06.00', 20_000, 'smartphone'),
  ...[4, 3, 2, 1].flatMap((d) => [
    seed(`u${d}`, `2026-10-0${d}`, 'Uang kas', 'Pendidikan', '10.00', 10_000),
    seed(`m${d}`, `2026-10-0${d}`, 'Sarapan', 'Makanan', '09.00', 55_000),
    seed(`o${d}`, `2026-10-0${d}`, 'Ojek online', 'Transportasi', '06.00', 15_000),
  ]),
]

const Ctx = createContext<Store | null>(null)

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [totals, setTotals] = useState(SEED)
  const [last, setLast] = useState<Transaction | null>(null)
  const [history, setHistory] = useState<Transaction[]>(SEED_HISTORY)

  const apply = (t: typeof SEED, tx: { type: TxType; amount: number }, sign: 1 | -1): typeof SEED =>
    tx.type === 'pemasukan'
      ? { ...t, balance: t.balance + sign * tx.amount, income: t.income + sign * tx.amount }
      : { ...t, balance: t.balance - sign * tx.amount, expense: t.expense + sign * tx.amount }

  const update = useCallback((id: string, patch: NewTransaction) => {
    const old = history.find((h) => h.id === id)
    if (!old) return
    setTotals((t) => apply(apply(t, old, -1), patch, 1))
    setHistory((h) => h.map((x) => (x.id === id ? { ...x, ...patch } : x)))
  }, [history])

  const remove = useCallback((id: string) => {
    const old = history.find((h) => h.id === id)
    if (!old) return
    setTotals((t) => apply(t, old, -1))
    setHistory((h) => h.filter((x) => x.id !== id))
  }, [history])

  const add = useCallback((input: NewTransaction) => {
    const now = new Date()
    const tx: Transaction = {
      ...input,
      id: `t${now.getTime()}`,
      time: `${String(now.getHours()).padStart(2, '0')}.${String(now.getMinutes()).padStart(2, '0')}`,
    }
    setHistory((h) => [tx, ...h])
    setTotals((t) =>
      tx.type === 'pemasukan'
        ? { ...t, balance: t.balance + tx.amount, income: t.income + tx.amount }
        : { ...t, balance: t.balance - tx.amount, expense: t.expense + tx.amount },
    )
    setLast(tx)
  }, [])

  const value = useMemo(() => ({ ...totals, last, history, add, update, remove }), [totals, last, history, add, update, remove])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useTransactions() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useTransactions must be used inside TransactionProvider')
  return v
}

export const formatNumber = (n: number) => n.toLocaleString('id-ID')
export const rupiah = (n: number) => `${n < 0 ? '-' : ''}Rp${formatNumber(Math.abs(n))}`

const MONTHS_LONG = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
export function formatDateLong(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return `${String(d).padStart(2, '0')} ${MONTHS_LONG[m - 1]} ${y}`
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
export function formatDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return `${String(d).padStart(2, '0')} ${MONTHS[m - 1]} ${y}`
}

export const CATEGORY_ICON: Record<string, string> = {
  'Uang saku': '1fbad', Gaji: '8df5b', Freelance: '24587', Hadiah: '16ba8', Beasiswa: '1e8d4',
  Makanan: '9a2d4', Transport: '06233', Transportasi: '06233', Kuliah: '5ac64', Pendidikan: '5ac64',
  Belanja: '4eaec', Hiburan: '79097', Kesehatan: 'a0fef', Tagihan: '96167', Elektronik: '76459',
  smartphone: '97a9e', Lainnya: '0e04e',
}
