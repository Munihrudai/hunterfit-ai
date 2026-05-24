import {
  useEffect,
  useState,
} from 'react'

import {
  Crown,
  Flame,
  Lock,
  CheckCircle2,
} from 'lucide-react'

import hunterLevels
  from '../data/hunterLevels'

import {
  saveHunterProgress,
  loadHunterProgress,
} from '../utils/storage'

const rankColors = {

  'E-Rank':
    'from-green-500 to-emerald-700',

  'D-Rank':
    'from-blue-500 to-cyan-700',

  'C-Rank':
    'from-yellow-400 to-orange-500',

  'B-Rank':
    'from-orange-500 to-red-600',

  'A-Rank':
    'from-red-500 to-pink-700',

  'S-Rank':
    'from-purple-500 to-fuchsia-700',

  'S+ Rank':
    'from-black to-purple-900',
}

export default function HunterRank() {

  const [hunterData, setHunterData] =
    useState(
      loadHunterProgress()
    )

  const [showPopup, setShowPopup] =
    useState(false)

  const [popupData, setPopupData] =
    useState(null)

  const [showRankPopup, setShowRankPopup] =
    useState(false)

  const [rankPopupData, setRankPopupData] =
    useState(null)

  useEffect(() => {

    saveHunterProgress(
      hunterData
    )

  }, [hunterData])

  const currentLevelData =
    hunterLevels.find(
      level =>
        level.level ===
        hunterData.currentLevel
    )

  const nextLevelData =
    hunterLevels.find(
      level =>
        level.level ===
        hunterData.currentLevel + 1
    )

  const handleArise = () => {

    if (!currentLevelData)
      return

    const updatedCompleted =
      [
        ...hunterData.completedLevels,

        hunterData.currentLevel,
      ]

    const nextLevel =
      hunterData.currentLevel + 1

    const nextData =
      hunterLevels.find(
        level =>
          level.level ===
          nextLevel
      )

    const oldRank =
      hunterData.rank

    const newRank =
      nextData?.rank ||
      hunterData.rank

    const newXP =
      hunterData.xp +
      currentLevelData.xpReward

    setHunterData({

      currentLevel:
        nextLevel,

      xp: newXP,

      rank: newRank,

      title:
        nextData?.title ||
        hunterData.title,

      completedLevels:
        updatedCompleted,
    })

    setPopupData({
      level:
        currentLevelData.level,

      xp:
        currentLevelData.xpReward,

      nextLevel,
    })

    setShowPopup(true)

    setTimeout(() => {

      setShowPopup(false)

    }, 3500)

    if (oldRank !== newRank) {

      setRankPopupData({
        oldRank,
        newRank,
      })

      setShowRankPopup(true)

      setTimeout(() => {

        setShowRankPopup(false)

      }, 5000)
    }
  }

  return (
    <div className="mt-8 bg-white/5 border border-white/10 rounded-3xl p-8">

      {/* HEADER */}

      <div
        className={`
          flex items-center gap-5 mb-8
          bg-gradient-to-r
          ${rankColors[hunterData.rank]}
          p-6 rounded-3xl
        `}
      >

        <div className="w-16 h-16 rounded-2xl bg-black/20 flex items-center justify-center">

          <Crown
            size={34}
            className="text-white"
          />

        </div>

        <div>

          <h2 className="text-4xl font-bold text-white">

            {hunterData.rank}

          </h2>

          <p className="text-white/80 mt-2">

            {hunterData.title}

          </p>

        </div>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <StatCard
          title="Current Level"
          value={
            hunterData.currentLevel
          }
        />

        <StatCard
          title="Total XP"
          value={hunterData.xp}
        />

        <StatCard
          title="Completed Levels"
          value={
            hunterData.completedLevels
              .length
          }
        />

      </div>

      {/* CURRENT LEVEL */}

      {currentLevelData && (

        <div className="bg-purple-500/10 border border-purple-500/20 rounded-3xl p-6 mb-8">

          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">

            <div>

              <h3 className="text-3xl font-bold text-orange-400 mb-2">

                LEVEL
                {' '}
                {
                  currentLevelData.level
                }

              </h3>

              <p className="text-gray-400">

                {
                  currentLevelData.arc
                }

              </p>

              {currentLevelData.level === 20 && (

                <div className="bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-2 rounded-2xl inline-block mt-4">

                  Promotion Test

                </div>

              )}

            </div>

            <div className="bg-black/20 px-5 py-3 rounded-2xl">

              +{
                currentLevelData.xpReward
              }
              {' '}
              XP

            </div>

          </div>

          <div className="space-y-4 mb-8">

            {currentLevelData.goals.map(
              (
                goal,
                index
              ) => (

                <div
                  key={index}
                  className="bg-black/20 rounded-2xl p-4 border border-white/10"
                >

                  {goal}

                </div>

              )
            )}

          </div>

          <button
            onClick={
              handleArise
            }
            className="bg-purple-500 hover:bg-purple-600 transition px-8 py-4 rounded-2xl font-bold flex items-center gap-3"
          >

            <Flame size={22} />

            ARISE

          </button>

        </div>

      )}

      {/* NEXT LOCKED LEVEL */}

      {nextLevelData && (

        <div className="bg-black/20 border border-white/10 rounded-3xl p-6 mb-8">

          <div className="flex items-center gap-4 mb-5">

            <Lock
              className="text-gray-400"
            />

            <h3 className="text-2xl font-bold text-gray-300">

              Next Locked Level

            </h3>

          </div>

          <div className="bg-white/5 rounded-2xl p-5">

            <h4 className="text-2xl font-bold text-purple-400 mb-4">

              Level
              {' '}
              {
                nextLevelData.level
              }

            </h4>

            <div className="space-y-3">

              {nextLevelData.goals.map(
                (
                  goal,
                  index
                ) => (

                  <div
                    key={index}
                    className="bg-black/20 rounded-2xl p-4 opacity-60"
                  >

                    🔒
                    {' '}
                    {goal}

                  </div>

                )
              )}

            </div>

          </div>

        </div>

      )}

      {/* COMPLETED LEVELS */}

      <div>

        <h3 className="text-3xl font-bold text-green-400 mb-6">

          Completed Levels

        </h3>

        <div className="space-y-6">

          {hunterData.completedLevels.map(
            completedLevel => {

              const levelData =
                hunterLevels.find(
                  level =>
                    level.level ===
                    completedLevel
                )

              if (!levelData)
                return null

              return (

                <div
                  key={
                    completedLevel
                  }
                  className="bg-green-500/10 border border-green-500/20 rounded-3xl p-6"
                >

                  <div className="flex items-center gap-4 mb-5">

                    <CheckCircle2
                      className="text-green-400"
                    />

                    <h4 className="text-2xl font-bold text-green-400">

                      Level
                      {' '}
                      {
                        levelData.level
                      }

                      {' '}
                      Completed

                    </h4>

                  </div>

                  <div className="space-y-3">

                    {levelData.goals.map(
                      (
                        goal,
                        index
                      ) => (

                        <div
                          key={index}
                          className="bg-black/20 rounded-2xl p-4"
                        >

                          {goal}

                        </div>

                      )
                    )}

                  </div>

                </div>

              )
            }
          )}

        </div>

      </div>

      {/* LEVEL UP POPUP */}

      {showPopup && popupData && (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-[#111] border border-purple-500/30 rounded-3xl p-10 text-center max-w-md w-full mx-4">

            <h2 className="text-5xl font-bold text-purple-400 mb-5">

              LEVEL UP

            </h2>

            <p className="text-2xl mb-4">

              Level
              {' '}
              {
                popupData.level
              }
              {' '}
              Cleared

            </p>

            <p className="text-green-400 text-xl mb-4">

              +{
                popupData.xp
              }
              {' '}
              XP Earned

            </p>

            <p className="text-gray-400">

              Level
              {' '}
              {
                popupData.nextLevel
              }
              {' '}
              Unlocked

            </p>

          </div>

        </div>

      )}

      {/* RANK UP POPUP */}

      {showRankPopup &&
       rankPopupData && (

        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

          <div className="bg-[#111] border border-purple-500/30 rounded-3xl p-12 text-center max-w-lg w-full mx-4 animate-pulse">

            <h2 className="text-6xl font-bold text-yellow-400 mb-6">

              RANK UP

            </h2>

            <p className="text-2xl text-gray-300 mb-4">

              {
                rankPopupData.oldRank
              }

            </p>

            <p className="text-5xl font-bold text-purple-400 mb-6">

              ↓

            </p>

            <p className="text-4xl font-bold text-green-400 mb-6">

              {
                rankPopupData.newRank
              }

            </p>

            <p className="text-gray-400 text-xl">

              Hunter Promotion Successful

            </p>

          </div>

        </div>

      )}

    </div>
  )
}

function StatCard({
  title,
  value,
}) {

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

      <p className="text-gray-400 mb-3">

        {title}

      </p>

      <h3 className="text-4xl font-bold">

        {value}

      </h3>

    </div>
  )
}