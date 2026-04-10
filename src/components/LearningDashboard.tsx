import { motion } from 'framer-motion'
import {
  BarChart3,
  Target,
  BookOpen,
  Brain,
  TrendingUp,
  Star,
  CheckCircle2,
  Clock,
} from 'lucide-react'
import { useHomework } from '../hooks/useHomework'
import { useQuiz } from '../hooks/useQuiz'
import type { QuizCategory } from '../types/quiz'

const CATEGORY_CONFIG: Record<
  QuizCategory,
  { emoji: string; color: string; bg: string }
> = {
  Mathematik: { emoji: '🔢', color: 'text-blue-400', bg: 'bg-blue-400/10' },
  Deutsch: { emoji: '📖', color: 'text-purple-400', bg: 'bg-purple-400/10' },
  Englisch: { emoji: '🌍', color: 'text-green-400', bg: 'bg-green-400/10' },
  Naturwissenschaften: { emoji: '🔬', color: 'text-orange-400', bg: 'bg-orange-400/10' },
}

function StatCard({
  icon,
  label,
  value,
  sub,
  color,
  delay = 0,
}: {
  icon: React.ReactNode
  label: string
  value: string | number
  sub?: string
  color: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-gray-900 border border-white/10 rounded-2xl p-5"
    >
      <div className={`inline-flex p-2.5 rounded-xl mb-3 ${color}`}>{icon}</div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-sm text-gray-400 mt-0.5">{label}</div>
      {sub && <div className="text-xs text-gray-600 mt-1">{sub}</div>}
    </motion.div>
  )
}

function ProgressBar({
  label,
  value,
  max,
  color,
  emoji,
}: {
  label: string
  value: number
  max: number
  color: string
  emoji: string
}) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-300 flex items-center gap-2">
          <span>{emoji}</span>
          {label}
        </span>
        <span className="text-gray-500 text-xs">{value} / {max} Pkt.</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </div>
  )
}

export default function LearningDashboard() {
  const { stats: hwStats } = useHomework()
  const { stats: quizStats, results } = useQuiz()

  const accuracy =
    quizStats.totalAnswers > 0
      ? Math.round((quizStats.correctAnswers / quizStats.totalAnswers) * 100)
      : 0

  const recentResults = [...results]
    .sort((a, b) => b.completedAt.localeCompare(a.completedAt))
    .slice(0, 5)

  const maxCategoryPoints = 60 // 6 questions × 10 points per category

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <BarChart3 className="text-purple-400" size={30} />
          Lern-Dashboard
        </h1>
        <p className="text-gray-400 mt-1">Dein Lernfortschritt auf einen Blick</p>
      </motion.div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={<Star size={18} className="text-yellow-400" />}
          label="Gesamtpunkte"
          value={quizStats.totalPoints}
          color="bg-yellow-400/10"
          delay={0.1}
        />
        <StatCard
          icon={<Brain size={18} className="text-purple-400" />}
          label="Quizze absolviert"
          value={quizStats.quizzesCompleted}
          color="bg-purple-400/10"
          delay={0.15}
        />
        <StatCard
          icon={<Target size={18} className="text-green-400" />}
          label="Trefferquote"
          value={`${accuracy}%`}
          sub={`${quizStats.correctAnswers}/${quizStats.totalAnswers} richtig`}
          color="bg-green-400/10"
          delay={0.2}
        />
        <StatCard
          icon={<CheckCircle2 size={18} className="text-cyan-400" />}
          label="HA erledigt"
          value={hwStats.erledigt}
          sub={`von ${hwStats.total} gesamt`}
          color="bg-cyan-400/10"
          delay={0.25}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Progress */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-900 border border-white/10 rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
            <TrendingUp size={18} className="text-purple-400" />
            Fortschritt nach Fach
          </h2>
          <div className="space-y-4">
            {(Object.entries(CATEGORY_CONFIG) as [QuizCategory, typeof CATEGORY_CONFIG[QuizCategory]][]).map(
              ([cat, cfg]) => (
                <ProgressBar
                  key={cat}
                  label={cat}
                  emoji={cfg.emoji}
                  value={quizStats.byCategory[cat].points}
                  max={maxCategoryPoints}
                  color={`bg-gradient-to-r ${
                    cat === 'Mathematik'
                      ? 'from-blue-500 to-cyan-500'
                      : cat === 'Deutsch'
                      ? 'from-purple-500 to-pink-500'
                      : cat === 'Englisch'
                      ? 'from-green-500 to-emerald-500'
                      : 'from-orange-500 to-amber-500'
                  }`}
                />
              )
            )}
          </div>
        </motion.div>

        {/* Homework Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-900 border border-white/10 rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
            <BookOpen size={18} className="text-cyan-400" />
            Hausaufgaben Übersicht
          </h2>
          <div className="space-y-3">
            {[
              { label: 'Offen', value: hwStats.offen, color: 'bg-orange-500', max: hwStats.total },
              {
                label: 'In Bearbeitung',
                value: hwStats.inBearbeitung,
                color: 'bg-blue-500',
                max: hwStats.total,
              },
              { label: 'Erledigt', value: hwStats.erledigt, color: 'bg-green-500', max: hwStats.total },
            ].map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">{item.label}</span>
                  <span className="text-white font-medium">{item.value}</span>
                </div>
                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: item.max > 0 ? `${(item.value / item.max) * 100}%` : '0%',
                    }}
                    transition={{ duration: 0.8 }}
                    className={`h-full rounded-full ${item.color}`}
                  />
                </div>
              </div>
            ))}
            {hwStats.overdue > 0 && (
              <div className="flex items-center gap-2 mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-400">
                <Clock size={14} />
                {hwStats.overdue} überfällige Aufgabe{hwStats.overdue !== 1 ? 'n' : ''}!
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Recent Quiz Results */}
      {recentResults.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 bg-gray-900 border border-white/10 rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
            <Brain size={18} className="text-purple-400" />
            Letzte Quiz-Ergebnisse
          </h2>
          <div className="space-y-3">
            {recentResults.map((r) => {
              const cfg = CATEGORY_CONFIG[r.category]
              const pct = Math.round((r.score / r.totalQuestions) * 100)
              return (
                <div
                  key={r.id}
                  className="flex items-center gap-4 p-3 bg-gray-800/50 rounded-xl"
                >
                  <div className={`w-10 h-10 rounded-xl ${cfg.bg} flex items-center justify-center text-xl flex-shrink-0`}>
                    {cfg.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white">{r.category}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(r.completedAt).toLocaleDateString('de-DE', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-white">
                      {r.score}/{r.totalQuestions}
                    </div>
                    <div
                      className={`text-xs ${pct >= 60 ? 'text-green-400' : 'text-red-400'}`}
                    >
                      {pct}%
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-400 text-sm font-medium w-14 justify-end">
                    <Star size={12} fill="currentColor" />
                    {r.score * 10}
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      )}

      {recentResults.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center py-12 bg-gray-900 border border-white/10 rounded-2xl"
        >
          <Brain size={48} className="mx-auto mb-4 text-gray-700" />
          <p className="text-gray-500">Noch keine Quiz-Ergebnisse.</p>
          <p className="text-gray-600 text-sm mt-1">Starte dein erstes Quiz!</p>
        </motion.div>
      )}
    </div>
  )
}
