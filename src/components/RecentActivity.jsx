const activities = [
  'Completed Push Workout',
  'Drank 2.5L Water',
  'Reached Protein Goal',
  'Burned 450 Calories',
]

export default function RecentActivity() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mt-8">

      <h2 className="text-2xl font-bold text-purple-400 mb-6">
        Recent Activity
      </h2>

      <div className="space-y-4">

        {activities.map((activity, index) => (
          <div
            key={index}
            className="bg-white/5 border border-white/10 p-4 rounded-2xl"
          >
            {activity}
          </div>
        ))}

      </div>

    </div>
  )
}