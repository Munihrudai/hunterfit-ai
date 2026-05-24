import { useEffect, useState } from 'react'

import foodDatabase from '../data/foodDatabase'

import {
  saveMeals,
  loadMeals,
} from '../utils/storage'

import {
  Search,
  Plus,
  Clock3,
  Flame,
} from 'lucide-react'

export default function FoodCalculator() {

  const [input, setInput] =
    useState('')

  const [foods, setFoods] =
    useState([])

  const [suggestions, setSuggestions] =
    useState([])

  const [recentFoods, setRecentFoods] =
    useState([])

  const [category, setCategory] =
    useState('All')

  const popularFoods = [
    'Egg',
    'Banana',
    'Rice',
    'Milk',
    'Chicken Breast',
    'Oats',
  ]

  useEffect(() => {

    const savedRecent =
      JSON.parse(
        localStorage.getItem(
          'hunterfit-recent-foods'
        )
      ) || []

    setRecentFoods(savedRecent)

  }, [])

  const parseInput = (text) => {

    const lowerText =
      text.toLowerCase()

    const parts =
      lowerText.split(/,|and/)

    const detectedFoods = []

    parts.forEach((part) => {

      const amountMatch =
        part.match(/\d+/)

      const amount =
        amountMatch
          ? Number(amountMatch[0])
          : 1

      const unit =
        part.includes('ml')
          ? 'ml'
          : part.includes('g')
          ? 'g'
          : 'piece'

      const matchedFood =
        foodDatabase.find((food) => {

          if (!food?.name)
            return false

          return part.includes(
            food.name.toLowerCase()
          )
        })

      if (matchedFood) {

        const multiplier =
          unit === matchedFood.unit
            ? amount /
              matchedFood.baseAmount
            : amount

        detectedFoods.push({
          ...matchedFood,
          quantity: amount,
          multiplier,
        })
      }
    })

    setFoods(detectedFoods)
  }

  const handleInput = (value) => {

    setInput(value)

    parseInput(value)

    if (!value.trim()) {

      setSuggestions([])

      return
    }

    const matchedSuggestions =
      foodDatabase.filter((food) => {

        const matchesSearch =
          food.name
            .toLowerCase()
            .includes(
              value.toLowerCase()
            )

        const matchesCategory =
          category === 'All'
            ? true
            : food.category === category

        return (
          matchesSearch &&
          matchesCategory
        )
      })

    setSuggestions(
      matchedSuggestions.slice(0, 5)
    )
  }

  const selectSuggestion = (
    foodName
  ) => {

    setInput(foodName)

    setSuggestions([])

    parseInput(foodName)
  }

  const totalCalories =
    foods.reduce(
      (acc, food) =>
        acc +
        food.calories *
          food.multiplier,
      0
    )

  const totalProtein =
    foods.reduce(
      (acc, food) =>
        acc +
        food.protein *
          food.multiplier,
      0
    )

  const totalCarbs =
    foods.reduce(
      (acc, food) =>
        acc +
        food.carbs *
          food.multiplier,
      0
    )

  const totalFats =
    foods.reduce(
      (acc, food) =>
        acc +
        food.fats *
          food.multiplier,
      0
    )

  const totalFiber =
    foods.reduce(
      (acc, food) =>
        acc +
        food.fiber *
          food.multiplier,
      0
    )

  const totalSugar =
    foods.reduce(
      (acc, food) =>
        acc +
        food.sugar *
          food.multiplier,
      0
    )

  const totalWater =
    foods.reduce(
      (acc, food) =>
        acc +
        food.water *
          food.multiplier,
      0
    )

  const addToMeals = () => {

    if (!foods.length) return

    const existingMeals =
      loadMeals()

    const newMeal = {
      category: 'Smart Food',
      name: input,
      calories:
        Number(
          totalCalories.toFixed(1)
        ),
      protein:
        Number(
          totalProtein.toFixed(1)
        ),
      carbs:
        Number(
          totalCarbs.toFixed(1)
        ),
      fats:
        Number(
          totalFats.toFixed(1)
        ),
    }

    const updatedMeals = [
      newMeal,
      ...existingMeals,
    ]

    saveMeals(updatedMeals)

    const updatedRecent = [
      input,
      ...recentFoods.filter(
        (item) => item !== input
      ),
    ].slice(0, 5)

    setRecentFoods(updatedRecent)

    localStorage.setItem(
      'hunterfit-recent-foods',
      JSON.stringify(updatedRecent)
    )

    alert(
      'Meal added successfully'
    )

    setInput('')

    setFoods([])

    setSuggestions([])
  }

  return (
    <div className="mt-8 bg-white/5 border border-white/10 rounded-3xl p-8">

      <div className="mb-8">

        <h2 className="text-3xl font-bold text-green-400 mb-3">
          Smart Food Engine
        </h2>

        <p className="text-gray-400">
          Intelligent nutrition calculator
        </p>

      </div>

      <div className="flex flex-wrap gap-3 mb-6">

        {[
          'All',
          'Protein',
          'Carbs',
          'Fruits',
          'Dairy',
          'Indian',
          'Fast Food',
          'Fitness',
        ].map((item) => (

          <button
            key={item}
            onClick={() =>
              setCategory(item)
            }
            className={`px-5 py-2 rounded-2xl transition ${
              category === item
                ? 'bg-green-500 text-white'
                : 'bg-white/5 border border-white/10 hover:bg-white/10'
            }`}
          >
            {item}
          </button>
        ))}

      </div>

      <div className="relative">

        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5">

          <Search
            className="text-gray-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Example: 2 eggs and 100g rice"
            value={input}
            onChange={(e) =>
              handleInput(
                e.target.value
              )
            }
            className="bg-transparent outline-none w-full py-5"
          />

        </div>

        {suggestions.length > 0 && (

          <div className="absolute w-full mt-3 bg-[#111] border border-white/10 rounded-2xl overflow-hidden z-50">

            {suggestions.map(
              (
                suggestion,
                index
              ) => (

                <button
                  key={index}
                  onClick={() =>
                    selectSuggestion(
                      suggestion.name
                    )
                  }
                  className="w-full text-left px-5 py-4 hover:bg-white/5 transition border-b border-white/5"
                >

                  <div className="flex items-center justify-between">

                    <span>
                      {suggestion.name}
                    </span>

                    <span className="text-gray-400 text-sm">
                      {
                        suggestion.calories
                      }
                      cal
                    </span>

                  </div>

                </button>
              )
            )}

          </div>

        )}

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

          <div className="flex items-center gap-3 mb-6">

            <Clock3
              className="text-cyan-400"
              size={24}
            />

            <h3 className="text-2xl font-bold text-cyan-400">
              Recent Foods
            </h3>

          </div>

          <div className="flex flex-wrap gap-3">

            {recentFoods.length > 0 ? (

              recentFoods.map(
                (
                  food,
                  index
                ) => (

                  <button
                    key={index}
                    onClick={() =>
                      selectSuggestion(
                        food
                      )
                    }
                    className="bg-cyan-500/20 hover:bg-cyan-500/30 transition px-4 py-2 rounded-2xl"
                  >
                    {food}
                  </button>
                )
              )

            ) : (

              <p className="text-gray-500">
                No recent foods
              </p>

            )}

          </div>

        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

          <div className="flex items-center gap-3 mb-6">

            <Flame
              className="text-orange-400"
              size={24}
            />

            <h3 className="text-2xl font-bold text-orange-400">
              Popular Foods
            </h3>

          </div>

          <div className="flex flex-wrap gap-3">

            {popularFoods.map(
              (
                food,
                index
              ) => (

                <button
                  key={index}
                  onClick={() =>
                    selectSuggestion(
                      food
                    )
                  }
                  className="bg-orange-500/20 hover:bg-orange-500/30 transition px-4 py-2 rounded-2xl"
                >
                  {food}
                </button>
              )
            )}

          </div>

        </div>

      </div>

      {foods.length > 0 ? (

        <div className="mt-8 space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

            {foods.map(
              (
                food,
                index
              ) => (

                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-3xl p-6"
                >

                  <h3 className="text-2xl font-bold text-green-400 mb-4">

                    {food.quantity}
                    {food.unit}
                    {' '}
                    {food.name}

                  </h3>

                  <div className="space-y-2 text-gray-300">

                    <p>
                      Calories:
                      {' '}
                      {(
                        food.calories *
                        food.multiplier
                      ).toFixed(1)}
                    </p>

                    <p>
                      Protein:
                      {' '}
                      {(
                        food.protein *
                        food.multiplier
                      ).toFixed(1)}g
                    </p>

                    <p>
                      Carbs:
                      {' '}
                      {(
                        food.carbs *
                        food.multiplier
                      ).toFixed(1)}g
                    </p>

                    <p>
                      Fats:
                      {' '}
                      {(
                        food.fats *
                        food.multiplier
                      ).toFixed(1)}g
                    </p>

                  </div>

                </div>
              )
            )}

          </div>

          <div className="bg-gradient-to-br from-green-900/20 to-black border border-green-500/20 rounded-3xl p-8">

            <h2 className="text-3xl font-bold text-green-400 mb-8">
              Combined Nutrition
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-5">

              <NutritionCard
                label="Calories"
                value={totalCalories.toFixed(1)}
              />

              <NutritionCard
                label="Protein"
                value={`${totalProtein.toFixed(1)}g`}
              />

              <NutritionCard
                label="Carbs"
                value={`${totalCarbs.toFixed(1)}g`}
              />

              <NutritionCard
                label="Fats"
                value={`${totalFats.toFixed(1)}g`}
              />

              <NutritionCard
                label="Fiber"
                value={`${totalFiber.toFixed(1)}g`}
              />

              <NutritionCard
                label="Sugar"
                value={`${totalSugar.toFixed(1)}g`}
              />

              <NutritionCard
                label="Water"
                value={`${totalWater.toFixed(1)}ml`}
              />

            </div>

            <button
              onClick={addToMeals}
              className="mt-8 bg-green-500 hover:bg-green-600 transition px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3"
            >

              <Plus size={22} />

              Add Combined Meal

            </button>

          </div>

        </div>

      ) : (

        <div className="text-center text-gray-500 py-16">

          {input
            ? 'No matching foods found'
            : 'Search for foods'}

        </div>

      )}

    </div>
  )
}

function NutritionCard({
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