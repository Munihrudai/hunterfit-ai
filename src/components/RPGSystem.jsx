import {
  loadMeals,
  loadProfile,
  loadWaterData,
  loadWorkouts,
} from '../utils/storage'

import {
  Trophy,
  Star,
  Flame,
  Shield,
  Sword,
  Crown,
} from 'lucide-react'

import { motion } from 'framer-motion'

export default function RPGSystem() {

  const meals = loadMeals()

  const profile = loadProfile()

  const waterData = loadWaterData()

  const workouts = loadWorkouts()

  const proteinGoal =
    Number(profile.protein) || 140

  const waterGoal =
    Number(profile.water) || 4

  const totalProtein = meals.reduce(
    (acc, item) =>
      acc + Number(item.protein || 0),
    0
  )

  const dailyQuests = [
    {
      title: 'Reach Protein Goal',
      completed:
        totalProtein >= proteinGoal,
      reward: '+30 XP',
      icon: <Shield size={22} />,
    },
    {
      title: 'Complete Hydration Goal',
      completed:
        waterData.current >= waterGoal,
      reward: '+20 XP',
      icon: <Flame size={22} />,
    },
    {
      title: 'Finish Workout Session',
      completed:
        workouts.length > 0,
      reward: '+50 XP',
      icon: <Sword size={22} />,
    },
  ]

  const weeklyMissions = [
    {
      title: 'Complete 5 Workouts',
      progress:
        Math.min(
          (workouts.length / 5) * 100,
          100
        ),
    },
    {
      title: 'Maintain 7 Day Streak',
      progress:
        Math.min(
          (waterData.streak / 7) * 100,
          100
        ),
    },
    {
      title: 'Log 20 Meals',
      progress:
        Math.min(
          (meals.length / 20) * 100,
          100
        ),
    },
  ]

  let title =
    'Beginner Hunter'

  if (workouts.length >= 5) {
    title = 'Rising Warrior'
  }

  if (workouts.length >= 10) {
    title = 'Elite Fighter'
  }

  if (workouts.length >= 20) {
    title = 'Shadow Athlete'
  }

  if (workouts.length >= 35) {
    title = 'Monarch Hunter'
  }

  if (workouts.length >= 50) {
    title = 'Fitness Sovereign'
  }

  const completedQuests =
    dailyQuests.filter(
      (q) => q.completed
    ).length

  return (
    <div className="mt-8 space-y-8">

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="bg-gradient-to-br from-purple-900/40 to-black border border-purple-500/20 rounded-3xl p-8"
      >

        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">

          <div>

            <div className="flex items-center gap-4 mb-4">

              <div className="bg-purple-500/20 p-5 rounded-3xl">

                <Crown
                  className="text-purple-400"
                  size={42}
                />

              </div>

              <div>

                <p className="text-gray-400">
                  Current Hunter Title
                </p>

                <h2 className="text-5xl font-bold text-purple-400">
                  {title}
                </h2>

              </div>

            </div>

            <p className="text-gray-300 text-lg">
              Continue progressing to unlock elite hunter status.
            </p>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <RewardCard
              title="Completed Quests"
              value={completedQuests}
              icon={<Trophy />}
            />

            <RewardCard
              title="Workout Sessions"
              value={workouts.length}
              icon={<Sword />}
            />

            <RewardCard
              title="Hydration Streak"
              value={waterData.streak}
              icon={<Flame />}
            />

            <RewardCard
              title="Meals Logged"
              value={meals.length}
              icon={<Star />}
            />

          </div>

        </div>

      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

          <h2 className="text-3xl font-bold text-purple-400 mb-8">
            Daily Quests
          </h2>

          <div className="space-y-5">

            {dailyQuests.map(
              (quest, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    scale: 1.02,
                  }}
                  className={`rounded-2xl p-5 border flex items-center justify-between ${
                    quest.completed
                      ? 'bg-green-500/10 border-green-500/30'
                      : 'bg-white/5 border-white/10'
                  }`}
                >

                  <div className="flex items-center gap-4">

                    <div
                      className={`p-3 rounded-2xl ${
                        quest.completed
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-purple-500/20 text-purple-400'
                      }`}
                    >
                      {quest.icon}
                    </div>

                    <div>

                      <h3 className="text-lg font-semibold">
                        {quest.title}
                      </h3>

                      <p className="text-gray-400 text-sm">
                        Reward:
                        {' '}
                        {quest.reward}
                      </p>

                    </div>

                  </div>

                  <div
                    className={`font-semibold ${
                      quest.completed
                        ? 'text-green-400'
                        : 'text-gray-500'
                    }`}
                  >
                    {quest.completed
                      ? 'Completed'
                      : 'Pending'}
                  </div>

                </motion.div>
              )
            )}

          </div>

        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

          <h2 className="text-3xl font-bold text-orange-400 mb-8">
            Weekly Missions
          </h2>

          <div className="space-y-8">

            {weeklyMissions.map(
              (mission, index) => (
                <div key={index}>

                  <div className="flex justify-between mb-3">

                    <p className="text-lg">
                      {mission.title}
                    </p>

                    <p className="text-gray-400">
                      {Math.round(
                        mission.progress
                      )}
                      %
                    </p>

                  </div>

                  <div className="w-full h-5 bg-white/10 rounded-full overflow-hidden">

                    <motion.div
                      initial={{
                        width: 0,
                      }}
                      animate={{
                        width: `${mission.progress}%`,
                      }}
                      transition={{
                        duration: 1,
                      }}
                      className="h-full bg-orange-500 rounded-full"
                    />

                  </div>

                </div>
              )
            )}

          </div>

        </div>

      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

        <h2 className="text-3xl font-bold text-red-400 mb-8">
          Boss Challenge
        </h2>

        <div className="bg-gradient-to-r from-red-900/30 to-black border border-red-500/20 rounded-3xl p-8">

          <div className="flex flex-col xl:flex-row items-center justify-between gap-8">

            <div>

              <h3 className="text-4xl font-bold text-red-400 mb-4">
                Shadow Beast Workout
              </h3>

              <p className="text-gray-300 text-lg leading-8 max-w-2xl">
                Complete:
                {' '}
                100 pushups,
                {' '}
                50 squats,
                {' '}
                20 pullups,
                {' '}
                and drink 4L water in one day.
              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl mb-3">
                👹
              </div>

              <button className="bg-red-500 hover:bg-red-600 transition px-8 py-4 rounded-2xl font-bold text-lg">
                Accept Challenge
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

function RewardCard({
  title,
  value,
  icon,
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">

      <div className="flex items-center justify-between mb-3">

        <p className="text-gray-400 text-sm">
          {title}
        </p>

        <div className="text-purple-400">
          {icon}
        </div>

      </div>

      <h3 className="text-3xl font-bold">
        {value}
      </h3>

    </div>
  )
}