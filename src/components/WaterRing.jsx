import { Droplets } from 'lucide-react'
import { motion } from 'framer-motion'

export default function WaterRing({
  currentWater,
  waterGoal,
}) {

  const progress =
    Math.min(
      (currentWater / waterGoal) * 100,
      100
    ) || 0

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center"
    >

      <div className="relative w-40 h-40">

        <div className="absolute inset-0 rounded-full border-[10px] border-white/10" />

        <div
          className="absolute inset-0 rounded-full border-[10px] border-cyan-400 border-t-transparent"
          style={{
            transform: `rotate(${progress * 3.6}deg)`,
          }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center">

          <Droplets className="text-cyan-400 mb-2" />

          <h2 className="text-3xl font-bold">
            {Math.round(progress)}%
          </h2>

          <p className="text-gray-400 text-sm">
            Hydrated
          </p>

        </div>

      </div>

    </motion.div>
  )
}