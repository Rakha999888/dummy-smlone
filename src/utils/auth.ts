import { USERS, type User } from '../data/users'

const SESSION_KEY = 'smlone_session'

export function validateLogin(studentId: string, password: string): User | null {
  const user = USERS.find(
    (u) => u.id.toLowerCase() === studentId.trim().toLowerCase() && u.password === password
  )
  return user ?? null
}

export function saveSession(user: User): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user))
}

export function getSession(): User | null {
  const raw = localStorage.getItem(SESSION_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as User
  } catch {
    return null
  }
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY)
}
