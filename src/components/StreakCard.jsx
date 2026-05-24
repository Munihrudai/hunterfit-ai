import { Flame } from 'lucide-react'
import { motion } from 'framer-motion'

export default function StreakCard() {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/5 border border-white/10 rounded-3xl p-6"
    >
      <div className="flex items-center justify-between">

        <div>
          <p className="text-gray-400 mb-2">
            Daily Streak
          </p>

          <h2 className="text-4xl font-bold text-orange-400">
            12 Days
          </h2>

          <p className="text-gray-300 mt-2">
            Keep pushing 🔥
          </p>
        </div>

        <div className="bg-orange-500/20 p-4 rounded-2xl text-orange-400">
          <Flame size={32} />
        </div>

      </div>
    </motion.div>
  )
}