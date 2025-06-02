"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit2, Trash2, Check, Clock, Calendar, Bell, Star, Zap } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Todo {
  id: string
  title: string
  description: string
  completed: boolean
  createdAt: Date
  reminder?: Date
  priority: "low" | "medium" | "high"
}

function FloatingOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full opacity-20"
          style={{
            background: `linear-gradient(45deg, ${["#8B5CF6", "#06B6D4", "#F59E0B", "#EF4444"][i]}, transparent)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -50, 50, 0],
            scale: [1, 1.2, 0.8, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

function TimeDisplay() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, type: "spring" }}
      className="text-center mb-4 sm:mb-6 lg:mb-8 p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-purple-500/30 to-cyan-500/30 backdrop-blur-xl border border-white/30 relative overflow-hidden mx-2 sm:mx-0"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20"
        animate={{
          background: [
            "linear-gradient(45deg, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.2))",
            "linear-gradient(45deg, rgba(6, 182, 212, 0.2), rgba(139, 92, 246, 0.2))",
          ],
        }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      />
      <div className="relative z-10">
        <motion.div
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          {time.toLocaleTimeString()}
        </motion.div>
        <motion.div
          className="text-sm sm:text-base lg:text-lg text-white/90 mt-2 sm:mt-3 flex items-center justify-center gap-1 sm:gap-2 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.div>
          <span className="text-center">
            {time.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState({ title: "", description: "", priority: "medium" as const })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingTodo, setEditingTodo] = useState({ title: "", description: "", priority: "medium" as const })
  const [showForm, setShowForm] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Set isClient to true once component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Load todos from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("3d-todos")
      if (saved) {
        const parsed = JSON.parse(saved)
        setTodos(
          parsed.map((todo: any) => ({
            ...todo,
            createdAt: new Date(todo.createdAt),
            reminder: todo.reminder ? new Date(todo.reminder) : undefined,
          })),
        )
      }
    }
  }, [])

  // Save todos to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("3d-todos", JSON.stringify(todos))
    }
  }, [todos])

  // Check for reminders
  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      const checkReminders = () => {
        const now = new Date()
        todos.forEach((todo) => {
          if (todo.reminder && todo.reminder <= now && !todo.completed) {
            if (Notification.permission === "granted") {
              new Notification(`Reminder: ${todo.title}`, {
                body: todo.description,
                icon: "/favicon.ico",
              })
            }
          }
        })
      }

      const interval = setInterval(checkReminders, 60000)
      return () => clearInterval(interval)
    }
  }, [todos])

  // Request notification permission
  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "default") {
        Notification.requestPermission()
      }
    }
  }, [])

  const addTodo = () => {
    if (newTodo.title.trim()) {
      const todo: Todo = {
        id: Date.now().toString(),
        title: newTodo.title,
        description: newTodo.description,
        completed: false,
        createdAt: new Date(),
        priority: newTodo.priority,
      }
      setTodos([todo, ...todos])
      setNewTodo({ title: "", description: "", priority: "medium" })
      setShowForm(false)
    }
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id)
    setEditingTodo({
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
    })
  }

  const saveEdit = () => {
    if (editingId && editingTodo.title.trim()) {
      setTodos(
        todos.map((todo) =>
          todo.id === editingId
            ? {
                ...todo,
                title: editingTodo.title,
                description: editingTodo.description,
                priority: editingTodo.priority,
              }
            : todo,
        ),
      )
      setEditingId(null)
    }
  }

  const setReminder = (id: string, minutes: number) => {
    const reminderTime = new Date(Date.now() + minutes * 60000)
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, reminder: reminderTime } : todo)))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "from-red-500 to-pink-500"
      case "medium":
        return "from-yellow-500 to-orange-500"
      case "low":
        return "from-green-500 to-emerald-500"
      default:
        return "from-gray-500 to-slate-500"
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
      case "medium":
        return <Star className="w-3 h-3 sm:w-4 sm:h-4" />
      case "low":
        return <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
      default:
        return <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
    }
  }

  const completedCount = todos.filter((todo) => todo.completed).length
  const totalCount = todos.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.3),transparent_50%)] animate-pulse" />
      <FloatingOrbs />

      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:30px_30px] sm:bg-[size:50px_50px] animate-pulse" />
      </div>

      <div className="relative z-10 container mx-auto px-2 sm:px-4 py-4 sm:py-6 lg:py-8 max-w-4xl">
        <TimeDisplay />

        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-4 sm:mb-6 lg:mb-8 px-2"
        >
          <motion.h1
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-3 sm:mb-4 lg:mb-6 leading-tight"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
          >
            ✨ Todo Universe
          </motion.h1>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 text-white/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Badge
                variant="secondary"
                className="bg-white/20 text-white backdrop-blur-sm border border-white/30 px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm"
              >
                ✅ {completedCount} / {totalCount} Completed
              </Badge>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Badge
                variant="secondary"
                className="bg-white/20 text-white backdrop-blur-sm border border-white/30 px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm"
              >
                🚀 {totalCount - completedCount} Remaining
              </Badge>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Mobile Add Button */}
        {isClient && (
          <div className="sm:hidden fixed bottom-6 right-6 z-50">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowForm(!showForm)}
              className="w-14 h-14 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full shadow-lg flex items-center justify-center text-white"
            >
              <Plus className="w-6 h-6" />
            </motion.button>
          </div>
        )}

        {/* Add Todo Form */}
        <AnimatePresence>
          {isClient && (showForm || (typeof window !== "undefined" && window.innerWidth >= 640)) && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.9 }}
              transition={{ delay: 0.4 }}
              className="mb-4 sm:mb-6 lg:mb-8 mx-2 sm:mx-0"
            >
              <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
                <CardContent className="p-4 sm:p-6">
                  <motion.div
                    className="grid gap-3 sm:gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <Input
                        placeholder="✨ What magical task awaits?"
                        value={newTodo.title}
                        onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                        className="bg-white/20 border-white/30 text-white placeholder:text-white/60 text-sm sm:text-base lg:text-lg py-2 sm:py-3"
                        onKeyPress={(e) => e.key === "Enter" && addTodo()}
                      />
                    </motion.div>
                    <motion.div whileFocus={{ scale: 1.02 }}>
                      <Textarea
                        placeholder="🎯 Add some details..."
                        value={newTodo.description}
                        onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                        className="bg-white/20 border-white/30 text-white placeholder:text-white/60 text-sm sm:text-base min-h-[60px] sm:min-h-[80px]"
                      />
                    </motion.div>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center">
                      <motion.select
                        value={newTodo.priority}
                        onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value as any })}
                        className="bg-white/20 border border-white/30 rounded-lg px-3 sm:px-4 py-2 text-white backdrop-blur-sm text-sm sm:text-base flex-1 sm:flex-none"
                        whileHover={{ scale: 1.02 }}
                      >
                        <option value="low" className="bg-gray-800">
                          🟢 Low Priority
                        </option>
                        <option value="medium" className="bg-gray-800">
                          🟡 Medium Priority
                        </option>
                        <option value="high" className="bg-gray-800">
                          🔴 High Priority
                        </option>
                      </motion.select>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                        <Button
                          onClick={addTodo}
                          className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 shadow-lg px-4 sm:px-6 py-2 text-sm sm:text-base w-full sm:w-auto"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Magic ✨
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Todo List */}
        <div className="space-y-3 sm:space-y-4 mx-2 sm:mx-0 pb-20 sm:pb-8">
          <AnimatePresence mode="popLayout">
            {todos.map((todo, index) => (
              <motion.div
                key={todo.id}
                layout
                initial={{ opacity: 0, x: -100, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 100, scale: 0.8, rotateZ: 10 }}
                transition={{
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.01,
                  rotateY: 1,
                }}
                className="group perspective-1000"
              >
                <Card
                  className={`bg-gradient-to-r ${getPriorityColor(todo.priority)}/20 backdrop-blur-xl border-white/20 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/20 transform-gpu`}
                >
                  <CardContent className="p-3 sm:p-4 lg:p-6">
                    {editingId === todo.id ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-3 sm:space-y-4"
                      >
                        <Input
                          value={editingTodo.title}
                          onChange={(e) => setEditingTodo({ ...editingTodo, title: e.target.value })}
                          className="bg-white/20 border-white/30 text-white text-sm sm:text-base"
                        />
                        <Textarea
                          value={editingTodo.description}
                          onChange={(e) => setEditingTodo({ ...editingTodo, description: e.target.value })}
                          className="bg-white/20 border-white/30 text-white text-sm sm:text-base min-h-[60px]"
                        />
                        <div className="flex flex-col sm:flex-row gap-2">
                          <select
                            value={editingTodo.priority}
                            onChange={(e) => setEditingTodo({ ...editingTodo, priority: e.target.value as any })}
                            className="bg-white/20 border border-white/30 rounded-md px-3 py-2 text-white text-sm flex-1"
                          >
                            <option value="low" className="bg-gray-800">
                              Low
                            </option>
                            <option value="medium" className="bg-gray-800">
                              Medium
                            </option>
                            <option value="high" className="bg-gray-800">
                              High
                            </option>
                          </select>
                          <div className="flex gap-2">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex-1 sm:flex-none"
                            >
                              <Button
                                onClick={saveEdit}
                                size="sm"
                                className="bg-green-500 hover:bg-green-600 w-full sm:w-auto text-xs sm:text-sm"
                              >
                                💾 Save
                              </Button>
                            </motion.div>
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex-1 sm:flex-none"
                            >
                              <Button
                                onClick={() => setEditingId(null)}
                                size="sm"
                                variant="outline"
                                className="border-white/30 text-white hover:bg-white/20 w-full sm:w-auto text-xs sm:text-sm"
                              >
                                ❌ Cancel
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="flex items-start gap-3 sm:gap-4">
                        <motion.button
                          whileHover={{ scale: 1.1, rotate: 180 }}
                          whileTap={{ scale: 0.8 }}
                          onClick={() => toggleComplete(todo.id)}
                          className={`mt-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                            todo.completed
                              ? "bg-gradient-to-r from-green-400 to-emerald-500 border-green-400 shadow-lg shadow-green-400/50"
                              : "border-white/40 hover:border-white/60 hover:bg-white/10"
                          }`}
                        >
                          {todo.completed && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ type: "spring", stiffness: 200 }}
                            >
                              <Check className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                            </motion.div>
                          )}
                        </motion.button>

                        <div className="flex-1 min-w-0">
                          <motion.h3
                            className={`text-sm sm:text-lg lg:text-xl font-semibold text-white mb-1 sm:mb-2 transition-all duration-300 break-words ${
                              todo.completed ? "line-through opacity-60" : ""
                            }`}
                            animate={todo.completed ? { x: [0, 5, 0] } : {}}
                          >
                            {todo.title}
                          </motion.h3>
                          {todo.description && (
                            <motion.p
                              className={`text-xs sm:text-sm lg:text-base text-white/80 mb-2 sm:mb-3 transition-all duration-300 break-words ${
                                todo.completed ? "line-through opacity-60" : ""
                              }`}
                            >
                              {todo.description}
                            </motion.p>
                          )}
                          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-white/60 flex-wrap">
                            <motion.div className="flex items-center gap-1" whileHover={{ scale: 1.05 }}>
                              <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                              <span className="hidden sm:inline">{todo.createdAt.toLocaleDateString()}</span>
                              <span className="sm:hidden">
                                {todo.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                              </span>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }}>
                              <Badge
                                variant="secondary"
                                className={`bg-gradient-to-r ${getPriorityColor(todo.priority)} text-white border-0 shadow-lg flex items-center gap-1 text-xs px-2 py-1`}
                              >
                                {getPriorityIcon(todo.priority)}
                                <span className="hidden sm:inline">{todo.priority}</span>
                                <span className="sm:hidden">{todo.priority.charAt(0).toUpperCase()}</span>
                              </Badge>
                            </motion.div>
                            {todo.reminder && (
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                              >
                                <Badge
                                  variant="secondary"
                                  className="bg-blue-500/30 text-blue-300 border-blue-500/30 flex items-center gap-1 text-xs px-2 py-1"
                                >
                                  <Bell className="w-2 h-2 sm:w-3 sm:h-3" />
                                  <span className="hidden sm:inline">Reminder</span>
                                  <span className="sm:hidden">R</span>
                                </Badge>
                              </motion.div>
                            )}
                          </div>
                        </div>

                        <motion.div
                          className="flex flex-col sm:flex-row gap-1 sm:gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300"
                          initial={{ x: 20 }}
                          whileHover={{ x: 0 }}
                        >
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setReminder(todo.id, 30)}
                              className="text-white hover:bg-blue-500/20 hover:text-blue-300 p-1 sm:p-2 h-8 w-8 sm:h-9 sm:w-9"
                            >
                              <Bell className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => startEdit(todo)}
                              className="text-white hover:bg-yellow-500/20 hover:text-yellow-300 p-1 sm:p-2 h-8 w-8 sm:h-9 sm:w-9"
                            >
                              <Edit2 className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => deleteTodo(todo.id)}
                              className="text-red-300 hover:bg-red-500/20 hover:text-red-200 p-1 sm:p-2 h-8 w-8 sm:h-9 sm:w-9"
                            >
                              <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                          </motion.div>
                        </motion.div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {todos.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="text-center py-8 sm:py-12 lg:py-16 mx-2 sm:mx-0"
          >
            <motion.div
              className="text-4xl sm:text-6xl lg:text-8xl mb-4 sm:mb-6"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              🚀
            </motion.div>
            <motion.h3
              className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white mb-2 sm:mb-4 px-4"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              Ready to Launch Your Productivity!
            </motion.h3>
            <motion.p
              className="text-white/60 text-sm sm:text-base lg:text-lg px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              ✨ Add your first magical todo to begin your journey! ✨
            </motion.p>
          </motion.div>
        )}

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="relative z-10 text-center py-4 sm:py-6 mt-8 border-t border-white/10"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs sm:text-sm text-white/60">
            <span>Built with ✨ by</span>
            <motion.a
              href="https://github.com/adenueltech?tab=overview&from=2024-07-01&to=2024-07-31"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent hover:from-pink-400 hover:to-purple-400 transition-all duration-300 flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white/60"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                <path d="M9 18c-4.51 2-5-2-7-2"></path>
              </svg>
              AdeNuelTech
            </motion.a>
          </div>
        </motion.footer>
      </div>
    </div>
  )
}
