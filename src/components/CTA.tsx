import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-blue-900/30 to-cyan-900/30" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/30 text-sm text-purple-300 mb-8">
            <Sparkles size={14} />
            <span>Start building today — it's free</span>
          </div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 leading-tight">
            Ready to <span className="gradient-text">Get Started?</span>
          </h2>

          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Join thousands of developers building the next generation of web experiences. No credit card required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-10 py-4 rounded-xl bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 text-white font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-2xl shadow-purple-500/30"
            >
              Start Free Trial <ArrowRight size={20} />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-10 py-4 rounded-xl glass border border-white/20 text-white font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              View Documentation
            </motion.a>
          </div>

          <p className="mt-8 text-sm text-gray-500">
            Free forever • No credit card • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  )
}
