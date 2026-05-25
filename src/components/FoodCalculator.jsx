import { useEffect, useState } from 'react'

import {
  saveMeals,
  loadMeals,
} from '../utils/storage'

import {
  Search,
  Plus,
} from 'lucide-react'

export default function FoodCalculator() {

  const [input, setInput] =
    useState('')

  const [foods, setFoods] =
    useState([])

  const [suggestions, setSuggestions] =
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

  useEffect(() => {

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

  // =========================
  // USDA SEARCH
  // =========================

  const searchUSDAFoods =
    async (query) => {

      try {

        const response =
          await fetch(

            `https://api.nal.usda.gov/fdc/v1/foods/search?query=${query}&pageSize=10&api_key=${import.meta.env.VITE_USDA_API_KEY}`
          )

        const data =
          await response.json()

        if (
          data?.foods
        ) {

          const formattedFoods =
            data.foods.map(
              (food) => {

                const nutrients =
                  food.foodNutrients || []

                const getNutrient =
                  (name) => {

                    const found =
                      nutrients.find(
                        (n) =>

                          n.nutrientName
                            ?.toLowerCase()
                            .includes(
                              name.toLowerCase()
                            )
                      )

                    return (
                      found?.value || 0
                    )
                  }

                return {

                  name:
                    food.description,

                  calories:
                    getNutrient(
                      'Energy'
                    ),

                  protein:
                    getNutrient(
                      'Protein'
                    ),

                  carbs:
                    getNutrient(
                      'Carbohydrate'
                    ),

                  fats:
                    getNutrient(
                      'Total lipid'
                    ),

                  fiber:
                    getNutrient(
                      'Fiber'
                    ),

                  water:
                    getNutrient(
                      'Water'
                    ),

                  defaultQuantity:
                    100,

                  unit: 'g',
                }
              }
            )

          setSuggestions(
            formattedFoods
          )
        }

      } catch (error) {

        console.log(error)
      }
    }

  // =========================
  // CALCULATIONS
  // =========================

  const calculateNutrition =
    (
      food,
      enteredQuantity
    ) => {

      const safeQuantity =
        Number(
          food.defaultQuantity
        ) || 1

      const factor =
        enteredQuantity /
        safeQuantity

      return {

        calories:
          (
            Number(
              food.calories
            ) * factor
          ) || 0,

        protein:
          (
            Number(
              food.protein
            ) * factor
          ) || 0,

        carbs:
          (
            Number(
              food.carbs
            ) * factor
          ) || 0,

        fats:
          (
            Number(
              food.fats
            ) * factor
          ) || 0,

        fiber:
          (
            Number(
              food.fiber
            ) * factor
          ) || 0,

        water:
          (
            Number(
              food.water
            ) * factor
          ) || 0,
      }
    }

  // =========================
  // INPUT
  // =========================

  const handleInput =
    async (value) => {

      setInput(value)

      if (
        !value.trim()
      ) {

        setSuggestions([])

        return
      }

      await searchUSDAFoods(
        value
      )
    }

  // =========================
  // SELECT FOOD
  // =========================

  const selectSuggestion =
    (
      food
    ) => {

      const nutrition =
        calculateNutrition(
          food,
          food.defaultQuantity
        )

      setFoods((prev) => [

        ...prev,

        {

          ...food,

          enteredQuantity:
            food.defaultQuantity,

          calculated:
            nutrition,
        },
      ])

      setSuggestions([])

      setInput('')
    }

  // =========================
  // TOTALS
  // =========================

  const totalCalories =
    foods.reduce(
      (
        acc,
        food
      ) =>

        acc +
        (
          food.calculated
            ?.calories || 0
        ),

      0
    )

  const totalProtein =
    foods.reduce(
      (
        acc,
        food
      ) =>

        acc +
        (
          food.calculated
            ?.protein || 0
        ),

      0
    )

  const totalCarbs =
    foods.reduce(
      (
        acc,
        food
      ) =>

        acc +
        (
          food.calculated
            ?.carbs || 0
        ),

      0
    )

  const totalFats =
    foods.reduce(
      (
        acc,
        food
      ) =>

        acc +
        (
          food.calculated
            ?.fats || 0
        ),

      0
    )

  const totalFiber =
    foods.reduce(
      (
        acc,
        food
      ) =>

        acc +
        (
          food.calculated
            ?.fiber || 0
        ),

      0
    )

  const totalWater =
    foods.reduce(
      (
        acc,
        food
      ) =>

        acc +
        (
          food.calculated
            ?.water || 0
        ),

      0
    )

  // =========================
  // ADD USDA FOODS
  // =========================

  const addToMeals = () => {

    if (!foods.length)
      return

    const existingMeals =
      loadMeals()

    const mealsToAdd =
      foods.map((food) => ({

        category:
          'Smart Food',

        name:
          food.name,

        quantity:
          `${food.enteredQuantity}${food.unit}`,

        calories:
          Number(
            food.calculated
              .calories
              .toFixed(1)
          ),

        protein:
          Number(
            food.calculated
              .protein
              .toFixed(1)
          ),

        carbs:
          Number(
            food.calculated
              .carbs
              .toFixed(1)
          ),

        fats:
          Number(
            food.calculated
              .fats
              .toFixed(1)
          ),

        fiber:
          Number(
            food.calculated
              .fiber
              .toFixed(1)
          ),

        water:
          Number(
            food.calculated
              .water
              .toFixed(1)
          ),

        createdAt:
          Date.now(),
      }))

    const updatedMeals = [

      ...mealsToAdd,

      ...existingMeals,
    ]

    saveMeals(
      updatedMeals
    )

    alert(
      'Meals added successfully'
    )

    setFoods([])

    // REFRESH WEBSITE

    window.dispatchEvent(

      new Event(
        'hunterfit-profile-updated'
      )
    )
  }

  // =========================
  // SAVE CUSTOM FOOD
  // =========================

  const saveCustomFood =
    () => {

      if (
        !customFood.name
      ) {

        alert(
          'Enter food name'
        )

        return
      }

      const newFood = {

        ...customFood,

        calories:
          Number(
            customFood.calories
          ) || 0,

        protein:
          Number(
            customFood.protein
          ) || 0,

        carbs:
          Number(
            customFood.carbs
          ) || 0,

        fats:
          Number(
            customFood.fats
          ) || 0,

        fiber:
          Number(
            customFood.fiber
          ) || 0,

        water:
          Number(
            customFood.water
          ) || 0,

        defaultQuantity:
          Number(
            customFood.defaultQuantity
          ) || 1,
      }

      // SAVE CUSTOM FOOD

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

      // SAVE TO MEALS

      const existingMeals =
        loadMeals()

      const newMeal = {

        category:
          'Custom Food',

        name:
          newFood.name,

        quantity:
          `${newFood.defaultQuantity}${newFood.unit}`,

        calories:
          newFood.calories,

        protein:
          newFood.protein,

        carbs:
          newFood.carbs,

        fats:
          newFood.fats,

        fiber:
          newFood.fiber,

        water:
          newFood.water,

        createdAt:
          Date.now(),
      }

      saveMeals([

        newMeal,

        ...existingMeals,
      ])

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

      // REFRESH WEBSITE

      window.dispatchEvent(

        new Event(
          'hunterfit-profile-updated'
        )
      )
    }

  return (

    <div className="mt-8 bg-white/5 border border-white/10 rounded-3xl p-8">

      <div className="mb-8">

        <h2 className="text-3xl font-bold text-green-400 mb-3">

          USDA Smart Food Engine

        </h2>

        <p className="text-gray-400">

          Official Nutrition Database

        </p>

      </div>

      {/* SEARCH */}

      <div className="relative">

        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5">

          <Search
            className="text-gray-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Search foods..."
            value={input}
            onChange={(e) =>
              handleInput(
                e.target.value
              )
            }
            className="bg-transparent outline-none w-full py-5"
          />

        </div>

        {/* SUGGESTIONS */}

        {suggestions.length >
          0 && (

          <div className="absolute w-full mt-3 bg-[#111] border border-white/10 rounded-2xl overflow-hidden z-50 max-h-[400px] overflow-y-auto">

            {suggestions.map(
              (
                suggestion,
                index
              ) => (

                <button
                  key={index}
                  onClick={() =>
                    selectSuggestion(
                      suggestion
                    )
                  }
                  className="w-full text-left px-5 py-4 hover:bg-white/5"
                >

                  <div className="flex items-center justify-between gap-4">

                    <span className="text-sm">

                      {
                        suggestion.name
                      }

                    </span>

                    <span className="text-gray-400 text-sm whitespace-nowrap">

                      {
                        suggestion.calories
                      }
                      cal

                    </span>

                  </div>

                </button>
              )
            )}

          </div>

        )}

      </div>

      {/* SELECTED FOODS */}

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
                      food.name
                    }

                  </h3>

                  <div className="space-y-2 text-gray-300">

                    <p>

                      Quantity:
                      {' '}
                      {
                        food.enteredQuantity
                      }
                      {
                        food.unit
                      }

                    </p>

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
                      } g

                    </p>

                    <p>

                      Carbs:
                      {' '}
                      {
                        food.calculated
                          .carbs.toFixed(
                            1
                          )
                      } g

                    </p>

                    <p>

                      Fats:
                      {' '}
                      {
                        food.calculated
                          .fats.toFixed(
                            1
                          )
                      } g

                    </p>

                  </div>

                </div>
              )
            )}

          </div>

          {/* TOTALS */}

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
                )} g`}
              />

              <NutritionCard
                label="Carbs"
                value={`${totalCarbs.toFixed(
                  1
                )} g`}
              />

              <NutritionCard
                label="Fats"
                value={`${totalFats.toFixed(
                  1
                )} g`}
              />

              <NutritionCard
                label="Fiber"
                value={`${totalFiber.toFixed(
                  1
                )} g`}
              />

              <NutritionCard
                label="Water"
                value={`${totalWater.toFixed(
                  1
                )} ml`}
              />

            </div>

            <button
              onClick={
                addToMeals
              }
              className="mt-8 bg-green-500 hover:bg-green-600 transition px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3"
            >

              <Plus size={22} />

              Add Meals

            </button>

          </div>

        </div>

      )}

      {/* CUSTOM FOOD */}

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mt-10">

        <h2 className="text-3xl font-bold text-purple-400 mb-8">

          Manual Custom Food

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