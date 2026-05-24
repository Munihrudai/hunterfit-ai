import { useEffect, useState } from 'react'

import {
  saveMeals,
  loadMeals,
  loadProfile,
} from '../utils/storage'

import {
  Trash2,
  Pencil,
  Search,
} from 'lucide-react'

export default function FoodTracker() {

  const [meal, setMeal] = useState({
    category: 'Breakfast',
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
  })

  const [meals, setMeals] = useState([])

  const [search, setSearch] = useState('')

  const [filter, setFilter] = useState('All')

  const [editIndex, setEditIndex] = useState(null)

  const profile = loadProfile()

  const calorieGoal =
    Number(profile.calories) || 2100

  const proteinGoal =
    Number(profile.protein) || 140

  const waterGoal =
    Number(profile.water) || 4

  useEffect(() => {
    setMeals(loadMeals())
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target

    setMeal((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const addMeal = () => {

    if (!meal.name) return

    let updatedMeals = [...meals]

    if (editIndex !== null) {

      updatedMeals[editIndex] = meal

      setEditIndex(null)

    } else {

      updatedMeals.push(meal)
    }

    setMeals(updatedMeals)

    saveMeals(updatedMeals)

    setMeal({
      category: 'Breakfast',
      name: '',
      calories: '',
      protein: '',
      carbs: '',
      fats: '',
    })
  }

  const deleteMeal = (index) => {

    const updatedMeals =
      meals.filter((_, i) => i !== index)

    setMeals(updatedMeals)

    saveMeals(updatedMeals)
  }

  const editMeal = (index) => {

    setMeal(meals[index])

    setEditIndex(index)
  }

  const filteredMeals = meals.filter((item) => {

    const matchesSearch =
      item.name
        .toLowerCase()
        .includes(search.toLowerCase())

    const matchesFilter =
      filter === 'All'
        ? true
        : item.category === filter

    return matchesSearch && matchesFilter
  })

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

  const totalCarbs = meals.reduce(
    (acc, item) =>
      acc + Number(item.carbs || 0),
    0
  )

  const totalFats = meals.reduce(
    (acc, item) =>
      acc + Number(item.fats || 0),
    0
  )

  const calorieProgress =
    Math.min(
      (totalCalories / calorieGoal) * 100,
      100
    )

  const proteinProgress =
    Math.min(
      (totalProtein / proteinGoal) * 100,
      100
    )

  const carbCalories =
    totalCarbs * 4

  const proteinCalories =
    totalProtein * 4

  const fatCalories =
    totalFats * 9

  const totalMacroCalories =
    carbCalories +
    proteinCalories +
    fatCalories

  const carbPercentage =
    totalMacroCalories
      ? Math.round(
          (carbCalories /
            totalMacroCalories) *
            100
        )
      : 0

  const proteinPercentage =
    totalMacroCalories
      ? Math.round(
          (proteinCalories /
            totalMacroCalories) *
            100
        )
      : 0

  const fatPercentage =
    totalMacroCalories
      ? Math.round(
          (fatCalories /
            totalMacroCalories) *
            100
        )
      : 0

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mt-8">

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">

        <h2 className="text-2xl font-bold text-purple-400">
          Food Tracker
        </h2>

        <div className="flex flex-wrap gap-3">

          <GoalBadge
            label="Calories Goal"
            value={calorieGoal}
          />

          <GoalBadge
            label="Protein Goal"
            value={`${proteinGoal}g`}
          />

          <GoalBadge
            label="Water Goal"
            value={`${waterGoal}L`}
          />

        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">

        <select
          name="category"
          value={meal.category}
          onChange={handleChange}
          className="input"
        >
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
          <option>Snacks</option>
        </select>

        <input
          name="name"
          value={meal.name}
          onChange={handleChange}
          placeholder="Food Name"
          className="input"
        />

        <input
          name="calories"
          value={meal.calories}
          onChange={handleChange}
          placeholder="Calories"
          className="input"
        />

        <input
          name="protein"
          value={meal.protein}
          onChange={handleChange}
          placeholder="Protein"
          className="input"
        />

        <input
          name="carbs"
          value={meal.carbs}
          onChange={handleChange}
          placeholder="Carbs"
          className="input"
        />

        <input
          name="fats"
          value={meal.fats}
          onChange={handleChange}
          placeholder="Fats"
          className="input"
        />

      </div>

      <button
        onClick={addMeal}
        className="mt-6 bg-purple-600 hover:bg-purple-700 transition-all px-6 py-3 rounded-2xl font-semibold"
      >
        {editIndex !== null
          ? 'Update Meal'
          : 'Add Meal'}
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

        <AnalyticsCard
          title="Daily Calories"
          current={totalCalories}
          goal={calorieGoal}
          progress={calorieProgress}
          color="bg-purple-500"
        />

        <AnalyticsCard
          title="Protein Intake"
          current={totalProtein}
          goal={proteinGoal}
          progress={proteinProgress}
          color="bg-green-500"
          unit="g"
        />

      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">

        <SummaryCard
          title="Calories"
          value={totalCalories}
        />

        <SummaryCard
          title="Protein"
          value={`${totalProtein}g`}
        />

        <SummaryCard
          title="Carbs"
          value={`${totalCarbs}g`}
        />

        <SummaryCard
          title="Fats"
          value={`${totalFats}g`}
        />

      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mt-8">

        <h3 className="text-xl font-bold text-purple-400 mb-6">
          Macro Split
        </h3>

        <div className="space-y-5">

          <MacroBar
            label="Carbs"
            percentage={carbPercentage}
            color="bg-blue-500"
          />

          <MacroBar
            label="Protein"
            percentage={proteinPercentage}
            color="bg-green-500"
          />

          <MacroBar
            label="Fats"
            percentage={fatPercentage}
            color="bg-yellow-500"
          />

        </div>

      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-8">

        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-4 flex-1">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search meals..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="bg-transparent outline-none w-full py-3"
          />

        </div>

        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
          className="input md:w-60"
        >
          <option>All</option>
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
          <option>Snacks</option>
        </select>

      </div>

      <div className="space-y-4 mt-8">

        {filteredMeals.map((item, index) => (
          <div
            key={index}
            className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-4"
          >

            <div>

              <div className="flex items-center gap-3 mb-2">

                <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-xl text-sm">
                  {item.category}
                </span>

                <h3 className="text-xl font-semibold">
                  {item.name}
                </h3>

              </div>

              <p className="text-gray-400">
                {item.calories} cal •
                {' '}
                {item.protein}g protein •
                {' '}
                {item.carbs}g carbs •
                {' '}
                {item.fats}g fats
              </p>

            </div>

            <div className="flex gap-3">

              <button
                onClick={() => editMeal(index)}
                className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 p-3 rounded-2xl transition"
              >
                <Pencil size={18} />
              </button>

              <button
                onClick={() => deleteMeal(index)}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-400 p-3 rounded-2xl transition"
              >
                <Trash2 size={18} />
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}

function GoalBadge({ label, value }) {
  return (
    <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-2xl">

      <p className="text-xs text-gray-400">
        {label}
      </p>

      <p className="text-purple-400 font-semibold">
        {value}
      </p>

    </div>
  )
}

function AnalyticsCard({
  title,
  current,
  goal,
  progress,
  color,
  unit = '',
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

      <div className="flex justify-between mb-3">

        <p className="text-gray-300">
          {title}
        </p>

        <p className="text-purple-400 font-semibold">
          {current}{unit} / {goal}{unit}
        </p>

      </div>

      <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">

        <div
          className={`h-full ${color} rounded-full`}
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

    </div>
  )
}

function SummaryCard({ title, value }) {
  return (
    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl text-center">

      <p className="text-gray-400 mb-2">
        {title}
      </p>

      <h3 className="text-2xl font-bold text-purple-400">
        {value}
      </h3>

    </div>
  )
}

function MacroBar({
  label,
  percentage,
  color,
}) {
  return (
    <div>

      <div className="flex justify-between mb-2">

        <p>{label}</p>

        <p className="text-gray-400">
          {percentage}%
        </p>

      </div>

      <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">

        <div
          className={`h-full ${color} rounded-full`}
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </div>
  )
}