import FoodCalculator from '../components/FoodCalculator'
import MealRecommendations from '../components/MealRecommendations'
import NutritionAnalyzer from '../components/NutritionAnalyzer'

export default function NutritionPage() {

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6">

      <h1 className="text-4xl font-bold text-green-400 mb-8">
        Nutrition Center
      </h1>

      <FoodCalculator />

      <MealRecommendations />

      <NutritionAnalyzer />

    </div>
  )
}