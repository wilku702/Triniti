/**
 * Demo Data Seeding Script
 * Adds today's activities + chat messages for demo screenshots.
 * Run with: node scripts/seedDemoData.mjs
 */

import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, getDocs, addDoc, query, where, Timestamp
} from 'firebase/firestore';

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

const today = Timestamp.fromDate(new Date(2026, 1, 15)); // Feb 15, 2026

// Today's activities for key patients
const TODAY_ACTIVITIES = {
  'Margaret Thompson': [
    { title: 'Morning Yoga', time: '7:00 AM - 7:45 AM', imageKey: 'yoga', date: today },
    { title: 'Garden Club', time: '10:00 AM - 11:30 AM', imageKey: 'garden', date: today },
    { title: 'Reading Circle', time: '2:00 PM - 3:00 PM', imageKey: 'reading', date: today }
  ],
  'Betty Johnson': [
    { title: 'Piano Practice', time: '8:00 AM - 9:00 AM', imageKey: 'music', date: today },
    { title: 'Arts & Crafts', time: '10:00 AM - 11:30 AM', imageKey: 'crafts', date: today },
    { title: 'Afternoon Tea', time: '3:00 PM - 3:45 PM', imageKey: 'lunch', date: today }
  ],
  'Robert Chen': [
    { title: 'Chess Club', time: '9:00 AM - 10:30 AM', imageKey: 'games', date: today },
    { title: 'Physical Therapy', time: '11:00 AM - 12:00 PM', imageKey: 'therapy', date: today }
  ],
  'Dorothy Williams': [
    { title: 'Puzzle Hour', time: '9:00 AM - 10:00 AM', imageKey: 'games', date: today },
    { title: 'Watercolor Painting', time: '1:00 PM - 2:30 PM', imageKey: 'painting', date: today }
  ],
  'Harold Martinez': [
    { title: 'Watercolor Painting', time: '9:00 AM - 10:30 AM', imageKey: 'painting', date: today },
    { title: 'Baseball Watch Party', time: '4:00 PM - 6:00 PM', imageKey: 'movie', date: today }
  ],
  'Eleanor Davis': [
    { title: 'Birdwatching Walk', time: '7:00 AM - 8:00 AM', imageKey: 'walking', date: today },
    { title: 'Knitting Circle', time: '10:00 AM - 11:30 AM', imageKey: 'crafts', date: today }
  ],
  'James Wilson': [
    { title: 'Crossword Challenge', time: '9:00 AM - 10:00 AM', imageKey: 'games', date: today },
    { title: 'History Documentary', time: '2:00 PM - 3:30 PM', imageKey: 'movie', date: today }
  ]
};

// Today's mood for Margaret Thompson (so the calendar shows today)
const TODAY_MOOD = {
  'Margaret Thompson': { date: '2026-02-15', mood: 'Great', notes: 'Beautiful morning in the garden' },
  'Betty Johnson': { date: '2026-02-15', mood: 'Good', notes: 'Piano recital went wonderfully' }
};

// Chat messages for Betty Johnson (between staff and family)
const CHAT_MESSAGES = [
  {
    text: 'Hi! Just checking in on Mom. How is she doing today?',
    senderId: 'family-user-id',
    senderName: 'Michael Johnson',
    senderRole: 'family',
    timestamp: Timestamp.fromDate(new Date(2026, 1, 15, 9, 15)),
    read: true
  },
  {
    text: 'Good morning Michael! Betty is doing great today. She played piano this morning and everyone loved it.',
    senderId: 'staff-user-id',
    senderName: 'Nurse Sarah',
    senderRole: 'staff',
    timestamp: Timestamp.fromDate(new Date(2026, 1, 15, 9, 22)),
    read: true
  },
  {
    text: "That's wonderful to hear! She always loved playing for an audience.",
    senderId: 'family-user-id',
    senderName: 'Michael Johnson',
    senderRole: 'family',
    timestamp: Timestamp.fromDate(new Date(2026, 1, 15, 9, 25)),
    read: true
  },
  {
    text: 'She has Arts & Crafts at 10 and Afternoon Tea at 3. Would you like to join the video call during tea time?',
    senderId: 'staff-user-id',
    senderName: 'Nurse Sarah',
    senderRole: 'staff',
    timestamp: Timestamp.fromDate(new Date(2026, 1, 15, 9, 30)),
    read: true
  },
  {
    text: "Yes, I'd love that! I'll be online at 3 PM. Thank you for taking such great care of her.",
    senderId: 'family-user-id',
    senderName: 'Michael Johnson',
    senderRole: 'family',
    timestamp: Timestamp.fromDate(new Date(2026, 1, 15, 9, 35)),
    read: true
  },
  {
    text: "Of course! We'll make sure she's ready. She's been in such a good mood lately.",
    senderId: 'staff-user-id',
    senderName: 'Nurse Sarah',
    senderRole: 'staff',
    timestamp: Timestamp.fromDate(new Date(2026, 1, 15, 9, 38)),
    read: true
  }
];

async function seed() {
  console.log('Seeding demo data...\n');

  // Get all patients
  const usersSnap = await getDocs(collection(db, 'users'));
  const patientMap = {};
  usersSnap.docs.forEach((d) => {
    patientMap[d.data().name] = d.id;
  });

  // 1. Add today's activities
  for (const [name, activities] of Object.entries(TODAY_ACTIVITIES)) {
    const patientId = patientMap[name];
    if (!patientId) {
      console.log(`  Skipping ${name} — not found`);
      continue;
    }
    for (const activity of activities) {
      await addDoc(collection(db, 'users', patientId, 'activities'), activity);
    }
    console.log(`Added ${activities.length} today activities for ${name}`);
  }

  // 2. Add today's mood
  for (const [name, mood] of Object.entries(TODAY_MOOD)) {
    const patientId = patientMap[name];
    if (!patientId) continue;
    await addDoc(collection(db, 'users', patientId, 'moodEntries'), mood);
    console.log(`Added today's mood for ${name}`);
  }

  // 3. Add chat messages for Betty Johnson
  const bettyId = patientMap['Betty Johnson'];
  if (bettyId) {
    for (const msg of CHAT_MESSAGES) {
      await addDoc(collection(db, 'users', bettyId, 'messages'), msg);
    }
    console.log(`\nAdded ${CHAT_MESSAGES.length} chat messages for Betty Johnson`);
  }

  console.log('\nDemo data seeded!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
