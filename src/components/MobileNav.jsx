import {
  LayoutDashboard,
  Apple,
  Dumbbell,
  BarChart3,
  Crown,
  Settings,
} from 'lucide-react'

import { NavLink } from 'react-router-dom'

export default function MobileNav() {

  const navItems = [
    {
      name: 'Home',
      path: '/',
      icon: <LayoutDashboard size={22} />,
    },

    {
      name: 'Food',
      path: '/nutrition',
      icon: <Apple size={22} />,
    },

    {
      name: 'Workout',
      path: '/workout',
      icon: <Dumbbell size={22} />,
    },

    {
      name: 'Stats',
      path: '/analytics',
      icon: <BarChart3 size={22} />,
    },

    {
      name: 'Hunter',
      path: '/hunter',
      icon: <Crown size={22} />,
    },

    {
      name: 'Settings',
      path: '/settings',
      icon: <Settings size={22} />,
    },
  ]

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0b0b0b]/95 backdrop-blur-xl border-t border-white/10">

      <div className="grid grid-cols-6">

        {navItems.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-3 transition ${
                isActive
                  ? 'text-purple-400'
                  : 'text-gray-500'
              }`
            }
          >

            {item.icon}

            <span className="text-xs mt-1">
              {item.name}
            </span>

          </NavLink>
        ))}

      </div>

    </div>
  )
}