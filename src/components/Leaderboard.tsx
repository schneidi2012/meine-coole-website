import { useState } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Star, Medal, Crown, UserCircle2, Edit3, Check } from 'lucide-react'
import { useQuiz } from '../hooks/useQuiz'
import type { QuizCategory } from '../types/quiz'

const MEDAL_COLORS = [
  'text-yellow-400', // gold
  'text-gray-300',   // silver
  'text-amber-600',  // bronze
]

const SAMPLE_OPPONENTS: { name: string; totalPoints: number; quizzesCompleted: number }[] = [
  { name: 'Lisa M.', totalPoints: 480, quizzesCompleted: 12 },
  { name: 'Max K.', totalPoints: 350, quizzesCompleted: 9 },
  { name: 'Emma S.', totalPoints: 310, quizzesCompleted: 8 },
  { name: 'Luca B.', totalPoints: 270, quizzesCompleted: 7 },
  { name: 'Sophie T.', totalPoints: 220, quizzesCompleted: 6 },
]

function getRankIcon(rank: number) {
  if (rank === 0) return <Crown size={18} className="text-yellow-400" fill="currentColor" />
  if (rank === 1) return <Medal size={18} className="text-gray-300" />
  if (rank === 2) return <Medal size={18} className="text-amber-600" />
  return (
    <span className="text-gray-500 font-bold text-sm w-[18px] text-center">{rank + 1}</span>
  )
}

interface LeaderboardEntry {
  name: string
  totalPoints: number
  quizzesCompleted: number
  isYou?: boolean
}

export default function Leaderboard() {
  const { stats: quizStats, playerName, setPlayerName } = useQuiz()
  const [editingName, setEditingName] = useState(false)
  const [tempName, setTempName] = useState(playerName)

  const displayName = playerName || 'Du'

  const yourEntry: LeaderboardEntry = {
    name: displayName,
    totalPoints: quizStats.totalPoints,
    quizzesCompleted: quizStats.quizzesCompleted,
    isYou: true,
  }

  const allEntries: LeaderboardEntry[] = [
    ...SAMPLE_OPPONENTS.map((o) => ({ ...o, isYou: false })),
    yourEntry,
  ].sort((a, b) => b.totalPoints - a.totalPoints)

  const yourRank = allEntries.findIndex((e) => e.isYou)
  const maxPoints = allEntries[0]?.totalPoints || 1

  const categoriesPlayed = (Object.entries(quizStats.byCategory) as [QuizCategory, { points: number; completed: number }][]).filter(
    ([, v]) => v.completed > 0
  )

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Trophy className="text-yellow-400" size={30} />
          Leaderboard
        </h1>
        <p className="text-gray-400 mt-1">Die besten Schüler nach Punkten</p>
      </motion.div>

      {/* Your Name */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gray-900 border border-white/10 rounded-2xl p-5 mb-6 flex items-center gap-4"
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
          {displayName.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          {editingName ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="Dein Name"
                className="bg-gray-800 border border-purple-500 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setPlayerName(tempName)
                    setEditingName(false)
                  }
                }}
              />
              <button
                onClick={() => {
                  setPlayerName(tempName)
                  setEditingName(false)
                }}
                className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-colors"
              >
                <Check size={14} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold">{displayName}</span>
              <button
                onClick={() => {
                  setTempName(playerName)
                  setEditingName(true)
                }}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <Edit3 size={13} />
              </button>
            </div>
          )}
          <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <Star size={12} className="text-yellow-400" fill="currentColor" />
              {quizStats.totalPoints} Punkte
            </span>
            <span>{quizStats.quizzesCompleted} Quiz{quizStats.quizzesCompleted !== 1 ? 'ze' : ''}</span>
            {yourRank >= 0 && (
              <span className="text-purple-400">Platz {yourRank + 1}</span>
            )}
          </div>
        </div>
        <UserCircle2 size={20} className="text-gray-600" />
      </motion.div>

      {/* Leaderboard */}
      <div className="space-y-2">
        {allEntries.map((entry, idx) => (
          <motion.div
            key={entry.name + idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + idx * 0.05 }}
            className={`relative flex items-center gap-4 p-4 rounded-xl border transition-all ${
              entry.isYou
                ? 'bg-purple-500/10 border-purple-500/40'
                : 'bg-gray-900 border-white/10'
            }`}
          >
            {/* Rank */}
            <div className="w-6 flex items-center justify-center flex-shrink-0">
              {getRankIcon(idx)}
            </div>

            {/* Avatar */}
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                entry.isYou
                  ? 'bg-gradient-to-br from-purple-500 to-cyan-500 text-white'
                  : 'bg-gray-800 text-gray-300'
              }`}
            >
              {entry.name.charAt(0).toUpperCase()}
            </div>

            {/* Name & Stats */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm font-semibold ${entry.isYou ? 'text-purple-300' : 'text-white'}`}
                >
                  {entry.name}
                </span>
                {entry.isYou && (
                  <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full border border-purple-500/30">
                    Du
                  </span>
                )}
                {idx < 3 && (
                  <span className={`text-xs font-medium ${MEDAL_COLORS[idx]}`}>
                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}
                  </span>
                )}
              </div>
              {/* Progress bar */}
              <div className="mt-1.5 h-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(entry.totalPoints / maxPoints) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.2 + idx * 0.05 }}
                  className={`h-full rounded-full ${
                    entry.isYou
                      ? 'bg-gradient-to-r from-purple-500 to-cyan-500'
                      : idx === 0
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-400'
                      : 'bg-gray-600'
                  }`}
                />
              </div>
            </div>

            {/* Points */}
            <div className="text-right flex-shrink-0">
              <div className={`flex items-center gap-1 font-bold text-sm ${idx === 0 ? 'text-yellow-400' : entry.isYou ? 'text-purple-400' : 'text-white'}`}>
                <Star size={12} fill="currentColor" />
                {entry.totalPoints}
              </div>
              <div className="text-xs text-gray-600 mt-0.5">
                {entry.quizzesCompleted} Qu.
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Category breakdown */}
      {categoriesPlayed.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 bg-gray-900 border border-white/10 rounded-2xl p-5"
        >
          <h3 className="text-sm font-semibold text-gray-300 mb-4">Deine Stärken</h3>
          <div className="grid grid-cols-2 gap-3">
            {categoriesPlayed.map(([cat, v]) => (
              <div
                key={cat}
                className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl"
              >
                <span className="text-lg">
                  {cat === 'Mathematik'
                    ? '🔢'
                    : cat === 'Deutsch'
                    ? '📖'
                    : cat === 'Englisch'
                    ? '🌍'
                    : '🔬'}
                </span>
                <div>
                  <div className="text-xs font-medium text-white">{cat}</div>
                  <div className="flex items-center gap-1 text-xs text-yellow-400 mt-0.5">
                    <Star size={10} fill="currentColor" />
                    {v.points} Pkt.
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
