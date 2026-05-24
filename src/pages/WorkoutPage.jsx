import WorkoutTracker from '../components/WorkoutTracker'

export default function WorkoutPage() {

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6">

      <h1 className="text-4xl font-bold text-orange-400 mb-8">
        Workout Center
      </h1>

      <WorkoutTracker />

    </div>
  )
}