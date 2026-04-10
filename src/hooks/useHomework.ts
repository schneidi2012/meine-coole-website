import { useState, useEffect, useCallback } from 'react'
import type { Homework, HomeworkFilter, HomeworkStatus } from '../types/homework'

const STORAGE_KEY = 'schule_hausaufgaben'

const defaultFilter: HomeworkFilter = {
  subject: 'Alle',
  status: 'Alle',
  sortBy: 'dueDate',
}

export function useHomework() {
  const [homeworks, setHomeworks] = useState<Homework[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  const [filter, setFilter] = useState<HomeworkFilter>(defaultFilter)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(homeworks))
  }, [homeworks])

  const addHomework = useCallback((hw: Omit<Homework, 'id' | 'createdAt'>) => {
    const newHw: Homework = {
      ...hw,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }
    setHomeworks((prev) => [...prev, newHw])
  }, [])

  const updateStatus = useCallback((id: string, status: HomeworkStatus) => {
    setHomeworks((prev) => prev.map((hw) => (hw.id === id ? { ...hw, status } : hw)))
  }, [])

  const deleteHomework = useCallback((id: string) => {
    setHomeworks((prev) => prev.filter((hw) => hw.id !== id))
  }, [])

  const filteredHomeworks = homeworks
    .filter((hw) => {
      if (filter.subject !== 'Alle' && hw.subject !== filter.subject) return false
      if (filter.status !== 'Alle' && hw.status !== filter.status) return false
      return true
    })
    .sort((a, b) => {
      if (filter.sortBy === 'dueDate') return a.dueDate.localeCompare(b.dueDate)
      if (filter.sortBy === 'priority') {
        const order = { hoch: 0, mittel: 1, niedrig: 2 }
        return order[a.priority] - order[b.priority]
      }
      return a.subject.localeCompare(b.subject)
    })

  const now = new Date()
  const stats = homeworks.reduce(
    (acc, hw) => {
      if (hw.status === 'offen') acc.offen++
      else if (hw.status === 'in-bearbeitung') acc.inBearbeitung++
      else if (hw.status === 'erledigt') acc.erledigt++
      if (hw.status !== 'erledigt' && new Date(hw.dueDate) < now) acc.overdue++
      return acc
    },
    { total: homeworks.length, offen: 0, inBearbeitung: 0, erledigt: 0, overdue: 0 }
  )

  return {
    homeworks: filteredHomeworks,
    allHomeworks: homeworks,
    filter,
    setFilter,
    addHomework,
    updateStatus,
    deleteHomework,
    stats,
  }
}
