import { useState, type FormEvent, useEffect, useRef } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { Loader2, User, Lock, ArrowRight, Eye, EyeOff, ChevronDown, Users } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { validateLogin } from '../utils/auth'
import { USERS } from '../data/users'
import LoadingScreen from '../components/LoadingScreen'

export default function LoginPage() {
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const [studentId, setStudentId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    // Set body background to match login page to prevent blue overscroll/safe-area artifacts on mobile
    const originalBodyBg = document.body.style.backgroundColor
    document.body.style.backgroundColor = '#f4f7fc'

    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.backgroundColor = originalBodyBg
    }
  }, [])

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    if (!studentId.trim() || !password) {
      setError('Student ID dan password wajib diisi.')
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    const user = validateLogin(studentId, password)
    if (user) {
      login(user)
      navigate('/dashboard', { replace: true })
    } else {
      setError('Student ID atau password salah. Coba lagi.')
    }
    setLoading(false)
  }

  return (
    <>
      {loading && <LoadingScreen />}
      <div className="relative flex flex-col lg:flex-row min-h-screen w-full bg-[#f4f7fc] font-sans selection:bg-blue-200">
        <div className="absolute top-0 left-0 w-full h-[55vh] lg:relative lg:h-auto lg:w-1/2 lg:flex-none lg:min-h-screen overflow-hidden z-0">
          <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply z-10" />
          <img
            src="/asset/foto.png"
            alt="Students"
            aria-hidden="true"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
          />
          <div className="absolute inset-0 lg:hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f4f7fc]/40 to-[#f4f7fc] z-10" />
          </div>

          <div className="hidden lg:flex relative z-20 flex-col justify-center items-start p-12 lg:p-20 absolute inset-y-0 left-0 w-full h-full bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none">
            <div className="mt-auto pb-20 animate-fade-in-up">
              <h1 className="text-5xl lg:text-7xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg">
                Hello!
              </h1>
              <p className="text-xl lg:text-2xl font-medium text-white/90 drop-shadow-md max-w-md">
                Welcome back to your SMLONE Student Portal.
              </p>
            </div>
          </div>
        </div>


        <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12 z-20 mt-[15vh] lg:mt-0">
          <div className="flex-1 w-full flex items-center justify-center w-full">
            <div className="w-full max-w-[440px] bg-white/95 backdrop-blur-xl rounded-[2rem] p-8 sm:p-12 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-white/60 animate-fade-in">

              <div className="absolute top-6 right-6 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 text-[0.65rem] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm border border-blue-100 select-none pointer-events-none">
                Beta
              </div>

              <div className="flex flex-col items-center mb-10">
                <img
                  src="/asset/logo.png"
                  alt="SMLONE Logo"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  className="h-[70px] sm:h-[85px] object-contain select-none pointer-events-none drop-shadow-sm transition-transform hover:scale-105 duration-300"
                />
              </div>

              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Login to Account</h2>
                <p className="text-sm text-gray-500 mt-2 font-medium">Enter your credentials to access your dashboard</p>
              </div>

              <div className="mb-6 relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:border-blue-300 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                      <Users size={16} strokeWidth={2.5} />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-bold text-blue-800">Available Test Accounts</div>
                      <div className="text-xs text-blue-600">Click to select credentials</div>
                    </div>
                  </div>
                  <ChevronDown
                    size={18}
                    strokeWidth={2.5}
                    className={`text-blue-600 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}
                  />
                </button>

                {showDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-gray-200 shadow-lg z-50 overflow-hidden animate-fade-in">
                    <div className="p-2">
                      {USERS.map((user, index) => (
                        <button
                          key={user.id}
                          type="button"
                          onClick={() => {
                            setStudentId(user.id)
                            setPassword(user.password)
                            setError('')
                            setShowDropdown(false)
                          }}
                          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors text-left group"
                        >
                          <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                            {user.gender === 'female' ? (
                              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-blue-600">
                                <path d="M12 3c-2.76 0-5 2.24-5 5 0 2.5-1 5.5-1 5.5.5.5 3 .5 4.5-.5v3h3v-3c1.5 1 4 1 4.5.5 0 0-1-3-1-5.5 0-2.76-2.24-5-5-5z" />
                                <path d="M12 17c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                              </svg>
                            ) : (
                              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-blue-600">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                              </svg>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-bold text-gray-900 group-hover:text-blue-700">{user.name}</div>
                            <div className="text-xs text-gray-500">ID: {user.id} • Password: {user.password}</div>
                          </div>
                          <div className="text-xs text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            Select
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="input-student-id" className="block text-sm font-bold text-gray-700 ml-1">
                    Student ID
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
                      <User size={18} strokeWidth={2.5} />
                    </div>
                    <input
                      id="input-student-id"
                      type="text"
                      value={studentId}
                      onChange={(e) => { setStudentId(e.target.value.toUpperCase()); setError('') }}
                      placeholder="Enter your ID"
                      autoComplete="username"
                      spellCheck={false}
                      className={`w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50/50 border-2 transition-all duration-200 outline-none text-gray-900 placeholder-gray-400 font-bold
                      ${error ? 'border-red-200 focus:border-red-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(239,68,68,0.1)]' : 'border-gray-100 focus:border-blue-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] hover:border-gray-200'}`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-1">
                    <label htmlFor="input-password" className="block text-sm font-bold text-gray-700">
                      Password
                    </label>
                    <button type="button" className="text-xs font-bold text-red-600 hover:text-red-800 hover:underline transition-all">
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
                      <Lock size={18} strokeWidth={2.5} />
                    </div>
                    <input
                      id="input-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setError('') }}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      className={`w-full pl-11 pr-12 py-3.5 rounded-2xl bg-gray-50/50 border-2 transition-all duration-200 outline-none text-gray-900 placeholder-gray-400 font-bold ${showPassword ? '' : 'tracking-wider'}
                      ${error ? 'border-red-200 focus:border-red-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(239,68,68,0.1)]' : 'border-gray-100 focus:border-blue-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)] hover:border-gray-200'}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <Eye size={18} strokeWidth={2.5} /> : <EyeOff size={18} strokeWidth={2.5} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div id="login-error" className="flex items-center gap-3 p-3.5 rounded-xl bg-red-50 border border-red-100 animate-shake">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0 ml-1" />
                    <p className="text-sm text-red-600 font-bold">{error}</p>
                  </div>
                )}

                <button
                  id="btn-login"
                  type="submit"
                  disabled={loading}
                  className={`group relative w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl text-white text-[1.05rem] font-bold overflow-hidden transition-all duration-300 shadow-[0_8px_20px_-6px_rgba(37,99,235,0.4)] mt-2
                  ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-[0_12px_25px_-6px_rgba(37,99,235,0.5)]'}`}
                >
                  {loading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <span>Login</span>
                      <ArrowRight size={18} strokeWidth={2.5} className="transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="mt-8 lg:absolute lg:bottom-6 w-full text-center z-30 px-4 pointer-events-none">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs font-bold text-gray-400 pointer-events-auto">
              <span>&copy; {new Date().getFullYear()} SMLONE Portal.</span>
              <span className="hidden sm:inline opacity-40">•</span>
              <div className="flex gap-4">
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-blue-600 transition-colors">Privacy</a>
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-blue-600 transition-colors">Terms</a>
              </div>
            </div>
          </div>
        </div>


        <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
        .animate-shake { animation: shake 0.4s ease-in-out; }
      `}</style>
      </div>
    </>
  )
}

