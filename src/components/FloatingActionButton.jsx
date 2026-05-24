import { useState } from 'react'

import {
  Plus,
  Utensils,
  Droplets,
  Dumbbell,
  X,
} from 'lucide-react'

import {
  loadMeals,
  saveMeals,
  loadWaterData,
  saveWaterData,
  loadWorkoutHistory,
  saveWorkoutHistory,
} from '../utils/storage'

export default function FloatingActionButton() {

  const [open, setOpen] =
    useState(false)

  const quickAddMeal = () => {

    const meals =
      loadMeals()

    const quickMeal = {
      category: 'Quick Add',
      name: 'Quick Protein Snack',
      calories: 250,
      protein: 20,
      carbs: 15,
      fats: 8,
    }

    saveMeals([
      quickMeal,
      ...meals,
    ])

    alert(
      'Quick meal added'
    )
  }

  const quickAddWater = () => {

    const water =
      loadWaterData()

    const updatedWater = {
      ...water,
      current:
        Number(
          water.current || 0
        ) + 0.5,
    }

    saveWaterData(
      updatedWater
    )

    alert(
      '500ml water added'
    )
  }

  const quickAddWorkout = () => {

    const workouts =
      loadWorkoutHistory()

    const quickWorkout = {
      workout:
        'Quick Workout',
      duration: 20,
      calories: 180,
      date:
        new Date().toLocaleDateString(),
    }

    saveWorkoutHistory([
      quickWorkout,
      ...workouts,
    ])

    alert(
      'Workout added'
    )
  }

  return (
    <div className="fixed bottom-20 lg:bottom-8 right-6 z-50">

      <div className="flex flex-col items-end gap-4 mb-4">

        {open && (

          <>
            <ActionButton
              icon={<Utensils size={20} />}
              label="Quick Meal"
              color="bg-green-500"
              onClick={
                quickAddMeal
              }
            />

            <ActionButton
              icon={<Droplets size={20} />}
              label="Add Water"
              color="bg-cyan-500"
              onClick={
                quickAddWater
              }
            />

            <ActionButton
              icon={<Dumbbell size={20} />}
              label="Quick Workout"
              color="bg-orange-500"
              onClick={
                quickAddWorkout
              }
            />
          </>

        )}

      </div>

      <button
        onClick={() =>
          setOpen(!open)
        }
        className="w-16 h-16 rounded-full bg-purple-500 hover:bg-purple-600 transition flex items-center justify-center shadow-2xl"
      >

        {open ? (
          <X size={28} />
        ) : (
          <Plus size={28} />
        )}

      </button>

    </div>
  )
}

function ActionButton({
  icon,
  label,
  color,
  onClick,
}) {

  return (
    <button
      onClick={onClick}
      className={`${color} flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl hover:scale-105 transition`}
    >

      {icon}

      <span className="font-semibold">
        {label}
      </span>

    </button>
  )
}