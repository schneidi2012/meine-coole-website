import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

interface Testimonial {
  name: string
  role: string
  company: string
  quote: string
  initials: string
  color: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Chen',
    role: 'Lead Frontend Engineer',
    company: 'Stripe',
    quote: 'ModernUI has completely transformed how our team builds UIs. The components are beautiful out of the box and the customization options are endless. We cut our development time in half.',
    initials: 'SC',
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Marcus Johnson',
    role: 'CTO',
    company: 'Vercel',
    quote: 'I have tried dozens of component libraries, but ModernUI is in a league of its own. The attention to detail, the animations, the TypeScript support — everything just works perfectly.',
    initials: 'MJ',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Product Designer',
    company: 'Figma',
    quote: 'As a designer who codes, I love how ModernUI bridges the gap between design and development. The glassmorphism effects and gradient systems make every product look stunning.',
    initials: 'ER',
    color: 'from-green-500 to-teal-500',
  },
]

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const prev = () => {
    setDirection(-1)
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
  }

  const next = () => {
    setDirection(1)
    setIndex((i) => (i + 1) % testimonials.length)
  }

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 80 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: -dir * 80 }),
  }

  const t = testimonials[index]

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-pink-500/10 text-pink-400 border border-pink-500/20 mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            Loved by <span className="gradient-text">Developers</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="relative overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="glass rounded-2xl p-8 sm:p-12 border border-white/10"
              >
                <Quote size={40} className="text-purple-400/30 mb-6" />
                <p className="text-lg sm:text-xl text-gray-200 leading-relaxed mb-8 italic">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{t.name}</p>
                    <p className="text-sm text-gray-400">{t.role} at <span className="text-purple-400">{t.company}</span></p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-3 rounded-xl glass border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i) }}
                  className={`h-2 rounded-full transition-all ${i === index ? 'w-8 bg-purple-500' : 'w-2 bg-gray-600'}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-3 rounded-xl glass border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
