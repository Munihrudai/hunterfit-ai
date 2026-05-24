import {
  loadMeals,
  loadProfile,
  loadWaterData,
} from '../utils/storage'

import {
  ShieldAlert,
  ShieldCheck,
  Flame,
  Droplets,
  Target,
} from 'lucide-react'

export default function NutritionAnalyzer() {

  const meals = loadMeals()

  const profile = loadProfile()

  const waterData =
    loadWaterData()

  const calorieGoal =
    Number(profile.calories) || 2100

  const proteinGoal =
    Number(profile.protein) || 140

  const waterGoal =
    Number(profile.water) || 4

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

  const caloriePercent =
    Math.min(
      (
        totalCalories /
        calorieGoal
      ) * 100,
      100
    )

  const proteinPercent =
    Math.min(
      (
        totalProtein /
        proteinGoal
      ) * 100,
      100
    )

  const waterPercent =
    Math.min(
      (
        waterData.current /
        waterGoal
      ) * 100,
      100
    )

  const nutritionScore =
    Math.round(
      (
        caloriePercent +
        proteinPercent +
        waterPercent
      ) / 3
    )

  const warnings = []

  if (
    totalProtein <
    proteinGoal * 0.7
  ) {

    warnings.push(
      'Low protein intake detected.'
    )
  }

  if (
    totalCalories >
    calorieGoal * 1.2
  ) {

    warnings.push(
      'Calories exceed recommended range.'
    )
  }

  if (
    waterData.current <
    waterGoal * 0.7
  ) {

    warnings.push(
      'Hydration level is too low.'
    )
  }

  const macroTotal =
    totalProtein +
    totalCarbs +
    totalFats

  const proteinRatio =
    macroTotal
      ? (
          (totalProtein /
            macroTotal) *
          100
        ).toFixed(0)
      : 0

  const carbsRatio =
    macroTotal
      ? (
          (totalCarbs /
            macroTotal) *
          100
        ).toFixed(0)
      : 0

  const fatsRatio =
    macroTotal
      ? (
          (totalFats /
            macroTotal) *
          100
        ).toFixed(0)
      : 0

  return (
    <div className="mt-8 bg-white/5 border border-white/10 rounded-3xl p-8">

      <div className="mb-8">

        <h2 className="text-3xl font-bold text-cyan-400 mb-3">
          Daily Nutrition Analyzer
        </h2>

        <p className="text-gray-400">
          Smart nutrition insights and health tracking
        </p>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">

        <ScoreCard
          title="Calories"
          value={`${Math.round(
            caloriePercent
          )}%`}
          icon={<Flame />}
          color="text-orange-400"
        />

        <ScoreCard
          title="Protein"
          value={`${Math.round(
            proteinPercent
          )}%`}
          icon={<Target />}
          color="text-green-400"
        />

        <ScoreCard
          title="Hydration"
          value={`${Math.round(
            waterPercent
          )}%`}
          icon={<Droplets />}
          color="text-cyan-400"
        />

        <ScoreCard
          title="Nutrition Score"
          value={`${nutritionScore}`}
          icon={<ShieldCheck />}
          color="text-purple-400"
        />

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

          <h3 className="text-2xl font-bold text-purple-400 mb-6">
            Macro Distribution
          </h3>

          <div className="space-y-6">

            <MacroBar
              label="Protein"
              value={proteinRatio}
              color="bg-green-500"
            />

            <MacroBar
              label="Carbs"
              value={carbsRatio}
              color="bg-orange-500"
            />

            <MacroBar
              label="Fats"
              value={fatsRatio}
              color="bg-yellow-500"
            />

          </div>

        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

          <h3 className="text-2xl font-bold text-red-400 mb-6">
            Smart Health Alerts
          </h3>

          {warnings.length > 0 ? (

            <div className="space-y-4">

              {warnings.map(
                (
                  warning,
                  index
                ) => (

                  <div
                    key={index}
                    className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-center gap-4"
                  >

                    <ShieldAlert
                      className="text-red-400"
                      size={24}
                    />

                    <p className="text-gray-300">
                      {warning}
                    </p>

                  </div>
                )
              )}

            </div>

          ) : (

            <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5 flex items-center gap-4">

              <ShieldCheck
                className="text-green-400"
                size={28}
              />

              <p className="text-gray-300">
                Excellent nutrition balance today.
              </p>

            </div>

          )}

        </div>

      </div>

      <div className="mt-8 bg-gradient-to-br from-cyan-900/20 to-black border border-cyan-500/20 rounded-3xl p-8">

        <h3 className="text-3xl font-bold text-cyan-400 mb-8">
          Daily Intake Summary
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

          <SummaryCard
            label="Calories"
            value={`${Math.round(
              totalCalories
            )}`}
          />

          <SummaryCard
            label="Protein"
            value={`${Math.round(
              totalProtein
            )}g`}
          />

          <SummaryCard
            label="Carbs"
            value={`${Math.round(
              totalCarbs
            )}g`}
          />

          <SummaryCard
            label="Fats"
            value={`${Math.round(
              totalFats
            )}g`}
          />

        </div>

      </div>

    </div>
  )
}

function ScoreCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

      <div className="flex items-center justify-between mb-4">

        <p className="text-gray-400">
          {title}
        </p>

        <div className={color}>
          {icon}
        </div>

      </div>

      <h3 className={`text-4xl font-bold ${color}`}>
        {value}
      </h3>

    </div>
  )
}

function MacroBar({
  label,
  value,
  color,
}) {
  return (
    <div>

      <div className="flex justify-between mb-2">

        <p>{label}</p>

        <p>{value}%</p>

      </div>

      <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">

        <div
          className={`h-full ${color}`}
          style={{
            width: `${value}%`,
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