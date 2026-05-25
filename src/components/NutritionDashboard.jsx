import {
  Flame,
  Beef,
  Wheat,
  Droplets,
  Apple,
} from 'lucide-react'

import {
  loadMeals,
  loadProfile,
} from '../utils/storage'

export default function NutritionDashboard() {

  const meals =
    loadMeals()

  const profile =
    loadProfile()

  const calorieGoal =
    Number(
      profile.calories
    ) || 0

  const proteinGoal =
    Number(
      profile.protein
    ) || 0

  const carbGoal =
    Number(
      profile.carbs
    ) || 0

  const fatGoal =
    Number(
      profile.fats
    ) || 0

  const waterGoal =
    Number(
      profile.water
    ) || 0

  // =========================
  // TOTALS
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

  const totalFiber =
    meals.reduce(
      (acc, meal) =>
        acc +
        Number(
          meal.fiber || 0
        ),
      0
    )

  const totalWater =
    meals.reduce(
      (acc, meal) =>
        acc +
        Number(
          meal.water || 0
        ),
      0
    )

  // =========================
  // REMAINING
  // =========================

  const remainingCalories =
    calorieGoal -
    totalCalories

  const remainingProtein =
    proteinGoal -
    totalProtein

  const remainingCarbs =
    carbGoal -
    totalCarbs

  const remainingFats =
    fatGoal -
    totalFats

  const remainingWater =
    waterGoal -
    totalWater

  // =========================
  // PERCENTAGES
  // =========================

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

  const carbPercent =
    carbGoal
      ? Math.min(
          (
            (totalCarbs /
              carbGoal) *
            100
          ),
          100
        )
      : 0

  const fatPercent =
    fatGoal
      ? Math.min(
          (
            (totalFats /
              fatGoal) *
            100
          ),
          100
        )
      : 0

  return (

    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mt-8">

      <div className="mb-10">

        <h2 className="text-4xl font-bold text-green-400 mb-3">

          Nutrition Dashboard

        </h2>

        <p className="text-gray-400">

          Real-time nutrition tracking

        </p>

      </div>

      {/* CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">

        <NutritionCard
          icon={
            <Flame size={28} />
          }
          title="Calories"
          total={Math.round(
            totalCalories
          )}
          goal={calorieGoal}
          remaining={Math.round(
            remainingCalories
          )}
          progress={caloriePercent}
          unit=""
        />

        <NutritionCard
          icon={
            <Beef size={28} />
          }
          title="Protein"
          total={Math.round(
            totalProtein
          )}
          goal={proteinGoal}
          remaining={Math.round(
            remainingProtein
          )}
          progress={proteinPercent}
          unit="g"
        />

        <NutritionCard
          icon={
            <Wheat size={28} />
          }
          title="Carbs"
          total={Math.round(
            totalCarbs
          )}
          goal={carbGoal}
          remaining={Math.round(
            remainingCarbs
          )}
          progress={carbPercent}
          unit="g"
        />

        <NutritionCard
          icon={
            <Apple size={28} />
          }
          title="Fats"
          total={Math.round(
            totalFats
          )}
          goal={fatGoal}
          remaining={Math.round(
            remainingFats
          )}
          progress={fatPercent}
          unit="g"
        />

        <NutritionCard
          icon={
            <Droplets size={28} />
          }
          title="Water"
          total={Math.round(
            totalWater
          )}
          goal={waterGoal}
          remaining={Math.round(
            remainingWater
          )}
          progress={Math.min(
            (
              (totalWater /
                waterGoal) *
              100
            ),
            100
          )}
          unit="ml"
        />

      </div>

      {/* EXTRA TOTALS */}

      <div className="mt-10 bg-black/20 border border-white/10 rounded-3xl p-6">

        <h3 className="text-2xl font-bold text-purple-400 mb-6">

          Nutrition Summary

        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5">

          <SummaryCard
            label="Calories"
            value={Math.round(
              totalCalories
            )}
          />

          <SummaryCard
            label="Protein"
            value={`${Math.round(
              totalProtein
            )} g`}
          />

          <SummaryCard
            label="Carbs"
            value={`${Math.round(
              totalCarbs
            )} g`}
          />

          <SummaryCard
            label="Fats"
            value={`${Math.round(
              totalFats
            )} g`}
          />

          <SummaryCard
            label="Fiber"
            value={`${Math.round(
              totalFiber
            )} g`}
          />

          <SummaryCard
            label="Water"
            value={`${Math.round(
              totalWater
            )} ml`}
          />

        </div>

      </div>

    </div>
  )
}

function NutritionCard({
  icon,
  title,
  total,
  goal,
  remaining,
  progress,
  unit,
}) {

  return (

    <div className="bg-black/20 border border-white/10 rounded-3xl p-6">

      <div className="flex items-center justify-between mb-6">

        <div className="text-green-400">

          {icon}

        </div>

        <p className="text-gray-400">

          {Math.round(
            progress
          )}
          %

        </p>

      </div>

      <h3 className="text-2xl font-bold mb-4">

        {title}

      </h3>

      <div className="space-y-2">

        <p className="text-gray-300">

          {total}
          {unit}
          {' '}
          /
          {' '}
          {goal}
          {unit}

        </p>

        <p className="text-green-400 text-sm">

          Remaining:
          {' '}
          {remaining > 0
            ? remaining
            : 0}
          {unit}

        </p>

      </div>

      <div className="w-full h-3 bg-white/10 rounded-full mt-6 overflow-hidden">

        <div
          className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

    </div>
  )
}

function SummaryCard({
  label,
  value,
}) {

  return (

    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">

      <p className="text-gray-400 mb-2">

        {label}

      </p>

      <h4 className="text-2xl font-bold text-white">

        {value}

      </h4>

    </div>
  )
}