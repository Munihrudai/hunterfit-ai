import {
  Trash2,
  RotateCcw,
} from 'lucide-react'

import {
  resetAllData,
} from '../utils/storage'

export default function SettingsPage() {

  const handleReset = () => {

    const confirmed =
      window.confirm(
        'This will permanently delete ALL HunterFit data. Continue?'
      )

    if (!confirmed) return

    resetAllData()

    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6">

      <h1 className="text-5xl font-bold text-red-400 mb-3">
        Settings
      </h1>

      <p className="text-gray-400 mb-10">
        Manage your HunterFit application
      </p>

      <div className="max-w-2xl bg-white/5 border border-white/10 rounded-3xl p-8">

        <div className="flex items-center gap-4 mb-8">

          <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center">

            <Trash2
              className="text-red-400"
              size={30}
            />

          </div>

          <div>

            <h2 className="text-3xl font-bold">
              Reset Application
            </h2>

            <p className="text-gray-400 mt-2">
              Delete all fitness, nutrition and workout data
            </p>

          </div>

        </div>

        <button
          onClick={handleReset}
          className="bg-red-500 hover:bg-red-600 transition px-8 py-5 rounded-2xl font-bold text-lg flex items-center gap-3"
        >

          <RotateCcw size={22} />

          Reset All Data

        </button>

      </div>

    </div>
  )
}