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
// DATE HELPERS
// =========================

const getTodayKey =
  () => {

    return new Date()
      .toISOString()
      .split('T')[0]
  }

const getWeekKey =
  (date) => {

    const firstDay =
      new Date(
        date.getFullYear(),
        0,
        1
      )

    const days =
      Math.floor(
        (
          date -
          firstDay
        ) /
        (
          24 *
          60 *
          60 *
          1000
        )
      )

    const week =
      Math.ceil(
        (
          days +
          firstDay.getDay() +
          1
        ) / 7
      )

    return `${date.getFullYear()}-W${week}`
  }

// =========================
// MEALS STORAGE
// =========================

export const saveMeals =
  (meals) => {

    const mealsWithMeta =
      meals.map((meal) => {

        const now =
          new Date()

        return {

          ...meal,

          createdAt:
            meal.createdAt ||
            Date.now(),

          dateKey:
            meal.dateKey ||
            getTodayKey(),

          weekKey:
            meal.weekKey ||
            getWeekKey(now),
        }
      })

    localStorage.setItem(

      'hunterfit-meals',

      JSON.stringify(
        mealsWithMeta
      )
    )
  }

// =========================
// TODAY MEALS ONLY
// =========================

export const loadMeals =
  () => {

    const meals =
      JSON.parse(
        localStorage.getItem(
          'hunterfit-meals'
        )
      ) || []

    const currentTime =
      Date.now()

    const sevenDays =
      7 *
      24 *
      60 *
      60 *
      1000

    // KEEP ONLY LAST 7 DAYS

    const validMeals =
      meals.filter(
        (meal) => {

          const age =
            currentTime -
            (
              meal.createdAt ||
              0
            )

          return (
            age <=
            sevenDays
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

    // RETURN TODAY ONLY

    const todayKey =
      getTodayKey()

    return validMeals.filter(
      (meal) =>

        meal.dateKey ===
        todayKey
    )
  }

// =========================
// WEEKLY NUTRITION SUMMARY
// =========================

export const loadWeeklyNutrition =
  () => {

    const meals =
      JSON.parse(
        localStorage.getItem(
          'hunterfit-meals'
        )
      ) || []

    const currentTime =
      Date.now()

    const sevenDays =
      7 *
      24 *
      60 *
      60 *
      1000

    // LAST 7 DAYS

    const validMeals =
      meals.filter(
        (meal) => {

          const age =
            currentTime -
            (
              meal.createdAt ||
              0
            )

          return (
            age <=
            sevenDays
          )
        }
      )

    // GROUP BY DATE

    const grouped = {}

    validMeals.forEach(
      (meal) => {

        const date =
          meal.dateKey

        if (
          !grouped[date]
        ) {

          grouped[date] = {

            calories: 0,

            protein: 0,

            carbs: 0,

            fats: 0,

            fiber: 0,

            water: 0,
          }
        }

        grouped[
          date
        ].calories +=
          Number(
            meal.calories || 0
          )

        grouped[
          date
        ].protein +=
          Number(
            meal.protein || 0
          )

        grouped[
          date
        ].carbs +=
          Number(
            meal.carbs || 0
          )

        grouped[
          date
        ].fats +=
          Number(
            meal.fats || 0
          )

        grouped[
          date
        ].fiber +=
          Number(
            meal.fiber || 0
          )

        grouped[
          date
        ].water +=
          Number(
            meal.water || 0
          )
      }
    )

    return grouped
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