import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import {
  loadMeals,
  loadProfile,
  loadWaterData,
  loadWorkoutHistory,
  loadHunterXP,
  loadStreakData,
} from '../utils/storage'

const FitnessContext =
  createContext()

export function FitnessProvider({
  children,
}) {

  const [profile, setProfile] =
    useState({})

  const [meals, setMeals] =
    useState([])

  const [waterData, setWaterData] =
    useState({
      current: 0,
      history: [],
    })

  const [workouts, setWorkouts] =
    useState([])

  const [hunterXP, setHunterXP] =
    useState({
      xp: 0,
      level: 1,
      rank: 'E-Rank',
    })

  const [streakData, setStreakData] =
    useState({
      current: 0,
      best: 0,
    })

  const refreshAllData = () => {

    setProfile(
      loadProfile()
    )

    setMeals(
      loadMeals()
    )

    setWaterData(
      loadWaterData()
    )

    setWorkouts(
      loadWorkoutHistory()
    )

    setHunterXP(
      loadHunterXP()
    )

    setStreakData(
      loadStreakData()
    )
  }

  useEffect(() => {

    refreshAllData()

    window.addEventListener(
      'hunterfit-data-updated',
      refreshAllData
    )

    return () => {

      window.removeEventListener(
        'hunterfit-data-updated',
        refreshAllData
      )
    }

  }, [])

  return (
    <FitnessContext.Provider
      value={{
        profile,
        meals,
        waterData,
        workouts,
        hunterXP,
        streakData,
        refreshAllData,
      }}
    >

      {children}

    </FitnessContext.Provider>
  )
}

export function useFitness() {

  return useContext(
    FitnessContext
  )
}