import { type LucideIcon } from 'lucide-react'

interface Props {
  title: string
  icon: LucideIcon
}

export default function ComingSoonPage({ title, icon: Icon }: Props) {
  return (
    <main className="flex-1 min-h-screen p-6 lg:p-8 pt-16 lg:pt-8 flex flex-col" style={{ backgroundColor: '#7C93C3' }}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center text-center max-w-sm">
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6"
            style={{ backgroundColor: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', boxShadow: '0 4px 20px rgba(21,88,231,0.2)' }}
          >
            <Icon size={36} className="text-white opacity-70" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-3">Coming Soon</h3>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Fitur ini sedang dalam pengembangan
          </p>
        </div>
      </div>
    </main>
  )
}
