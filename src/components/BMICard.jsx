import { Scale } from 'lucide-react'
import { motion } from 'framer-motion'

export default function BMICard({
  weight,
  height,
}) {

  const bmi =
    weight && height
      ? (
          weight /
          ((height / 100) * (height / 100))
        ).toFixed(1)
      : 0

  const bmiStatus =
    bmi < 18.5
      ? 'Underweight'
      : bmi < 25
      ? 'Healthy'
      : bmi < 30
      ? 'Overweight'
      : 'Obese'

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/5 border border-white/10 rounded-3xl p-6"
    >
      <div className="flex items-center justify-between">

        <div>

          <p className="text-gray-400 mb-2">
            BMI Status
          </p>

          <h2 className="text-4xl font-bold text-purple-400">
            {bmi}
          </h2>

          <p className="text-green-400 mt-2">
            {bmiStatus}
          </p>

        </div>

        <div className="bg-purple-500/20 p-4 rounded-2xl text-purple-400">
          <Scale size={32} />
        </div>

      </div>
    </motion.div>
  )
}