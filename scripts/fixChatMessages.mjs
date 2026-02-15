/**
 * Fix Chat Messages Script
 * Clears all existing messages for Betty Johnson and re-seeds
 * with correct Firebase Auth UIDs so bubbles render properly.
 * Run with: node scripts/fixChatMessages.mjs
 */

import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, getDocs, addDoc, deleteDoc, doc, query, where, Timestamp
} from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

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
const auth = getAuth(app);

async function fix() {
  // 1. Get real UIDs by signing in
  console.log('Getting real UIDs...');

  const staffCred = await signInWithEmailAndPassword(auth, 'staff@triniti.com', 'Test1234!');
  const staffUid = staffCred.user.uid;
  console.log(`Staff UID: ${staffUid}`);

  await auth.signOut();

  const familyCred = await signInWithEmailAndPassword(auth, 'family@triniti.com', 'Test1234!');
  const familyUid = familyCred.user.uid;
  console.log(`Family UID: ${familyUid}`);

  await auth.signOut();

  // 2. Find Betty Johnson's doc
  const usersSnap = await getDocs(collection(db, 'users'));
  let bettyId = null;
  usersSnap.docs.forEach((d) => {
    if (d.data().name === 'Betty Johnson') bettyId = d.id;
  });
  if (!bettyId) {
    console.error('Betty Johnson not found!');
    process.exit(1);
  }
  console.log(`Betty doc ID: ${bettyId}\n`);

  // 3. Delete ALL existing messages
  const msgsRef = collection(db, 'users', bettyId, 'messages');
  const existing = await getDocs(msgsRef);
  console.log(`Deleting ${existing.size} existing messages...`);
  for (const msgDoc of existing.docs) {
    await deleteDoc(doc(db, 'users', bettyId, 'messages', msgDoc.id));
  }
  console.log('All old messages deleted.\n');

  // 4. Re-seed with correct UIDs — a natural staff/family conversation
  const messages = [
    {
      text: 'Good morning! Just wanted to check in on Mom. How was her night?',
      senderId: familyUid,
      senderName: 'family@triniti.com',
      senderRole: 'family',
      timestamp: Timestamp.fromDate(new Date(2026, 1, 15, 8, 15)),
      read: true
    },
    {
      text: 'Good morning! Betty had a restful night. She slept through without any issues and woke up in good spirits this morning.',
      senderId: staffUid,
      senderName: 'staff@triniti.com',
      senderRole: 'staff',
      timestamp: Timestamp.fromDate(new Date(2026, 1, 15, 8, 22)),
      read: true
    },
    {
      text: "That's wonderful to hear! Did she eat breakfast okay?",
      senderId: familyUid,
      senderName: 'family@triniti.com',
      senderRole: 'family',
      timestamp: Timestamp.fromDate(new Date(2026, 1, 15, 8, 28)),
      read: true
    },
    {
      text: 'Yes, she had oatmeal with blueberries and some orange juice. She finished most of it which is great.',
      senderId: staffUid,
      senderName: 'staff@triniti.com',
      senderRole: 'staff',
      timestamp: Timestamp.fromDate(new Date(2026, 1, 15, 8, 35)),
      read: true
    },
    {
      text: "That makes me so happy. She's been eating better lately. What activities does she have today?",
      senderId: familyUid,
      senderName: 'family@triniti.com',
      senderRole: 'family',
      timestamp: Timestamp.fromDate(new Date(2026, 1, 15, 8, 40)),
      read: true
    },
    {
      text: 'She has Piano Practice at 8, Arts & Crafts at 10, and Afternoon Tea at 3. She was really excited about piano this morning!',
      senderId: staffUid,
      senderName: 'staff@triniti.com',
      senderRole: 'staff',
      timestamp: Timestamp.fromDate(new Date(2026, 1, 15, 8, 45)),
      read: true
    },
    {
      text: "She always loved playing for an audience. Could I join the video call during tea time?",
      senderId: familyUid,
      senderName: 'family@triniti.com',
      senderRole: 'family',
      timestamp: Timestamp.fromDate(new Date(2026, 1, 15, 9, 0)),
      read: true
    },
    {
      text: "Of course! We'll make sure she's ready at 3 PM. She's been in such a good mood lately.",
      senderId: staffUid,
      senderName: 'staff@triniti.com',
      senderRole: 'staff',
      timestamp: Timestamp.fromDate(new Date(2026, 1, 15, 9, 5)),
      read: true
    },
    {
      text: "Thank you for taking such great care of her. It really means a lot to our family.",
      senderId: familyUid,
      senderName: 'family@triniti.com',
      senderRole: 'family',
      timestamp: Timestamp.fromDate(new Date(2026, 1, 15, 9, 10)),
      read: true
    },
    {
      text: "It's our pleasure! Betty is a joy to care for. See you at 3! 😊",
      senderId: staffUid,
      senderName: 'staff@triniti.com',
      senderRole: 'staff',
      timestamp: Timestamp.fromDate(new Date(2026, 1, 15, 9, 15)),
      read: true
    }
  ];

  console.log('Seeding new messages with correct UIDs...');
  for (const msg of messages) {
    await addDoc(msgsRef, msg);
  }
  console.log(`Added ${messages.length} messages.\n`);
  console.log('Done! Chat messages fixed.');
  process.exit(0);
}

fix().catch((err) => {
  console.error('Failed:', err);
  process.exit(1);
});
