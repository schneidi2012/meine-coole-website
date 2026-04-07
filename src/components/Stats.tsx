import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface Stat {
  value: string
  numericValue: number
  suffix: string
  label: string
  color: string
}

const stats: Stat[] = [
  { value: '10,000+', numericValue: 10000, suffix: '+', label: 'Happy Users', color: 'from-purple-400 to-pink-400' },
  { value: '99.9%', numericValue: 99.9, suffix: '%', label: 'Uptime', color: 'from-blue-400 to-cyan-400' },
  { value: '500+', numericValue: 500, suffix: '+', label: 'Components', color: 'from-green-400 to-teal-400' },
  { value: '24/7', numericValue: 24, suffix: '/7', label: 'Support', color: 'from-orange-400 to-yellow-400' },
]

function AnimatedCounter({ stat, inView }: { stat: Stat; inView: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const steps = 60
    const increment = stat.numericValue / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= stat.numericValue) {
        setCount(stat.numericValue)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, stat.numericValue])

  const formatCount = (n: number) => {
    if (stat.suffix === '+' && stat.numericValue >= 1000) {
      return n >= 1000 ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k` : n.toString()
    }
    return n.toString()
  }

  return (
    <span className={`text-5xl sm:text-6xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
      {formatCount(count)}{stat.suffix}
    </span>
  )
}

export default function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section id="stats" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/30 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
            By the Numbers
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            Trusted by <span className="gradient-text">Thousands</span>
          </h2>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-8 text-center border border-white/10 hover:border-white/20 transition-colors"
            >
              <AnimatedCounter stat={stat} inView={inView} />
              <p className="mt-2 text-gray-400 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
