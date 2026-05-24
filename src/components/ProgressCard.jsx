import { motion } from 'framer-motion'

export default function ProgressCard({
  icon,
  title,
  value,
  progress,
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl shadow-xl"
    >
      <div className="text-purple-400 mb-4">
        {icon}
      </div>

      <h2 className="text-xl font-semibold">
        {title}
      </h2>

      <p className="text-gray-300 mt-2 mb-4">
        {value}
      </p>

      <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">

        <div
          className="h-full bg-purple-500 rounded-full"
          style={{ width: `${progress}%` }}
        />

      </div>

    </motion.div>
  )
}