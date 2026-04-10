export type HomeworkStatus = 'offen' | 'in-bearbeitung' | 'erledigt'
export type HomeworkPriority = 'niedrig' | 'mittel' | 'hoch'
export type HomeworkSubject =
  | 'Mathematik'
  | 'Deutsch'
  | 'Englisch'
  | 'Naturwissenschaften'
  | 'Geschichte'
  | 'Kunst'
  | 'Sport'
  | 'Musik'
  | 'Sonstiges'

export interface Homework {
  id: string
  subject: HomeworkSubject
  title: string
  description: string
  dueDate: string // ISO date string
  status: HomeworkStatus
  priority: HomeworkPriority
  createdAt: string
}

export interface HomeworkFilter {
  subject: HomeworkSubject | 'Alle'
  status: HomeworkStatus | 'Alle'
  sortBy: 'dueDate' | 'priority' | 'subject'
}
