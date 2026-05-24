import { useEffect, useState } from 'react'

import {
  saveProfile,
  loadProfile,
} from '../utils/storage'

import {
  Save,
} from 'lucide-react'

export default function ProfileCard() {

  const [profile, setProfile] =
    useState({
      name: '',
      age: '',
      weight: '',
      height: '',
      calories: '',
      protein: '',
      water: '',
    })

  const [saved, setSaved] =
    useState(false)

  useEffect(() => {

    const storedProfile =
      loadProfile()

    setProfile({
      name:
        storedProfile.name || '',

      age:
        storedProfile.age || '',

      weight:
        storedProfile.weight || '',

      height:
        storedProfile.height || '',

      calories:
        storedProfile.calories || '',

      protein:
        storedProfile.protein || '',

      water:
        storedProfile.water || '',
    })

  }, [])

  const handleChange = (
    e
  ) => {

    setSaved(false)

    setProfile({
      ...profile,

      [e.target.name]:
        e.target.value,
    })
  }

  const handleSave = () => {

    saveProfile(profile)

    setSaved(true)

    window.dispatchEvent(
      new Event(
        'hunterfit-profile-updated'
      )
    )

    setTimeout(() => {

      setSaved(false)

    }, 2500)
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-3xl font-bold text-purple-400 mb-2">
            User Details
          </h2>

          <p className="text-gray-400">
            Update your fitness profile
          </p>

        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <InputField
          label="Name"
          name="name"
          value={profile.name}
          onChange={handleChange}
        />

        <InputField
          label="Age"
          name="age"
          type="number"
          value={profile.age}
          onChange={handleChange}
        />

        <InputField
          label="Weight (kg)"
          name="weight"
          type="number"
          value={profile.weight}
          onChange={handleChange}
        />

        <InputField
          label="Height (cm)"
          name="height"
          type="number"
          value={profile.height}
          onChange={handleChange}
        />

        <InputField
          label="Calories Goal"
          name="calories"
          type="number"
          value={profile.calories}
          onChange={handleChange}
        />

        <InputField
          label="Protein Goal"
          name="protein"
          type="number"
          value={profile.protein}
          onChange={handleChange}
        />

        <InputField
          label="Water Goal (L)"
          name="water"
          type="number"
          value={profile.water}
          onChange={handleChange}
        />

      </div>

      <button
        onClick={handleSave}
        className="mt-8 bg-purple-500 hover:bg-purple-600 transition px-8 py-4 rounded-2xl font-bold flex items-center gap-3"
      >

        <Save size={22} />

        Save Profile

      </button>

      {saved && (

        <p className="text-green-400 mt-5">
          Profile saved successfully
        </p>

      )}

    </div>
  )
}

function InputField({
  label,
  name,
  value,
  onChange,
  type = 'text',
}) {

  return (
    <div>

      <label className="block mb-3 text-gray-300">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="input"
      />

    </div>
  )
}