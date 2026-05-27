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
  Utensils,
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
import FoodCalculator from '../components/FoodCalculator'

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

  const recentMeals =
    meals.slice(0, 5)

  const profile = loadProfile()

  const waterData =
    loadWaterData()

  const workouts =
    loadWorkoutHistory()

  const hunterXP =
    loadHunterXP()

  const streakData =
    loadStreakData()

  // GOALS

  const calorieGoal =
    Number(
      profile.calories
    ) || 0

  const proteinGoal =
    Number(
      profile.protein
    ) || 0

  const carbsGoal =
    Number(
      profile.carbs
    ) || 0

  const fatsGoal =
    Number(
      profile.fats
    ) || 0

  const waterGoal =
    Number(
      profile.water
    ) || 0

  // TOTALS

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

  const totalCarbs =
    meals.reduce(
      (acc, meal) =>
        acc +
        Number(
          meal.carbs || 0
        ),
      0
    )

  const totalFats =
    meals.reduce(
      (acc, meal) =>
        acc +
        Number(
          meal.fats || 0
        ),
      0
    )

  const totalFiber =
    meals.reduce(
      (acc, meal) =>
        acc +
        Number(
          meal.fiber || 0
        ),
      0
    )

  const totalWaterFood =
    meals.reduce(
      (acc, meal) =>
        acc +
        Number(
          meal.water || 0
        ),
      0
    )

  const totalWorkouts =
    workouts.length

  const waterCurrent =
    Number(
      waterData.current || 0
    )

  // PROGRESS %

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

  const carbsPercent =
    carbsGoal
      ? Math.min(
          (
            (totalCarbs /
              carbsGoal) *
            100
          ),
          100
        )
      : 0

  const fatsPercent =
    fatsGoal
      ? Math.min(
          (
            (totalFats /
              fatsGoal) *
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

  // BMI

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

      {/* HEADER */}

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

      {/* TOP CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-6 mb-8">

        <DashboardCard
          icon={<Flame size={28} />}
          title="Calories"
          value={`${Math.round(
            totalCalories
          )} / ${calorieGoal}`}
          progress={caloriePercent}
        />

        <DashboardCard
          icon={<Target size={28} />}
          title="Protein"
          value={`${Math.round(
            totalProtein
          )}g / ${proteinGoal}g`}
          progress={proteinPercent}
        />

        <DashboardCard
          icon={<Target size={28} />}
          title="Carbs"
          value={`${Math.round(
            totalCarbs
          )}g / ${carbsGoal}g`}
          progress={carbsPercent}
        />

        <DashboardCard
          icon={<Target size={28} />}
          title="Fats"
          value={`${Math.round(
            totalFats
          )}g / ${fatsGoal}g`}
          progress={fatsPercent}
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

      </div>

      {/* SECOND SECTION */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">

        {/* BMI */}

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

        {/* HYDRATION */}

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

        {/* STREAK */}

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

      {/* NUTRITION ANALYTICS */}

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">

        <div className="flex items-center gap-4 mb-8">

          <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center text-green-400">

            <Utensils size={28} />

          </div>

          <div>

            <h2 className="text-3xl font-bold text-green-400">

              Nutrition Analytics

            </h2>

            <p className="text-gray-400">

              Today's nutrition summary

            </p>

          </div>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5">

          <NutritionCard
            label="Calories"
            value={`${Math.round(
              totalCalories
            )}`}
          />

          <NutritionCard
            label="Protein"
            value={`${Math.round(
              totalProtein
            )} g`}
          />

          <NutritionCard
            label="Carbs"
            value={`${Math.round(
              totalCarbs
            )} g`}
          />

          <NutritionCard
            label="Fats"
            value={`${Math.round(
              totalFats
            )} g`}
          />

          <NutritionCard
            label="Fiber"
            value={`${Math.round(
              totalFiber
            )} g`}
          />

          <NutritionCard
            label="Food Water"
            value={`${Math.round(
              totalWaterFood
            )} ml`}
          />

        </div>

      </div>

      {/* RECENT MEALS */}

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8">

        <h2 className="text-3xl font-bold text-purple-400 mb-8">

          Recent Meals

        </h2>

        {recentMeals.length === 0 ? (

          <p className="text-gray-400">

            No meals added today

          </p>

        ) : (

          <div className="space-y-4">

            {recentMeals.map(
              (
                meal,
                index
              ) => (

                <div
                  key={index}
                  className="bg-black/20 border border-white/10 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >

                  <div>

                    <h3 className="text-xl font-bold text-white">

                      {meal.name}

                    </h3>

                    <p className="text-gray-400">

                      {
                        meal.quantity
                      }

                    </p>

                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">

                    <div>

                      <p className="text-gray-400">

                        Calories

                      </p>

                      <p className="text-orange-400 font-bold">

                        {
                          meal.calories
                        }

                      </p>

                    </div>

                    <div>

                      <p className="text-gray-400">

                        Protein

                      </p>

                      <p className="text-green-400 font-bold">

                        {
                          meal.protein
                        } g

                      </p>

                    </div>

                    <div>

                      <p className="text-gray-400">

                        Carbs

                      </p>

                      <p className="text-blue-400 font-bold">

                        {
                          meal.carbs
                        } g

                      </p>

                    </div>

                    <div>

                      <p className="text-gray-400">

                        Fats

                      </p>

                      <p className="text-pink-400 font-bold">

                        {
                          meal.fats
                        } g

                      </p>

                    </div>

                  </div>

                </div>
              )
            )}

          </div>

        )}

      </div>

      {/* COMPONENTS */}

      <ProfileCard />

      <WaterTracker />

      <WorkoutTracker />

      <FoodCalculator />

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

function NutritionCard({
  label,
  value,
}) {

  return (

    <div className="bg-black/20 border border-white/10 rounded-2xl p-5">

      <p className="text-gray-400 mb-2">

        {label}

      </p>

      <h4 className="text-2xl font-bold text-white">

        {value}

      </h4>

    </div>
  )
}