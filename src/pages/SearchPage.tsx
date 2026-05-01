
import { Search } from 'lucide-react'

export default function SearchPage() {
  return (
    <main className="flex-1 min-h-screen bg-gray-50 p-6 lg:p-8 pt-16 lg:pt-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Search</h2>
        <p className="text-sm text-gray-500 mt-1">Cari materi dan konten training.</p>
      </div>
      <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl bg-white border border-gray-100 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-4">
          <Search size={28} className="text-gray-300" />
        </div>
        <h3 className="text-base font-semibold text-gray-400 mb-1">Search Segera Hadir</h3>
        <p className="text-sm text-gray-300">Fitur ini sedang dalam pengembangan.</p>
      </div>
    </main>
  )
}
