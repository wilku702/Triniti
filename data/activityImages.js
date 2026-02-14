/**
 * Activity image mapping.
 * Firestore stores `imageKey` strings (e.g., 'yoga', 'reading').
 * This module resolves those keys to React Native image sources.
 */

export const ACTIVITY_IMAGES = {
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

export const resolveImage = (imageKey) => {
  return ACTIVITY_IMAGES[imageKey] || ACTIVITY_IMAGES.defaultImg;
};
