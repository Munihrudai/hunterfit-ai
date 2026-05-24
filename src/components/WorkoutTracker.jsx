import { useEffect, useState } from 'react'

import {
  saveWorkouts,
  loadWorkouts,
} from '../utils/storage'

import {
  Dumbbell,
  Flame,
  Trash2,
} from 'lucide-react'

export default function WorkoutTracker() {

  const [workout, setWorkout] =
    useState({
      category: 'Push',
      exercise: '',
      sets: '',
      reps: '',
      duration: '',
    })

  const [workouts, setWorkouts] =
    useState([])

  useEffect(() => {
    setWorkouts(loadWorkouts())
  }, [])

  const handleChange = (e) => {

    const { name, value } =
      e.target

    setWorkout((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const addWorkout = () => {

    if (!workout.exercise) return

    const updatedWorkouts = [
      {
        ...workout,
        date:
          new Date().toLocaleDateString(),
      },
      ...workouts,
    ]

    setWorkouts(updatedWorkouts)

    saveWorkouts(updatedWorkouts)

    setWorkout({
      category: 'Push',
      exercise: '',
      sets: '',
      reps: '',
      duration: '',
    })
  }

  const deleteWorkout = (index) => {

    const updated =
      workouts.filter(
        (_, i) => i !== index
      )

    setWorkouts(updated)

    saveWorkouts(updated)
  }

  const totalWorkouts =
    workouts.length

  const estimatedCalories =
    workouts.reduce(
      (acc, item) =>
        acc +
        Number(item.duration || 0) *
          8,
      0
    )

  const streak =
    new Set(
      workouts.map(
        (item) => item.date
      )
    ).size

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mt-8">

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">

        <div>

          <h2 className="text-2xl font-bold text-orange-400">
            Workout Tracker
          </h2>

          <p className="text-gray-400 mt-2">
            Track your workouts and progress
          </p>

        </div>

        <div className="flex flex-wrap gap-3">

          <StatBadge
            label="Total Workouts"
            value={totalWorkouts}
          />

          <StatBadge
            label="Calories Burned"
            value={`${estimatedCalories}`}
          />

          <StatBadge
            label="Workout Streak"
            value={`${streak} Days`}
          />

        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

        <select
          name="category"
          value={workout.category}
          onChange={handleChange}
          className="input"
        >
          <option>Push</option>
          <option>Pull</option>
          <option>Legs</option>
          <option>Cardio</option>
          <option>Calisthenics</option>
        </select>

        <input
          name="exercise"
          value={workout.exercise}
          onChange={handleChange}
          placeholder="Exercise"
          className="input"
        />

        <input
          name="sets"
          value={workout.sets}
          onChange={handleChange}
          placeholder="Sets"
          className="input"
        />

        <input
          name="reps"
          value={workout.reps}
          onChange={handleChange}
          placeholder="Reps"
          className="input"
        />

        <input
          name="duration"
          value={workout.duration}
          onChange={handleChange}
          placeholder="Duration (min)"
          className="input"
        />

      </div>

      <button
        onClick={addWorkout}
        className="mt-6 bg-orange-500 hover:bg-orange-600 transition-all px-6 py-3 rounded-2xl font-semibold"
      >
        Save Workout
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

        <AnalyticsCard
          title="Workout Sessions"
          value={totalWorkouts}
          icon={<Dumbbell size={28} />}
          color="text-orange-400"
        />

        <AnalyticsCard
          title="Calories Burned"
          value={estimatedCalories}
          icon={<Flame size={28} />}
          color="text-red-400"
        />

        <AnalyticsCard
          title="Workout Streak"
          value={`${streak} Days`}
          icon={<Dumbbell size={28} />}
          color="text-yellow-400"
        />

      </div>

      <div className="space-y-4 mt-8">

        {workouts.length === 0 ? (

          <div className="text-center text-gray-400 py-10">
            No workouts added yet
          </div>

        ) : (

          workouts.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 p-5 rounded-3xl flex flex-col lg:flex-row lg:items-center justify-between gap-5"
            >

              <div>

                <div className="flex items-center gap-3 mb-3">

                  <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-xl text-sm">
                    {item.category}
                  </span>

                  <h3 className="text-xl font-semibold">
                    {item.exercise}
                  </h3>

                </div>

                <p className="text-gray-400">
                  {item.sets} sets •
                  {' '}
                  {item.reps} reps •
                  {' '}
                  {item.duration} min
                </p>

                <p className="text-gray-500 text-sm mt-2">
                  {item.date}
                </p>

              </div>

              <button
                onClick={() =>
                  deleteWorkout(index)
                }
                className="bg-red-500/20 hover:bg-red-500/30 text-red-400 p-3 rounded-2xl transition"
              >
                <Trash2 size={18} />
              </button>

            </div>
          ))

        )}

      </div>

    </div>
  )
}

function StatBadge({
  label,
  value,
}) {
  return (
    <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-2xl">

      <p className="text-xs text-gray-400">
        {label}
      </p>

      <p className="text-orange-400 font-semibold">
        {value}
      </p>

    </div>
  )
}

function AnalyticsCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-gray-400 mb-2">
            {title}
          </p>

          <h3 className="text-3xl font-bold">
            {value}
          </h3>

        </div>

        <div className={color}>
          {icon}
        </div>

      </div>

    </div>
  )
}