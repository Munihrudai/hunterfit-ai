import {
  useMemo,
} from 'react'

import {
  Flame,
  Droplets,
  Dumbbell,
  Target,
} from 'lucide-react'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

import {
  useFitness,
} from '../context/FitnessContext'

export default function AnalyticsDashboard() {

  const {
    meals,
    profile,
    waterData,
    workouts,
  } = useFitness()

  // =========================
  // TOTAL CALCULATIONS
  // =========================

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

  const waterGoal =
    Number(
      profile.water
    ) || 0

  const calorieGoal =
    Number(
      profile.calories
    ) || 0

  const proteinGoal =
    Number(
      profile.protein
    ) || 0

  const waterCurrent =
    Number(
      waterData.current || 0
    )

  const workoutCount =
    workouts.length

  // =========================
  // PERCENTAGES
  // =========================

  const caloriePercent =
    calorieGoal > 0
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
    proteinGoal > 0
      ? Math.min(
          (
            (totalProtein /
              proteinGoal) *
            100
          ),
          100
        )
      : 0

  const waterPercent =
    waterGoal > 0
      ? Math.min(
          (
            (waterCurrent /
              waterGoal) *
            100
          ),
          100
        )
      : 0

  // =========================
  // WEEKLY CHART DATA
  // =========================

  const weeklyData =
    useMemo(() => {

      return [
        {
          day: 'Calories',
          value:
            totalCalories,
        },

        {
          day: 'Protein',
          value:
            totalProtein,
        },

        {
          day: 'Carbs',
          value:
            totalCarbs,
        },

        {
          day: 'Fats',
          value:
            totalFats,
        },

        {
          day: 'Workouts',
          value:
            workoutCount,
        },
      ]

    }, [
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFats,
      workoutCount,
    ])

  // =========================
  // MACRO PIE DATA
  // =========================

  const macroData = [
    {
      name: 'Protein',
      value: totalProtein,
    },

    {
      name: 'Carbs',
      value: totalCarbs,
    },

    {
      name: 'Fats',
      value: totalFats,
    },
  ]

  const COLORS = [
    '#7c3aed',
    '#06b6d4',
    '#f97316',
  ]

  return (
    <div className="space-y-8">

      {/* ===================== */}
      {/* STATS CARDS */}
      {/* ===================== */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          icon={<Flame size={28} />}
          title="Calories"
          value={`${Math.round(
            totalCalories
          )} kcal`}
          percent={caloriePercent}
        />

        <StatCard
          icon={<Target size={28} />}
          title="Protein"
          value={`${Math.round(
            totalProtein
          )} g`}
          percent={proteinPercent}
        />

        <StatCard
          icon={<Droplets size={28} />}
          title="Water"
          value={`${waterCurrent} L`}
          percent={waterPercent}
        />

        <StatCard
          icon={<Dumbbell size={28} />}
          title="Workouts"
          value={`${workoutCount}`}
          percent={
            workoutCount * 20
          }
        />

      </div>

      {/* ===================== */}
      {/* BAR CHART */}
      {/* ===================== */}

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

        <h2 className="text-3xl font-bold text-purple-400 mb-8">
          Fitness Analytics
        </h2>

        <div className="h-[350px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <BarChart
              data={weeklyData}
            >

              <XAxis dataKey="day" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="value"
                radius={[10, 10, 0, 0]}
                fill="#7c3aed"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* ===================== */}
      {/* PIE CHART */}
      {/* ===================== */}

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

        <h2 className="text-3xl font-bold text-cyan-400 mb-8">
          Macro Distribution
        </h2>

        <div className="h-[350px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <PieChart>

              <Pie
                data={macroData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >

                {macroData.map(
                  (
                    entry,
                    index
                  ) => (

                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index %
                            COLORS.length
                        ]
                      }
                    />

                  )
                )}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  )
}

function StatCard({
  icon,
  title,
  value,
  percent,
}) {

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

      <div className="text-purple-400 mb-5">
        {icon}
      </div>

      <h3 className="text-2xl font-bold mb-3">
        {title}
      </h3>

      <p className="text-gray-300 text-xl mb-5">
        {value}
      </p>

      <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">

        <div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
          style={{
            width: `${Math.min(
              percent,
              100
            )}%`,
          }}
        />

      </div>

    </div>
  )
}