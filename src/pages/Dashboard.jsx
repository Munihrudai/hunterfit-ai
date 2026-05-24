import {
  useEffect,
  useState,
} from 'react'

import { motion } from 'framer-motion'

import {
  Flame,
  Droplets,
  Dumbbell,
  Target,
  Scale,
} from 'lucide-react'

import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from 'recharts'

import {
  loadMeals,
  loadProfile,
  loadWaterData,
  loadWorkoutHistory,
  loadHunterXP,
  loadStreakData,
} from '../utils/storage'

import ProfileCard from '../components/ProfileCard'
import WaterTracker from '../components/WaterTracker'
import WorkoutTracker from '../components/WorkoutTracker'
import HunterRank from '../components/HunterRank'
import RPGSystem from '../components/RPGSystem'

export default function Dashboard() {

  const [refreshKey, setRefreshKey] =
    useState(0)

  useEffect(() => {

    const refresh = () => {

      setRefreshKey(
        prev => prev + 1
      )
    }

    window.addEventListener(
      'hunterfit-profile-updated',
      refresh
    )

    return () => {

      window.removeEventListener(
        'hunterfit-profile-updated',
        refresh
      )
    }

  }, [])

  const meals = loadMeals()

  const profile = loadProfile()

  const waterData =
    loadWaterData()

  const workouts =
    loadWorkoutHistory()

  const hunterXP =
    loadHunterXP()

  const streakData =
    loadStreakData()

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

  const totalWorkouts =
    workouts.length

  const waterCurrent =
    Number(
      waterData.current || 0
    )

  const hydrationPercent =
    waterGoal
      ? Math.min(
          (
            (waterCurrent /
              waterGoal) *
            100
          ),
          100
        )
      : 0

  const caloriePercent =
    calorieGoal
      ? Math.min(
          (
            (totalCalories /
              calorieGoal) *
            100
          ),
          100
        )
      : 0

  const proteinPercent =
    proteinGoal
      ? Math.min(
          (
            (totalProtein /
              proteinGoal) *
            100
          ),
          100
        )
      : 0

  const workoutPercent =
    Math.min(
      totalWorkouts * 20,
      100
    )

  const bmi =
    profile.weight &&
    profile.height
      ? (
          Number(
            profile.weight
          ) /
          (
            (
              Number(
                profile.height
              ) / 100
            ) ** 2
          )
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

  const hydrationData = [
    {
      name: 'Hydration',
      value: hydrationPercent,
      fill: '#06b6d4',
    },
  ]

  return (
    <div
      key={refreshKey}
      className="min-h-screen bg-[#050505] text-white p-6"
    >

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">

        <div>

          <motion.h1
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="text-5xl font-bold text-purple-400 mb-3"
          >
            HunterFit AI
          </motion.h1>

          <p className="text-gray-400 text-lg">
            Welcome back
            {' '}
            {profile.name || 'Hunter'}
          </p>

        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        <DashboardCard
          icon={<Flame size={28} />}
          title="Calories"
          value={`${Math.round(
            totalCalories
          )} / ${calorieGoal}`}
          progress={caloriePercent}
        />

        <DashboardCard
          icon={<Droplets size={28} />}
          title="Water"
          value={`${waterCurrent}L / ${waterGoal}L`}
          progress={hydrationPercent}
        />

        <DashboardCard
          icon={<Dumbbell size={28} />}
          title="Workouts"
          value={`${totalWorkouts} Sessions`}
          progress={workoutPercent}
        />

        <DashboardCard
          icon={<Target size={28} />}
          title="Protein"
          value={`${Math.round(
            totalProtein
          )}g / ${proteinGoal}g`}
          progress={proteinPercent}
        />

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

          <div className="flex items-center justify-between mb-6">

            <div>

              <p className="text-gray-400 mb-3">
                BMI Status
              </p>

              <h2 className="text-5xl font-bold text-purple-400">
                {bmi}
              </h2>

              <p className="text-green-400 mt-3">
                {bmiStatus}
              </p>

            </div>

            <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400">

              <Scale size={30} />

            </div>

          </div>

        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex items-center justify-center">

          <div className="w-60 h-60">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <RadialBarChart
                innerRadius="70%"
                outerRadius="100%"
                data={hydrationData}
                startAngle={180}
                endAngle={0}
              >

                <RadialBar
                  minAngle={15}
                  background
                  clockWise
                  dataKey="value"
                />

                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-white text-3xl font-bold"
                >
                  {Math.round(
                    hydrationPercent
                  )}
                  %
                </text>

              </RadialBarChart>

            </ResponsiveContainer>

          </div>

        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-400 mb-4">
                Daily Streak
              </p>

              <h2 className="text-5xl font-bold text-orange-400 mb-3">
                {
                  streakData.current
                }
                {' '}
                Days
              </h2>

            </div>

            <div className="w-16 h-16 rounded-2xl bg-orange-500/20 flex items-center justify-center text-orange-400 text-3xl">

              🔥

            </div>

          </div>

        </div>

      </div>

      <ProfileCard />

      <WaterTracker />

      <WorkoutTracker />

      <HunterRank
        xp={hunterXP.xp}
        level={hunterXP.level}
        rank={hunterXP.rank}
      />

      <RPGSystem />

    </div>
  )
}

function DashboardCard({
  icon,
  title,
  value,
  progress,
}) {

  return (
    <motion.div
      whileHover={{
        scale: 1.03,
      }}
      className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl"
    >

      <div className="text-purple-400 mb-6">
        {icon}
      </div>

      <h2 className="text-2xl font-bold mb-3">
        {title}
      </h2>

      <p className="text-gray-300 text-xl">
        {value}
      </p>

      <div className="w-full h-3 bg-white/10 rounded-full mt-8 overflow-hidden">

        <div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

    </motion.div>
  )
}