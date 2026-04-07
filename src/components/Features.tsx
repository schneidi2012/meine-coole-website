import { motion, useInView, type Variants } from 'framer-motion'
import { useRef } from 'react'
import { Zap, Palette, Shield, Moon, Smartphone, Code2 } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Fast Performance',
    description: 'Built with performance in mind. Lightning-fast load times and smooth interactions that keep users engaged.',
    color: 'from-yellow-400 to-orange-500',
    bg: 'bg-yellow-500/10',
  },
  {
    icon: Palette,
    title: 'Beautiful Design',
    description: 'Stunning, modern aesthetics with carefully crafted color palettes and typography that delights users.',
    color: 'from-pink-400 to-purple-500',
    bg: 'bg-pink-500/10',
  },
  {
    icon: Shield,
    title: 'Type Safe',
    description: 'Full TypeScript support with comprehensive type definitions for a robust development experience.',
    color: 'from-blue-400 to-cyan-500',
    bg: 'bg-blue-500/10',
  },
  {
    icon: Moon,
    title: 'Dark Mode',
    description: 'Built-in dark mode support with smooth transitions and beautiful contrast for every component.',
    color: 'from-indigo-400 to-purple-600',
    bg: 'bg-indigo-500/10',
  },
  {
    icon: Smartphone,
    title: 'Fully Responsive',
    description: 'Mobile-first design that looks perfect on every device, from phones to ultra-wide monitors.',
    color: 'from-green-400 to-teal-500',
    bg: 'bg-green-500/10',
  },
  {
    icon: Code2,
    title: 'Open Source',
    description: 'Community-driven development with transparent code. Contribute, customize, and make it your own.',
    color: 'from-red-400 to-pink-500',
    bg: 'bg-red-500/10',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function Features() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-4">
            Features
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Everything You <span className="gradient-text">Need</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            A complete toolkit built for modern web development. No compromises, just results.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass rounded-2xl p-6 group cursor-pointer border border-white/5 hover:border-white/20 transition-colors"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4`}>
                  <div className={`bg-gradient-to-br ${feature.color} rounded-lg p-2`}>
                    <Icon size={20} className="text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:gradient-text transition-all">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
