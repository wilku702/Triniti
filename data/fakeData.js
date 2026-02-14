/**
 * Centralized fake data for the Triniti app.
 * All mock data lives here so both Staff and Family views share a single source of truth.
 */

// ---------------------------------------------------------------------------
// PATIENTS — used by Dashboard (and as a fallback when Firestore is unavailable)
// ---------------------------------------------------------------------------
export const PATIENTS = [
  {
    name: 'Margaret Thompson',
    image: 'https://images.pexels.com/photos/12644996/pexels-photo-12644996.jpeg?auto=compress&cs=tinysrgb&w=400',
    age: '82',
    room: '104',
    notes: 'Enjoys gardening and reading. Allergic to penicillin.',
    emergencyContact: 'Susan Thompson — (512) 555-0147'
  },
  {
    name: 'Robert Chen',
    image: 'https://images.pexels.com/photos/10223585/pexels-photo-10223585.jpeg?auto=compress&cs=tinysrgb&w=400',
    age: '78',
    room: '112',
    notes: 'Diabetes type 2. Loves chess and classical music.',
    emergencyContact: 'David Chen — (512) 555-0233'
  },
  {
    name: 'Dorothy Williams',
    image: 'https://images.pexels.com/photos/5990259/pexels-photo-5990259.jpeg?auto=compress&cs=tinysrgb&w=400',
    age: '85',
    room: '108',
    notes: 'Mild hearing loss (left ear). Former school teacher. Enjoys puzzles.',
    emergencyContact: 'James Williams — (512) 555-0389'
  },
  {
    name: 'Harold Martinez',
    image: 'https://images.pexels.com/photos/3831569/pexels-photo-3831569.jpeg?auto=compress&cs=tinysrgb&w=400',
    age: '76',
    room: '115',
    notes: 'Uses a walker. Enjoys watching baseball and painting.',
    emergencyContact: 'Maria Martinez — (512) 555-0412'
  },
  {
    name: 'Eleanor Davis',
    image: 'https://images.pexels.com/photos/5333824/pexels-photo-5333824.jpeg?auto=compress&cs=tinysrgb&w=400',
    age: '88',
    room: '102',
    notes: 'Vegetarian diet. Loves birdwatching and knitting.',
    emergencyContact: 'Patricia Davis — (512) 555-0578'
  },
  {
    name: 'James Wilson',
    image: 'https://images.pexels.com/photos/3831612/pexels-photo-3831612.jpeg?auto=compress&cs=tinysrgb&w=400',
    age: '80',
    room: '120',
    notes: 'Former engineer. Enjoys crossword puzzles and history documentaries.',
    emergencyContact: 'Karen Wilson — (512) 555-0621'
  },
  {
    name: 'Betty Johnson',
    image: 'https://images.pexels.com/photos/2790438/pexels-photo-2790438.jpeg?auto=compress&cs=tinysrgb&w=400',
    age: '74',
    room: '106',
    notes: 'Gluten-free diet. Active in group activities. Plays piano.',
    emergencyContact: 'Michael Johnson — (512) 555-0755'
  }
];

// ---------------------------------------------------------------------------
// ACTIVITY IMAGE URLS — reusable across patients
// ---------------------------------------------------------------------------
const IMG = {
  reading: { uri: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=400' },
  birthday: { uri: 'https://images.pexels.com/photos/18459203/pexels-photo-18459203/free-photo-of-caregiver-serving-food-for-elderly-people-in-retirement-house.jpeg?auto=compress&cs=tinysrgb&w=400' },
  breakfast: { uri: 'https://images.pexels.com/photos/18429461/pexels-photo-18429461.jpeg?auto=compress&cs=tinysrgb&w=400' },
  walking: { uri: 'https://images.pexels.com/photos/7551667/pexels-photo-7551667.jpeg?auto=compress&cs=tinysrgb&w=400' },
  music: { uri: 'https://images.pexels.com/photos/7551616/pexels-photo-7551616.jpeg?auto=compress&cs=tinysrgb&w=400' },
  crafts: { uri: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=400' },
  garden: { uri: 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=400' },
  yoga: { uri: 'https://images.pexels.com/photos/8436490/pexels-photo-8436490.jpeg?auto=compress&cs=tinysrgb&w=400' },
  games: { uri: 'https://images.pexels.com/photos/4057758/pexels-photo-4057758.jpeg?auto=compress&cs=tinysrgb&w=400' },
  painting: { uri: 'https://images.pexels.com/photos/3094218/pexels-photo-3094218.jpeg?auto=compress&cs=tinysrgb&w=400' },
  movie: { uri: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400' },
  therapy: { uri: 'https://images.pexels.com/photos/7551668/pexels-photo-7551668.jpeg?auto=compress&cs=tinysrgb&w=400' },
  lunch: { uri: 'https://images.pexels.com/photos/5638732/pexels-photo-5638732.jpeg?auto=compress&cs=tinysrgb&w=400' },
  bingo: { uri: 'https://images.pexels.com/photos/5935232/pexels-photo-5935232.jpeg?auto=compress&cs=tinysrgb&w=400' },
  karaoke: require('../assets/activity/karaoke.png'),
  defaultImg: require('../assets/activity/breakfast.jpg')
};

// ---------------------------------------------------------------------------
// Helper — generate date keys the same way PatientProfile uses them
// ---------------------------------------------------------------------------
const dateKey = (year, month, day) =>
  new Date(year, month, day).toString();

// ---------------------------------------------------------------------------
// ACTIVITIES — keyed by patient name → { [dateKey]: Activity[] }
// Two weeks of data centred around February 1–14, 2026
// ---------------------------------------------------------------------------
export const ACTIVITIES = {
  'Margaret Thompson': {
    [dateKey(2026, 1, 14)]: [
      { id: 101, title: 'Morning Yoga', time: '7:00 AM - 7:45 AM', image: IMG.yoga },
      { id: 102, title: 'Garden Club', time: '10:00 AM - 11:30 AM', image: IMG.garden },
      { id: 103, title: 'Movie Afternoon', time: '2:00 PM - 4:00 PM', image: IMG.movie }
    ],
    [dateKey(2026, 1, 13)]: [
      { id: 104, title: 'Reading Circle', time: '9:30 AM - 10:30 AM', image: IMG.reading },
      { id: 105, title: 'Watercolor Painting', time: '1:00 PM - 2:30 PM', image: IMG.painting },
      { id: 106, title: 'Karaoke Night', time: '7:00 PM - 9:00 PM', image: IMG.karaoke }
    ],
    [dateKey(2026, 1, 12)]: [
      { id: 107, title: 'Breakfast Social', time: '8:00 AM - 9:00 AM', image: IMG.breakfast },
      { id: 108, title: 'Physical Therapy', time: '11:00 AM - 12:00 PM', image: IMG.therapy },
      { id: 109, title: 'Board Games', time: '3:00 PM - 4:30 PM', image: IMG.games }
    ],
    [dateKey(2026, 1, 11)]: [
      { id: 110, title: 'Morning Walk', time: '7:30 AM - 8:15 AM', image: IMG.walking },
      { id: 111, title: 'Arts & Crafts', time: '10:00 AM - 11:30 AM', image: IMG.crafts }
    ],
    [dateKey(2026, 1, 10)]: [
      { id: 112, title: 'Music Therapy', time: '9:00 AM - 10:00 AM', image: IMG.music },
      { id: 113, title: 'Lunch Outing', time: '12:00 PM - 1:30 PM', image: IMG.lunch },
      { id: 114, title: 'Bingo Night', time: '6:30 PM - 8:00 PM', image: IMG.bingo }
    ],
    [dateKey(2026, 1, 9)]: [
      { id: 115, title: 'Morning Yoga', time: '7:00 AM - 7:45 AM', image: IMG.yoga },
      { id: 116, title: 'Garden Club', time: '10:00 AM - 11:30 AM', image: IMG.garden }
    ],
    [dateKey(2026, 1, 8)]: [
      { id: 117, title: 'Reading Circle', time: '9:30 AM - 10:30 AM', image: IMG.reading },
      { id: 118, title: 'Movie Afternoon', time: '2:00 PM - 4:00 PM', image: IMG.movie }
    ],
    [dateKey(2026, 1, 7)]: [
      { id: 119, title: 'Breakfast Social', time: '8:00 AM - 9:00 AM', image: IMG.breakfast },
      { id: 120, title: "Harold's Birthday Party", time: '1:00 PM - 3:00 PM', image: IMG.birthday }
    ],
    [dateKey(2026, 1, 6)]: [
      { id: 121, title: 'Physical Therapy', time: '11:00 AM - 12:00 PM', image: IMG.therapy },
      { id: 122, title: 'Watercolor Painting', time: '2:00 PM - 3:30 PM', image: IMG.painting }
    ],
    [dateKey(2026, 1, 5)]: [
      { id: 123, title: 'Morning Walk', time: '7:30 AM - 8:15 AM', image: IMG.walking },
      { id: 124, title: 'Arts & Crafts', time: '10:00 AM - 11:30 AM', image: IMG.crafts },
      { id: 125, title: 'Karaoke Night', time: '7:00 PM - 9:00 PM', image: IMG.karaoke }
    ],
    [dateKey(2026, 1, 4)]: [
      { id: 126, title: 'Reading Books', time: '9:30 AM - 10:00 AM', image: IMG.reading },
      { id: 127, title: "Martha's Birthday Party", time: '1:00 PM - 3:00 PM', image: IMG.birthday },
      { id: 128, title: 'Karaoke Night', time: '8:00 PM - 10:00 PM', image: IMG.karaoke }
    ],
    [dateKey(2026, 1, 3)]: [
      { id: 129, title: 'Eating Breakfast', time: '8:00 AM - 9:00 AM', image: IMG.breakfast },
      { id: 130, title: "An's Birthday Party", time: '2:00 PM - 4:00 PM', image: IMG.birthday }
    ],
    [dateKey(2026, 1, 2)]: [
      { id: 131, title: 'Music Therapy', time: '9:00 AM - 10:00 AM', image: IMG.music },
      { id: 132, title: 'Board Games', time: '3:00 PM - 4:30 PM', image: IMG.games }
    ],
    [dateKey(2026, 1, 1)]: [
      { id: 133, title: 'Morning Yoga', time: '7:00 AM - 7:45 AM', image: IMG.yoga },
      { id: 134, title: 'Bingo Night', time: '6:30 PM - 8:00 PM', image: IMG.bingo }
    ]
  },

  'Robert Chen': {
    [dateKey(2026, 1, 14)]: [
      { id: 201, title: 'Chess Club', time: '9:00 AM - 10:30 AM', image: IMG.games },
      { id: 202, title: 'Physical Therapy', time: '11:00 AM - 12:00 PM', image: IMG.therapy },
      { id: 203, title: 'Classical Music Hour', time: '3:00 PM - 4:00 PM', image: IMG.music }
    ],
    [dateKey(2026, 1, 13)]: [
      { id: 204, title: 'Morning Walk', time: '7:30 AM - 8:15 AM', image: IMG.walking },
      { id: 205, title: 'Reading Circle', time: '10:00 AM - 11:00 AM', image: IMG.reading },
      { id: 206, title: 'Movie Afternoon', time: '2:00 PM - 4:00 PM', image: IMG.movie }
    ],
    [dateKey(2026, 1, 12)]: [
      { id: 207, title: 'Breakfast Social', time: '8:00 AM - 9:00 AM', image: IMG.breakfast },
      { id: 208, title: 'Board Games', time: '1:00 PM - 2:30 PM', image: IMG.games }
    ],
    [dateKey(2026, 1, 11)]: [
      { id: 209, title: 'Morning Yoga', time: '7:00 AM - 7:45 AM', image: IMG.yoga },
      { id: 210, title: 'Watercolor Painting', time: '10:00 AM - 11:30 AM', image: IMG.painting },
      { id: 211, title: 'Bingo Night', time: '6:30 PM - 8:00 PM', image: IMG.bingo }
    ],
    [dateKey(2026, 1, 10)]: [
      { id: 212, title: 'Physical Therapy', time: '11:00 AM - 12:00 PM', image: IMG.therapy },
      { id: 213, title: 'Chess Club', time: '2:00 PM - 3:30 PM', image: IMG.games },
      { id: 214, title: 'Karaoke Night', time: '7:00 PM - 9:00 PM', image: IMG.karaoke }
    ],
    [dateKey(2026, 1, 9)]: [
      { id: 215, title: 'Breakfast Social', time: '8:00 AM - 9:00 AM', image: IMG.breakfast },
      { id: 216, title: 'Garden Club', time: '10:00 AM - 11:30 AM', image: IMG.garden }
    ],
    [dateKey(2026, 1, 8)]: [
      { id: 217, title: 'Morning Walk', time: '7:30 AM - 8:15 AM', image: IMG.walking },
      { id: 218, title: 'Classical Music Hour', time: '3:00 PM - 4:00 PM', image: IMG.music }
    ],
    [dateKey(2026, 1, 7)]: [
      { id: 219, title: 'Chess Club', time: '9:00 AM - 10:30 AM', image: IMG.games },
      { id: 220, title: "Harold's Birthday Party", time: '1:00 PM - 3:00 PM', image: IMG.birthday }
    ],
    [dateKey(2026, 1, 6)]: [
      { id: 221, title: 'Arts & Crafts', time: '10:00 AM - 11:30 AM', image: IMG.crafts },
      { id: 222, title: 'Movie Afternoon', time: '2:00 PM - 4:00 PM', image: IMG.movie }
    ],
    [dateKey(2026, 1, 5)]: [
      { id: 223, title: 'Reading Circle', time: '9:30 AM - 10:30 AM', image: IMG.reading },
      { id: 224, title: 'Physical Therapy', time: '11:00 AM - 12:00 PM', image: IMG.therapy },
      { id: 225, title: 'Board Games', time: '3:00 PM - 4:30 PM', image: IMG.games }
    ],
    [dateKey(2026, 1, 4)]: [
      { id: 226, title: 'Morning Yoga', time: '7:00 AM - 7:45 AM', image: IMG.yoga },
      { id: 227, title: "Martha's Birthday Party", time: '1:00 PM - 3:00 PM', image: IMG.birthday }
    ],
    [dateKey(2026, 1, 3)]: [
      { id: 228, title: 'Breakfast Social', time: '8:00 AM - 9:00 AM', image: IMG.breakfast },
      { id: 229, title: 'Bingo Night', time: '6:30 PM - 8:00 PM', image: IMG.bingo }
    ],
    [dateKey(2026, 1, 2)]: [
      { id: 230, title: 'Chess Club', time: '2:00 PM - 3:30 PM', image: IMG.games },
      { id: 231, title: 'Karaoke Night', time: '7:00 PM - 9:00 PM', image: IMG.karaoke }
    ],
    [dateKey(2026, 1, 1)]: [
      { id: 232, title: 'Morning Walk', time: '7:30 AM - 8:15 AM', image: IMG.walking },
      { id: 233, title: 'Classical Music Hour', time: '3:00 PM - 4:00 PM', image: IMG.music }
    ]
  },

  'Dorothy Williams': {
    [dateKey(2026, 1, 14)]: [
      { id: 301, title: 'Puzzle Hour', time: '9:00 AM - 10:00 AM', image: IMG.games },
      { id: 302, title: 'Arts & Crafts', time: '11:00 AM - 12:30 PM', image: IMG.crafts },
      { id: 303, title: 'Afternoon Tea', time: '3:00 PM - 3:45 PM', image: IMG.lunch }
    ],
    [dateKey(2026, 1, 13)]: [
      { id: 304, title: 'Morning Walk', time: '8:00 AM - 8:45 AM', image: IMG.walking },
      { id: 305, title: 'Reading Circle', time: '10:00 AM - 11:00 AM', image: IMG.reading }
    ],
    [dateKey(2026, 1, 12)]: [
      { id: 306, title: 'Breakfast Social', time: '8:00 AM - 9:00 AM', image: IMG.breakfast },
      { id: 307, title: 'Watercolor Painting', time: '1:00 PM - 2:30 PM', image: IMG.painting },
      { id: 308, title: 'Movie Afternoon', time: '3:00 PM - 5:00 PM', image: IMG.movie }
    ],
    [dateKey(2026, 1, 11)]: [
      { id: 309, title: 'Music Therapy', time: '9:00 AM - 10:00 AM', image: IMG.music },
      { id: 310, title: 'Board Games', time: '2:00 PM - 3:30 PM', image: IMG.games }
    ],
    [dateKey(2026, 1, 10)]: [
      { id: 311, title: 'Morning Yoga', time: '7:00 AM - 7:45 AM', image: IMG.yoga },
      { id: 312, title: 'Puzzle Hour', time: '10:00 AM - 11:00 AM', image: IMG.games },
      { id: 313, title: 'Bingo Night', time: '6:30 PM - 8:00 PM', image: IMG.bingo }
    ],
    [dateKey(2026, 1, 9)]: [
      { id: 314, title: 'Physical Therapy', time: '11:00 AM - 12:00 PM', image: IMG.therapy },
      { id: 315, title: 'Garden Club', time: '2:00 PM - 3:30 PM', image: IMG.garden }
    ],
    [dateKey(2026, 1, 8)]: [
      { id: 316, title: 'Breakfast Social', time: '8:00 AM - 9:00 AM', image: IMG.breakfast },
      { id: 317, title: 'Arts & Crafts', time: '1:00 PM - 2:30 PM', image: IMG.crafts }
    ],
    [dateKey(2026, 1, 7)]: [
      { id: 318, title: 'Reading Circle', time: '9:30 AM - 10:30 AM', image: IMG.reading },
      { id: 319, title: "Harold's Birthday Party", time: '1:00 PM - 3:00 PM', image: IMG.birthday },
      { id: 320, title: 'Karaoke Night', time: '7:00 PM - 9:00 PM', image: IMG.karaoke }
    ],
    [dateKey(2026, 1, 6)]: [
      { id: 321, title: 'Puzzle Hour', time: '9:00 AM - 10:00 AM', image: IMG.games },
      { id: 322, title: 'Movie Afternoon', time: '2:00 PM - 4:00 PM', image: IMG.movie }
    ],
    [dateKey(2026, 1, 5)]: [
      { id: 323, title: 'Morning Walk', time: '8:00 AM - 8:45 AM', image: IMG.walking },
      { id: 324, title: 'Watercolor Painting', time: '1:00 PM - 2:30 PM', image: IMG.painting }
    ],
    [dateKey(2026, 1, 4)]: [
      { id: 325, title: 'Music Therapy', time: '9:00 AM - 10:00 AM', image: IMG.music },
      { id: 326, title: "Martha's Birthday Party", time: '1:00 PM - 3:00 PM', image: IMG.birthday }
    ],
    [dateKey(2026, 1, 3)]: [
      { id: 327, title: 'Breakfast Social', time: '8:00 AM - 9:00 AM', image: IMG.breakfast },
      { id: 328, title: 'Board Games', time: '3:00 PM - 4:30 PM', image: IMG.games }
    ],
    [dateKey(2026, 1, 2)]: [
      { id: 329, title: 'Morning Yoga', time: '7:00 AM - 7:45 AM', image: IMG.yoga },
      { id: 330, title: 'Bingo Night', time: '6:30 PM - 8:00 PM', image: IMG.bingo }
    ],
    [dateKey(2026, 1, 1)]: [
      { id: 331, title: 'Puzzle Hour', time: '10:00 AM - 11:00 AM', image: IMG.games },
      { id: 332, title: 'Afternoon Tea', time: '3:00 PM - 3:45 PM', image: IMG.lunch }
    ]
  },

  'Harold Martinez': {
    [dateKey(2026, 1, 14)]: [
      { id: 401, title: 'Watercolor Painting', time: '9:00 AM - 10:30 AM', image: IMG.painting },
      { id: 402, title: 'Physical Therapy', time: '11:00 AM - 12:00 PM', image: IMG.therapy },
      { id: 403, title: 'Baseball Watch Party', time: '4:00 PM - 6:00 PM', image: IMG.movie }
    ],
    [dateKey(2026, 1, 13)]: [
      { id: 404, title: 'Breakfast Social', time: '8:00 AM - 9:00 AM', image: IMG.breakfast },
      { id: 405, title: 'Board Games', time: '1:00 PM - 2:30 PM', image: IMG.games },
      { id: 406, title: 'Karaoke Night', time: '7:00 PM - 9:00 PM', image: IMG.karaoke }
    ],
    [dateKey(2026, 1, 12)]: [
      { id: 407, title: 'Morning Walk', time: '8:00 AM - 8:45 AM', image: IMG.walking },
      { id: 408, title: 'Arts & Crafts', time: '10:00 AM - 11:30 AM', image: IMG.crafts }
    ],
    [dateKey(2026, 1, 11)]: [
      { id: 409, title: 'Watercolor Painting', time: '9:00 AM - 10:30 AM', image: IMG.painting },
      { id: 410, title: 'Music Therapy', time: '2:00 PM - 3:00 PM', image: IMG.music },
      { id: 411, title: 'Movie Afternoon', time: '4:00 PM - 6:00 PM', image: IMG.movie }
    ],
    [dateKey(2026, 1, 10)]: [
      { id: 412, title: 'Physical Therapy', time: '11:00 AM - 12:00 PM', image: IMG.therapy },
      { id: 413, title: 'Bingo Night', time: '6:30 PM - 8:00 PM', image: IMG.bingo }
    ],
    [dateKey(2026, 1, 9)]: [
      { id: 414, title: 'Breakfast Social', time: '8:00 AM - 9:00 AM', image: IMG.breakfast },
      { id: 415, title: 'Garden Club', time: '10:00 AM - 11:30 AM', image: IMG.garden },
      { id: 416, title: 'Baseball Watch Party', time: '4:00 PM - 6:00 PM', image: IMG.movie }
    ],
    [dateKey(2026, 1, 8)]: [
      { id: 417, title: 'Reading Circle', time: '9:30 AM - 10:30 AM', image: IMG.reading },
      { id: 418, title: 'Watercolor Painting', time: '1:00 PM - 2:30 PM', image: IMG.painting }
    ],
    [dateKey(2026, 1, 7)]: [
      { id: 419, title: "Harold's Birthday Party", time: '12:00 PM - 2:00 PM', image: IMG.birthday },
      { id: 420, title: 'Karaoke Night', time: '7:00 PM - 9:00 PM', image: IMG.karaoke }
    ],
    [dateKey(2026, 1, 6)]: [
      { id: 421, title: 'Morning Walk', time: '8:00 AM - 8:45 AM', image: IMG.walking },
      { id: 422, title: 'Board Games', time: '2:00 PM - 3:30 PM', image: IMG.games }
    ],
    [dateKey(2026, 1, 5)]: [
      { id: 423, title: 'Physical Therapy', time: '11:00 AM - 12:00 PM', image: IMG.therapy },
      { id: 424, title: 'Music Therapy', time: '3:00 PM - 4:00 PM', image: IMG.music }
    ],
    [dateKey(2026, 1, 4)]: [
      { id: 425, title: 'Watercolor Painting', time: '9:00 AM - 10:30 AM', image: IMG.painting },
      { id: 426, title: "Martha's Birthday Party", time: '1:00 PM - 3:00 PM', image: IMG.birthday }
    ],
    [dateKey(2026, 1, 3)]: [
      { id: 427, title: 'Breakfast Social', time: '8:00 AM - 9:00 AM', image: IMG.breakfast },
      { id: 428, title: 'Arts & Crafts', time: '10:00 AM - 11:30 AM', image: IMG.crafts }
    ],
    [dateKey(2026, 1, 2)]: [
      { id: 429, title: 'Morning Yoga', time: '7:00 AM - 7:45 AM', image: IMG.yoga },
      { id: 430, title: 'Baseball Watch Party', time: '4:00 PM - 6:00 PM', image: IMG.movie }
    ],
    [dateKey(2026, 1, 1)]: [
      { id: 431, title: 'Reading Circle', time: '9:30 AM - 10:30 AM', image: IMG.reading },
      { id: 432, title: 'Bingo Night', time: '6:30 PM - 8:00 PM', image: IMG.bingo }
    ]
  },

  'Eleanor Davis': {
    [dateKey(2026, 1, 14)]: [
      { id: 501, title: 'Birdwatching Walk', time: '7:00 AM - 8:00 AM', image: IMG.walking },
      { id: 502, title: 'Knitting Circle', time: '10:00 AM - 11:30 AM', image: IMG.crafts },
      { id: 503, title: 'Afternoon Tea', time: '3:00 PM - 3:45 PM', image: IMG.lunch }
    ],
    [dateKey(2026, 1, 13)]: [
      { id: 504, title: 'Morning Yoga', time: '7:00 AM - 7:45 AM', image: IMG.yoga },
      { id: 505, title: 'Garden Club', time: '10:00 AM - 11:30 AM', image: IMG.garden },
      { id: 506, title: 'Music Therapy', time: '2:00 PM - 3:00 PM', image: IMG.music }
    ],
    [dateKey(2026, 1, 12)]: [
      { id: 507, title: 'Breakfast Social', time: '8:00 AM - 9:00 AM', image: IMG.breakfast },
      { id: 508, title: 'Reading Circle', time: '10:00 AM - 11:00 AM', image: IMG.reading }
    ],
    [dateKey(2026, 1, 11)]: [
      { id: 509, title: 'Birdwatching Walk', time: '7:00 AM - 8:00 AM', image: IMG.walking },
      { id: 510, title: 'Watercolor Painting', time: '1:00 PM - 2:30 PM', image: IMG.painting },
      { id: 511, title: 'Bingo Night', time: '6:30 PM - 8:00 PM', image: IMG.bingo }
    ],
    [dateKey(2026, 1, 10)]: [
      { id: 512, title: 'Knitting Circle', time: '10:00 AM - 11:30 AM', image: IMG.crafts },
      { id: 513, title: 'Movie Afternoon', time: '2:00 PM - 4:00 PM', image: IMG.movie }
    ],
    [dateKey(2026, 1, 9)]: [
      { id: 514, title: 'Morning Yoga', time: '7:00 AM - 7:45 AM', image: IMG.yoga },
      { id: 515, title: 'Garden Club', time: '10:00 AM - 11:30 AM', image: IMG.garden },
      { id: 516, title: 'Afternoon Tea', time: '3:00 PM - 3:45 PM', image: IMG.lunch }
    ],
    [dateKey(2026, 1, 8)]: [
      { id: 517, title: 'Physical Therapy', time: '11:00 AM - 12:00 PM', image: IMG.therapy },
      { id: 518, title: 'Board Games', time: '2:00 PM - 3:30 PM', image: IMG.games }
    ],
    [dateKey(2026, 1, 7)]: [
      { id: 519, title: 'Birdwatching Walk', time: '7:00 AM - 8:00 AM', image: IMG.walking },
      { id: 520, title: "Harold's Birthday Party", time: '1:00 PM - 3:00 PM', image: IMG.birthday }
    ],
    [dateKey(2026, 1, 6)]: [
      { id: 521, title: 'Breakfast Social', time: '8:00 AM - 9:00 AM', image: IMG.breakfast },
      { id: 522, title: 'Knitting Circle', time: '10:00 AM - 11:30 AM', image: IMG.crafts },
      { id: 523, title: 'Karaoke Night', time: '7:00 PM - 9:00 PM', image: IMG.karaoke }
    ],
    [dateKey(2026, 1, 5)]: [
      { id: 524, title: 'Reading Circle', time: '9:30 AM - 10:30 AM', image: IMG.reading },
      { id: 525, title: 'Music Therapy', time: '2:00 PM - 3:00 PM', image: IMG.music }
    ],
    [dateKey(2026, 1, 4)]: [
      { id: 526, title: 'Morning Yoga', time: '7:00 AM - 7:45 AM', image: IMG.yoga },
      { id: 527, title: "Martha's Birthday Party", time: '1:00 PM - 3:00 PM', image: IMG.birthday }
    ],
    [dateKey(2026, 1, 3)]: [
      { id: 528, title: 'Birdwatching Walk', time: '7:00 AM - 8:00 AM', image: IMG.walking },
      { id: 529, title: 'Watercolor Painting', time: '1:00 PM - 2:30 PM', image: IMG.painting }
    ],
    [dateKey(2026, 1, 2)]: [
      { id: 530, title: 'Garden Club', time: '10:00 AM - 11:30 AM', image: IMG.garden },
      { id: 531, title: 'Bingo Night', time: '6:30 PM - 8:00 PM', image: IMG.bingo }
    ],
    [dateKey(2026, 1, 1)]: [
      { id: 532, title: 'Knitting Circle', time: '10:00 AM - 11:30 AM', image: IMG.crafts },
      { id: 533, title: 'Afternoon Tea', time: '3:00 PM - 3:45 PM', image: IMG.lunch }
    ]
  },

  'James Wilson': {
    [dateKey(2026, 1, 14)]: [
      { id: 601, title: 'Crossword Challenge', time: '9:00 AM - 10:00 AM', image: IMG.games },
      { id: 602, title: 'History Documentary', time: '2:00 PM - 3:30 PM', image: IMG.movie }
    ],
    [dateKey(2026, 1, 13)]: [
      { id: 603, title: 'Morning Walk', time: '7:30 AM - 8:15 AM', image: IMG.walking },
      { id: 604, title: 'Board Games', time: '10:00 AM - 11:30 AM', image: IMG.games },
      { id: 605, title: 'Karaoke Night', time: '7:00 PM - 9:00 PM', image: IMG.karaoke }
    ],
    [dateKey(2026, 1, 12)]: [
      { id: 606, title: 'Breakfast Social', time: '8:00 AM - 9:00 AM', image: IMG.breakfast },
      { id: 607, title: 'Physical Therapy', time: '11:00 AM - 12:00 PM', image: IMG.therapy },
      { id: 608, title: 'Crossword Challenge', time: '2:00 PM - 3:00 PM', image: IMG.games }
    ],
    [dateKey(2026, 1, 11)]: [
      { id: 609, title: 'Reading Circle', time: '9:30 AM - 10:30 AM', image: IMG.reading },
      { id: 610, title: 'History Documentary', time: '2:00 PM - 3:30 PM', image: IMG.movie },
      { id: 611, title: 'Bingo Night', time: '6:30 PM - 8:00 PM', image: IMG.bingo }
    ],
    [dateKey(2026, 1, 10)]: [
      { id: 612, title: 'Morning Yoga', time: '7:00 AM - 7:45 AM', image: IMG.yoga },
      { id: 613, title: 'Garden Club', time: '10:00 AM - 11:30 AM', image: IMG.garden }
    ],
    [dateKey(2026, 1, 9)]: [
      { id: 614, title: 'Crossword Challenge', time: '9:00 AM - 10:00 AM', image: IMG.games },
      { id: 615, title: 'Arts & Crafts', time: '1:00 PM - 2:30 PM', image: IMG.crafts }
    ],
    [dateKey(2026, 1, 8)]: [
      { id: 616, title: 'Morning Walk', time: '7:30 AM - 8:15 AM', image: IMG.walking },
      { id: 617, title: 'Board Games', time: '2:00 PM - 3:30 PM', image: IMG.games },
      { id: 618, title: 'Music Therapy', time: '4:00 PM - 5:00 PM', image: IMG.music }
    ],
    [dateKey(2026, 1, 7)]: [
      { id: 619, title: 'Breakfast Social', time: '8:00 AM - 9:00 AM', image: IMG.breakfast },
      { id: 620, title: "Harold's Birthday Party", time: '1:00 PM - 3:00 PM', image: IMG.birthday }
    ],
    [dateKey(2026, 1, 6)]: [
      { id: 621, title: 'Physical Therapy', time: '11:00 AM - 12:00 PM', image: IMG.therapy },
      { id: 622, title: 'History Documentary', time: '2:00 PM - 3:30 PM', image: IMG.movie }
    ],
    [dateKey(2026, 1, 5)]: [
      { id: 623, title: 'Crossword Challenge', time: '9:00 AM - 10:00 AM', image: IMG.games },
      { id: 624, title: 'Karaoke Night', time: '7:00 PM - 9:00 PM', image: IMG.karaoke }
    ],
    [dateKey(2026, 1, 4)]: [
      { id: 625, title: 'Reading Circle', time: '9:30 AM - 10:30 AM', image: IMG.reading },
      { id: 626, title: "Martha's Birthday Party", time: '1:00 PM - 3:00 PM', image: IMG.birthday }
    ],
    [dateKey(2026, 1, 3)]: [
      { id: 627, title: 'Morning Walk', time: '7:30 AM - 8:15 AM', image: IMG.walking },
      { id: 628, title: 'Board Games', time: '1:00 PM - 2:30 PM', image: IMG.games }
    ],
    [dateKey(2026, 1, 2)]: [
      { id: 629, title: 'Morning Yoga', time: '7:00 AM - 7:45 AM', image: IMG.yoga },
      { id: 630, title: 'Bingo Night', time: '6:30 PM - 8:00 PM', image: IMG.bingo }
    ],
    [dateKey(2026, 1, 1)]: [
      { id: 631, title: 'Crossword Challenge', time: '9:00 AM - 10:00 AM', image: IMG.games },
      { id: 632, title: 'History Documentary', time: '2:00 PM - 3:30 PM', image: IMG.movie }
    ]
  },

  'Betty Johnson': {
    [dateKey(2026, 1, 14)]: [
      { id: 701, title: 'Piano Practice', time: '8:00 AM - 9:00 AM', image: IMG.music },
      { id: 702, title: 'Arts & Crafts', time: '10:00 AM - 11:30 AM', image: IMG.crafts },
      { id: 703, title: 'Afternoon Tea', time: '3:00 PM - 3:45 PM', image: IMG.lunch }
    ],
    [dateKey(2026, 1, 13)]: [
      { id: 704, title: 'Morning Yoga', time: '7:00 AM - 7:45 AM', image: IMG.yoga },
      { id: 705, title: 'Reading Circle', time: '10:00 AM - 11:00 AM', image: IMG.reading },
      { id: 706, title: 'Karaoke Night', time: '7:00 PM - 9:00 PM', image: IMG.karaoke }
    ],
    [dateKey(2026, 1, 12)]: [
      { id: 707, title: 'Breakfast Social', time: '8:00 AM - 9:00 AM', image: IMG.breakfast },
      { id: 708, title: 'Piano Practice', time: '11:00 AM - 12:00 PM', image: IMG.music },
      { id: 709, title: 'Movie Afternoon', time: '2:00 PM - 4:00 PM', image: IMG.movie }
    ],
    [dateKey(2026, 1, 11)]: [
      { id: 710, title: 'Garden Club', time: '10:00 AM - 11:30 AM', image: IMG.garden },
      { id: 711, title: 'Watercolor Painting', time: '1:00 PM - 2:30 PM', image: IMG.painting }
    ],
    [dateKey(2026, 1, 10)]: [
      { id: 712, title: 'Morning Walk', time: '7:30 AM - 8:15 AM', image: IMG.walking },
      { id: 713, title: 'Board Games', time: '1:00 PM - 2:30 PM', image: IMG.games },
      { id: 714, title: 'Bingo Night', time: '6:30 PM - 8:00 PM', image: IMG.bingo }
    ],
    [dateKey(2026, 1, 9)]: [
      { id: 715, title: 'Piano Practice', time: '8:00 AM - 9:00 AM', image: IMG.music },
      { id: 716, title: 'Physical Therapy', time: '11:00 AM - 12:00 PM', image: IMG.therapy }
    ],
    [dateKey(2026, 1, 8)]: [
      { id: 717, title: 'Breakfast Social', time: '8:00 AM - 9:00 AM', image: IMG.breakfast },
      { id: 718, title: 'Arts & Crafts', time: '10:00 AM - 11:30 AM', image: IMG.crafts },
      { id: 719, title: 'Music Therapy', time: '2:00 PM - 3:00 PM', image: IMG.music }
    ],
    [dateKey(2026, 1, 7)]: [
      { id: 720, title: 'Morning Yoga', time: '7:00 AM - 7:45 AM', image: IMG.yoga },
      { id: 721, title: "Harold's Birthday Party", time: '1:00 PM - 3:00 PM', image: IMG.birthday }
    ],
    [dateKey(2026, 1, 6)]: [
      { id: 722, title: 'Piano Practice', time: '8:00 AM - 9:00 AM', image: IMG.music },
      { id: 723, title: 'Reading Circle', time: '10:00 AM - 11:00 AM', image: IMG.reading },
      { id: 724, title: 'Karaoke Night', time: '7:00 PM - 9:00 PM', image: IMG.karaoke }
    ],
    [dateKey(2026, 1, 5)]: [
      { id: 725, title: 'Garden Club', time: '10:00 AM - 11:30 AM', image: IMG.garden },
      { id: 726, title: 'Movie Afternoon', time: '2:00 PM - 4:00 PM', image: IMG.movie }
    ],
    [dateKey(2026, 1, 4)]: [
      { id: 727, title: 'Morning Walk', time: '7:30 AM - 8:15 AM', image: IMG.walking },
      { id: 728, title: "Martha's Birthday Party", time: '1:00 PM - 3:00 PM', image: IMG.birthday }
    ],
    [dateKey(2026, 1, 3)]: [
      { id: 729, title: 'Breakfast Social', time: '8:00 AM - 9:00 AM', image: IMG.breakfast },
      { id: 730, title: 'Piano Practice', time: '11:00 AM - 12:00 PM', image: IMG.music }
    ],
    [dateKey(2026, 1, 2)]: [
      { id: 731, title: 'Watercolor Painting', time: '1:00 PM - 2:30 PM', image: IMG.painting },
      { id: 732, title: 'Bingo Night', time: '6:30 PM - 8:00 PM', image: IMG.bingo }
    ],
    [dateKey(2026, 1, 1)]: [
      { id: 733, title: 'Piano Practice', time: '8:00 AM - 9:00 AM', image: IMG.music },
      { id: 734, title: 'Board Games', time: '2:00 PM - 3:30 PM', image: IMG.games }
    ]
  }
};

// Fallback for patients not in the map
export const DEFAULT_ACTIVITIES = {
  [dateKey(2026, 1, 14)]: [
    { id: 901, title: 'Morning Yoga', time: '7:00 AM - 7:45 AM', image: IMG.yoga },
    { id: 902, title: 'Reading Circle', time: '10:00 AM - 11:00 AM', image: IMG.reading },
    { id: 903, title: 'Movie Afternoon', time: '2:00 PM - 4:00 PM', image: IMG.movie }
  ],
  [dateKey(2026, 1, 13)]: [
    { id: 904, title: 'Breakfast Social', time: '8:00 AM - 9:00 AM', image: IMG.breakfast },
    { id: 905, title: 'Board Games', time: '1:00 PM - 2:30 PM', image: IMG.games }
  ],
  [dateKey(2026, 1, 12)]: [
    { id: 906, title: 'Physical Therapy', time: '11:00 AM - 12:00 PM', image: IMG.therapy },
    { id: 907, title: 'Bingo Night', time: '6:30 PM - 8:00 PM', image: IMG.bingo }
  ]
};

// ---------------------------------------------------------------------------
// APPOINTMENTS — keyed by patient name → Appointment[]
// ---------------------------------------------------------------------------
export const APPOINTMENTS = {
  'Margaret Thompson': [
    { id: 1, title: 'Family Video Call', date: 'Monday, February 2', time: '2:00 PM - 2:30 PM', type: 'video' },
    { id: 2, title: 'Doctor Check-up', date: 'Wednesday, February 4', time: '10:00 AM - 10:45 AM', type: 'in-person' },
    { id: 3, title: 'Physical Therapy', date: 'Friday, February 6', time: '3:00 PM - 4:00 PM', type: 'in-person' },
    { id: 4, title: 'Dentist Appointment', date: 'Monday, February 9', time: '9:00 AM - 9:45 AM', type: 'in-person' }
  ],
  'Robert Chen': [
    { id: 1, title: 'Son Video Call', date: 'Tuesday, February 3', time: '11:00 AM - 11:30 AM', type: 'video' },
    { id: 2, title: 'Endocrinologist Visit', date: 'Thursday, February 5', time: '9:00 AM - 9:45 AM', type: 'in-person' },
    { id: 3, title: 'Physical Therapy', date: 'Friday, February 6', time: '1:00 PM - 2:00 PM', type: 'in-person' }
  ],
  'Dorothy Williams': [
    { id: 1, title: 'Hearing Specialist', date: 'Monday, February 2', time: '10:00 AM - 10:45 AM', type: 'in-person' },
    { id: 2, title: 'Family Video Call', date: 'Wednesday, February 4', time: '3:00 PM - 3:30 PM', type: 'video' },
    { id: 3, title: 'Doctor Check-up', date: 'Friday, February 6', time: '11:00 AM - 11:45 AM', type: 'in-person' },
    { id: 4, title: 'Grandson Phone Call', date: 'Sunday, February 8', time: '5:00 PM - 5:30 PM', type: 'phone' }
  ],
  'Harold Martinez': [
    { id: 1, title: 'Orthopedic Check-up', date: 'Tuesday, February 3', time: '9:00 AM - 10:00 AM', type: 'in-person' },
    { id: 2, title: 'Daughter Video Call', date: 'Thursday, February 5', time: '4:00 PM - 4:30 PM', type: 'video' },
    { id: 3, title: 'Physical Therapy', date: 'Saturday, February 7', time: '10:00 AM - 11:00 AM', type: 'in-person' }
  ],
  'Eleanor Davis': [
    { id: 1, title: 'Family Video Call', date: 'Monday, February 2', time: '1:00 PM - 1:30 PM', type: 'video' },
    { id: 2, title: 'Eye Exam', date: 'Wednesday, February 4', time: '2:00 PM - 2:45 PM', type: 'in-person' },
    { id: 3, title: 'Doctor Check-up', date: 'Friday, February 6', time: '9:00 AM - 9:45 AM', type: 'in-person' },
    { id: 4, title: 'Niece Phone Call', date: 'Saturday, February 7', time: '6:00 PM - 6:30 PM', type: 'phone' }
  ],
  'James Wilson': [
    { id: 1, title: 'Doctor Check-up', date: 'Tuesday, February 3', time: '10:00 AM - 10:45 AM', type: 'in-person' },
    { id: 2, title: 'Wife Video Call', date: 'Thursday, February 5', time: '2:00 PM - 2:30 PM', type: 'video' },
    { id: 3, title: 'Physical Therapy', date: 'Saturday, February 7', time: '11:00 AM - 12:00 PM', type: 'in-person' }
  ],
  'Betty Johnson': [
    { id: 1, title: 'Family Video Call', date: 'Monday, February 2', time: '3:00 PM - 3:30 PM', type: 'video' },
    { id: 2, title: 'Doctor Check-up', date: 'Wednesday, February 4', time: '11:00 AM - 11:45 AM', type: 'in-person' },
    { id: 3, title: 'Son Phone Call', date: 'Friday, February 6', time: '5:00 PM - 5:30 PM', type: 'phone' },
    { id: 4, title: 'Nutritionist Visit', date: 'Monday, February 9', time: '10:00 AM - 10:30 AM', type: 'in-person' }
  ]
};

export const DEFAULT_APPOINTMENTS = [
  { id: 1, title: 'Family Video Call', date: 'Monday, February 2', time: '2:00 PM - 2:30 PM', type: 'video' },
  { id: 2, title: 'Doctor Check-up', date: 'Wednesday, February 4', time: '10:00 AM - 10:45 AM', type: 'in-person' },
  { id: 3, title: 'Physical Therapy', date: 'Friday, February 6', time: '3:00 PM - 4:00 PM', type: 'in-person' }
];

// ---------------------------------------------------------------------------
// MOOD ENTRIES — keyed by patient name → MoodEntry[]
// ---------------------------------------------------------------------------
export const MOOD_ENTRIES = {
  'Margaret Thompson': [
    { id: 1, date: '2026-02-14', mood: 'Great', notes: 'Loved the garden club session today' },
    { id: 2, date: '2026-02-13', mood: 'Good', notes: 'Enjoyed painting with friends' },
    { id: 3, date: '2026-02-12', mood: 'Great', notes: 'Very active and social today' },
    { id: 4, date: '2026-02-11', mood: 'Okay', notes: 'Quiet afternoon, read a book' },
    { id: 5, date: '2026-02-10', mood: 'Good', notes: 'Won two rounds of bingo' },
    { id: 6, date: '2026-02-09', mood: 'Great', notes: 'Went for a nice walk in the garden' },
    { id: 7, date: '2026-02-08', mood: 'Good', notes: 'Enjoyed the movie afternoon' },
    { id: 8, date: '2026-02-07', mood: 'Great', notes: "Harold's birthday was a blast" },
    { id: 9, date: '2026-02-06', mood: 'Okay', notes: 'Felt a bit tired after therapy' },
    { id: 10, date: '2026-02-05', mood: 'Good', notes: 'Karaoke night was fun' },
    { id: 11, date: '2026-02-04', mood: 'Great', notes: "Martha's birthday party was wonderful" },
    { id: 12, date: '2026-02-03', mood: 'Good', notes: 'Enjoyed breakfast with everyone' },
    { id: 13, date: '2026-02-02', mood: 'Okay', notes: 'Quiet day, played some games' },
    { id: 14, date: '2026-02-01', mood: 'Good', notes: 'Morning yoga was refreshing' }
  ],
  'Robert Chen': [
    { id: 1, date: '2026-02-14', mood: 'Good', notes: 'Won the chess tournament' },
    { id: 2, date: '2026-02-13', mood: 'Great', notes: 'Had a great walk and reading session' },
    { id: 3, date: '2026-02-12', mood: 'Good', notes: 'Enjoyed breakfast social' },
    { id: 4, date: '2026-02-11', mood: 'Okay', notes: 'Blood sugar was a bit high today' },
    { id: 5, date: '2026-02-10', mood: 'Good', notes: 'Physical therapy went well' },
    { id: 6, date: '2026-02-09', mood: 'Great', notes: 'Garden club was relaxing' },
    { id: 7, date: '2026-02-08', mood: 'Good', notes: 'Listened to classical music' },
    { id: 8, date: '2026-02-07', mood: 'Great', notes: "Harold's party was nice" },
    { id: 9, date: '2026-02-06', mood: 'Okay', notes: 'Quiet day with crafts' },
    { id: 10, date: '2026-02-05', mood: 'Good', notes: 'Enjoyed the reading circle' },
    { id: 11, date: '2026-02-04', mood: 'Good', notes: 'Morning yoga was calming' },
    { id: 12, date: '2026-02-03', mood: 'Great', notes: 'Bingo night was exciting' },
    { id: 13, date: '2026-02-02', mood: 'Good', notes: 'Chess and karaoke day' },
    { id: 14, date: '2026-02-01', mood: 'Okay', notes: 'Relaxed with a walk' },
    { id: 15, date: '2026-01-31', mood: 'Good', notes: 'Won three chess games in a row' },
    { id: 16, date: '2026-01-30', mood: 'Great', notes: 'Classical music concert on the radio' },
    { id: 17, date: '2026-01-29', mood: 'Good', notes: 'Enjoyed a long reading session' },
    { id: 18, date: '2026-01-28', mood: 'Okay', notes: 'Blood sugar slightly elevated' },
    { id: 19, date: '2026-01-27', mood: 'Good', notes: 'Physical therapy went smoothly' },
    { id: 20, date: '2026-01-26', mood: 'Great', notes: 'Beat everyone at chess club' },
    { id: 21, date: '2026-01-25', mood: 'Good', notes: 'Quiet afternoon with a good book' },
    { id: 22, date: '2026-01-24', mood: 'Good', notes: 'Garden walk despite the cold' },
    { id: 23, date: '2026-01-23', mood: 'Okay', notes: 'Felt a bit tired today' },
    { id: 24, date: '2026-01-22', mood: 'Good', notes: 'Listened to Beethoven all morning' },
    { id: 25, date: '2026-01-21', mood: 'Great', notes: 'Chess tournament practice went well' },
    { id: 26, date: '2026-01-20', mood: 'Good', notes: 'Enjoyed board games with friends' },
    { id: 27, date: '2026-01-19', mood: 'Good', notes: 'Reading circle was fun' },
    { id: 28, date: '2026-01-18', mood: 'Okay', notes: 'Missed the morning walk, too cold' },
    { id: 29, date: '2026-01-17', mood: 'Great', notes: 'Son called, great conversation' },
    { id: 30, date: '2026-01-16', mood: 'Good', notes: 'Played chess and did puzzles' },
    { id: 31, date: '2026-01-15', mood: 'Good', notes: 'Physical therapy improving strength' },
    { id: 32, date: '2026-01-14', mood: 'Great', notes: 'Wonderful classical music hour' },
    { id: 33, date: '2026-01-13', mood: 'Good', notes: 'Breakfast social was lively' },
    { id: 34, date: '2026-01-12', mood: 'Okay', notes: 'Quiet day, rested most of the afternoon' },
    { id: 35, date: '2026-01-11', mood: 'Good', notes: 'Movie afternoon was enjoyable' },
    { id: 36, date: '2026-01-10', mood: 'Good', notes: 'Won at bingo for the first time' },
    { id: 37, date: '2026-01-09', mood: 'Great', notes: 'Chess club and a great book' },
    { id: 38, date: '2026-01-08', mood: 'Okay', notes: 'Blood sugar check was a bit off' },
    { id: 39, date: '2026-01-07', mood: 'Good', notes: 'Enjoyed the garden despite winter' },
    { id: 40, date: '2026-01-06', mood: 'Good', notes: 'Reading and listening to Mozart' },
    { id: 41, date: '2026-01-05', mood: 'Great', notes: 'Played chess with a new resident' },
    { id: 42, date: '2026-01-04', mood: 'Good', notes: 'Morning yoga and crafts' },
    { id: 43, date: '2026-01-03', mood: 'Okay', notes: 'Adjusting to new medication schedule' },
    { id: 44, date: '2026-01-02', mood: 'Good', notes: 'Nice walk and board games' },
    { id: 45, date: '2026-01-01', mood: 'Great', notes: 'Happy New Year! Celebrated with everyone' }
  ],
  'Dorothy Williams': [
    { id: 1, date: '2026-02-14', mood: 'Good', notes: 'Puzzle time was enjoyable' },
    { id: 2, date: '2026-02-13', mood: 'Good', notes: 'Nice morning walk' },
    { id: 3, date: '2026-02-12', mood: 'Great', notes: 'Loved the movie afternoon' },
    { id: 4, date: '2026-02-11', mood: 'Okay', notes: 'Hearing aid acting up' },
    { id: 5, date: '2026-02-10', mood: 'Good', notes: 'Bingo night was a hit' },
    { id: 6, date: '2026-02-09', mood: 'Good', notes: 'Garden was beautiful today' },
    { id: 7, date: '2026-02-08', mood: 'Okay', notes: 'Ate well, quiet afternoon' },
    { id: 8, date: '2026-02-07', mood: 'Great', notes: 'Had a wonderful time at the party' },
    { id: 9, date: '2026-02-06', mood: 'Good', notes: 'Puzzles and a movie' },
    { id: 10, date: '2026-02-05', mood: 'Good', notes: 'Painting session was relaxing' },
    { id: 11, date: '2026-02-04', mood: 'Great', notes: "Martha's party was lovely" },
    { id: 12, date: '2026-02-03', mood: 'Good', notes: 'Enjoyed board games' },
    { id: 13, date: '2026-02-02', mood: 'Good', notes: 'Morning yoga went well' },
    { id: 14, date: '2026-02-01', mood: 'Okay', notes: 'Tea and puzzles' }
  ],
  'Harold Martinez': [
    { id: 1, date: '2026-02-14', mood: 'Great', notes: 'Painted a landscape, watched the game' },
    { id: 2, date: '2026-02-13', mood: 'Good', notes: 'Karaoke was lots of fun' },
    { id: 3, date: '2026-02-12', mood: 'Good', notes: 'Nice morning walk' },
    { id: 4, date: '2026-02-11', mood: 'Okay', notes: 'Walker adjustment day' },
    { id: 5, date: '2026-02-10', mood: 'Good', notes: 'Bingo was great' },
    { id: 6, date: '2026-02-09', mood: 'Great', notes: 'Baseball team won!' },
    { id: 7, date: '2026-02-08', mood: 'Good', notes: 'Reading and painting' },
    { id: 8, date: '2026-02-07', mood: 'Great', notes: 'My birthday party was amazing!' },
    { id: 9, date: '2026-02-06', mood: 'Good', notes: 'Walked outside, played games' },
    { id: 10, date: '2026-02-05', mood: 'Okay', notes: 'Therapy was tiring' },
    { id: 11, date: '2026-02-04', mood: 'Good', notes: "Martha's party was fun" },
    { id: 12, date: '2026-02-03', mood: 'Good', notes: 'Crafts and breakfast' },
    { id: 13, date: '2026-02-02', mood: 'Great', notes: 'Yoga and baseball' },
    { id: 14, date: '2026-02-01', mood: 'Good', notes: 'Bingo night was exciting' }
  ],
  'Eleanor Davis': [
    { id: 1, date: '2026-02-14', mood: 'Great', notes: 'Spotted a cardinal during birdwatching' },
    { id: 2, date: '2026-02-13', mood: 'Good', notes: 'Garden and music were lovely' },
    { id: 3, date: '2026-02-12', mood: 'Good', notes: 'Nice breakfast and reading' },
    { id: 4, date: '2026-02-11', mood: 'Great', notes: 'Birdwatching was magical today' },
    { id: 5, date: '2026-02-10', mood: 'Okay', notes: 'Knitting and a quiet movie' },
    { id: 6, date: '2026-02-09', mood: 'Good', notes: 'Garden club and tea' },
    { id: 7, date: '2026-02-08', mood: 'Good', notes: 'Board games after therapy' },
    { id: 8, date: '2026-02-07', mood: 'Great', notes: "Harold's party was wonderful" },
    { id: 9, date: '2026-02-06', mood: 'Good', notes: 'Karaoke and knitting' },
    { id: 10, date: '2026-02-05', mood: 'Okay', notes: 'Quiet reading day' },
    { id: 11, date: '2026-02-04', mood: 'Good', notes: "Martha's party celebration" },
    { id: 12, date: '2026-02-03', mood: 'Good', notes: 'Birdwatching and painting' },
    { id: 13, date: '2026-02-02', mood: 'Great', notes: 'Garden club was beautiful' },
    { id: 14, date: '2026-02-01', mood: 'Good', notes: 'Knitting and tea' }
  ],
  'James Wilson': [
    { id: 1, date: '2026-02-14', mood: 'Good', notes: 'Finished the crossword quickly today' },
    { id: 2, date: '2026-02-13', mood: 'Great', notes: 'Karaoke night was surprisingly fun' },
    { id: 3, date: '2026-02-12', mood: 'Good', notes: 'Therapy and puzzles' },
    { id: 4, date: '2026-02-11', mood: 'Good', notes: 'Documentary about WWII was fascinating' },
    { id: 5, date: '2026-02-10', mood: 'Okay', notes: 'Quiet day in the garden' },
    { id: 6, date: '2026-02-09', mood: 'Good', notes: 'Crosswords and crafts' },
    { id: 7, date: '2026-02-08', mood: 'Great', notes: 'Won all the board games' },
    { id: 8, date: '2026-02-07', mood: 'Good', notes: "Harold's birthday was great" },
    { id: 9, date: '2026-02-06', mood: 'Okay', notes: 'Documentary and rest' },
    { id: 10, date: '2026-02-05', mood: 'Good', notes: 'Karaoke was enjoyable' },
    { id: 11, date: '2026-02-04', mood: 'Good', notes: "Martha's party was nice" },
    { id: 12, date: '2026-02-03', mood: 'Okay', notes: 'Walk and board games' },
    { id: 13, date: '2026-02-02', mood: 'Good', notes: 'Yoga and bingo' },
    { id: 14, date: '2026-02-01', mood: 'Great', notes: 'Crossword personal best' }
  ],
  'Betty Johnson': [
    { id: 1, date: '2026-02-14', mood: 'Great', notes: 'Played piano for everyone at tea' },
    { id: 2, date: '2026-02-13', mood: 'Good', notes: 'Karaoke and reading' },
    { id: 3, date: '2026-02-12', mood: 'Great', notes: 'Piano and a movie' },
    { id: 4, date: '2026-02-11', mood: 'Good', notes: 'Garden and painting' },
    { id: 5, date: '2026-02-10', mood: 'Good', notes: 'Won at bingo again' },
    { id: 6, date: '2026-02-09', mood: 'Okay', notes: 'Therapy was tiring' },
    { id: 7, date: '2026-02-08', mood: 'Great', notes: 'Arts and crafts were wonderful' },
    { id: 8, date: '2026-02-07', mood: 'Good', notes: "Harold's party was lovely" },
    { id: 9, date: '2026-02-06', mood: 'Great', notes: 'Piano recital went well' },
    { id: 10, date: '2026-02-05', mood: 'Good', notes: 'Garden club and movie' },
    { id: 11, date: '2026-02-04', mood: 'Good', notes: "Martha's party celebration" },
    { id: 12, date: '2026-02-03', mood: 'Good', notes: 'Piano practice and breakfast' },
    { id: 13, date: '2026-02-02', mood: 'Great', notes: 'Painting and bingo' },
    { id: 14, date: '2026-02-01', mood: 'Good', notes: 'Piano and board games' }
  ]
};

export const DEFAULT_MOOD_ENTRIES = [
  { id: 1, date: '2026-02-14', mood: 'Great', notes: 'Very active and social today' },
  { id: 2, date: '2026-02-13', mood: 'Good', notes: 'Enjoyed reading time' },
  { id: 3, date: '2026-02-12', mood: 'Okay', notes: 'Quiet day, ate well' },
  { id: 4, date: '2026-02-11', mood: 'Good', notes: 'Participated in group activity' },
  { id: 5, date: '2026-02-10', mood: 'Great', notes: 'Birthday celebration, very happy' }
];
