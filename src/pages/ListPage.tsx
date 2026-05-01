import { useState } from 'react'
import { ExternalLink, Lock, Search } from 'lucide-react'
import { USERS } from '../data/users'
import { useAuth } from '../context/AuthContext'

export default function ListPage() {
  const { user: currentUser } = useAuth()
  const [query, setQuery] = useState('')

  const filtered = USERS.filter(
    (u) =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.id.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <main className="flex-1 min-h-screen p-6 lg:p-8 pt-16 lg:pt-8" style={{ backgroundColor: '#f8f9fb' }}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Daftar Akses Training</h2>
        <p className="text-sm text-gray-500 mt-1">Akses materi training personal untuk setiap anggota.</p>
      </div>

      <div className="relative mb-6">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Cari nama atau ID..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
        />
      </div>

      <div className="space-y-4">
        {filtered.map((u) => {
          const isOwn = currentUser?.id === u.id
          return (
            <div
              key={u.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              style={!isOwn ? { opacity: 0.6 } : {}}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0"
                  style={{ backgroundColor: isOwn ? '#1558E7' : '#9ca3af' }}
                >
                  {u.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-900">{u.name}</p>
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: '#e8f0fe', color: '#1558E7' }}
                    >
                      Aktif
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{u.id}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {isOwn
                      ? `Klik tombol untuk mengakses materi training personal kamu, ${u.name.split(' ')[0]}.`
                      : 'Materi training ini hanya dapat diakses oleh pemiliknya.'}
                  </p>
                </div>
              </div>

              {isOwn ? (
                <a
                  href={u.trainingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-opacity hover:opacity-90 shrink-0"
                  style={{ backgroundColor: '#1558E7' }}
                >
                  <ExternalLink size={15} />
                  Akses Materi Training
                </a>
              ) : (
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium shrink-0 cursor-not-allowed"
                  style={{ backgroundColor: '#f3f4f6', color: '#9ca3af' }}
                >
                  <Lock size={15} />
                  Terkunci
                </div>
              )}
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400 text-sm">
            Tidak ada hasil untuk "{query}"
          </div>
        )}
      </div>
    </main>
  )
}
