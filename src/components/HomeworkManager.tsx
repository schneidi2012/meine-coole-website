import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  Filter,
  SortAsc,
  Calendar,
  ChevronDown,
} from 'lucide-react'
import { useHomework } from '../hooks/useHomework'
import type { Homework, HomeworkSubject, HomeworkPriority, HomeworkStatus } from '../types/homework'

const SUBJECTS: HomeworkSubject[] = [
  'Mathematik',
  'Deutsch',
  'Englisch',
  'Naturwissenschaften',
  'Geschichte',
  'Kunst',
  'Sport',
  'Musik',
  'Sonstiges',
]

const PRIORITY_COLORS: Record<HomeworkPriority, string> = {
  hoch: 'text-red-400 bg-red-400/10 border-red-400/30',
  mittel: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  niedrig: 'text-green-400 bg-green-400/10 border-green-400/30',
}

const STATUS_CONFIG: Record<
  HomeworkStatus,
  { label: string; icon: React.ReactNode; color: string }
> = {
  offen: {
    label: 'Offen',
    icon: <AlertCircle size={14} />,
    color: 'text-orange-400 bg-orange-400/10 border-orange-400/30',
  },
  'in-bearbeitung': {
    label: 'In Bearbeitung',
    icon: <Clock size={14} />,
    color: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
  },
  erledigt: {
    label: 'Erledigt',
    icon: <CheckCircle2 size={14} />,
    color: 'text-green-400 bg-green-400/10 border-green-400/30',
  },
}

const SUBJECT_COLORS: Record<HomeworkSubject, string> = {
  Mathematik: 'from-blue-500 to-cyan-500',
  Deutsch: 'from-purple-500 to-pink-500',
  Englisch: 'from-green-500 to-emerald-500',
  Naturwissenschaften: 'from-orange-500 to-amber-500',
  Geschichte: 'from-red-500 to-rose-500',
  Kunst: 'from-pink-500 to-fuchsia-500',
  Sport: 'from-cyan-500 to-teal-500',
  Musik: 'from-violet-500 to-purple-500',
  Sonstiges: 'from-gray-500 to-slate-500',
}

function AddHomeworkForm({ onAdd, onClose }: { onAdd: (hw: Omit<Homework, 'id' | 'createdAt'>) => void; onClose: () => void }) {
  const [form, setForm] = useState({
    subject: 'Mathematik' as HomeworkSubject,
    title: '',
    description: '',
    dueDate: new Date().toISOString().split('T')[0],
    priority: 'mittel' as HomeworkPriority,
    status: 'offen' as HomeworkStatus,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim()) return
    onAdd(form)
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-900 border border-white/10 rounded-2xl p-6 w-full max-w-lg"
      >
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Plus size={20} className="text-purple-400" />
          Neue Hausaufgabe
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Fach</label>
            <select
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value as HomeworkSubject })}
              className="w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
            >
              {SUBJECTS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Titel</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="z.B. Seite 42 Aufgaben 1-5"
              className="w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500 placeholder-gray-600"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Beschreibung</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Optionale Beschreibung..."
              rows={2}
              className="w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500 placeholder-gray-600 resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Fälligkeitsdatum</label>
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                className="w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Priorität</label>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value as HomeworkPriority })}
                className="w-full bg-gray-800 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
              >
                <option value="niedrig">Niedrig</option>
                <option value="mittel">Mittel</option>
                <option value="hoch">Hoch</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg border border-white/10 text-gray-400 text-sm hover:bg-white/5 transition-colors"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Hinzufügen
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

function HomeworkCard({
  hw,
  onStatusChange,
  onDelete,
}: {
  hw: Homework
  onStatusChange: (id: string, status: HomeworkStatus) => void
  onDelete: (id: string) => void
}) {
  const [showMenu, setShowMenu] = useState(false)
  const now = new Date()
  const dueDate = new Date(hw.dueDate)
  const isOverdue = hw.status !== 'erledigt' && dueDate < now
  const daysUntilDue = Math.ceil(
    (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  )

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`relative bg-gray-900 border rounded-xl p-4 ${isOverdue ? 'border-red-500/30' : 'border-white/10'} hover:border-white/20 transition-colors`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-2 h-2 mt-2 rounded-full bg-gradient-to-br ${SUBJECT_COLORS[hw.subject]} flex-shrink-0`}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-medium text-gray-400">{hw.subject}</span>
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs ${PRIORITY_COLORS[hw.priority]}`}
            >
              {hw.priority.charAt(0).toUpperCase() + hw.priority.slice(1)}
            </span>
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs ${STATUS_CONFIG[hw.status].color}`}
            >
              {STATUS_CONFIG[hw.status].icon}
              {STATUS_CONFIG[hw.status].label}
            </span>
          </div>
          <p
            className={`mt-1 font-semibold text-sm ${hw.status === 'erledigt' ? 'line-through text-gray-500' : 'text-white'}`}
          >
            {hw.title}
          </p>
          {hw.description && (
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{hw.description}</p>
          )}
          <div
            className={`flex items-center gap-1 mt-2 text-xs ${isOverdue ? 'text-red-400' : daysUntilDue <= 2 ? 'text-yellow-400' : 'text-gray-500'}`}
          >
            <Calendar size={11} />
            {isOverdue
              ? `Überfällig! ${new Date(hw.dueDate).toLocaleDateString('de-DE')}`
              : `Fällig: ${new Date(hw.dueDate).toLocaleDateString('de-DE')}${daysUntilDue === 0 ? ' (heute)' : daysUntilDue === 1 ? ' (morgen)' : ''}`}
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 text-gray-500 hover:text-white transition-colors"
          >
            <ChevronDown size={16} />
          </button>
          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="absolute right-0 top-full mt-1 z-10 bg-gray-800 border border-white/10 rounded-lg py-1 min-w-[160px] shadow-xl"
              >
                {(['offen', 'in-bearbeitung', 'erledigt'] as HomeworkStatus[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      onStatusChange(hw.id, s)
                      setShowMenu(false)
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-white/5 transition-colors ${hw.status === s ? 'text-purple-400' : 'text-gray-300'}`}
                  >
                    {STATUS_CONFIG[s].label}
                  </button>
                ))}
                <div className="border-t border-white/10 mt-1 pt-1">
                  <button
                    onClick={() => {
                      onDelete(hw.id)
                      setShowMenu(false)
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs text-red-400 hover:bg-red-400/10 transition-colors flex items-center gap-2"
                  >
                    <Trash2 size={12} />
                    Löschen
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

export default function HomeworkManager() {
  const { homeworks, filter, setFilter, addHomework, updateStatus, deleteHomework, stats } =
    useHomework()
  const [showAddForm, setShowAddForm] = useState(false)

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <BookOpen className="text-purple-400" size={30} />
            Hausaufgaben
          </h1>
          <p className="text-gray-400 mt-1">Verwalte deine Aufgaben und behalte den Überblick</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus size={16} />
          Neue Aufgabe
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6"
      >
        {[
          { label: 'Gesamt', value: stats.total, color: 'from-purple-500 to-blue-500' },
          { label: 'Offen', value: stats.offen, color: 'from-orange-500 to-amber-500' },
          { label: 'In Bearbeitung', value: stats.inBearbeitung, color: 'from-blue-500 to-cyan-500' },
          { label: 'Erledigt', value: stats.erledigt, color: 'from-green-500 to-emerald-500' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-gray-900 border border-white/10 rounded-xl p-4 text-center"
          >
            <div
              className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
            >
              {stat.value}
            </div>
            <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-3 mb-6 p-4 bg-gray-900 border border-white/10 rounded-xl"
      >
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <Filter size={14} />
          Filter:
        </div>
        <select
          value={filter.subject}
          onChange={(e) => setFilter({ ...filter, subject: e.target.value as HomeworkSubject | 'Alle' })}
          className="bg-gray-800 border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:border-purple-500"
        >
          <option value="Alle">Alle Fächer</option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value as HomeworkStatus | 'Alle' })}
          className="bg-gray-800 border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:border-purple-500"
        >
          <option value="Alle">Alle Status</option>
          <option value="offen">Offen</option>
          <option value="in-bearbeitung">In Bearbeitung</option>
          <option value="erledigt">Erledigt</option>
        </select>
        <div className="flex items-center gap-2 text-gray-400 text-sm ml-auto">
          <SortAsc size={14} />
          <select
            value={filter.sortBy}
            onChange={(e) => setFilter({ ...filter, sortBy: e.target.value as 'dueDate' | 'priority' | 'subject' })}
            className="bg-gray-800 border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:border-purple-500"
          >
            <option value="dueDate">Nach Datum</option>
            <option value="priority">Nach Priorität</option>
            <option value="subject">Nach Fach</option>
          </select>
        </div>
      </motion.div>

      {/* Homework List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {homeworks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 text-gray-500"
            >
              <BookOpen size={48} className="mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">Keine Hausaufgaben</p>
              <p className="text-sm mt-1">Füge deine erste Aufgabe hinzu!</p>
            </motion.div>
          ) : (
            homeworks.map((hw) => (
              <HomeworkCard
                key={hw.id}
                hw={hw}
                onStatusChange={updateStatus}
                onDelete={deleteHomework}
              />
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Add Form Modal */}
      <AnimatePresence>
        {showAddForm && (
          <AddHomeworkForm onAdd={addHomework} onClose={() => setShowAddForm(false)} />
        )}
      </AnimatePresence>
    </div>
  )
}
