/**
 * Firestore Seeding Script
 * Run with: node scripts/seedFirestore.mjs
 *
 * Uploads all patient data (profiles, activities, appointments, mood entries)
 * to Firestore. Uses merge mode — existing patients are preserved, new data
 * is added to their subcollections.
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, setDoc, doc, Timestamp, query, where } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCAtpYlHeUZm0wlSNEtvlDwh0XmukzPWqw',
  authDomain: 'triniti-6dea8.firebaseapp.com',
  projectId: 'triniti-6dea8',
  storageBucket: 'triniti-6dea8.appspot.com',
  messagingSenderId: '113357896992',
  appId: '1:113357896992:web:fac795d43d8e04e541ab45'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ---------------------------------------------------------------------------
// PATIENTS
// ---------------------------------------------------------------------------
const PATIENTS = [
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
// Helper: create a Firestore Timestamp from (year, month0, day)
// ---------------------------------------------------------------------------
const ts = (year, month, day) => Timestamp.fromDate(new Date(year, month, day));

// ---------------------------------------------------------------------------
// ACTIVITIES — keyed by patient name → array of { title, time, imageKey, date }
// ---------------------------------------------------------------------------
const ACTIVITIES = {
  'Margaret Thompson': [
    { title: 'Morning Yoga', time: '7:00 AM - 7:45 AM', imageKey: 'yoga', date: ts(2026, 1, 14) },
    { title: 'Garden Club', time: '10:00 AM - 11:30 AM', imageKey: 'garden', date: ts(2026, 1, 14) },
    { title: 'Movie Afternoon', time: '2:00 PM - 4:00 PM', imageKey: 'movie', date: ts(2026, 1, 14) },
    { title: 'Reading Circle', time: '9:30 AM - 10:30 AM', imageKey: 'reading', date: ts(2026, 1, 13) },
    { title: 'Watercolor Painting', time: '1:00 PM - 2:30 PM', imageKey: 'painting', date: ts(2026, 1, 13) },
    { title: 'Karaoke Night', time: '7:00 PM - 9:00 PM', imageKey: 'karaoke', date: ts(2026, 1, 13) },
    { title: 'Breakfast Social', time: '8:00 AM - 9:00 AM', imageKey: 'breakfast', date: ts(2026, 1, 12) },
    { title: 'Physical Therapy', time: '11:00 AM - 12:00 PM', imageKey: 'therapy', date: ts(2026, 1, 12) },
    { title: 'Board Games', time: '3:00 PM - 4:30 PM', imageKey: 'games', date: ts(2026, 1, 12) },
    { title: 'Morning Walk', time: '7:30 AM - 8:15 AM', imageKey: 'walking', date: ts(2026, 1, 11) },
    { title: 'Arts & Crafts', time: '10:00 AM - 11:30 AM', imageKey: 'crafts', date: ts(2026, 1, 11) },
    { title: 'Music Therapy', time: '9:00 AM - 10:00 AM', imageKey: 'music', date: ts(2026, 1, 10) },
    { title: 'Lunch Outing', time: '12:00 PM - 1:30 PM', imageKey: 'lunch', date: ts(2026, 1, 10) },
    { title: 'Bingo Night', time: '6:30 PM - 8:00 PM', imageKey: 'bingo', date: ts(2026, 1, 10) },
    { title: 'Morning Yoga', time: '7:00 AM - 7:45 AM', imageKey: 'yoga', date: ts(2026, 1, 9) },
    { title: 'Garden Club', time: '10:00 AM - 11:30 AM', imageKey: 'garden', date: ts(2026, 1, 9) },
    { title: 'Reading Circle', time: '9:30 AM - 10:30 AM', imageKey: 'reading', date: ts(2026, 1, 8) },
    { title: 'Movie Afternoon', time: '2:00 PM - 4:00 PM', imageKey: 'movie', date: ts(2026, 1, 8) },
    { title: 'Breakfast Social', time: '8:00 AM - 9:00 AM', imageKey: 'breakfast', date: ts(2026, 1, 7) },
    { title: "Harold's Birthday Party", time: '1:00 PM - 3:00 PM', imageKey: 'birthday', date: ts(2026, 1, 7) },
    { title: 'Physical Therapy', time: '11:00 AM - 12:00 PM', imageKey: 'therapy', date: ts(2026, 1, 6) },
    { title: 'Watercolor Painting', time: '2:00 PM - 3:30 PM', imageKey: 'painting', date: ts(2026, 1, 6) },
    { title: 'Morning Walk', time: '7:30 AM - 8:15 AM', imageKey: 'walking', date: ts(2026, 1, 5) },
    { title: 'Arts & Crafts', time: '10:00 AM - 11:30 AM', imageKey: 'crafts', date: ts(2026, 1, 5) },
    { title: 'Karaoke Night', time: '7:00 PM - 9:00 PM', imageKey: 'karaoke', date: ts(2026, 1, 5) },
    { title: 'Reading Books', time: '9:30 AM - 10:00 AM', imageKey: 'reading', date: ts(2026, 1, 4) },
    { title: "Martha's Birthday Party", time: '1:00 PM - 3:00 PM', imageKey: 'birthday', date: ts(2026, 1, 4) },
    { title: 'Karaoke Night', time: '8:00 PM - 10:00 PM', imageKey: 'karaoke', date: ts(2026, 1, 4) },
    { title: 'Eating Breakfast', time: '8:00 AM - 9:00 AM', imageKey: 'breakfast', date: ts(2026, 1, 3) },
    { title: "An's Birthday Party", time: '2:00 PM - 4:00 PM', imageKey: 'birthday', date: ts(2026, 1, 3) },
    { title: 'Music Therapy', time: '9:00 AM - 10:00 AM', imageKey: 'music', date: ts(2026, 1, 2) },
    { title: 'Board Games', time: '3:00 PM - 4:30 PM', imageKey: 'games', date: ts(2026, 1, 2) },
    { title: 'Morning Yoga', time: '7:00 AM - 7:45 AM', imageKey: 'yoga', date: ts(2026, 1, 1) },
    { title: 'Bingo Night', time: '6:30 PM - 8:00 PM', imageKey: 'bingo', date: ts(2026, 1, 1) }
  ],
  'Robert Chen': [
    { title: 'Chess Club', time: '9:00 AM - 10:30 AM', imageKey: 'games', date: ts(2026, 1, 14) },
    { title: 'Physical Therapy', time: '11:00 AM - 12:00 PM', imageKey: 'therapy', date: ts(2026, 1, 14) },
    { title: 'Classical Music Hour', time: '3:00 PM - 4:00 PM', imageKey: 'music', date: ts(2026, 1, 14) },
    { title: 'Morning Walk', time: '7:30 AM - 8:15 AM', imageKey: 'walking', date: ts(2026, 1, 13) },
    { title: 'Reading Circle', time: '10:00 AM - 11:00 AM', imageKey: 'reading', date: ts(2026, 1, 13) },
    { title: 'Movie Afternoon', time: '2:00 PM - 4:00 PM', imageKey: 'movie', date: ts(2026, 1, 13) },
    { title: 'Breakfast Social', time: '8:00 AM - 9:00 AM', imageKey: 'breakfast', date: ts(2026, 1, 12) },
    { title: 'Board Games', time: '1:00 PM - 2:30 PM', imageKey: 'games', date: ts(2026, 1, 12) },
    { title: 'Morning Yoga', time: '7:00 AM - 7:45 AM', imageKey: 'yoga', date: ts(2026, 1, 11) },
    { title: 'Watercolor Painting', time: '10:00 AM - 11:30 AM', imageKey: 'painting', date: ts(2026, 1, 11) },
    { title: 'Bingo Night', time: '6:30 PM - 8:00 PM', imageKey: 'bingo', date: ts(2026, 1, 11) },
    { title: 'Physical Therapy', time: '11:00 AM - 12:00 PM', imageKey: 'therapy', date: ts(2026, 1, 10) },
    { title: 'Chess Club', time: '2:00 PM - 3:30 PM', imageKey: 'games', date: ts(2026, 1, 10) },
    { title: 'Karaoke Night', time: '7:00 PM - 9:00 PM', imageKey: 'karaoke', date: ts(2026, 1, 10) },
    { title: 'Breakfast Social', time: '8:00 AM - 9:00 AM', imageKey: 'breakfast', date: ts(2026, 1, 9) },
    { title: 'Garden Club', time: '10:00 AM - 11:30 AM', imageKey: 'garden', date: ts(2026, 1, 9) },
    { title: 'Morning Walk', time: '7:30 AM - 8:15 AM', imageKey: 'walking', date: ts(2026, 1, 8) },
    { title: 'Classical Music Hour', time: '3:00 PM - 4:00 PM', imageKey: 'music', date: ts(2026, 1, 8) },
    { title: 'Chess Club', time: '9:00 AM - 10:30 AM', imageKey: 'games', date: ts(2026, 1, 7) },
    { title: "Harold's Birthday Party", time: '1:00 PM - 3:00 PM', imageKey: 'birthday', date: ts(2026, 1, 7) },
    { title: 'Arts & Crafts', time: '10:00 AM - 11:30 AM', imageKey: 'crafts', date: ts(2026, 1, 6) },
    { title: 'Movie Afternoon', time: '2:00 PM - 4:00 PM', imageKey: 'movie', date: ts(2026, 1, 6) },
    { title: 'Reading Circle', time: '9:30 AM - 10:30 AM', imageKey: 'reading', date: ts(2026, 1, 5) },
    { title: 'Physical Therapy', time: '11:00 AM - 12:00 PM', imageKey: 'therapy', date: ts(2026, 1, 5) },
    { title: 'Board Games', time: '3:00 PM - 4:30 PM', imageKey: 'games', date: ts(2026, 1, 5) },
    { title: 'Morning Yoga', time: '7:00 AM - 7:45 AM', imageKey: 'yoga', date: ts(2026, 1, 4) },
    { title: "Martha's Birthday Party", time: '1:00 PM - 3:00 PM', imageKey: 'birthday', date: ts(2026, 1, 4) },
    { title: 'Breakfast Social', time: '8:00 AM - 9:00 AM', imageKey: 'breakfast', date: ts(2026, 1, 3) },
    { title: 'Bingo Night', time: '6:30 PM - 8:00 PM', imageKey: 'bingo', date: ts(2026, 1, 3) },
    { title: 'Chess Club', time: '2:00 PM - 3:30 PM', imageKey: 'games', date: ts(2026, 1, 2) },
    { title: 'Karaoke Night', time: '7:00 PM - 9:00 PM', imageKey: 'karaoke', date: ts(2026, 1, 2) },
    { title: 'Morning Walk', time: '7:30 AM - 8:15 AM', imageKey: 'walking', date: ts(2026, 1, 1) },
    { title: 'Classical Music Hour', time: '3:00 PM - 4:00 PM', imageKey: 'music', date: ts(2026, 1, 1) }
  ],
  'Dorothy Williams': [
    { title: 'Puzzle Hour', time: '9:00 AM - 10:00 AM', imageKey: 'games', date: ts(2026, 1, 14) },
    { title: 'Arts & Crafts', time: '11:00 AM - 12:30 PM', imageKey: 'crafts', date: ts(2026, 1, 14) },
    { title: 'Afternoon Tea', time: '3:00 PM - 3:45 PM', imageKey: 'lunch', date: ts(2026, 1, 14) },
    { title: 'Morning Walk', time: '8:00 AM - 8:45 AM', imageKey: 'walking', date: ts(2026, 1, 13) },
    { title: 'Reading Circle', time: '10:00 AM - 11:00 AM', imageKey: 'reading', date: ts(2026, 1, 13) },
    { title: 'Breakfast Social', time: '8:00 AM - 9:00 AM', imageKey: 'breakfast', date: ts(2026, 1, 12) },
    { title: 'Watercolor Painting', time: '1:00 PM - 2:30 PM', imageKey: 'painting', date: ts(2026, 1, 12) },
    { title: 'Movie Afternoon', time: '3:00 PM - 5:00 PM', imageKey: 'movie', date: ts(2026, 1, 12) },
    { title: 'Music Therapy', time: '9:00 AM - 10:00 AM', imageKey: 'music', date: ts(2026, 1, 11) },
    { title: 'Board Games', time: '2:00 PM - 3:30 PM', imageKey: 'games', date: ts(2026, 1, 11) },
    { title: 'Morning Yoga', time: '7:00 AM - 7:45 AM', imageKey: 'yoga', date: ts(2026, 1, 10) },
    { title: 'Puzzle Hour', time: '10:00 AM - 11:00 AM', imageKey: 'games', date: ts(2026, 1, 10) },
    { title: 'Bingo Night', time: '6:30 PM - 8:00 PM', imageKey: 'bingo', date: ts(2026, 1, 10) },
    { title: 'Physical Therapy', time: '11:00 AM - 12:00 PM', imageKey: 'therapy', date: ts(2026, 1, 9) },
    { title: 'Garden Club', time: '2:00 PM - 3:30 PM', imageKey: 'garden', date: ts(2026, 1, 9) },
    { title: 'Breakfast Social', time: '8:00 AM - 9:00 AM', imageKey: 'breakfast', date: ts(2026, 1, 8) },
    { title: 'Arts & Crafts', time: '1:00 PM - 2:30 PM', imageKey: 'crafts', date: ts(2026, 1, 8) },
    { title: 'Reading Circle', time: '9:30 AM - 10:30 AM', imageKey: 'reading', date: ts(2026, 1, 7) },
    { title: "Harold's Birthday Party", time: '1:00 PM - 3:00 PM', imageKey: 'birthday', date: ts(2026, 1, 7) },
    { title: 'Karaoke Night', time: '7:00 PM - 9:00 PM', imageKey: 'karaoke', date: ts(2026, 1, 7) },
    { title: 'Puzzle Hour', time: '9:00 AM - 10:00 AM', imageKey: 'games', date: ts(2026, 1, 6) },
    { title: 'Movie Afternoon', time: '2:00 PM - 4:00 PM', imageKey: 'movie', date: ts(2026, 1, 6) },
    { title: 'Morning Walk', time: '8:00 AM - 8:45 AM', imageKey: 'walking', date: ts(2026, 1, 5) },
    { title: 'Watercolor Painting', time: '1:00 PM - 2:30 PM', imageKey: 'painting', date: ts(2026, 1, 5) },
    { title: 'Music Therapy', time: '9:00 AM - 10:00 AM', imageKey: 'music', date: ts(2026, 1, 4) },
    { title: "Martha's Birthday Party", time: '1:00 PM - 3:00 PM', imageKey: 'birthday', date: ts(2026, 1, 4) },
    { title: 'Breakfast Social', time: '8:00 AM - 9:00 AM', imageKey: 'breakfast', date: ts(2026, 1, 3) },
    { title: 'Board Games', time: '3:00 PM - 4:30 PM', imageKey: 'games', date: ts(2026, 1, 3) },
    { title: 'Morning Yoga', time: '7:00 AM - 7:45 AM', imageKey: 'yoga', date: ts(2026, 1, 2) },
    { title: 'Bingo Night', time: '6:30 PM - 8:00 PM', imageKey: 'bingo', date: ts(2026, 1, 2) },
    { title: 'Puzzle Hour', time: '10:00 AM - 11:00 AM', imageKey: 'games', date: ts(2026, 1, 1) },
    { title: 'Afternoon Tea', time: '3:00 PM - 3:45 PM', imageKey: 'lunch', date: ts(2026, 1, 1) }
  ],
  'Harold Martinez': [
    { title: 'Watercolor Painting', time: '9:00 AM - 10:30 AM', imageKey: 'painting', date: ts(2026, 1, 14) },
    { title: 'Physical Therapy', time: '11:00 AM - 12:00 PM', imageKey: 'therapy', date: ts(2026, 1, 14) },
    { title: 'Baseball Watch Party', time: '4:00 PM - 6:00 PM', imageKey: 'movie', date: ts(2026, 1, 14) },
    { title: 'Breakfast Social', time: '8:00 AM - 9:00 AM', imageKey: 'breakfast', date: ts(2026, 1, 13) },
    { title: 'Board Games', time: '1:00 PM - 2:30 PM', imageKey: 'games', date: ts(2026, 1, 13) },
    { title: 'Karaoke Night', time: '7:00 PM - 9:00 PM', imageKey: 'karaoke', date: ts(2026, 1, 13) },
    { title: 'Morning Walk', time: '8:00 AM - 8:45 AM', imageKey: 'walking', date: ts(2026, 1, 12) },
    { title: 'Arts & Crafts', time: '10:00 AM - 11:30 AM', imageKey: 'crafts', date: ts(2026, 1, 12) },
    { title: 'Watercolor Painting', time: '9:00 AM - 10:30 AM', imageKey: 'painting', date: ts(2026, 1, 11) },
    { title: 'Music Therapy', time: '2:00 PM - 3:00 PM', imageKey: 'music', date: ts(2026, 1, 11) },
    { title: 'Movie Afternoon', time: '4:00 PM - 6:00 PM', imageKey: 'movie', date: ts(2026, 1, 11) },
    { title: 'Physical Therapy', time: '11:00 AM - 12:00 PM', imageKey: 'therapy', date: ts(2026, 1, 10) },
    { title: 'Bingo Night', time: '6:30 PM - 8:00 PM', imageKey: 'bingo', date: ts(2026, 1, 10) },
    { title: 'Breakfast Social', time: '8:00 AM - 9:00 AM', imageKey: 'breakfast', date: ts(2026, 1, 9) },
    { title: 'Garden Club', time: '10:00 AM - 11:30 AM', imageKey: 'garden', date: ts(2026, 1, 9) },
    { title: 'Baseball Watch Party', time: '4:00 PM - 6:00 PM', imageKey: 'movie', date: ts(2026, 1, 9) },
    { title: 'Reading Circle', time: '9:30 AM - 10:30 AM', imageKey: 'reading', date: ts(2026, 1, 8) },
    { title: 'Watercolor Painting', time: '1:00 PM - 2:30 PM', imageKey: 'painting', date: ts(2026, 1, 8) },
    { title: "Harold's Birthday Party", time: '12:00 PM - 2:00 PM', imageKey: 'birthday', date: ts(2026, 1, 7) },
    { title: 'Karaoke Night', time: '7:00 PM - 9:00 PM', imageKey: 'karaoke', date: ts(2026, 1, 7) },
    { title: 'Morning Walk', time: '8:00 AM - 8:45 AM', imageKey: 'walking', date: ts(2026, 1, 6) },
    { title: 'Board Games', time: '2:00 PM - 3:30 PM', imageKey: 'games', date: ts(2026, 1, 6) },
    { title: 'Physical Therapy', time: '11:00 AM - 12:00 PM', imageKey: 'therapy', date: ts(2026, 1, 5) },
    { title: 'Music Therapy', time: '3:00 PM - 4:00 PM', imageKey: 'music', date: ts(2026, 1, 5) },
    { title: 'Watercolor Painting', time: '9:00 AM - 10:30 AM', imageKey: 'painting', date: ts(2026, 1, 4) },
    { title: "Martha's Birthday Party", time: '1:00 PM - 3:00 PM', imageKey: 'birthday', date: ts(2026, 1, 4) },
    { title: 'Breakfast Social', time: '8:00 AM - 9:00 AM', imageKey: 'breakfast', date: ts(2026, 1, 3) },
    { title: 'Arts & Crafts', time: '10:00 AM - 11:30 AM', imageKey: 'crafts', date: ts(2026, 1, 3) },
    { title: 'Morning Yoga', time: '7:00 AM - 7:45 AM', imageKey: 'yoga', date: ts(2026, 1, 2) },
    { title: 'Baseball Watch Party', time: '4:00 PM - 6:00 PM', imageKey: 'movie', date: ts(2026, 1, 2) },
    { title: 'Reading Circle', time: '9:30 AM - 10:30 AM', imageKey: 'reading', date: ts(2026, 1, 1) },
    { title: 'Bingo Night', time: '6:30 PM - 8:00 PM', imageKey: 'bingo', date: ts(2026, 1, 1) }
  ],
  'Eleanor Davis': [
    { title: 'Birdwatching Walk', time: '7:00 AM - 8:00 AM', imageKey: 'walking', date: ts(2026, 1, 14) },
    { title: 'Knitting Circle', time: '10:00 AM - 11:30 AM', imageKey: 'crafts', date: ts(2026, 1, 14) },
    { title: 'Afternoon Tea', time: '3:00 PM - 3:45 PM', imageKey: 'lunch', date: ts(2026, 1, 14) },
    { title: 'Morning Yoga', time: '7:00 AM - 7:45 AM', imageKey: 'yoga', date: ts(2026, 1, 13) },
    { title: 'Garden Club', time: '10:00 AM - 11:30 AM', imageKey: 'garden', date: ts(2026, 1, 13) },
    { title: 'Music Therapy', time: '2:00 PM - 3:00 PM', imageKey: 'music', date: ts(2026, 1, 13) },
    { title: 'Breakfast Social', time: '8:00 AM - 9:00 AM', imageKey: 'breakfast', date: ts(2026, 1, 12) },
    { title: 'Reading Circle', time: '10:00 AM - 11:00 AM', imageKey: 'reading', date: ts(2026, 1, 12) },
    { title: 'Birdwatching Walk', time: '7:00 AM - 8:00 AM', imageKey: 'walking', date: ts(2026, 1, 11) },
    { title: 'Watercolor Painting', time: '1:00 PM - 2:30 PM', imageKey: 'painting', date: ts(2026, 1, 11) },
    { title: 'Bingo Night', time: '6:30 PM - 8:00 PM', imageKey: 'bingo', date: ts(2026, 1, 11) },
    { title: 'Knitting Circle', time: '10:00 AM - 11:30 AM', imageKey: 'crafts', date: ts(2026, 1, 10) },
    { title: 'Movie Afternoon', time: '2:00 PM - 4:00 PM', imageKey: 'movie', date: ts(2026, 1, 10) },
    { title: 'Morning Yoga', time: '7:00 AM - 7:45 AM', imageKey: 'yoga', date: ts(2026, 1, 9) },
    { title: 'Garden Club', time: '10:00 AM - 11:30 AM', imageKey: 'garden', date: ts(2026, 1, 9) },
    { title: 'Afternoon Tea', time: '3:00 PM - 3:45 PM', imageKey: 'lunch', date: ts(2026, 1, 9) },
    { title: 'Physical Therapy', time: '11:00 AM - 12:00 PM', imageKey: 'therapy', date: ts(2026, 1, 8) },
    { title: 'Board Games', time: '2:00 PM - 3:30 PM', imageKey: 'games', date: ts(2026, 1, 8) },
    { title: 'Birdwatching Walk', time: '7:00 AM - 8:00 AM', imageKey: 'walking', date: ts(2026, 1, 7) },
    { title: "Harold's Birthday Party", time: '1:00 PM - 3:00 PM', imageKey: 'birthday', date: ts(2026, 1, 7) },
    { title: 'Breakfast Social', time: '8:00 AM - 9:00 AM', imageKey: 'breakfast', date: ts(2026, 1, 6) },
    { title: 'Knitting Circle', time: '10:00 AM - 11:30 AM', imageKey: 'crafts', date: ts(2026, 1, 6) },
    { title: 'Karaoke Night', time: '7:00 PM - 9:00 PM', imageKey: 'karaoke', date: ts(2026, 1, 6) },
    { title: 'Reading Circle', time: '9:30 AM - 10:30 AM', imageKey: 'reading', date: ts(2026, 1, 5) },
    { title: 'Music Therapy', time: '2:00 PM - 3:00 PM', imageKey: 'music', date: ts(2026, 1, 5) },
    { title: 'Morning Yoga', time: '7:00 AM - 7:45 AM', imageKey: 'yoga', date: ts(2026, 1, 4) },
    { title: "Martha's Birthday Party", time: '1:00 PM - 3:00 PM', imageKey: 'birthday', date: ts(2026, 1, 4) },
    { title: 'Birdwatching Walk', time: '7:00 AM - 8:00 AM', imageKey: 'walking', date: ts(2026, 1, 3) },
    { title: 'Watercolor Painting', time: '1:00 PM - 2:30 PM', imageKey: 'painting', date: ts(2026, 1, 3) },
    { title: 'Garden Club', time: '10:00 AM - 11:30 AM', imageKey: 'garden', date: ts(2026, 1, 2) },
    { title: 'Bingo Night', time: '6:30 PM - 8:00 PM', imageKey: 'bingo', date: ts(2026, 1, 2) },
    { title: 'Knitting Circle', time: '10:00 AM - 11:30 AM', imageKey: 'crafts', date: ts(2026, 1, 1) },
    { title: 'Afternoon Tea', time: '3:00 PM - 3:45 PM', imageKey: 'lunch', date: ts(2026, 1, 1) }
  ],
  'James Wilson': [
    { title: 'Crossword Challenge', time: '9:00 AM - 10:00 AM', imageKey: 'games', date: ts(2026, 1, 14) },
    { title: 'History Documentary', time: '2:00 PM - 3:30 PM', imageKey: 'movie', date: ts(2026, 1, 14) },
    { title: 'Morning Walk', time: '7:30 AM - 8:15 AM', imageKey: 'walking', date: ts(2026, 1, 13) },
    { title: 'Board Games', time: '10:00 AM - 11:30 AM', imageKey: 'games', date: ts(2026, 1, 13) },
    { title: 'Karaoke Night', time: '7:00 PM - 9:00 PM', imageKey: 'karaoke', date: ts(2026, 1, 13) },
    { title: 'Breakfast Social', time: '8:00 AM - 9:00 AM', imageKey: 'breakfast', date: ts(2026, 1, 12) },
    { title: 'Physical Therapy', time: '11:00 AM - 12:00 PM', imageKey: 'therapy', date: ts(2026, 1, 12) },
    { title: 'Crossword Challenge', time: '2:00 PM - 3:00 PM', imageKey: 'games', date: ts(2026, 1, 12) },
    { title: 'Reading Circle', time: '9:30 AM - 10:30 AM', imageKey: 'reading', date: ts(2026, 1, 11) },
    { title: 'History Documentary', time: '2:00 PM - 3:30 PM', imageKey: 'movie', date: ts(2026, 1, 11) },
    { title: 'Bingo Night', time: '6:30 PM - 8:00 PM', imageKey: 'bingo', date: ts(2026, 1, 11) },
    { title: 'Morning Yoga', time: '7:00 AM - 7:45 AM', imageKey: 'yoga', date: ts(2026, 1, 10) },
    { title: 'Garden Club', time: '10:00 AM - 11:30 AM', imageKey: 'garden', date: ts(2026, 1, 10) },
    { title: 'Crossword Challenge', time: '9:00 AM - 10:00 AM', imageKey: 'games', date: ts(2026, 1, 9) },
    { title: 'Arts & Crafts', time: '1:00 PM - 2:30 PM', imageKey: 'crafts', date: ts(2026, 1, 9) },
    { title: 'Morning Walk', time: '7:30 AM - 8:15 AM', imageKey: 'walking', date: ts(2026, 1, 8) },
    { title: 'Board Games', time: '2:00 PM - 3:30 PM', imageKey: 'games', date: ts(2026, 1, 8) },
    { title: 'Music Therapy', time: '4:00 PM - 5:00 PM', imageKey: 'music', date: ts(2026, 1, 8) },
    { title: 'Breakfast Social', time: '8:00 AM - 9:00 AM', imageKey: 'breakfast', date: ts(2026, 1, 7) },
    { title: "Harold's Birthday Party", time: '1:00 PM - 3:00 PM', imageKey: 'birthday', date: ts(2026, 1, 7) },
    { title: 'Physical Therapy', time: '11:00 AM - 12:00 PM', imageKey: 'therapy', date: ts(2026, 1, 6) },
    { title: 'History Documentary', time: '2:00 PM - 3:30 PM', imageKey: 'movie', date: ts(2026, 1, 6) },
    { title: 'Crossword Challenge', time: '9:00 AM - 10:00 AM', imageKey: 'games', date: ts(2026, 1, 5) },
    { title: 'Karaoke Night', time: '7:00 PM - 9:00 PM', imageKey: 'karaoke', date: ts(2026, 1, 5) },
    { title: 'Reading Circle', time: '9:30 AM - 10:30 AM', imageKey: 'reading', date: ts(2026, 1, 4) },
    { title: "Martha's Birthday Party", time: '1:00 PM - 3:00 PM', imageKey: 'birthday', date: ts(2026, 1, 4) },
    { title: 'Morning Walk', time: '7:30 AM - 8:15 AM', imageKey: 'walking', date: ts(2026, 1, 3) },
    { title: 'Board Games', time: '1:00 PM - 2:30 PM', imageKey: 'games', date: ts(2026, 1, 3) },
    { title: 'Morning Yoga', time: '7:00 AM - 7:45 AM', imageKey: 'yoga', date: ts(2026, 1, 2) },
    { title: 'Bingo Night', time: '6:30 PM - 8:00 PM', imageKey: 'bingo', date: ts(2026, 1, 2) },
    { title: 'Crossword Challenge', time: '9:00 AM - 10:00 AM', imageKey: 'games', date: ts(2026, 1, 1) },
    { title: 'History Documentary', time: '2:00 PM - 3:30 PM', imageKey: 'movie', date: ts(2026, 1, 1) }
  ],
  'Betty Johnson': [
    { title: 'Piano Practice', time: '8:00 AM - 9:00 AM', imageKey: 'music', date: ts(2026, 1, 14) },
    { title: 'Arts & Crafts', time: '10:00 AM - 11:30 AM', imageKey: 'crafts', date: ts(2026, 1, 14) },
    { title: 'Afternoon Tea', time: '3:00 PM - 3:45 PM', imageKey: 'lunch', date: ts(2026, 1, 14) },
    { title: 'Morning Yoga', time: '7:00 AM - 7:45 AM', imageKey: 'yoga', date: ts(2026, 1, 13) },
    { title: 'Reading Circle', time: '10:00 AM - 11:00 AM', imageKey: 'reading', date: ts(2026, 1, 13) },
    { title: 'Karaoke Night', time: '7:00 PM - 9:00 PM', imageKey: 'karaoke', date: ts(2026, 1, 13) },
    { title: 'Breakfast Social', time: '8:00 AM - 9:00 AM', imageKey: 'breakfast', date: ts(2026, 1, 12) },
    { title: 'Piano Practice', time: '11:00 AM - 12:00 PM', imageKey: 'music', date: ts(2026, 1, 12) },
    { title: 'Movie Afternoon', time: '2:00 PM - 4:00 PM', imageKey: 'movie', date: ts(2026, 1, 12) },
    { title: 'Garden Club', time: '10:00 AM - 11:30 AM', imageKey: 'garden', date: ts(2026, 1, 11) },
    { title: 'Watercolor Painting', time: '1:00 PM - 2:30 PM', imageKey: 'painting', date: ts(2026, 1, 11) },
    { title: 'Morning Walk', time: '7:30 AM - 8:15 AM', imageKey: 'walking', date: ts(2026, 1, 10) },
    { title: 'Board Games', time: '1:00 PM - 2:30 PM', imageKey: 'games', date: ts(2026, 1, 10) },
    { title: 'Bingo Night', time: '6:30 PM - 8:00 PM', imageKey: 'bingo', date: ts(2026, 1, 10) },
    { title: 'Piano Practice', time: '8:00 AM - 9:00 AM', imageKey: 'music', date: ts(2026, 1, 9) },
    { title: 'Physical Therapy', time: '11:00 AM - 12:00 PM', imageKey: 'therapy', date: ts(2026, 1, 9) },
    { title: 'Breakfast Social', time: '8:00 AM - 9:00 AM', imageKey: 'breakfast', date: ts(2026, 1, 8) },
    { title: 'Arts & Crafts', time: '10:00 AM - 11:30 AM', imageKey: 'crafts', date: ts(2026, 1, 8) },
    { title: 'Music Therapy', time: '2:00 PM - 3:00 PM', imageKey: 'music', date: ts(2026, 1, 8) },
    { title: 'Morning Yoga', time: '7:00 AM - 7:45 AM', imageKey: 'yoga', date: ts(2026, 1, 7) },
    { title: "Harold's Birthday Party", time: '1:00 PM - 3:00 PM', imageKey: 'birthday', date: ts(2026, 1, 7) },
    { title: 'Piano Practice', time: '8:00 AM - 9:00 AM', imageKey: 'music', date: ts(2026, 1, 6) },
    { title: 'Reading Circle', time: '10:00 AM - 11:00 AM', imageKey: 'reading', date: ts(2026, 1, 6) },
    { title: 'Karaoke Night', time: '7:00 PM - 9:00 PM', imageKey: 'karaoke', date: ts(2026, 1, 6) },
    { title: 'Garden Club', time: '10:00 AM - 11:30 AM', imageKey: 'garden', date: ts(2026, 1, 5) },
    { title: 'Movie Afternoon', time: '2:00 PM - 4:00 PM', imageKey: 'movie', date: ts(2026, 1, 5) },
    { title: 'Morning Walk', time: '7:30 AM - 8:15 AM', imageKey: 'walking', date: ts(2026, 1, 4) },
    { title: "Martha's Birthday Party", time: '1:00 PM - 3:00 PM', imageKey: 'birthday', date: ts(2026, 1, 4) },
    { title: 'Breakfast Social', time: '8:00 AM - 9:00 AM', imageKey: 'breakfast', date: ts(2026, 1, 3) },
    { title: 'Piano Practice', time: '11:00 AM - 12:00 PM', imageKey: 'music', date: ts(2026, 1, 3) },
    { title: 'Watercolor Painting', time: '1:00 PM - 2:30 PM', imageKey: 'painting', date: ts(2026, 1, 2) },
    { title: 'Bingo Night', time: '6:30 PM - 8:00 PM', imageKey: 'bingo', date: ts(2026, 1, 2) },
    { title: 'Piano Practice', time: '8:00 AM - 9:00 AM', imageKey: 'music', date: ts(2026, 1, 1) },
    { title: 'Board Games', time: '2:00 PM - 3:30 PM', imageKey: 'games', date: ts(2026, 1, 1) }
  ]
};

// ---------------------------------------------------------------------------
// APPOINTMENTS
// ---------------------------------------------------------------------------
const APPOINTMENTS = {
  'Margaret Thompson': [
    { title: 'Family Video Call', date: 'Monday, February 2', time: '2:00 PM - 2:30 PM', type: 'video' },
    { title: 'Doctor Check-up', date: 'Wednesday, February 4', time: '10:00 AM - 10:45 AM', type: 'in-person' },
    { title: 'Physical Therapy', date: 'Friday, February 6', time: '3:00 PM - 4:00 PM', type: 'in-person' },
    { title: 'Dentist Appointment', date: 'Monday, February 9', time: '9:00 AM - 9:45 AM', type: 'in-person' }
  ],
  'Robert Chen': [
    { title: 'Son Video Call', date: 'Tuesday, February 3', time: '11:00 AM - 11:30 AM', type: 'video' },
    { title: 'Endocrinologist Visit', date: 'Thursday, February 5', time: '9:00 AM - 9:45 AM', type: 'in-person' },
    { title: 'Physical Therapy', date: 'Friday, February 6', time: '1:00 PM - 2:00 PM', type: 'in-person' }
  ],
  'Dorothy Williams': [
    { title: 'Hearing Specialist', date: 'Monday, February 2', time: '10:00 AM - 10:45 AM', type: 'in-person' },
    { title: 'Family Video Call', date: 'Wednesday, February 4', time: '3:00 PM - 3:30 PM', type: 'video' },
    { title: 'Doctor Check-up', date: 'Friday, February 6', time: '11:00 AM - 11:45 AM', type: 'in-person' },
    { title: 'Grandson Phone Call', date: 'Sunday, February 8', time: '5:00 PM - 5:30 PM', type: 'phone' }
  ],
  'Harold Martinez': [
    { title: 'Orthopedic Check-up', date: 'Tuesday, February 3', time: '9:00 AM - 10:00 AM', type: 'in-person' },
    { title: 'Daughter Video Call', date: 'Thursday, February 5', time: '4:00 PM - 4:30 PM', type: 'video' },
    { title: 'Physical Therapy', date: 'Saturday, February 7', time: '10:00 AM - 11:00 AM', type: 'in-person' }
  ],
  'Eleanor Davis': [
    { title: 'Family Video Call', date: 'Monday, February 2', time: '1:00 PM - 1:30 PM', type: 'video' },
    { title: 'Eye Exam', date: 'Wednesday, February 4', time: '2:00 PM - 2:45 PM', type: 'in-person' },
    { title: 'Doctor Check-up', date: 'Friday, February 6', time: '9:00 AM - 9:45 AM', type: 'in-person' },
    { title: 'Niece Phone Call', date: 'Saturday, February 7', time: '6:00 PM - 6:30 PM', type: 'phone' }
  ],
  'James Wilson': [
    { title: 'Doctor Check-up', date: 'Tuesday, February 3', time: '10:00 AM - 10:45 AM', type: 'in-person' },
    { title: 'Wife Video Call', date: 'Thursday, February 5', time: '2:00 PM - 2:30 PM', type: 'video' },
    { title: 'Physical Therapy', date: 'Saturday, February 7', time: '11:00 AM - 12:00 PM', type: 'in-person' }
  ],
  'Betty Johnson': [
    { title: 'Family Video Call', date: 'Monday, February 2', time: '3:00 PM - 3:30 PM', type: 'video' },
    { title: 'Doctor Check-up', date: 'Wednesday, February 4', time: '11:00 AM - 11:45 AM', type: 'in-person' },
    { title: 'Son Phone Call', date: 'Friday, February 6', time: '5:00 PM - 5:30 PM', type: 'phone' },
    { title: 'Nutritionist Visit', date: 'Monday, February 9', time: '10:00 AM - 10:30 AM', type: 'in-person' }
  ]
};

// ---------------------------------------------------------------------------
// MOOD ENTRIES
// ---------------------------------------------------------------------------
const MOOD_ENTRIES = {
  'Margaret Thompson': [
    { date: '2026-02-14', mood: 'Great', notes: 'Loved the garden club session today' },
    { date: '2026-02-13', mood: 'Good', notes: 'Enjoyed painting with friends' },
    { date: '2026-02-12', mood: 'Great', notes: 'Very active and social today' },
    { date: '2026-02-11', mood: 'Okay', notes: 'Quiet afternoon, read a book' },
    { date: '2026-02-10', mood: 'Good', notes: 'Won two rounds of bingo' },
    { date: '2026-02-09', mood: 'Great', notes: 'Went for a nice walk in the garden' },
    { date: '2026-02-08', mood: 'Good', notes: 'Enjoyed the movie afternoon' },
    { date: '2026-02-07', mood: 'Great', notes: "Harold's birthday was a blast" },
    { date: '2026-02-06', mood: 'Okay', notes: 'Felt a bit tired after therapy' },
    { date: '2026-02-05', mood: 'Good', notes: 'Karaoke night was fun' },
    { date: '2026-02-04', mood: 'Great', notes: "Martha's birthday party was wonderful" },
    { date: '2026-02-03', mood: 'Good', notes: 'Enjoyed breakfast with everyone' },
    { date: '2026-02-02', mood: 'Okay', notes: 'Quiet day, played some games' },
    { date: '2026-02-01', mood: 'Good', notes: 'Morning yoga was refreshing' }
  ],
  'Robert Chen': [
    { date: '2026-02-14', mood: 'Good', notes: 'Won the chess tournament' },
    { date: '2026-02-13', mood: 'Great', notes: 'Had a great walk and reading session' },
    { date: '2026-02-12', mood: 'Good', notes: 'Enjoyed breakfast social' },
    { date: '2026-02-11', mood: 'Okay', notes: 'Blood sugar was a bit high today' },
    { date: '2026-02-10', mood: 'Good', notes: 'Physical therapy went well' },
    { date: '2026-02-09', mood: 'Great', notes: 'Garden club was relaxing' },
    { date: '2026-02-08', mood: 'Good', notes: 'Listened to classical music' },
    { date: '2026-02-07', mood: 'Great', notes: "Harold's party was nice" },
    { date: '2026-02-06', mood: 'Okay', notes: 'Quiet day with crafts' },
    { date: '2026-02-05', mood: 'Good', notes: 'Enjoyed the reading circle' },
    { date: '2026-02-04', mood: 'Good', notes: 'Morning yoga was calming' },
    { date: '2026-02-03', mood: 'Great', notes: 'Bingo night was exciting' },
    { date: '2026-02-02', mood: 'Good', notes: 'Chess and karaoke day' },
    { date: '2026-02-01', mood: 'Okay', notes: 'Relaxed with a walk' }
  ],
  'Dorothy Williams': [
    { date: '2026-02-14', mood: 'Good', notes: 'Puzzle time was enjoyable' },
    { date: '2026-02-13', mood: 'Good', notes: 'Nice morning walk' },
    { date: '2026-02-12', mood: 'Great', notes: 'Loved the movie afternoon' },
    { date: '2026-02-11', mood: 'Okay', notes: 'Hearing aid acting up' },
    { date: '2026-02-10', mood: 'Good', notes: 'Bingo night was a hit' },
    { date: '2026-02-09', mood: 'Good', notes: 'Garden was beautiful today' },
    { date: '2026-02-08', mood: 'Okay', notes: 'Ate well, quiet afternoon' },
    { date: '2026-02-07', mood: 'Great', notes: 'Had a wonderful time at the party' },
    { date: '2026-02-06', mood: 'Good', notes: 'Puzzles and a movie' },
    { date: '2026-02-05', mood: 'Good', notes: 'Painting session was relaxing' },
    { date: '2026-02-04', mood: 'Great', notes: "Martha's party was lovely" },
    { date: '2026-02-03', mood: 'Good', notes: 'Enjoyed board games' },
    { date: '2026-02-02', mood: 'Good', notes: 'Morning yoga went well' },
    { date: '2026-02-01', mood: 'Okay', notes: 'Tea and puzzles' }
  ],
  'Harold Martinez': [
    { date: '2026-02-14', mood: 'Great', notes: 'Painted a landscape, watched the game' },
    { date: '2026-02-13', mood: 'Good', notes: 'Karaoke was lots of fun' },
    { date: '2026-02-12', mood: 'Good', notes: 'Nice morning walk' },
    { date: '2026-02-11', mood: 'Okay', notes: 'Walker adjustment day' },
    { date: '2026-02-10', mood: 'Good', notes: 'Bingo was great' },
    { date: '2026-02-09', mood: 'Great', notes: 'Baseball team won!' },
    { date: '2026-02-08', mood: 'Good', notes: 'Reading and painting' },
    { date: '2026-02-07', mood: 'Great', notes: 'My birthday party was amazing!' },
    { date: '2026-02-06', mood: 'Good', notes: 'Walked outside, played games' },
    { date: '2026-02-05', mood: 'Okay', notes: 'Therapy was tiring' },
    { date: '2026-02-04', mood: 'Good', notes: "Martha's party was fun" },
    { date: '2026-02-03', mood: 'Good', notes: 'Crafts and breakfast' },
    { date: '2026-02-02', mood: 'Great', notes: 'Yoga and baseball' },
    { date: '2026-02-01', mood: 'Good', notes: 'Bingo night was exciting' }
  ],
  'Eleanor Davis': [
    { date: '2026-02-14', mood: 'Great', notes: 'Spotted a cardinal during birdwatching' },
    { date: '2026-02-13', mood: 'Good', notes: 'Garden and music were lovely' },
    { date: '2026-02-12', mood: 'Good', notes: 'Nice breakfast and reading' },
    { date: '2026-02-11', mood: 'Great', notes: 'Birdwatching was magical today' },
    { date: '2026-02-10', mood: 'Okay', notes: 'Knitting and a quiet movie' },
    { date: '2026-02-09', mood: 'Good', notes: 'Garden club and tea' },
    { date: '2026-02-08', mood: 'Good', notes: 'Board games after therapy' },
    { date: '2026-02-07', mood: 'Great', notes: "Harold's party was wonderful" },
    { date: '2026-02-06', mood: 'Good', notes: 'Karaoke and knitting' },
    { date: '2026-02-05', mood: 'Okay', notes: 'Quiet reading day' },
    { date: '2026-02-04', mood: 'Good', notes: "Martha's party celebration" },
    { date: '2026-02-03', mood: 'Good', notes: 'Birdwatching and painting' },
    { date: '2026-02-02', mood: 'Great', notes: 'Garden club was beautiful' },
    { date: '2026-02-01', mood: 'Good', notes: 'Knitting and tea' }
  ],
  'James Wilson': [
    { date: '2026-02-14', mood: 'Good', notes: 'Finished the crossword quickly today' },
    { date: '2026-02-13', mood: 'Great', notes: 'Karaoke night was surprisingly fun' },
    { date: '2026-02-12', mood: 'Good', notes: 'Therapy and puzzles' },
    { date: '2026-02-11', mood: 'Good', notes: 'Documentary about WWII was fascinating' },
    { date: '2026-02-10', mood: 'Okay', notes: 'Quiet day in the garden' },
    { date: '2026-02-09', mood: 'Good', notes: 'Crosswords and crafts' },
    { date: '2026-02-08', mood: 'Great', notes: 'Won all the board games' },
    { date: '2026-02-07', mood: 'Good', notes: "Harold's birthday was great" },
    { date: '2026-02-06', mood: 'Okay', notes: 'Documentary and rest' },
    { date: '2026-02-05', mood: 'Good', notes: 'Karaoke was enjoyable' },
    { date: '2026-02-04', mood: 'Good', notes: "Martha's party was nice" },
    { date: '2026-02-03', mood: 'Okay', notes: 'Walk and board games' },
    { date: '2026-02-02', mood: 'Good', notes: 'Yoga and bingo' },
    { date: '2026-02-01', mood: 'Great', notes: 'Crossword personal best' }
  ],
  'Betty Johnson': [
    { date: '2026-02-14', mood: 'Great', notes: 'Played piano for everyone at tea' },
    { date: '2026-02-13', mood: 'Good', notes: 'Karaoke and reading' },
    { date: '2026-02-12', mood: 'Great', notes: 'Piano and a movie' },
    { date: '2026-02-11', mood: 'Good', notes: 'Garden and painting' },
    { date: '2026-02-10', mood: 'Good', notes: 'Won at bingo again' },
    { date: '2026-02-09', mood: 'Okay', notes: 'Therapy was tiring' },
    { date: '2026-02-08', mood: 'Great', notes: 'Arts and crafts were wonderful' },
    { date: '2026-02-07', mood: 'Good', notes: "Harold's party was lovely" },
    { date: '2026-02-06', mood: 'Great', notes: 'Piano recital went well' },
    { date: '2026-02-05', mood: 'Good', notes: 'Garden club and movie' },
    { date: '2026-02-04', mood: 'Good', notes: "Martha's party celebration" },
    { date: '2026-02-03', mood: 'Good', notes: 'Piano practice and breakfast' },
    { date: '2026-02-02', mood: 'Great', notes: 'Painting and bingo' },
    { date: '2026-02-01', mood: 'Good', notes: 'Piano and board games' }
  ]
};

// ---------------------------------------------------------------------------
// SEEDING LOGIC
// ---------------------------------------------------------------------------
async function seed() {
  console.log('Starting Firestore seed...\n');

  // 1. Get existing users to avoid overwriting
  const existingSnapshot = await getDocs(collection(db, 'users'));
  const existingByName = {};
  existingSnapshot.docs.forEach((d) => {
    existingByName[d.data().name] = d.id;
  });
  console.log(`Found ${Object.keys(existingByName).length} existing user(s) in Firestore.\n`);

  for (const patient of PATIENTS) {
    let userId;

    if (existingByName[patient.name]) {
      // Patient already exists — update their profile fields but keep their doc
      userId = existingByName[patient.name];
      await setDoc(doc(db, 'users', userId), patient, { merge: true });
      console.log(`Updated existing patient: ${patient.name} (${userId})`);
    } else {
      // New patient — create a new doc
      const docRef = await addDoc(collection(db, 'users'), patient);
      userId = docRef.id;
      console.log(`Created new patient: ${patient.name} (${userId})`);
    }

    // 2. Seed activities subcollection
    const activities = ACTIVITIES[patient.name] || [];
    let actCount = 0;
    for (const activity of activities) {
      await addDoc(collection(db, 'users', userId, 'activities'), activity);
      actCount++;
    }
    console.log(`  -> ${actCount} activities`);

    // 3. Seed appointments subcollection
    const appointments = APPOINTMENTS[patient.name] || [];
    let apptCount = 0;
    for (const appointment of appointments) {
      await addDoc(collection(db, 'users', userId, 'appointments'), appointment);
      apptCount++;
    }
    console.log(`  -> ${apptCount} appointments`);

    // 4. Seed mood entries subcollection
    const moodEntries = MOOD_ENTRIES[patient.name] || [];
    let moodCount = 0;
    for (const entry of moodEntries) {
      await addDoc(collection(db, 'users', userId, 'moodEntries'), entry);
      moodCount++;
    }
    console.log(`  -> ${moodCount} mood entries`);
    console.log('');
  }

  console.log('Seed complete!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
