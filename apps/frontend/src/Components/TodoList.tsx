import { useState, type FormEvent } from "react"

export interface Todo {
  id: number
  title: string
  description: string
  completed?: boolean
}

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const handleAddTask = (e?: FormEvent) => {
    if (e) e.preventDefault()
    if (!title.trim()) return

    const newTodo: Todo = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
    }

    // Append to previous tasks rather than overwriting
    setTodos((prev) => [newTodo, ...prev])
    
    // Reset form inputs
    setTitle('')
    setDescription('')
  }

  const handleDelete = (id: number) => {
    setTodos((prev) => prev.filter((item) => item.id !== id))
  }

  const handleToggle = (id: number) => {
    setTodos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    )
  }

  return (
    <div className="w-full max-w-lg flex flex-col gap-6">
      {/* Input Form */}
      <form
        onSubmit={handleAddTask}
        className="flex flex-col gap-3 bg-slate-800/90 p-5 rounded-xl border border-slate-700/60 shadow-lg"
      >
        <h2 className="text-lg font-semibold text-white">Add New Task</h2>
        
        <input
          type="text"
          placeholder="Enter title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        
        <input
          type="text"
          placeholder="Enter description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        
        <button
          type="submit"
          disabled={!title.trim()}
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition shadow-md active:scale-[0.99] cursor-pointer"
        >
          Add Task
        </button>
      </form>

      {/* Task List */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-sm text-slate-400 px-1">
          <span>Tasks ({todos.length})</span>
          {todos.length > 0 && (
            <span>
              {todos.filter((t) => t.completed).length} of {todos.length} completed
            </span>
          )}
        </div>

        {todos.length === 0 ? (
          <div className="text-center py-8 px-4 rounded-xl border border-dashed border-slate-700 text-slate-500">
            No tasks yet. Enter a title above and click &quot;Add Task&quot;!
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {todos.map((item) => (
              <div
                key={item.id}
                className={`flex items-start justify-between gap-3 p-4 rounded-xl border transition-all ${
                  item.completed
                    ? 'bg-slate-900/60 border-slate-800 text-slate-500'
                    : 'bg-slate-800/90 border-slate-700 text-slate-100 shadow-sm'
                }`}
              >
                <div
                  className="flex items-start gap-3 flex-1 cursor-pointer select-none"
                  onClick={() => handleToggle(item.id)}
                >
                  <input
                    type="checkbox"
                    checked={!!item.completed}
                    onChange={() => handleToggle(item.id)}
                    className="mt-1 h-4 w-4 rounded border-slate-600 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <div className="flex flex-col">
                    <h3
                      className={`font-semibold text-base ${
                        item.completed ? 'line-through text-slate-500' : 'text-slate-100'
                      }`}
                    >
                      {item.title}
                    </h3>
                    {item.description && (
                      <p
                        className={`text-sm mt-0.5 ${
                          item.completed ? 'line-through text-slate-600' : 'text-slate-400'
                        }`}
                      >
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  aria-label="Delete task"
                  className="text-slate-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-slate-700/50 transition cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
