import { GraduationCap, Wifi, FileText, Sun, Moon } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import TrainingCard from '../components/TrainingCard'
import StatsCard from '../components/StatsCard'

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Selamat Pagi'
  if (hour < 17) return 'Selamat Siang'
  if (hour < 20) return 'Selamat Sore'
  return 'Selamat Malam'
}

function formatDate(): string {
  return new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function DashboardPage() {
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()

  if (!user) return null

  const firstName = user.name.split(' ')[0]
  const isMono = theme === 'mono'

  const bg = isMono ? '#1a1a1a' : '#7C93C3'
  const cardBg = isMono ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.2)'
  const cardBorder = isMono ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(255,255,255,0.3)'
  const accent = isMono ? '#ffffff' : '#1558E7'
  const accentBg = isMono ? '#333333' : '#1558E7'

  return (
    <main className="flex-1 min-h-screen p-6 lg:p-8 pt-16 lg:pt-8 transition-colors duration-300" style={{ backgroundColor: bg }}>
      <div className="mb-8">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm font-medium mb-1" style={{ color: 'rgba(255,255,255,0.75)' }}>{formatDate()}</p>
            <h2 id="greeting-heading" className="text-2xl lg:text-3xl font-bold text-white leading-tight">
              {getGreeting()}, <span className="text-white opacity-90">{firstName}</span> 👋
            </h2>
            <p className="text-sm mt-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>Siap melanjutkan sesi training kamu hari ini?</p>
          </div>

          <button
            onClick={toggleTheme}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl shadow-md transition-all duration-300 cursor-pointer"
            style={{ backgroundColor: cardBg, backdropFilter: 'blur(8px)', border: cardBorder }}
          >
            {isMono ? (
              <Sun size={18} className="text-yellow-300" />
            ) : (
              <Moon size={18} className="text-white" />
            )}
            <span className="text-sm font-medium text-white">
              {isMono ? 'Warna' : 'Mono'}
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">
        <StatsCard title="Status Trainee" value="Aktif" subtitle="Training berjalan" icon={<GraduationCap size={20} />} accentBg={accentBg} />
        <StatsCard title="Sesi Training" value="Online" subtitle="Akses kapan saja" icon={<Wifi size={20} />} accentBg={accentBg} />
        <StatsCard title="Materi" value="Tersedia" subtitle="Link personal aktif" icon={<FileText size={20} />} accentBg={accentBg} />
      </div>

      <div className="flex items-center gap-3 mb-5">
        <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.7)' }}>Materi Training</h3>
        <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(255,255,255,0.25)' }} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        <TrainingCard link={user.trainingLink} userName={firstName} accent={accent} accentBg={accentBg} isMono={isMono} />
      </div>
    </main>
  )
}
