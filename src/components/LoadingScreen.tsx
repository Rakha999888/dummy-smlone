import { Loader2 } from 'lucide-react'

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#f4f7fc]/95 backdrop-blur-sm animate-fade-in">
      <div className="flex flex-col items-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-blue-400 blur-[30px] opacity-20 rounded-full animate-pulse"></div>
          <img 
            src="/asset/logo.png" 
            alt="SMLONE Logo" 
            draggable={false}
            className="relative h-20 sm:h-24 object-contain drop-shadow-xl animate-bounce-slow"
          />
        </div>
        
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-3 text-blue-600">
            <Loader2 size={24} className="animate-spin" strokeWidth={3} />
            <span className="text-xl font-bold tracking-tight">Authenticating...</span>
          </div>
          <p className="text-sm text-gray-500 font-medium">Please wait while we verify your credentials</p>
        </div>
      </div>
      
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
