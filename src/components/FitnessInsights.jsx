import {
  loadMeals,
  loadProfile,
  loadWaterData,
  loadWorkouts,
} from '../utils/storage'

import {
  Brain,
  Trophy,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react'

export default function FitnessInsights() {

  const meals = loadMeals()

  const profile = loadProfile()

  const waterData = loadWaterData()

  const workouts = loadWorkouts()

  const calorieGoal =
    Number(profile.calories) || 2100

  const proteinGoal =
    Number(profile.protein) || 140

  const waterGoal =
    Number(profile.water) || 4

  const totalCalories = meals.reduce(
    (acc, item) =>
      acc + Number(item.calories || 0),
    0
  )

  const totalProtein = meals.reduce(
    (acc, item) =>
      acc + Number(item.protein || 0),
    0
  )

  const calorieScore = Math.min(
    (totalCalories / calorieGoal) * 100,
    100
  )

  const proteinScore = Math.min(
    (totalProtein / proteinGoal) * 100,
    100
  )

  const waterScore = Math.min(
    (waterData.current / waterGoal) *
      100,
    100
  )

  const workoutScore = Math.min(
    workouts.length * 10,
    100
  )

  const fitnessScore = Math.round(
    (
      calorieScore +
      proteinScore +
      waterScore +
      workoutScore
    ) / 4
  )

  const performance =
    fitnessScore >= 85
      ? 'Elite'
      : fitnessScore >= 70
      ? 'Excellent'
      : fitnessScore >= 50
      ? 'Good'
      : 'Needs Improvement'

  const recommendation =
    proteinScore < 70
      ? 'Increase protein intake for better recovery.'
      : waterScore < 70
      ? 'Drink more water to improve hydration.'
      : workoutScore < 70
      ? 'Stay consistent with workouts.'
      : 'Excellent consistency. Keep pushing forward.'

  const achievements = [
    {
      title: 'Calorie Goal',
      progress:
        Math.round(calorieScore),
      color: 'bg-purple-500',
    },
    {
      title: 'Protein Goal',
      progress:
        Math.round(proteinScore),
      color: 'bg-green-500',
    },
    {
      title: 'Hydration Goal',
      progress:
        Math.round(waterScore),
      color: 'bg-cyan-500',
    },
    {
      title: 'Workout Goal',
      progress:
        Math.round(workoutScore),
      color: 'bg-orange-500',
    },
  ]

  return (
    <div className="mt-8 space-y-8">

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

          <div className="flex items-center justify-between mb-6">

            <div>

              <p className="text-gray-400 mb-2">
                Fitness Score
              </p>

              <h2 className="text-6xl font-bold text-purple-400">
                {fitnessScore}
              </h2>

            </div>

            <Brain
              size={50}
              className="text-purple-400"
            />

          </div>

          <div className="w-full h-5 bg-white/10 rounded-full overflow-hidden">

            <div
              className="h-full bg-purple-500 rounded-full"
              style={{
                width: `${fitnessScore}%`,
              }}
            />

          </div>

          <p className="text-gray-300 mt-4 text-lg">
            Performance:
            {' '}
            <span className="text-purple-400 font-semibold">
              {performance}
            </span>
          </p>

        </div>

        <div className="xl:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8">

          <div className="flex items-center gap-3 mb-6">

            <ShieldCheck
              className="text-cyan-400"
              size={32}
            />

            <h2 className="text-3xl font-bold text-cyan-400">
              AI Fitness Insight
            </h2>

          </div>

          <p className="text-gray-300 text-lg leading-8">
            {recommendation}
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">

            <InsightBox
              icon={
                <TrendingUp
                  className="text-green-400"
                />
              }
              title="Consistency"
              value={`${workouts.length} workouts completed`}
            />

            <InsightBox
              icon={
                <Trophy
                  className="text-yellow-400"
                />
              }
              title="Achievement"
              value={`${performance} performance level`}
            />

          </div>

        </div>

      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

        <h2 className="text-3xl font-bold text-purple-400 mb-8">
          Goal Achievement
        </h2>

        <div className="space-y-6">

          {achievements.map(
            (item, index) => (
              <div key={index}>

                <div className="flex justify-between mb-3">

                  <p className="text-lg">
                    {item.title}
                  </p>

                  <p className="text-gray-400">
                    {item.progress}%
                  </p>

                </div>

                <div className="w-full h-5 bg-white/10 rounded-full overflow-hidden">

                  <div
                    className={`h-full ${item.color} rounded-full`}
                    style={{
                      width: `${item.progress}%`,
                    }}
                  />

                </div>

              </div>
            )
          )}

        </div>

      </div>

    </div>
  )
}

function InsightBox({
  icon,
  title,
  value,
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">

      <div className="flex items-center gap-3 mb-4">

        {icon}

        <h3 className="text-xl font-semibold">
          {title}
        </h3>

      </div>

      <p className="text-gray-400">
        {value}
      </p>

    </div>
  )
}