import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Trophy,
  Star,
  RotateCcw,
  Lightbulb,
  Timer,
} from 'lucide-react'
import { useQuiz } from '../hooks/useQuiz'
import type { QuizCategory } from '../types/quiz'

const CATEGORIES: { key: QuizCategory; emoji: string; color: string; description: string }[] = [
  {
    key: 'Mathematik',
    emoji: '🔢',
    color: 'from-blue-500 to-cyan-500',
    description: 'Rechnen, Geometrie, Algebra',
  },
  {
    key: 'Deutsch',
    emoji: '📖',
    color: 'from-purple-500 to-pink-500',
    description: 'Grammatik, Literatur, Rechtschreibung',
  },
  {
    key: 'Englisch',
    emoji: '🌍',
    color: 'from-green-500 to-emerald-500',
    description: 'Vokabeln, Grammatik, Ausdrücke',
  },
  {
    key: 'Naturwissenschaften',
    emoji: '🔬',
    color: 'from-orange-500 to-amber-500',
    description: 'Biologie, Chemie, Physik',
  },
]

const COLORS = ['#a855f7', '#06b6d4', '#22c55e', '#f59e0b', '#ec4899']
const CONFETTI_ITEMS = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  left: ((i * 137.5) % 100).toFixed(1) + '%',
  background: COLORS[i % COLORS.length],
  x: ((i % 7) - 3) * 50,
  rotate: (i * 97) % 720,
  duration: 2 + (i % 10) * 0.2,
  delay: (i % 10) * 0.1,
}))

function Confetti() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {CONFETTI_ITEMS.map((item) => (
        <motion.div
          key={item.id}
          className="absolute w-3 h-3 rounded-sm"
          style={{
            left: item.left,
            background: item.background,
          }}
          initial={{ y: -20, x: 0, rotate: 0, opacity: 1 }}
          animate={{
            y: 800,
            x: item.x,
            rotate: item.rotate,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            ease: 'easeIn',
          }}
        />
      ))}
    </div>
  )
}

function CategorySelect({
  onStart,
  stats,
}: {
  onStart: (cat: QuizCategory) => void
  stats: { byCategory: Record<QuizCategory, { points: number; completed: number }> }
}) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Brain className="text-purple-400" size={30} />
          Quiz
        </h1>
        <p className="text-gray-400 mb-8">Wähle eine Kategorie und teste dein Wissen!</p>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CATEGORIES.map((cat, idx) => {
          const catStats = stats.byCategory[cat.key]
          return (
            <motion.button
              key={cat.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onStart(cat.key)}
              className="text-left p-5 bg-gray-900 border border-white/10 rounded-2xl hover:border-white/20 transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{cat.emoji}</span>
                <ChevronRight
                  size={18}
                  className="text-gray-600 group-hover:text-white transition-colors mt-1"
                />
              </div>
              <h3 className="font-semibold text-white mb-1">{cat.key}</h3>
              <p className="text-xs text-gray-500 mb-3">{cat.description}</p>
              <div className="flex items-center justify-between">
                <div
                  className={`text-xs font-medium bg-gradient-to-r ${cat.color} bg-clip-text text-transparent`}
                >
                  {catStats.completed} Quiz{catStats.completed !== 1 ? 'ze' : ''} absolviert
                </div>
                {catStats.points > 0 && (
                  <div className="flex items-center gap-1 text-xs text-yellow-400">
                    <Star size={11} fill="currentColor" />
                    {catStats.points} Pkt.
                  </div>
                )}
              </div>
              {catStats.completed > 0 && (
                <div className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${cat.color} rounded-full`}
                    style={{ width: `${Math.min((catStats.points / 60) * 100, 100)}%` }}
                  />
                </div>
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

function QuizQuestion({
  question,
  questionIndex,
  totalQuestions,
  selectedAnswer,
  showExplanation,
  onSelectAnswer,
  onNext,
}: {
  question: { question: string; options: string[]; correctAnswer: number; explanation?: string }
  questionIndex: number
  totalQuestions: number
  selectedAnswer: number | null
  showExplanation: boolean
  onSelectAnswer: (i: number) => void
  onNext: () => void
}) {
  const progress = ((questionIndex + 1) / totalQuestions) * 100

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
          <span>
            Frage {questionIndex + 1} / {totalQuestions}
          </span>
          <span className="flex items-center gap-1">
            <Timer size={13} />
            Viel Erfolg!
          </span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={questionIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
        >
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 mb-4">
            <p className="text-white text-lg font-semibold leading-relaxed">{question.question}</p>
          </div>

          <div className="space-y-3 mb-4">
            {question.options.map((option, i) => {
              let btnClass =
                'w-full text-left p-4 rounded-xl border text-sm font-medium transition-all '
              if (selectedAnswer === null) {
                btnClass +=
                  'bg-gray-900 border-white/10 text-white hover:border-purple-500 hover:bg-purple-500/5 cursor-pointer'
              } else if (i === question.correctAnswer) {
                btnClass += 'bg-green-500/10 border-green-500 text-green-400'
              } else if (i === selectedAnswer) {
                btnClass += 'bg-red-500/10 border-red-500 text-red-400'
              } else {
                btnClass += 'bg-gray-900 border-white/5 text-gray-500 cursor-default'
              }

              return (
                <motion.button
                  key={i}
                  whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                  onClick={() => onSelectAnswer(i)}
                  className={btnClass}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs flex-shrink-0">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {option}
                    {selectedAnswer !== null && i === question.correctAnswer && (
                      <CheckCircle2 size={16} className="ml-auto text-green-400" />
                    )}
                    {selectedAnswer !== null &&
                      i === selectedAnswer &&
                      i !== question.correctAnswer && (
                        <XCircle size={16} className="ml-auto text-red-400" />
                      )}
                  </span>
                </motion.button>
              )
            })}
          </div>

          {showExplanation && question.explanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl text-sm text-blue-300 mb-4"
            >
              <Lightbulb size={16} className="mt-0.5 flex-shrink-0 text-blue-400" />
              <span>{question.explanation}</span>
            </motion.div>
          )}

          {selectedAnswer !== null && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={onNext}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium hover:opacity-90 transition-opacity"
            >
              {questionIndex + 1 >= totalQuestions ? 'Ergebnis anzeigen' : 'Nächste Frage →'}
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function QuizResults({
  score,
  totalQuestions,
  category,
  onRestart,
  onHome,
}: {
  score: number
  totalQuestions: number
  category: QuizCategory
  onRestart: () => void
  onHome: () => void
}) {
  const percentage = Math.round((score / totalQuestions) * 100)
  const points = score * 10

  let emoji = '😔'
  let message = 'Weiter üben!'
  let color = 'from-red-500 to-orange-500'

  if (percentage >= 80) {
    emoji = '🏆'
    message = 'Ausgezeichnet!'
    color = 'from-yellow-400 to-orange-400'
  } else if (percentage >= 60) {
    emoji = '👍'
    message = 'Gut gemacht!'
    color = 'from-green-500 to-emerald-500'
  } else if (percentage >= 40) {
    emoji = '💪'
    message = 'Du schaffst das!'
    color = 'from-blue-500 to-cyan-500'
  }

  return (
    <div className="max-w-md mx-auto px-4 py-8 text-center">
      {percentage >= 60 && <Confetti />}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: 0.2 }}
        className="text-7xl mb-4"
      >
        {emoji}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`text-3xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent mb-2`}
      >
        {message}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-400 mb-6"
      >
        {category}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gray-900 border border-white/10 rounded-2xl p-6 mb-6"
      >
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div
              className={`text-3xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}
            >
              {score}/{totalQuestions}
            </div>
            <div className="text-xs text-gray-500 mt-1">Richtig</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-400">{percentage}%</div>
            <div className="text-xs text-gray-500 mt-1">Trefferquote</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-400 flex items-center justify-center gap-1">
              <Star size={20} fill="currentColor" />
              {points}
            </div>
            <div className="text-xs text-gray-500 mt-1">Punkte</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex gap-3"
      >
        <button
          onClick={onHome}
          className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-gray-400 text-sm hover:bg-white/5 transition-colors"
        >
          Kategorien
        </button>
        <button
          onClick={onRestart}
          className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <RotateCcw size={15} />
          Nochmal
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-4 flex items-center justify-center gap-2 text-yellow-400 text-sm"
      >
        <Trophy size={14} />
        +{points} Punkte zum Leaderboard hinzugefügt!
      </motion.div>
    </div>
  )
}

export default function QuizApp() {
  const {
    activeCategory,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    selectedAnswer,
    showExplanation,
    correctCount,
    quizFinished,
    startQuiz,
    selectAnswer,
    nextQuestion,
    resetQuiz,
    stats,
  } = useQuiz()

  if (!activeCategory) {
    return <CategorySelect onStart={startQuiz} stats={stats} />
  }

  if (quizFinished) {
    return (
      <QuizResults
        score={correctCount}
        totalQuestions={totalQuestions}
        category={activeCategory}
        onRestart={() => startQuiz(activeCategory)}
        onHome={resetQuiz}
      />
    )
  }

  if (!currentQuestion) return null

  return (
    <QuizQuestion
      question={currentQuestion}
      questionIndex={currentQuestionIndex}
      totalQuestions={totalQuestions}
      selectedAnswer={selectedAnswer}
      showExplanation={showExplanation}
      onSelectAnswer={selectAnswer}
      onNext={nextQuestion}
    />
  )
}
