export type QuizCategory = 'Mathematik' | 'Deutsch' | 'Englisch' | 'Naturwissenschaften'

export interface QuizQuestion {
  id: string
  category: QuizCategory
  question: string
  options: string[]
  correctAnswer: number // index of correct option
  explanation?: string
}

export interface QuizResult {
  id: string
  category: QuizCategory
  score: number
  totalQuestions: number
  completedAt: string
  timeSpentSeconds: number
}

export interface LeaderboardEntry {
  name: string
  totalPoints: number
  quizzesCompleted: number
  bestScore: number
}

export interface QuizStats {
  totalPoints: number
  quizzesCompleted: number
  correctAnswers: number
  totalAnswers: number
  byCategory: Record<QuizCategory, { points: number; completed: number }>
}
