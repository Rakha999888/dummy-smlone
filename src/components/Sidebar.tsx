import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Home,
  Users,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  UserCircle,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
  path: string
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <Home size={20} />, path: '/dashboard' },
  { id: 'list', label: 'List', icon: <Users size={20} />, path: '/list' },
]

export default function Sidebar() {
  const { user, logout } = useAuth()
  const { theme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [desktopCollapsed, setDesktopCollapsed] = useState(false)

  const isMono = theme === 'mono'
  const sidebarBg = isMono ? '#1a1a1a' : '#6b84b8'
  const sidebarBgMobile = isMono ? '#111111' : '#7C93C3'
  const activeBg = isMono ? '#ffffff' : '#1558E7'
  const activeColor = isMono ? '#000000' : '#FFFFFF'
  const activeBoxShadow = isMono ? '0 2px 8px rgba(255,255,255,0.15)' : '0 2px 8px rgba(21,88,231,0.4)'
  const userCardBg = isMono ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.15)'
  const userCardBorder = isMono ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(255,255,255,0.2)'
  const userIconBg = isMono ? '#333333' : '#1558E7'

  function handleLogout() {
    logout()
    navigate('/login')
  }

  function handleNav(path: string) {
    navigate(path)
    setMobileOpen(false)
  }

  const isActive = (path: string) => location.pathname === path

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className={`flex items-center ${desktopCollapsed ? 'justify-center px-2' : 'gap-3 px-6'} py-6 transition-all duration-300`} style={{ borderBottom: '1px solid rgba(255,255,255,0.15)', minHeight: '84px' }}>
        <img
          src="/asset/logo.png"
          alt="SMLONE Logo"
          className={`object-contain transition-all duration-300 drop-shadow-sm ${desktopCollapsed ? 'h-10' : 'h-12'}`}
          style={{ filter: isMono ? 'brightness(0) invert(1)' : 'none' }}
        />
      </div>

      <nav className="flex-1 px-3 py-5 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            id={`nav-${item.id}`}
            onClick={() => handleNav(item.path)}
            className={`flex items-center ${desktopCollapsed ? 'justify-center px-0' : 'gap-3 px-4'} py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer w-full relative group`}
            style={isActive(item.path)
              ? { backgroundColor: activeBg, color: activeColor, boxShadow: activeBoxShadow }
              : { color: 'rgba(255,255,255,0.75)', backgroundColor: 'transparent' }
            }
            onMouseEnter={e => {
              if (!isActive(item.path)) {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'
                e.currentTarget.style.color = '#FFFFFF'
              }
            }}
            onMouseLeave={e => {
              if (!isActive(item.path)) {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = 'rgba(255,255,255,0.75)'
              }
            }}
            title={desktopCollapsed ? item.label : undefined}
          >
            {item.icon}
            {!desktopCollapsed && <span>{item.label}</span>}
            {desktopCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                {item.label}
              </div>
            )}
          </button>
        ))}
      </nav>

      <div className="px-3 pb-5 space-y-3 mt-auto">
        <div className={`flex items-center ${desktopCollapsed ? 'justify-center px-0' : 'gap-3 px-4'} py-3 rounded-xl`} style={{ backgroundColor: userCardBg, border: userCardBorder }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: userIconBg }}>
            <UserCircle size={18} className="text-white" />
          </div>
          {!desktopCollapsed && (
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>{user?.id}</p>
            </div>
          )}
        </div>

        <button
          id="btn-logout"
          onClick={handleLogout}
          className={`flex items-center ${desktopCollapsed ? 'justify-center px-0' : 'gap-3 px-4'} py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer w-full group relative`}
          style={{ color: '#ff8080', backgroundColor: 'transparent' }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,100,100,0.15)' }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent' }}
          title={desktopCollapsed ? 'Logout' : undefined}
        >
          <LogOut size={18} />
          {!desktopCollapsed && <span>Logout</span>}
          {desktopCollapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
              Logout
            </div>
          )}
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile toggle */}
      <button
        id="btn-mobile-menu"
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer shadow-lg"
        style={{ backgroundColor: '#1558E7', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.2)' }}
      >
        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`lg:hidden fixed top-0 left-0 z-40 h-full w-72 shadow-2xl transform transition-transform duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ backgroundColor: sidebarBgMobile }}
      >
        <SidebarContent />
      </aside>

      <aside className={`hidden lg:flex flex-col shrink-0 h-screen sticky top-0 transition-all duration-300 relative ${desktopCollapsed ? 'w-20' : 'w-64'}`} style={{ backgroundColor: sidebarBg, borderRight: '1px solid rgba(255,255,255,0.15)' }}>
        <SidebarContent />
        <button
          onClick={() => setDesktopCollapsed(!desktopCollapsed)}
          className="absolute -right-3 top-8 bg-white text-blue-600 rounded-full p-1 shadow-md border border-gray-200 hover:bg-gray-50 transition-colors z-50"
        >
          {desktopCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </aside>
    </>
  )
}
