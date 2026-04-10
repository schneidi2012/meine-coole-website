import { useState, useEffect, useCallback, useRef } from 'react'
import type { QuizCategory, QuizResult, QuizStats } from '../types/quiz'
import { quizQuestions } from '../data/quizzes'

const RESULTS_KEY = 'schule_quiz_ergebnisse'
const PLAYER_NAME_KEY = 'schule_spieler_name'

export function useQuiz() {
  const [results, setResults] = useState<QuizResult[]>(() => {
    try {
      const stored = localStorage.getItem(RESULTS_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  const [playerName, setPlayerName] = useState<string>(() => {
    return localStorage.getItem(PLAYER_NAME_KEY) || ''
  })

  const [activeCategory, setActiveCategory] = useState<QuizCategory | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [quizFinished, setQuizFinished] = useState(false)
  const [shuffledQuestions, setShuffledQuestions] = useState(quizQuestions)
  const startTimeRef = useRef<number>(0)

  useEffect(() => {
    localStorage.setItem(RESULTS_KEY, JSON.stringify(results))
  }, [results])

  useEffect(() => {
    if (playerName) localStorage.setItem(PLAYER_NAME_KEY, playerName)
  }, [playerName])

  const startQuiz = useCallback((category: QuizCategory) => {
    const qs = quizQuestions
      .filter((q) => q.category === category)
      .sort(() => Math.random() - 0.5)
    setShuffledQuestions(qs)
    setActiveCategory(category)
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setCorrectCount(0)
    setQuizFinished(false)
    startTimeRef.current = Date.now()
  }, [])

  const selectAnswer = useCallback(
    (answerIndex: number) => {
      if (selectedAnswer !== null) return
      setSelectedAnswer(answerIndex)
      setShowExplanation(true)
      if (shuffledQuestions[currentQuestionIndex]?.correctAnswer === answerIndex) {
        setCorrectCount((c) => c + 1)
      }
    },
    [selectedAnswer, shuffledQuestions, currentQuestionIndex]
  )

  const nextQuestion = useCallback(() => {
    const nextIdx = currentQuestionIndex + 1
    if (nextIdx >= shuffledQuestions.length) {
      // Quiz beendet
      const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000)
      const finalCorrect =
        correctCount +
        (shuffledQuestions[currentQuestionIndex]?.correctAnswer === selectedAnswer ? 1 : 0)
      const newResult: QuizResult = {
        id: crypto.randomUUID(),
        category: activeCategory!,
        score: finalCorrect,
        totalQuestions: shuffledQuestions.length,
        completedAt: new Date().toISOString(),
        timeSpentSeconds: timeSpent,
      }
      setResults((prev) => [...prev, newResult])
      setQuizFinished(true)
    } else {
      setCurrentQuestionIndex(nextIdx)
      setSelectedAnswer(null)
      setShowExplanation(false)
    }
  }, [currentQuestionIndex, shuffledQuestions, activeCategory, correctCount, selectedAnswer])

  const resetQuiz = useCallback(() => {
    setActiveCategory(null)
    setQuizFinished(false)
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setCorrectCount(0)
  }, [])

  const stats: QuizStats = {
    totalPoints: results.reduce((sum, r) => sum + r.score * 10, 0),
    quizzesCompleted: results.length,
    correctAnswers: results.reduce((sum, r) => sum + r.score, 0),
    totalAnswers: results.reduce((sum, r) => sum + r.totalQuestions, 0),
    byCategory: {
      Mathematik: { points: 0, completed: 0 },
      Deutsch: { points: 0, completed: 0 },
      Englisch: { points: 0, completed: 0 },
      Naturwissenschaften: { points: 0, completed: 0 },
    },
  }

  results.forEach((r) => {
    stats.byCategory[r.category].points += r.score * 10
    stats.byCategory[r.category].completed += 1
  })

  const currentQuestion = shuffledQuestions[currentQuestionIndex] ?? null

  return {
    playerName,
    setPlayerName,
    activeCategory,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions: shuffledQuestions.length,
    selectedAnswer,
    showExplanation,
    correctCount,
    quizFinished,
    startQuiz,
    selectAnswer,
    nextQuestion,
    resetQuiz,
    results,
    stats,
  }
}
