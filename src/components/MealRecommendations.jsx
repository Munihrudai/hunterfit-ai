import { useState } from 'react'

import mealRecommendations from '../data/mealRecommendations'

import {
  saveMeals,
  loadMeals,
} from '../utils/storage'

import {
  Sparkles,
  Flame,
  Dumbbell,
  Apple,
  Plus,
} from 'lucide-react'

export default function MealRecommendations() {

  const [selectedGoal, setSelectedGoal] =
    useState('bulking')

  const goals = [
    {
      id: 'bulking',
      label: 'Bulking',
      icon: <Dumbbell size={18} />,
    },

    {
      id: 'cutting',
      label: 'Cutting',
      icon: <Flame size={18} />,
    },

    {
      id: 'preworkout',
      label: 'Pre Workout',
      icon: <Sparkles size={18} />,
    },

    {
      id: 'postworkout',
      label: 'Post Workout',
      icon: <Apple size={18} />,
    },
  ]

  const meals =
    mealRecommendations[selectedGoal]

  const addMealToTracker = (
    meal
  ) => {

    const existingMeals =
      loadMeals()

    const newMeal = {
      category:
        'Recommended Meal',
      name: meal.title,
      calories: meal.calories,
      protein: meal.protein,
      carbs: 0,
      fats: 0,
    }

    saveMeals([
      newMeal,
      ...existingMeals,
    ])

    alert(
      `${meal.title} added to meals`
    )
  }

  return (
    <div className="mt-8 bg-white/5 border border-white/10 rounded-3xl p-8">

      <div className="mb-8">

        <h2 className="text-3xl font-bold text-purple-400 mb-3">
          Smart Meal Recommendations
        </h2>

        <p className="text-gray-400">
          Personalized meal suggestions based on goals
        </p>

      </div>

      <div className="flex flex-wrap gap-4 mb-8">

        {goals.map((goal) => (

          <button
            key={goal.id}
            onClick={() =>
              setSelectedGoal(
                goal.id
              )
            }
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl transition ${
              selectedGoal ===
              goal.id
                ? 'bg-purple-500 text-white'
                : 'bg-white/5 border border-white/10 hover:bg-white/10'
            }`}
          >

            {goal.icon}

            {goal.label}

          </button>
        ))}

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {meals.map(
          (meal, index) => (

            <div
              key={index}
              className="bg-gradient-to-br from-purple-900/20 to-black border border-purple-500/20 rounded-3xl p-6"
            >

              <div className="flex items-start justify-between gap-5 mb-6">

                <div>

                  <h3 className="text-2xl font-bold text-purple-400 mb-3">
                    {meal.title}
                  </h3>

                  <div className="space-y-2">

                    {meal.foods.map(
                      (
                        food,
                        foodIndex
                      ) => (

                        <p
                          key={foodIndex}
                          className="text-gray-300"
                        >
                          • {food}
                        </p>
                      )
                    )}

                  </div>

                </div>

              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">

                <div className="bg-white/5 rounded-2xl p-4">

                  <p className="text-gray-400 mb-2">
                    Calories
                  </p>

                  <h4 className="text-2xl font-bold">
                    {meal.calories}
                  </h4>

                </div>

                <div className="bg-white/5 rounded-2xl p-4">

                  <p className="text-gray-400 mb-2">
                    Protein
                  </p>

                  <h4 className="text-2xl font-bold">
                    {meal.protein}g
                  </h4>

                </div>

              </div>

              <button
                onClick={() =>
                  addMealToTracker(
                    meal
                  )
                }
                className="w-full bg-purple-500 hover:bg-purple-600 transition py-4 rounded-2xl font-bold flex items-center justify-center gap-3"
              >

                <Plus size={20} />

                Add Meal To Tracker

              </button>

            </div>
          )
        )}

      </div>

    </div>
  )
}