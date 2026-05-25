const foodDatabase = [

  // =====================================
  // RICE & GRAINS
  // =====================================

  {
    name: 'rice',
    calories: 130,
    protein: 2.7,
    carbs: 28,
    fats: 0.3,
    fiber: 0.4,
    water: 68,
    quantity: '100g cooked',
  },

  {
    name: 'brown rice',
    calories: 111,
    protein: 2.6,
    carbs: 23,
    fats: 0.9,
    fiber: 1.8,
    water: 70,
    quantity: '100g cooked',
  },

  {
    name: 'roti',
    calories: 120,
    protein: 3.5,
    carbs: 18,
    fats: 3,
    fiber: 2.5,
    water: 35,
    quantity: '1 medium',
  },

  {
    name: 'oats',
    calories: 389,
    protein: 16.9,
    carbs: 66,
    fats: 6.9,
    fiber: 10.6,
    water: 8,
    quantity: '100g',
  },

  // =====================================
  // PROTEIN SOURCES
  // =====================================

  {
    name: 'egg',
    calories: 78,
    protein: 6.3,
    carbs: 0.6,
    fats: 5.3,
    fiber: 0,
    water: 76,
    quantity: '1 large egg',
  },

  {
    name: 'chicken breast',
    calories: 165,
    protein: 31,
    carbs: 0,
    fats: 3.6,
    fiber: 0,
    water: 65,
    quantity: '100g cooked',
  },

  {
    name: 'fish',
    calories: 206,
    protein: 22,
    carbs: 0,
    fats: 12,
    fiber: 0,
    water: 64,
    quantity: '100g cooked',
  },

  {
    name: 'paneer',
    calories: 265,
    protein: 18,
    carbs: 3.4,
    fats: 20,
    fiber: 0,
    water: 55,
    quantity: '100g',
  },

  {
    name: 'tofu',
    calories: 144,
    protein: 17,
    carbs: 3,
    fats: 9,
    fiber: 2,
    water: 70,
    quantity: '100g',
  },

  {
    name: 'dal',
    calories: 116,
    protein: 9,
    carbs: 20,
    fats: 0.4,
    fiber: 8,
    water: 70,
    quantity: '100g cooked',
  },

  // =====================================
  // MILK PRODUCTS
  // =====================================

  {
    name: 'milk',
    calories: 61,
    protein: 3.2,
    carbs: 4.8,
    fats: 3.3,
    fiber: 0,
    water: 88,
    quantity: '100ml',
  },

  {
    name: 'curd',
    calories: 98,
    protein: 11,
    carbs: 3.4,
    fats: 4.3,
    fiber: 0,
    water: 81,
    quantity: '100g',
  },

  {
    name: 'buttermilk',
    calories: 40,
    protein: 3.3,
    carbs: 4.8,
    fats: 0.9,
    fiber: 0,
    water: 90,
    quantity: '100ml',
  },

  {
    name: 'cheese',
    calories: 402,
    protein: 25,
    carbs: 1.3,
    fats: 33,
    fiber: 0,
    water: 37,
    quantity: '100g',
  },

  // =====================================
  // DRY FRUITS & NUTS
  // =====================================

  {
    name: 'almonds',
    calories: 579,
    protein: 21,
    carbs: 22,
    fats: 50,
    fiber: 12,
    water: 4,
    quantity: '100g',
  },

  {
    name: 'cashews',
    calories: 553,
    protein: 18,
    carbs: 30,
    fats: 44,
    fiber: 3.3,
    water: 5,
    quantity: '100g',
  },

  {
    name: 'walnuts',
    calories: 654,
    protein: 15,
    carbs: 14,
    fats: 65,
    fiber: 7,
    water: 4,
    quantity: '100g',
  },

  {
    name: 'pistachios',
    calories: 560,
    protein: 20,
    carbs: 28,
    fats: 45,
    fiber: 10,
    water: 4,
    quantity: '100g',
  },

  {
    name: 'peanuts',
    calories: 567,
    protein: 26,
    carbs: 16,
    fats: 49,
    fiber: 8,
    water: 7,
    quantity: '100g',
  },

  {
    name: 'raisins',
    calories: 299,
    protein: 3.1,
    carbs: 79,
    fats: 0.5,
    fiber: 3.7,
    water: 15,
    quantity: '100g',
  },

  {
    name: 'dates',
    calories: 282,
    protein: 2.5,
    carbs: 75,
    fats: 0.4,
    fiber: 8,
    water: 21,
    quantity: '100g',
  },

  // =====================================
  // SEEDS
  // =====================================

  {
    name: 'chia seeds',
    calories: 486,
    protein: 17,
    carbs: 42,
    fats: 31,
    fiber: 34,
    water: 6,
    quantity: '100g',
  },

  {
    name: 'flax seeds',
    calories: 534,
    protein: 18,
    carbs: 29,
    fats: 42,
    fiber: 27,
    water: 7,
    quantity: '100g',
  },

  {
    name: 'pumpkin seeds',
    calories: 559,
    protein: 30,
    carbs: 11,
    fats: 49,
    fiber: 6,
    water: 5,
    quantity: '100g',
  },

  {
    name: 'sunflower seeds',
    calories: 584,
    protein: 21,
    carbs: 20,
    fats: 51,
    fiber: 9,
    water: 5,
    quantity: '100g',
  },

  // =====================================
  // CURRY INGREDIENTS
  // =====================================

  {
    name: 'onion',
    calories: 40,
    protein: 1.1,
    carbs: 9.3,
    fats: 0.1,
    fiber: 1.7,
    water: 89,
    quantity: '100g',
  },

  {
    name: 'tomato',
    calories: 18,
    protein: 0.9,
    carbs: 3.9,
    fats: 0.2,
    fiber: 1.2,
    water: 95,
    quantity: '100g',
  },

  {
    name: 'potato',
    calories: 77,
    protein: 2,
    carbs: 17,
    fats: 0.1,
    fiber: 2.2,
    water: 79,
    quantity: '100g',
  },

  {
    name: 'carrot',
    calories: 41,
    protein: 0.9,
    carbs: 10,
    fats: 0.2,
    fiber: 2.8,
    water: 88,
    quantity: '100g',
  },

  {
    name: 'green chilli',
    calories: 40,
    protein: 2,
    carbs: 9,
    fats: 0.2,
    fiber: 1.5,
    water: 88,
    quantity: '100g',
  },

  {
    name: 'ginger',
    calories: 80,
    protein: 1.8,
    carbs: 18,
    fats: 0.8,
    fiber: 2,
    water: 79,
    quantity: '100g',
  },

  {
    name: 'garlic',
    calories: 149,
    protein: 6.4,
    carbs: 33,
    fats: 0.5,
    fiber: 2.1,
    water: 59,
    quantity: '100g',
  },

  {
    name: 'coriander leaves',
    calories: 23,
    protein: 2.1,
    carbs: 3.7,
    fats: 0.5,
    fiber: 2.8,
    water: 92,
    quantity: '100g',
  },

  {
    name: 'curry leaves',
    calories: 108,
    protein: 6.1,
    carbs: 18,
    fats: 1,
    fiber: 6,
    water: 63,
    quantity: '100g',
  },

  // =====================================
  // VEGETABLES
  // =====================================

  {
    name: 'broccoli',
    calories: 34,
    protein: 2.8,
    carbs: 7,
    fats: 0.4,
    fiber: 2.6,
    water: 89,
    quantity: '100g',
  },

  {
    name: 'spinach',
    calories: 23,
    protein: 2.9,
    carbs: 3.6,
    fats: 0.4,
    fiber: 2.2,
    water: 91,
    quantity: '100g',
  },

  {
    name: 'cabbage',
    calories: 25,
    protein: 1.3,
    carbs: 6,
    fats: 0.1,
    fiber: 2.5,
    water: 92,
    quantity: '100g',
  },

  // =====================================
  // FRUITS
  // =====================================

  {
    name: 'banana',
    calories: 89,
    protein: 1.1,
    carbs: 23,
    fats: 0.3,
    fiber: 2.6,
    water: 75,
    quantity: '100g',
  },

  {
    name: 'apple',
    calories: 52,
    protein: 0.3,
    carbs: 14,
    fats: 0.2,
    fiber: 2.4,
    water: 86,
    quantity: '100g',
  },

  {
    name: 'orange',
    calories: 47,
    protein: 0.9,
    carbs: 12,
    fats: 0.1,
    fiber: 2.4,
    water: 87,
    quantity: '100g',
  },

  {
    name: 'mango',
    calories: 60,
    protein: 0.8,
    carbs: 15,
    fats: 0.4,
    fiber: 1.6,
    water: 83,
    quantity: '100g',
  },

  // =====================================
  // DRINKS
  // =====================================

  {
    name: 'horlicks',
    calories: 380,
    protein: 8,
    carbs: 80,
    fats: 3,
    fiber: 1,
    water: 3,
    quantity: '100g powder',
  },

  {
    name: 'coffee',
    calories: 2,
    protein: 0.3,
    carbs: 0,
    fats: 0,
    fiber: 0,
    water: 99,
    quantity: '1 cup',
  },

  {
    name: 'tea',
    calories: 2,
    protein: 0,
    carbs: 0,
    fats: 0,
    fiber: 0,
    water: 99,
    quantity: '1 cup',
  },

]

export default foodDatabase