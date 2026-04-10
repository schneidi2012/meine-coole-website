import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X, GraduationCap, BookOpen, Brain, BarChart3, Trophy, Home } from 'lucide-react'
import { useState } from 'react'

export type AppTab = 'home' | 'hausaufgaben' | 'quiz' | 'fortschritt' | 'leaderboard'

interface NavbarProps {
  darkMode: boolean
  setDarkMode: (value: boolean) => void
  activeTab: AppTab
  setActiveTab: (tab: AppTab) => void
}

const tabs: { key: AppTab; label: string; icon: React.ReactNode }[] = [
  { key: 'home', label: 'Home', icon: <Home size={15} /> },
  { key: 'hausaufgaben', label: 'Hausaufgaben', icon: <BookOpen size={15} /> },
  { key: 'quiz', label: 'Quiz', icon: <Brain size={15} /> },
  { key: 'fortschritt', label: 'Fortschritt', icon: <BarChart3 size={15} /> },
  { key: 'leaderboard', label: 'Leaderboard', icon: <Trophy size={15} /> },
]

export default function Navbar({ darkMode, setDarkMode, activeTab, setActiveTab }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass dark:glass border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
              <GraduationCap size={16} className="text-white" />
            </div>
            <span className="font-bold text-lg dark:text-white text-gray-900">SchulApp</span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.icon}
                {tab.label}
                {activeTab === tab.key && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-white/10 rounded-lg"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg glass hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              className="md:hidden p-2 text-gray-400"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 px-4 py-4 flex flex-col gap-1"
          >
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key)
                  setMobileOpen(false)
                }}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                  activeTab === tab.key
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
