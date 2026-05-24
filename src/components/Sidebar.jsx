import {
  LayoutDashboard,
  Apple,
  Dumbbell,
  BarChart3,
  Crown,
  Settings,
} from 'lucide-react'

import { NavLink } from 'react-router-dom'

export default function Sidebar() {

  const navItems = [
    {
      name: 'Dashboard',
      path: '/',
      icon: <LayoutDashboard size={20} />,
    },

    {
      name: 'Nutrition',
      path: '/nutrition',
      icon: <Apple size={20} />,
    },

    {
      name: 'Workout',
      path: '/workout',
      icon: <Dumbbell size={20} />,
    },

    {
      name: 'Analytics',
      path: '/analytics',
      icon: <BarChart3 size={20} />,
    },

    {
      name: 'Hunter',
      path: '/hunter',
      icon: <Crown size={20} />,
    },

    {
      name: 'Settings',
      path: '/settings',
      icon: <Settings size={20} />,
    },
  ]

  return (
    <div className="w-72 min-h-screen bg-[#0b0b0b] border-r border-white/10 p-6 hidden lg:block">

      <h1 className="text-4xl font-bold text-purple-400 mb-12">
        HunterFit AI
      </h1>

      <div className="space-y-4">

        {navItems.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-2xl transition ${
                isActive
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/5 hover:bg-white/10'
              }`
            }
          >

            {item.icon}

            {item.name}

          </NavLink>
        ))}

      </div>

    </div>
  )
}