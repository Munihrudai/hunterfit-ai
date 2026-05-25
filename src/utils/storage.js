// =========================
// PROFILE STORAGE
// =========================

export const saveProfile = (
  profile
) => {

  localStorage.setItem(
    'hunterfit-profile',
    JSON.stringify(profile)
  )
}

export const loadProfile = () => {

  return (
    JSON.parse(
      localStorage.getItem(
        'hunterfit-profile'
      )
    ) || {}
  )
}

// =========================
// MEALS STORAGE
// =========================

export const saveMeals =
  (meals) => {

    const mealsWithTime =
      meals.map((meal) => ({

        ...meal,

        createdAt:
          meal.createdAt ||
          Date.now(),
      }))

    localStorage.setItem(

      'hunterfit-meals',

      JSON.stringify(
        mealsWithTime
      )
    )
  }

export const loadMeals =
  () => {

    const meals =
      JSON.parse(
        localStorage.getItem(
          'hunterfit-meals'
        )
      ) || []

    const now =
      Date.now()

    // REMOVE OLD MEALS

    const validMeals =
      meals.filter(
        (meal) => {

          const age =
            now -
            (
              meal.createdAt ||
              0
            )

          return (
            age <
            24 *
              60 *
              60 *
              1000
          )
        }
      )

    // AUTO CLEANUP

    localStorage.setItem(

      'hunterfit-meals',

      JSON.stringify(
        validMeals
      )
    )

    return validMeals
  }

// =========================
// CUSTOM FOODS
// =========================

export const saveCustomFoods =
  (foods) => {

    localStorage.setItem(

      'hunterfit-custom-foods',

      JSON.stringify(
        foods
      )
    )
  }

export const loadCustomFoods =
  () => {

    return (
      JSON.parse(
        localStorage.getItem(
          'hunterfit-custom-foods'
        )
      ) || []
    )
  }

// =========================
// WATER STORAGE
// =========================

export const saveWaterData = (
  water
) => {

  localStorage.setItem(
    'hunterfit-water',
    JSON.stringify(water)
  )
}

export const loadWaterData = () => {

  const data =
    JSON.parse(
      localStorage.getItem(
        'hunterfit-water'
      )
    )

  return {

    current:
      data?.current || 0,

    history:
      data?.history || [],
  }
}

// =========================
// WORKOUT STORAGE
// =========================

export const saveWorkoutHistory =
  (
    workouts
  ) => {

    localStorage.setItem(

      'hunterfit-workouts',

      JSON.stringify(
        workouts
      )
    )
  }

export const loadWorkoutHistory =
  () => {

    return (
      JSON.parse(
        localStorage.getItem(
          'hunterfit-workouts'
        )
      )
      || []
    )
  }

// =========================
// SUPPORT OLD IMPORTS
// =========================

export const saveWorkouts =
  saveWorkoutHistory

export const loadWorkouts =
  loadWorkoutHistory

// =========================
// HUNTER XP STORAGE
// =========================

export const saveHunterXP =
  (xp) => {

    localStorage.setItem(
      'hunterfit-xp',
      JSON.stringify(xp)
    )
  }

export const loadHunterXP =
  () => {

    return (
      JSON.parse(
        localStorage.getItem(
          'hunterfit-xp'
        )
      ) || {

        xp: 0,

        level: 1,

        rank: 'E-Rank',
      }
    )
  }

// =========================
// DAILY STREAK STORAGE
// =========================

export const saveStreakData =
  (
    streak
  ) => {

    localStorage.setItem(

      'hunterfit-streak',

      JSON.stringify(
        streak
      )
    )
  }

export const loadStreakData =
  () => {

    return (
      JSON.parse(
        localStorage.getItem(
          'hunterfit-streak'
        )
      ) || {

        current: 0,

        best: 0,
      }
    )
  }

// =========================
// SETTINGS STORAGE
// =========================

export const saveSettings =
  (
    settings
  ) => {

    localStorage.setItem(

      'hunterfit-settings',

      JSON.stringify(
        settings
      )
    )
  }

export const loadSettings =
  () => {

    return (
      JSON.parse(
        localStorage.getItem(
          'hunterfit-settings'
        )
      ) || {

        darkMode: true,

        notifications: true,
      }
    )
  }

// =========================
// RESET SYSTEM
// =========================

export const resetAllData =
  () => {

    localStorage.removeItem(
      'hunterfit-profile'
    )

    localStorage.removeItem(
      'hunterfit-meals'
    )

    localStorage.removeItem(
      'hunterfit-water'
    )

    localStorage.removeItem(
      'hunterfit-workouts'
    )

    localStorage.removeItem(
      'hunterfit-xp'
    )

    localStorage.removeItem(
      'hunterfit-streak'
    )

    localStorage.removeItem(
      'hunterfit-settings'
    )

    localStorage.removeItem(
      'hunterfit-recent-foods'
    )

    localStorage.removeItem(
      'hunterfit-theme'
    )

    localStorage.removeItem(
      'hunterfit-custom-foods'
    )

    localStorage.clear()
  }

// =========================
// HUNTER PROGRESSION
// =========================

export const saveHunterProgress =
  (data) => {

    localStorage.setItem(

      'hunterfit-hunter-progress',

      JSON.stringify(data)
    )
  }

export const loadHunterProgress =
  () => {

    return (
      JSON.parse(
        localStorage.getItem(
          'hunterfit-hunter-progress'
        )
      ) || {

        currentLevel: 1,

        xp: 0,

        rank: 'E-Rank',

        title:
          'Foundation Hunter',

        completedLevels: [],
      }
    )
  }

// =========================
// QUEST STORAGE
// =========================

export const saveQuestProgress =
  (data) => {

    localStorage.setItem(

      'hunterfit-quests',

      JSON.stringify(data)
    )
  }

export const loadQuestProgress =
  () => {

    return (
      JSON.parse(
        localStorage.getItem(
          'hunterfit-quests'
        )
      ) || {

        completedDaily: [],

        completedWeekly: [],

        completedBosses: [],
      }
    )
  }