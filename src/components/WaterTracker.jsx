import { useEffect, useState } from 'react'

import {
  saveWaterData,
  loadWaterData,
  loadProfile,
} from '../utils/storage'

import {
  Droplets,
  RotateCcw,
} from 'lucide-react'

export default function WaterTracker() {

  const profile = loadProfile()

  const waterGoal =
    Number(profile.water) || 4

  const [waterData, setWaterData] =
    useState({
      current: 0,
      history: [],
      streak: 0,
    })

  useEffect(() => {
    setWaterData(loadWaterData())
  }, [])

  const addWater = (amount) => {

    const updatedCurrent =
      Number(
        (
          waterData.current + amount
        ).toFixed(2)
      )

    const updatedData = {
      ...waterData,
      current: updatedCurrent,
      history: [
        {
          amount,
          time:
            new Date().toLocaleTimeString(),
        },
        ...waterData.history,
      ],
    }

    if (
      updatedCurrent >= waterGoal &&
      waterData.current < waterGoal
    ) {
      updatedData.streak =
        waterData.streak + 1
    }

    setWaterData(updatedData)

    saveWaterData(updatedData)
  }

  const resetWater = () => {

    const updatedData = {
      ...waterData,
      current: 0,
      history: [],
    }

    setWaterData(updatedData)

    saveWaterData(updatedData)
  }

  const progress =
    Math.min(
      (waterData.current / waterGoal) *
        100,
      100
    )

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mt-8">

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">

        <div>

          <h2 className="text-2xl font-bold text-cyan-400">
            Water Tracker
          </h2>

          <p className="text-gray-400 mt-2">
            Stay hydrated throughout the day
          </p>

        </div>

        <div className="flex gap-3">

          <GoalBadge
            label="Water Goal"
            value={`${waterGoal}L`}
          />

          <GoalBadge
            label="Hydration Streak"
            value={`${waterData.streak} Days`}
          />

        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center">

          <div className="relative w-52 h-52">

            <div className="absolute inset-0 rounded-full border-[12px] border-white/10" />

            <div
              className="absolute inset-0 rounded-full border-[12px] border-cyan-400 border-t-transparent transition-all duration-500"
              style={{
                transform: `rotate(${progress * 3.6}deg)`,
              }}
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center">

              <Droplets
                className="text-cyan-400 mb-3"
                size={36}
              />

              <h2 className="text-4xl font-bold">
                {waterData.current}L
              </h2>

              <p className="text-gray-400 mt-2">
                {Math.round(progress)}%
                {' '}
                Completed
              </p>

            </div>

          </div>

          <div className="grid grid-cols-3 gap-4 mt-8 w-full">

            <QuickButton
              label="+250ml"
              onClick={() => addWater(0.25)}
            />

            <QuickButton
              label="+500ml"
              onClick={() => addWater(0.5)}
            />

            <QuickButton
              label="+1L"
              onClick={() => addWater(1)}
            />

          </div>

          <button
            onClick={resetWater}
            className="mt-6 flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 px-5 py-3 rounded-2xl transition"
          >
            <RotateCcw size={18} />

            Reset Water
          </button>

        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

          <h3 className="text-xl font-bold text-cyan-400 mb-6">
            Hydration History
          </h3>

          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">

            {waterData.history.length === 0 ? (

              <div className="text-gray-400 text-center py-12">
                No water intake added yet
              </div>

            ) : (

              waterData.history.map(
                (item, index) => (
                  <div
                    key={index}
                    className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center justify-between"
                  >

                    <div>

                      <p className="font-semibold">
                        +{item.amount}L Water
                      </p>

                      <p className="text-gray-400 text-sm mt-1">
                        {item.time}
                      </p>

                    </div>

                    <Droplets
                      className="text-cyan-400"
                      size={22}
                    />

                  </div>
                )
              )

            )}

          </div>

        </div>

      </div>

    </div>
  )
}

function QuickButton({
  label,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 font-semibold py-4 rounded-2xl transition"
    >
      {label}
    </button>
  )
}

function GoalBadge({
  label,
  value,
}) {
  return (
    <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-2xl">

      <p className="text-xs text-gray-400">
        {label}
      </p>

      <p className="text-cyan-400 font-semibold">
        {value}
      </p>

    </div>
  )
}