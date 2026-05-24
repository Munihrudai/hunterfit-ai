import HunterRank from '../components/HunterRank'
import RPGSystem from '../components/RPGSystem'

export default function HunterPage() {

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6">

      <h1 className="text-4xl font-bold text-purple-400 mb-8">
        Hunter System
      </h1>

      <HunterRank />

      <RPGSystem />

    </div>
  )
}