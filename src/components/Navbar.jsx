import { Bell, Moon } from 'lucide-react'

export default function Navbar() {
  return (
    <div className="flex items-center justify-between mb-8">

      <div>
        <h1 className="text-4xl font-bold text-purple-400">
          HunterFit AI
        </h1>

        <p className="text-gray-400 mt-2">
          Track your fitness journey
        </p>
      </div>

      <div className="flex items-center gap-4">

        <button className="bg-white/5 border border-white/10 p-3 rounded-2xl hover:bg-white/10 transition">
          <Bell size={20} />
        </button>

        <button className="bg-white/5 border border-white/10 p-3 rounded-2xl hover:bg-white/10 transition">
          <Moon size={20} />
        </button>

      </div>

    </div>
  )
}