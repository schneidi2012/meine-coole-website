import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar, { type AppTab } from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Stats from './components/Stats'
import Demo from './components/Demo'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'
import HomeworkManager from './components/HomeworkManager'
import QuizApp from './components/QuizApp'
import LearningDashboard from './components/LearningDashboard'
import Leaderboard from './components/Leaderboard'

function LandingPage() {
  return (
    <>
      <Hero />
      <Features />
      <Stats />
      <Demo />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  )
}

function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [activeTab, setActiveTab] = useState<AppTab>('home')

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const renderContent = () => {
    switch (activeTab) {
      case 'hausaufgaben':
        return <HomeworkManager />
      case 'quiz':
        return <QuizApp />
      case 'fortschritt':
        return <LearningDashboard />
      case 'leaderboard':
        return <Leaderboard />
      default:
        return <LandingPage />
    }
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="bg-gray-950 dark:bg-gray-950 text-white min-h-screen">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="pt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default App
