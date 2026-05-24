import AnalyticsDashboard from '../components/AnalyticsDashboard'
import FitnessInsights from '../components/FitnessInsights'

export default function AnalyticsPage() {

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6">

      <h1 className="text-4xl font-bold text-cyan-400 mb-8">
        Analytics Center
      </h1>

      <AnalyticsDashboard />

      <FitnessInsights />

    </div>
  )
}