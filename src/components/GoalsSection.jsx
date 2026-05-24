export default function GoalsSection({
  caloriesGoal,
  proteinGoal,
  waterGoal,
}) {

  const goals = [
    {
      title: 'Calories Goal',
      progress: 70,
      value: caloriesGoal,
    },
    {
      title: 'Protein Goal',
      progress: 68,
      value: proteinGoal,
    },
    {
      title: 'Water Goal',
      progress: 62,
      value: waterGoal,
    },
  ]

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mt-8">

      <h2 className="text-2xl font-bold text-purple-400 mb-6">
        Fitness Goals
      </h2>

      <div className="space-y-6">

        {goals.map((goal, index) => (
          <div key={index}>

            <div className="flex justify-between mb-2">

              <p>{goal.title}</p>

              <p className="text-gray-400">
                {goal.value}
              </p>

            </div>

            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">

              <div
                className="h-full bg-purple-500 rounded-full"
                style={{
                  width: `${goal.progress}%`,
                }}
              />

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}