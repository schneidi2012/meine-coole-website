import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import { useEffect, useState } from 'react'

const words = ['Amazing', 'Beautiful', 'Modern', 'Powerful']

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    const word = words[wordIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (typing) {
      if (displayed.length < word.length) {
        timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 100)
      } else {
        timeout = setTimeout(() => setTyping(false), 1800)
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 60)
      } else {
        setWordIndex((i) => (i + 1) % words.length)
        setTyping(true)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayed, typing, wordIndex])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/2 -right-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-pink-500/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '3s' }} />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-10 dark:opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/30 text-sm text-purple-300 mb-8"
        >
          <span>✨</span>
          <span>New Release v2.0 is here</span>
          <ArrowRight size={14} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none mb-6"
        >
          <span className="block text-white">Build Something</span>
          <span className="block gradient-text min-h-[1.2em]">
            {displayed}
            <span className="animate-pulse">|</span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
        >
          The ultimate toolkit for modern web development. Build fast, beautiful, and accessible applications with our comprehensive component library.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#features"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 text-white font-semibold text-lg hover:opacity-90 transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25"
          >
            Get Started <ArrowRight size={20} />
          </a>
          <a
            href="#demo"
            className="w-full sm:w-auto px-8 py-4 rounded-xl glass border border-white/20 text-white font-semibold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2"
          >
            <Play size={20} /> View Demo
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 relative"
        >
          <div className="glass rounded-2xl border border-white/10 p-1 max-w-4xl mx-auto shadow-2xl shadow-purple-900/20">
            <div className="bg-gray-900 rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-4 text-xs text-gray-500 font-mono">app.tsx</span>
              </div>
              <div className="p-6 font-mono text-sm text-left">
                <div className="text-purple-400">import <span className="text-cyan-300">{'{ ModernUI }'}</span> <span className="text-purple-400">from</span> <span className="text-green-400">'modernui'</span></div>
                <div className="mt-2 text-gray-400">{'// '}<span className="text-yellow-300">Build your dream UI</span></div>
                <div className="mt-2 text-blue-300">export default <span className="text-yellow-300">function</span> <span className="text-cyan-300">App</span>() {'{'}</div>
                <div className="ml-4 text-gray-300">return (</div>
                <div className="ml-8 text-pink-400">{'<ModernUI'}</div>
                <div className="ml-10 text-green-300">theme<span className="text-gray-400">=</span><span className="text-orange-300">"dark"</span></div>
                <div className="ml-10 text-green-300">animations<span className="text-gray-400">=</span><span className="text-orange-300">"smooth"</span></div>
                <div className="ml-8 text-pink-400">{'  />'}</div>
                <div className="ml-4 text-gray-300">)</div>
                <div className="text-blue-300">{'}'}</div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-purple-500/20 blur-2xl rounded-full" />
        </motion.div>
      </div>
    </section>
  )
}
