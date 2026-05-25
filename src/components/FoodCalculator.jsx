import { useEffect, useState } from 'react'

import foodDatabase from '../data/foodDatabase'

import {
  saveMeals,
  loadMeals,
} from '../utils/storage'

import {
  Search,
  Plus,
  Clock3,
  Flame,
} from 'lucide-react'

export default function FoodCalculator() {

  const [input, setInput] =
    useState('')

  const [foods, setFoods] =
    useState([])

  const [suggestions, setSuggestions] =
    useState([])

  const [recentFoods, setRecentFoods] =
    useState([])

  const [customFoods, setCustomFoods] =
    useState([])

  const [customFood, setCustomFood] =
    useState({

      name: '',

      calories: '',

      protein: '',

      carbs: '',

      fats: '',

      fiber: '',

      water: '',

      defaultQuantity: '',

      unit: 'g',
    })

  const allFoods = [

    ...foodDatabase,

    ...customFoods,
  ]

  useEffect(() => {

    const savedRecent =
      JSON.parse(
        localStorage.getItem(
          'hunterfit-recent-foods'
        )
      ) || []

    setRecentFoods(savedRecent)

    const savedCustomFoods =
      JSON.parse(
        localStorage.getItem(
          'hunterfit-custom-foods'
        )
      ) || []

    setCustomFoods(
      savedCustomFoods
    )

  }, [])

  const calculateNutrition =
    (
      food,
      enteredQuantity
    ) => {

      const factor =
        enteredQuantity /
        food.defaultQuantity

      return {

        calories:
          food.calories *
          factor,

        protein:
          food.protein *
          factor,

        carbs:
          food.carbs *
          factor,

        fats:
          food.fats *
          factor,

        fiber:
          food.fiber *
          factor,

        water:
          food.water *
          factor,
      }
    }

  const parseInput = (
    text
  ) => {

    const lowerText =
      text.toLowerCase()

    const parts =
      lowerText.split(
        /,|and/
      )

    const detectedFoods = []

    parts.forEach((part) => {

      const amountMatch =
        part.match(/\d+/)

      const amount =
        amountMatch
          ? Number(
              amountMatch[0]
            )
          : 1

      const matchedFood =
        allFoods.find(
          (food) => {

            if (
              !food?.name
            )
              return false

            return part.includes(
              food.name.toLowerCase()
            )
          }
        )

      if (matchedFood) {

        const nutrition =
          calculateNutrition(
            matchedFood,
            amount
          )

        detectedFoods.push({

          ...matchedFood,

          enteredQuantity:
            amount,

          calculated:
            nutrition,
        })
      }
    })

    setFoods(
      detectedFoods
    )
  }

  const handleInput = (
    value
  ) => {

    setInput(value)

    parseInput(value)

    if (
      !value.trim()
    ) {

      setSuggestions([])

      return
    }

    const matchedSuggestions =
      allFoods.filter(
        (food) =>
          food.name
            .toLowerCase()
            .includes(
              value.toLowerCase()
            )
      )

    setSuggestions(
      matchedSuggestions.slice(
        0,
        8
      )
    )
  }

  const selectSuggestion =
    (
      foodName
    ) => {

      setInput(foodName)

      setSuggestions([])

      parseInput(foodName)
    }

  const totalCalories =
    foods.reduce(
      (
        acc,
        food
      ) =>
        acc +
        food.calculated
          .calories,
      0
    )

  const totalProtein =
    foods.reduce(
      (
        acc,
        food
      ) =>
        acc +
        food.calculated
          .protein,
      0
    )

  const totalCarbs =
    foods.reduce(
      (
        acc,
        food
      ) =>
        acc +
        food.calculated
          .carbs,
      0
    )

  const totalFats =
    foods.reduce(
      (
        acc,
        food
      ) =>
        acc +
        food.calculated
          .fats,
      0
    )

  const totalFiber =
    foods.reduce(
      (
        acc,
        food
      ) =>
        acc +
        food.calculated
          .fiber,
      0
    )

  const totalWater =
    foods.reduce(
      (
        acc,
        food
      ) =>
        acc +
        food.calculated
          .water,
      0
    )

  const addToMeals = () => {

    if (!foods.length)
      return

    const existingMeals =
      loadMeals()

    const newMeal = {

      category:
        'Smart Food',

      name: input,

      calories:
        Number(
          totalCalories.toFixed(
            1
          )
        ),

      protein:
        Number(
          totalProtein.toFixed(
            1
          )
        ),

      carbs:
        Number(
          totalCarbs.toFixed(
            1
          )
        ),

      fats:
        Number(
          totalFats.toFixed(
            1
          )
        ),
    }

    const updatedMeals = [

      newMeal,

      ...existingMeals,
    ]

    saveMeals(
      updatedMeals
    )

    alert(
      'Meal added successfully'
    )
  }

  const saveCustomFood =
    () => {

      const newFood = {

        ...customFood,

        calories:
          Number(
            customFood.calories
          ),

        protein:
          Number(
            customFood.protein
          ),

        carbs:
          Number(
            customFood.carbs
          ),

        fats:
          Number(
            customFood.fats
          ),

        fiber:
          Number(
            customFood.fiber
          ),

        water:
          Number(
            customFood.water
          ),

        defaultQuantity:
          Number(
            customFood.defaultQuantity
          ),
      }

      const updatedFoods = [

        ...customFoods,

        newFood,
      ]

      setCustomFoods(
        updatedFoods
      )

      localStorage.setItem(
        'hunterfit-custom-foods',
        JSON.stringify(
          updatedFoods
        )
      )

      alert(
        'Custom food added successfully'
      )

      setCustomFood({

        name: '',

        calories: '',

        protein: '',

        carbs: '',

        fats: '',

        fiber: '',

        water: '',

        defaultQuantity: '',

        unit: 'g',
      })
    }

  return (
    <div className="mt-8 bg-white/5 border border-white/10 rounded-3xl p-8">

      <div className="mb-8">

        <h2 className="text-3xl font-bold text-green-400 mb-3">

          Smart Food Engine

        </h2>

        <p className="text-gray-400">

          Quantity Based Nutrition Calculator

        </p>

      </div>

      <div className="relative">

        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5">

          <Search
            className="text-gray-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Example: 200 rice and 2 egg"
            value={input}
            onChange={(e) =>
              handleInput(
                e.target.value
              )
            }
            className="bg-transparent outline-none w-full py-5"
          />

        </div>

        {suggestions.length >
          0 && (

          <div className="absolute w-full mt-3 bg-[#111] border border-white/10 rounded-2xl overflow-hidden z-50">

            {suggestions.map(
              (
                suggestion,
                index
              ) => (

                <button
                  key={index}
                  onClick={() =>
                    selectSuggestion(
                      suggestion.name
                    )
                  }
                  className="w-full text-left px-5 py-4 hover:bg-white/5"
                >

                  <div className="flex items-center justify-between">

                    <span>

                      {
                        suggestion.name
                      }

                    </span>

                    <span className="text-gray-400 text-sm">

                      {
                        suggestion.calories
                      }
                      cal /
                      {
                        suggestion.defaultQuantity
                      }
                      {
                        suggestion.unit
                      }

                    </span>

                  </div>

                </button>
              )
            )}

          </div>

        )}

      </div>

      {foods.length > 0 && (

        <div className="mt-8 space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

            {foods.map(
              (
                food,
                index
              ) => (

                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-3xl p-6"
                >

                  <h3 className="text-2xl font-bold text-green-400 mb-4">

                    {
                      food.enteredQuantity
                    }
                    {
                      food.unit
                    }
                    {' '}
                    {
                      food.name
                    }

                  </h3>

                  <div className="space-y-2 text-gray-300">

                    <p>

                      Calories:
                      {' '}
                      {
                        food.calculated
                          .calories.toFixed(
                            1
                          )
                      }

                    </p>

                    <p>

                      Protein:
                      {' '}
                      {
                        food.calculated
                          .protein.toFixed(
                            1
                          )
                      }g

                    </p>

                    <p>

                      Carbs:
                      {' '}
                      {
                        food.calculated
                          .carbs.toFixed(
                            1
                          )
                      }g

                    </p>

                    <p>

                      Fats:
                      {' '}
                      {
                        food.calculated
                          .fats.toFixed(
                            1
                          )
                      }g

                    </p>

                    <p>

                      Fiber:
                      {' '}
                      {
                        food.calculated
                          .fiber.toFixed(
                            1
                          )
                      }g

                    </p>

                    <p>

                      Water:
                      {' '}
                      {
                        food.calculated
                          .water.toFixed(
                            1
                          )
                      }ml

                    </p>

                  </div>

                </div>
              )
            )}

          </div>

          <div className="bg-gradient-to-br from-green-900/20 to-black border border-green-500/20 rounded-3xl p-8">

            <h2 className="text-3xl font-bold text-green-400 mb-8">

              Combined Nutrition

            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5">

              <NutritionCard
                label="Calories"
                value={totalCalories.toFixed(
                  1
                )}
              />

              <NutritionCard
                label="Protein"
                value={`${totalProtein.toFixed(
                  1
                )}g`}
              />

              <NutritionCard
                label="Carbs"
                value={`${totalCarbs.toFixed(
                  1
                )}g`}
              />

              <NutritionCard
                label="Fats"
                value={`${totalFats.toFixed(
                  1
                )}g`}
              />

              <NutritionCard
                label="Fiber"
                value={`${totalFiber.toFixed(
                  1
                )}g`}
              />

              <NutritionCard
                label="Water"
                value={`${totalWater.toFixed(
                  1
                )}ml`}
              />

            </div>

            <button
              onClick={
                addToMeals
              }
              className="mt-8 bg-green-500 hover:bg-green-600 transition px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3"
            >

              <Plus size={22} />

              Add Combined Meal

            </button>

          </div>

        </div>

      )}

      {/* CUSTOM FOOD */}

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mt-10">

        <h2 className="text-3xl font-bold text-purple-400 mb-8">

          Add Custom Food

        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {[
            'name',
            'calories',
            'protein',
            'carbs',
            'fats',
            'fiber',
            'water',
            'defaultQuantity',
          ].map((field) => (

            <input
              key={field}
              type={
                field ===
                'name'
                  ? 'text'
                  : 'number'
              }
              placeholder={field}
              value={
                customFood[
                  field
                ]
              }
              onChange={(e) =>
                setCustomFood({

                  ...customFood,

                  [field]:
                    e.target
                      .value,
                })
              }
              className="bg-black/20 border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />
          ))}

          <select
            value={
              customFood.unit
            }
            onChange={(e) =>
              setCustomFood({

                ...customFood,

                unit:
                  e.target
                    .value,
              })
            }
            className="bg-black/20 border border-white/10 rounded-2xl px-5 py-4"
          >

            <option value="g">
              g
            </option>

            <option value="ml">
              ml
            </option>

            <option value="piece">
              piece
            </option>

          </select>

        </div>

        <button
          onClick={
            saveCustomFood
          }
          className="mt-8 bg-purple-500 hover:bg-purple-600 transition px-8 py-4 rounded-2xl font-bold"
        >

          Save Custom Food

        </button>

      </div>

    </div>
  )
}

function NutritionCard({
  label,
  value,
}) {

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">

      <p className="text-gray-400 mb-2">

        {label}

      </p>

      <h4 className="text-2xl font-bold text-white">

        {value}

      </h4>

    </div>
  )
}