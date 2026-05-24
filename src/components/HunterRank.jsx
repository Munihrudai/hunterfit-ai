import {
  useEffect,
  useState,
} from 'react'

import {
  Crown,
  Zap,
  Dumbbell,
} from 'lucide-react'

import {
  loadMeals,
  loadProfile,
  loadWaterData,
  loadWorkoutHistory,
  saveHunterXP,
  loadHunterXP,
} from '../utils/storage'

export default function HunterRank() {

  const [hunterData, setHunterData] =
    useState({
      xp: 0,
      level: 1,
      rank: 'E-Rank',
    })

  useEffect(() => {

    calculateHunterXP()

    window.addEventListener(
      'hunterfit-profile-updated',
      calculateHunterXP
    )

    return () => {

      window.removeEventListener(
        'hunterfit-profile-updated',
        calculateHunterXP
      )
    }

  }, [])

  const calculateHunterXP = () => {

    const meals = loadMeals()

    const profile =
      loadProfile()

    const waterData =
      loadWaterData()

    const workouts =
      loadWorkoutHistory()

    let xp = 0

    // =====================
    // MEALS XP
    // =====================

    xp += meals.length * 10

    // =====================
    // WORKOUT XP
    // =====================

    xp += workouts.length * 25

    // =====================
    // CALCULATE TOTALS
    // =====================

    const totalCalories =
      meals.reduce(
        (acc, meal) =>
          acc +
          Number(
            meal.calories || 0
          ),
        0
      )

    const totalProtein =
      meals.reduce(
        (acc, meal) =>
          acc +
          Number(
            meal.protein || 0
          ),
        0
      )

    // =====================
    // GOAL BONUSES
    // =====================

    const calorieGoal =
      Number(
        profile.calories
      ) || 0

    const proteinGoal =
      Number(
        profile.protein
      ) || 0

    const waterGoal =
      Number(
        profile.water
      ) || 0

    if (
      calorieGoal > 0 &&
      totalCalories >=
        calorieGoal
    ) {

      xp += 20
    }

    if (
      proteinGoal > 0 &&
      totalProtein >=
        proteinGoal
    ) {

      xp += 20
    }

    if (
      waterGoal > 0 &&
      waterData.current >=
        waterGoal
    ) {

      xp += 15
    }

    // =====================
    // LEVEL SYSTEM
    // =====================

    const level =
      Math.max(
        1,
        Math.floor(xp / 100) + 1
      )

    // =====================
    // RANK SYSTEM
    // =====================

    let rank = 'E-Rank'

    if (xp >= 2000) {

      rank = 'S-Rank'

    } else if (xp >= 1000) {

      rank = 'A-Rank'

    } else if (xp >= 500) {

      rank = 'B-Rank'

    } else if (xp >= 250) {

      rank = 'C-Rank'

    } else if (xp >= 100) {

      rank = 'D-Rank'
    }

    const updatedData = {
      xp,
      level,
      rank,
    }

    setHunterData(
      updatedData
    )

    saveHunterXP(
      updatedData
    )
  }

  const nextLevelXP =
    hunterData.level * 100

  const currentLevelXP =
    hunterData.xp % 100

  const progressPercent =
    (currentLevelXP / 100) *
    100

  return (
    <div className="mt-8 bg-white/5 border border-white/10 rounded-3xl p-8">

      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">

        <div>

          <div className="flex items-center gap-4 mb-6">

            <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center">

              <Crown
                className="text-purple-400"
                size={34}
              />

            </div>

            <div>

              <h2 className="text-4xl font-bold text-purple-400">
                {hunterData.rank}
              </h2>

              <p className="text-gray-400 mt-2">
                Hunter Progression System
              </p>

            </div>

          </div>

          <div className="grid grid-cols-2 gap-6">

            <StatCard
              icon={<Zap />}
              label="Total XP"
              value={hunterData.xp}
            />

            <StatCard
              icon={<Dumbbell />}
              label="Level"
              value={hunterData.level}
            />

          </div>

        </div>

        <div className="flex-1">

          <div className="flex justify-between mb-4">

            <p className="text-lg">
              Level Progress
            </p>

            <p className="text-purple-400 font-bold">
              {currentLevelXP}
              {' / '}
              100 XP
            </p>

          </div>

          <div className="w-full h-6 bg-white/10 rounded-full overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
              style={{
                width: `${progressPercent}%`,
              }}
            />

          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">

            <RankBadge
              rank="E"
            />

            <RankBadge
              rank="D"
            />

            <RankBadge
              rank="C"
            />

            <RankBadge
              rank="B"
            />

            <RankBadge
              rank="A"
            />

          </div>

        </div>

      </div>

    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
}) {

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">

      <div className="text-purple-400 mb-4">
        {icon}
      </div>

      <p className="text-gray-400 mb-2">
        {label}
      </p>

      <h3 className="text-3xl font-bold">
        {value}
      </h3>

    </div>
  )
}

function RankBadge({
  rank,
}) {

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl py-4 text-center font-bold">

      {rank}-Rank

    </div>
  )
}