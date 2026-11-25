'use client'

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

export type Profile = {
  name: string
  email: string
  phone: string
  birth: string // ISO or ''
  photo: string | null
  language: 'id' | 'en'
  notif: { master: boolean; reminder: boolean; time: string; budget: boolean; weekly: boolean; tips: boolean }
  security: { twoStep: boolean; pin: boolean; pinLength: 4 | 6; biometric: boolean; autoLock: string }
}

const INITIAL: Profile = {
  name: 'Azis',
  email: 'azizmaulana012005@email.com',
  phone: '',
  birth: '',
  photo: null,
  language: 'id',
  notif: { master: true, reminder: true, time: '20:00', budget: true, weekly: true, tips: false },
  security: { twoStep: false, pin: true, pinLength: 6, biometric: false, autoLock: '1 menit' },
}

type Store = {
  profile: Profile
  update: (patch: Partial<Profile>) => void
  updateNotif: (patch: Partial<Profile['notif']>) => void
  updateSecurity: (patch: Partial<Profile['security']>) => void
}

const Ctx = createContext<Store | null>(null)

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState(INITIAL)
  const update = useCallback((p: Partial<Profile>) => setProfile((s) => ({ ...s, ...p })), [])
  const updateNotif = useCallback((p: Partial<Profile['notif']>) => setProfile((s) => ({ ...s, notif: { ...s.notif, ...p } })), [])
  const updateSecurity = useCallback((p: Partial<Profile['security']>) => setProfile((s) => ({ ...s, security: { ...s.security, ...p } })), [])
  const value = useMemo(() => ({ profile, update, updateNotif, updateSecurity }), [profile, update, updateNotif, updateSecurity])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useProfile() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useProfile must be used inside ProfileProvider')
  return v
}

export const DEFAULT_AVATAR = '/assets/7085f.png'
export const formatTime = (t: string) => t.replace(':', '.')
