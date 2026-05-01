import { Link, Play, ArrowRight } from 'lucide-react'

interface Props {
  link: string
  userName: string
  accent?: string
  accentBg?: string
  isMono?: boolean
}

export default function TrainingCard({ link, userName, accent = '#1558E7', accentBg = '#1558E7', isMono = false }: Props) {
  const cardBg = isMono ? '#2a2a2a' : '#FFFFFF'
  const titleColor = isMono ? '#ffffff' : accent
  const subtitleColor = isMono ? 'rgba(255,255,255,0.6)' : '#6b7280'
  const linkBoxBg = isMono ? '#1a1a1a' : '#f0f4ff'
  const linkBoxBorder = isMono ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(21,88,231,0.1)'
  const linkTextColor = isMono ? 'rgba(255,255,255,0.5)' : '#7C93C3'
  const badgeBg = isMono ? 'rgba(255,255,255,0.1)' : 'rgba(21,88,231,0.1)'
  const badgeBorder = isMono ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(21,88,231,0.2)'
  const badgeColor = isMono ? '#ffffff' : accent

  return (
    <div
      id="card-training"
      className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02]"
      style={{ backgroundColor: cardBg, boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}
    >
      <div className="h-1.5 w-full transition-all duration-300" style={{ background: isMono ? 'linear-gradient(to right, #555, #aaa)' : 'linear-gradient(to right, #1558E7, #7C93C3)' }} />

      <div className="p-6">
        <div className="flex items-start justify-between mb-5">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center shadow-md transition-colors duration-300" style={{ backgroundColor: accentBg }}>
            <Play size={22} className="text-white" />
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full transition-colors duration-300" style={{ color: badgeColor, backgroundColor: badgeBg, border: badgeBorder }}>
            Aktif
          </span>
        </div>

        <h3 className="text-lg font-bold mb-1 transition-colors duration-300" style={{ color: titleColor }}>Akses Materi Training</h3>
        <p className="text-sm mb-5 leading-relaxed transition-colors duration-300" style={{ color: subtitleColor }}>
          Klik tombol di bawah untuk mengakses materi training personal kamu, {userName}.
        </p>

        <div className="flex items-center gap-2 mb-5 px-3 py-2.5 rounded-xl transition-colors duration-300" style={{ backgroundColor: linkBoxBg, border: linkBoxBorder }}>
          <Link size={14} className="shrink-0 transition-colors duration-300" style={{ color: linkTextColor }} />
          <span className="text-xs truncate font-mono transition-colors duration-300" style={{ color: linkTextColor }}>{link}</span>
        </div>

        <a
          id="btn-open-training"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl text-white text-sm font-semibold transition-all duration-300"
          style={{ backgroundColor: accentBg, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
        >
          <span>Buka Materi Training</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
        </a>
      </div>
    </div>
  )
}
