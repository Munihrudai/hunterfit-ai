const hunterLevels = []

// =========================================
// RANK SYSTEM
// =========================================

function getRank(level) {

  if (level <= 20)
    return 'E-Rank'

  if (level <= 40)
    return 'D-Rank'

  if (level <= 60)
    return 'C-Rank'

  if (level <= 75)
    return 'B-Rank'

  if (level <= 90)
    return 'A-Rank'

  if (level <= 100)
    return 'S-Rank'

  return 'S+ Rank'
}

// =========================================
// TITLE SYSTEM
// =========================================

function getTitle(level) {

  if (level <= 20)
    return 'Foundation Hunter'

  if (level <= 40)
    return 'Strength Hunter'

  if (level <= 60)
    return 'Athletic Hunter'

  if (level <= 75)
    return 'Advanced Hunter'

  if (level <= 90)
    return 'Elite Hunter'

  if (level <= 100)
    return 'National Hunter'

  return 'Shadow Monarch'
}

// =========================================
// ARC SYSTEM
// =========================================

function getArc(level) {

  if (level <= 20)
    return 'Foundation Arc'

  if (level <= 40)
    return 'Strength Development Arc'

  if (level <= 60)
    return 'Athletic Transformation Arc'

  if (level <= 75)
    return 'Advanced Strength Arc'

  if (level <= 90)
    return 'Elite Athlete Arc'

  if (level <= 100)
    return 'Monarch Arc'

  return 'Monarch Ascension Arc'
}

// =========================================
// XP SYSTEM
// =========================================

function getXP(level) {

  if (level <= 20)
    return 50

  if (level <= 40)
    return 80

  if (level <= 60)
    return 120

  if (level <= 75)
    return 180

  if (level <= 90)
    return 250

  if (level <= 100)
    return 400

  return 1000
}

// =========================================
// GOAL MAPPING
// =========================================

function getGoals(level) {

  // =====================================
  // E-RANK EXACT LEVELS
  // =====================================

  const exactLevels = {

    1: [
      'Wall Push-Up × 10',
      '20 sec plank',
    ],

    2: [
      'Incline Push-Up × 10',
      'Bodyweight Squat × 15',
    ],

    3: [
      'Incline Push-Up × 15',
      'Dead Hang × 15 sec',
    ],

    4: [
      'Knee Push-Up × 5',
      'Walking Lunges × 10',
    ],

    5: [
      'Knee Push-Up × 10',
      'Plank × 30 sec',
    ],

    6: [
      'Assisted Pull-Up × 2',
      'Mountain Climbers × 20',
    ],

    7: [
      'Incline Push-Up × 20',
      'Squats × 20',
    ],

    8: [
      'Bench Dips × 10',
      'Hollow Hold × 20 sec',
    ],

    9: [
      'Knee Push-Up × 15',
      'Dead Hang × 30 sec',
    ],

    10: [
      'First Full Push-Up',
    ],

    11: [
      'Full Push-Up × 3',
      'Bodyweight Squat × 25',
    ],

    12: [
      'Full Push-Up × 5',
      'Plank × 45 sec',
    ],

    13: [
      'Assisted Pull-Up × 5',
      'Leg Raises × 8',
    ],

    14: [
      'Push-Up × 8',
      'Bulgarian Split Squat × 10',
    ],

    15: [
      'First Chin-Up',
    ],

    16: [
      'Push-Up × 10',
      'Chin-Up × 2',
    ],

    17: [
      'Pike Push-Up × 5',
      'Pull-Up Negative × 5',
    ],

    18: [
      'Push-Up × 12',
      'Hanging Knee Raises × 10',
    ],

    19: [
      'Pull-Up × 1',
      'Dips × 3',
    ],

    20: [
      '15 Push-Ups',
      '3 Pull-Ups',
      '10 Dips',
      '1 min plank',
    ],
  }

  if (exactLevels[level]) {
    return exactLevels[level]
  }

  // =====================================
  // D-RANK
  // =====================================

  if (level >= 21 && level <= 25) {

    return [

      'Push-Ups → 20 reps',

      'Pull-Ups → 5 reps',

      'Dips → 15 reps',

      'Pike Push-Ups → 10 reps',

      'Squats → 40 reps',
    ]
  }

  if (level >= 26 && level <= 30) {

    return [

      'Diamond Push-Ups',

      'Archer Push-Up progression',

      'Australian Rows',

      'Hanging Leg Raises',

      'Jump Squats',
    ]
  }

  if (level >= 31 && level <= 35) {

    return [

      'Pull-Ups × 8',

      'Chin-Ups × 10',

      'Dips × 20',

      'Decline Push-Ups × 15',
    ]
  }

  if (level >= 36 && level <= 39) {

    return [

      'Explosive Push-Ups',

      'L-Sit Tuck Hold',

      'Wall Handstand Hold',

      'Pistol Squat progression',
    ]
  }

  if (level === 40) {

    return [

      '25 Push-Ups',

      '8 Pull-Ups',

      '20 Dips',

      '10 sec L-Sit',

      '30 sec wall handstand',
    ]
  }

  // =====================================
  // C-RANK
  // =====================================

  if (level >= 41 && level <= 45) {

    return [

      'Archer Push-Ups',

      'Archer Rows',

      'Straight Bar Dips',

      'Hanging Leg Raises',

      'Wall Walks',
    ]
  }

  if (level >= 46 && level <= 50) {

    return [

      'Pull-Ups × 12',

      'Push-Ups × 35',

      'Dips × 25',

      'Pike Push-Ups × 20',
    ]
  }

  if (level >= 51 && level <= 55) {

    return [

      'Handstand practice',

      'Tuck Front Lever',

      'L-Sit Hold',

      'Explosive Pull-Ups',

      'Shrimp Squats',
    ]
  }

  if (level >= 56 && level <= 59) {

    return [

      '60 sec L-Sit practice',

      '10 explosive pull-ups',

      '1 wall handstand push-up progression',
    ]
  }

  if (level === 60) {

    return [

      '40 Push-Ups',

      '12 Pull-Ups',

      '30 Dips',

      '20 sec L-Sit',

      'Tuck Front Lever Hold',
    ]
  }

  // =====================================
  // B-RANK
  // =====================================

  if (level >= 61 && level <= 65) {

    return [

      'Muscle-Up progression',

      'Advanced tuck front lever',

      'Handstand kick-up',

      'Korean Dips',
    ]
  }

  if (level >= 66 && level <= 70) {

    return [

      'Pull-Ups × 15',

      'Dips × 40',

      'Handstand Hold × 20 sec',

      'Muscle-Up transition drills',
    ]
  }

  if (level >= 71 && level <= 74) {

    return [

      'Front Lever progression',

      'Back Lever progression',

      'Dragon Flag',

      'Wall Handstand Push-Up',
    ]
  }

  if (level === 75) {

    return [

      '50 Push-Ups',

      '15 Pull-Ups',

      '40 Dips',

      '5 Handstand Push-Ups',

      'Tuck Front Lever Hold 10 sec',
    ]
  }

  // =====================================
  // A-RANK
  // =====================================

  if (level >= 76 && level <= 80) {

    return [

      'Muscle-Up',

      'Freestanding Handstand',

      'Advanced Front Lever',

      'Human Flag progression',
    ]
  }

  if (level >= 81 && level <= 85) {

    return [

      'Muscle-Up × 3',

      'Handstand Hold × 30 sec',

      'Dragon Flag × 5',

      'Front Lever progression holds',
    ]
  }

  if (level >= 86 && level <= 89) {

    return [

      'One Arm Push-Up progression',

      'Typewriter Pull-Ups',

      'Handstand Push-Up',

      'Human Flag progression',
    ]
  }

  if (level === 90) {

    return [

      'Muscle-Up × 5',

      '20 Pull-Ups',

      'Handstand Push-Up × 5',

      'Front Lever Hold',

      'Human Flag progression hold',
    ]
  }

  // =====================================
  // S-RANK
  // =====================================

  if (level >= 91 && level <= 94) {

    return [

      'Full Front Lever',

      'Full Back Lever',

      'Human Flag',

      'Advanced Handstand Push-Up',
    ]
  }

  if (level >= 95 && level <= 97) {

    return [

      'One Arm Pull-Up progression',

      'One Arm Push-Up',

      'Straddle Planche progression',
    ]
  }

  if (level >= 98 && level <= 99) {

    return [

      'Multiple Muscle-Ups',

      'Full Human Flag Hold',

      'Freestanding Handstand mastery',

      'Advanced freestyle combinations',
    ]
  }

  if (level === 100) {

    return [

      '25+ Pull-Ups',

      '75+ Push-Ups',

      '50+ Dips',

      'Muscle-Ups',

      'Full Front Lever',

      'Full Human Flag',

      'Handstand Push-Ups',

      'Advanced body control mastery',
    ]
  }

  // =====================================
  // MONARCH
  // =====================================

  return [

    'Full Planche',

    'Straddle Planche Push-Ups',

    '90 Degree Push-Up',

    'One Arm Handstand Push-Up',

    'Maltese progression',

    'Impossible Dips',
  ]
}

// =========================================
// GENERATE LEVELS
// =========================================

for (let level = 1; level <= 100; level++) {

  hunterLevels.push({

    level,

    rank: getRank(level),

    title: getTitle(level),

    arc: getArc(level),

    xpReward: getXP(level),

    goals: getGoals(level),
  })
}

// =========================================
// MONARCH LEVEL
// =========================================

hunterLevels.push({

  level: 101,

  rank: 'S+ Rank',

  title: 'Shadow Monarch',

  arc: 'Monarch Ascension Arc',

  xpReward: 5000,

  goals: [

    '30+ strict Pull-Ups',

    '100 Push-Ups',

    '60+ Dips',

    'Full Front Lever',

    'Human Flag Hold',

    'Freestanding Handstand',

    'Handstand Push-Ups',

    'Muscle-Ups × 10',

    'One Arm Pull-Up progression',

    'Advanced endurance & mobility',
  ],
})

export default hunterLevels