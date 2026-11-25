import type { Transaction } from '@/lib/transactions'

export type PeriodKind = 'minggu' | 'bulan' | 'tahun'

const pad = (n: number) => String(n).padStart(2, '0')
const iso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
const parse = (s: string) => {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)

export const MONTHS_ID = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
const SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']

/** Inclusive [start, end] ISO range for the period containing `anchor`. */
export function periodRange(kind: PeriodKind, anchor: string): [string, string] {
  const d = parse(anchor)
  if (kind === 'tahun') return [`${d.getFullYear()}-01-01`, `${d.getFullYear()}-12-31`]
  if (kind === 'bulan') {
    const last = new Date(d.getFullYear(), d.getMonth() + 1, 0)
    return [`${d.getFullYear()}-${pad(d.getMonth() + 1)}-01`, iso(last)]
  }
  const monday = addDays(d, -((d.getDay() + 6) % 7))
  return [iso(monday), iso(addDays(monday, 6))]
}

export function shiftAnchor(kind: PeriodKind, anchor: string, dir: 1 | -1): string {
  const d = parse(anchor)
  if (kind === 'tahun') return iso(new Date(d.getFullYear() + dir, 0, 1))
  if (kind === 'bulan') return iso(new Date(d.getFullYear(), d.getMonth() + dir, 1))
  return iso(addDays(d, 7 * dir))
}

export function periodLabel(kind: PeriodKind, anchor: string): string {
  const d = parse(anchor)
  if (kind === 'tahun') return String(d.getFullYear())
  if (kind === 'bulan') return `${MONTHS_ID[d.getMonth()]} ${d.getFullYear()}`
  const [s, e] = periodRange('minggu', anchor).map(parse)
  return `${s.getDate()} ${SHORT[s.getMonth()]} – ${e.getDate()} ${SHORT[e.getMonth()]} ${e.getFullYear()}`
}

export const inRange = (t: Transaction, [s, e]: [string, string]) => t.date >= s && t.date <= e

export type CategorySlice = { category: string; amount: number; pct: number }

export function expenseByCategory(list: Transaction[]): { total: number; slices: CategorySlice[] } {
  const map = new Map<string, number>()
  list.filter((t) => t.type === 'pengeluaran').forEach((t) => map.set(t.category, (map.get(t.category) ?? 0) + t.amount))
  const total = [...map.values()].reduce((a, b) => a + b, 0)
  const slices = [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([category, amount]) => ({ category, amount, pct: total ? (amount / total) * 100 : 0 }))
  return { total, slices }
}

export const pct = (n: number) => `${(Math.round(n * 10) / 10).toString().replace('.', ',')}%`

export type TrendPoint = { label: string; income: number; expense: number }

/** Cumulative income/expense across the period (days for week/month, months for year). */
export function trend(kind: PeriodKind, anchor: string, list: Transaction[]): TrendPoint[] {
  const [start, end] = periodRange(kind, anchor)
  const items = list.filter((t) => inRange(t, [start, end]))
  const sum = (type: Transaction['type'], pred: (t: Transaction) => boolean) =>
    items.filter((t) => t.type === type && pred(t)).reduce((n, t) => n + t.amount, 0)

  if (kind === 'tahun') {
    return Array.from({ length: 12 }, (_, m) => {
      const key = `${start.slice(0, 4)}-${pad(m + 1)}`
      return {
        label: SHORT[m],
        income: sum('pemasukan', (t) => t.date.slice(0, 7) <= key),
        expense: sum('pengeluaran', (t) => t.date.slice(0, 7) <= key),
      }
    })
  }
  const days: string[] = []
  for (let d = parse(start); iso(d) <= end; d = addDays(d, 1)) days.push(iso(d))
  const lastData = items.reduce((m, t) => (t.date > m ? t.date : m), start)
  const shown = kind === 'bulan' ? days.filter((d) => d <= lastData) : days
  const visible = shown.length >= 2 ? shown : days.slice(0, 2)
  return visible.map((d) => ({
    label: `${d.slice(8)} ${SHORT[Number(d.slice(5, 7)) - 1]}`,
    income: sum('pemasukan', (t) => t.date <= d),
    expense: sum('pengeluaran', (t) => t.date <= d),
  }))
}

export function niceMax(v: number): number {
  if (v <= 0) return 1_000_000
  const step = v <= 3_000_000 ? 1_000_000 : v <= 15_000_000 ? 5_000_000 : 10 ** Math.floor(Math.log10(v))
  return Math.ceil(v / step) * step
}

export const axisLabel = (v: number) => (v === 0 ? '0' : v >= 1_000_000 ? `${+(v / 1_000_000).toFixed(2)} jt`.replace('.', ',') : `${Math.round(v / 1000)} rb`)

export const SLICE_COLORS = ['#176b57', '#168a63', '#66736e', '#9ca3af', '#16ba63', '#d95c5c', '#e0a43a', '#4f7cac']
