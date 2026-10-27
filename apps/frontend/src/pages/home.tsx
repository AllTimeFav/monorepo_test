import { TodoList } from "../Components/TodoList"

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center p-6">
      <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
        Testing Monorepo with React & Express
      </h1>
      <div className="flex flex-col items-center justify-center p-6">
        <TodoList />
      </div>
    </div>
  )
}

export default Home