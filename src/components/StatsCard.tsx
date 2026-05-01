interface Props {
  title: string
  value: string
  subtitle?: string
  icon: React.ReactNode
  accentBg?: string
}

export default function StatsCard({ title, value, subtitle, icon, accentBg = '#1558E7' }: Props) {
  return (
    <div
      className="rounded-2xl p-5 flex items-center gap-4 transition-all duration-300"
      style={{
        backgroundColor: 'rgba(255,255,255,0.2)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.3)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
      }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300"
        style={{ backgroundColor: accentBg, color: '#FFFFFF', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium mb-0.5" style={{ color: 'rgba(255,255,255,0.7)' }}>{title}</p>
        <p className="text-lg font-bold text-white leading-tight">{value}</p>
        {subtitle && <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>{subtitle}</p>}
      </div>
    </div>
  )
}
