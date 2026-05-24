import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import Sidebar from './components/Sidebar'
import MobileNav from './components/MobileNav'

import DashboardPage from './pages/DashboardPage'
import NutritionPage from './pages/NutritionPage'
import WorkoutPage from './pages/WorkoutPage'
import AnalyticsPage from './pages/AnalyticsPage'
import HunterPage from './pages/HunterPage'
import SettingsPage from './pages/SettingsPage'
import FloatingActionButton from './components/FloatingActionButton'

function App() {

  return (
    <BrowserRouter>

      <div className="flex bg-[#050505] text-white min-h-screen">

        <Sidebar />

        <div className="flex-1 pb-24 lg:pb-0">

          <Routes>

            <Route
              path="/"
              element={<DashboardPage />}
            />

            <Route
              path="/nutrition"
              element={<NutritionPage />}
            />

            <Route
              path="/workout"
              element={<WorkoutPage />}
            />

            <Route
              path="/analytics"
              element={<AnalyticsPage />}
            />

            <Route
              path="/hunter"
              element={<HunterPage />}
            />

            <Route
              path="/settings"
              element={<SettingsPage />}
            />

          </Routes>

        </div>

        <MobileNav />

        <FloatingActionButton />

      </div>

    </BrowserRouter>
  )
}

export default App