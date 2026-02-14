import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc, addDoc } from 'firebase/firestore';

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

// New appointments — all after Feb 14, 2026
const APPOINTMENTS = {
  'Margaret Thompson': [
    { title: 'Family Video Call', date: 'Monday, February 16, 2026', time: '2:00 PM - 2:30 PM', type: 'video' },
    { title: 'Doctor Check-up', date: 'Wednesday, February 18, 2026', time: '10:00 AM - 10:45 AM', type: 'in-person' },
    { title: 'Physical Therapy', date: 'Friday, February 20, 2026', time: '3:00 PM - 4:00 PM', type: 'in-person' },
    { title: 'Dentist Appointment', date: 'Tuesday, February 24, 2026', time: '9:00 AM - 9:45 AM', type: 'in-person' }
  ],
  'Robert Chen': [
    { title: 'Son Video Call', date: 'Tuesday, February 17, 2026', time: '11:00 AM - 11:30 AM', type: 'video' },
    { title: 'Endocrinologist Visit', date: 'Thursday, February 19, 2026', time: '9:00 AM - 9:45 AM', type: 'in-person' },
    { title: 'Physical Therapy', date: 'Monday, February 23, 2026', time: '1:00 PM - 2:00 PM', type: 'in-person' }
  ],
  'Dorothy Williams': [
    { title: 'Hearing Specialist', date: 'Monday, February 16, 2026', time: '10:00 AM - 10:45 AM', type: 'in-person' },
    { title: 'Family Video Call', date: 'Wednesday, February 18, 2026', time: '3:00 PM - 3:30 PM', type: 'video' },
    { title: 'Doctor Check-up', date: 'Friday, February 20, 2026', time: '11:00 AM - 11:45 AM', type: 'in-person' },
    { title: 'Grandson Phone Call', date: 'Sunday, February 22, 2026', time: '5:00 PM - 5:30 PM', type: 'phone' }
  ],
  'Harold Martinez': [
    { title: 'Orthopedic Check-up', date: 'Tuesday, February 17, 2026', time: '9:00 AM - 10:00 AM', type: 'in-person' },
    { title: 'Daughter Video Call', date: 'Thursday, February 19, 2026', time: '4:00 PM - 4:30 PM', type: 'video' },
    { title: 'Physical Therapy', date: 'Saturday, February 21, 2026', time: '10:00 AM - 11:00 AM', type: 'in-person' }
  ],
  'Eleanor Davis': [
    { title: 'Family Video Call', date: 'Monday, February 16, 2026', time: '1:00 PM - 1:30 PM', type: 'video' },
    { title: 'Eye Exam', date: 'Wednesday, February 18, 2026', time: '2:00 PM - 2:45 PM', type: 'in-person' },
    { title: 'Doctor Check-up', date: 'Friday, February 20, 2026', time: '9:00 AM - 9:45 AM', type: 'in-person' },
    { title: 'Niece Phone Call', date: 'Saturday, February 21, 2026', time: '6:00 PM - 6:30 PM', type: 'phone' }
  ],
  'James Wilson': [
    { title: 'Doctor Check-up', date: 'Tuesday, February 17, 2026', time: '10:00 AM - 10:45 AM', type: 'in-person' },
    { title: 'Wife Video Call', date: 'Thursday, February 19, 2026', time: '2:00 PM - 2:30 PM', type: 'video' },
    { title: 'Physical Therapy', date: 'Saturday, February 21, 2026', time: '11:00 AM - 12:00 PM', type: 'in-person' }
  ],
  'Betty Johnson': [
    { title: 'Family Video Call', date: 'Monday, February 16, 2026', time: '3:00 PM - 3:30 PM', type: 'video' },
    { title: 'Doctor Check-up', date: 'Wednesday, February 18, 2026', time: '11:00 AM - 11:45 AM', type: 'in-person' },
    { title: 'Son Phone Call', date: 'Friday, February 20, 2026', time: '5:00 PM - 5:30 PM', type: 'phone' },
    { title: 'Nutritionist Visit', date: 'Tuesday, February 24, 2026', time: '10:00 AM - 10:30 AM', type: 'in-person' }
  ]
};

async function updateAppointments() {
  const usersSnapshot = await getDocs(collection(db, 'users'));

  for (const userDoc of usersSnapshot.docs) {
    const name = userDoc.data().name;
    const newAppts = APPOINTMENTS[name];
    if (!newAppts) continue;

    console.log(`Updating ${name}...`);

    // Delete old appointments
    const apptRef = collection(db, 'users', userDoc.id, 'appointments');
    const oldSnapshot = await getDocs(apptRef);
    let deleted = 0;
    for (const apptDoc of oldSnapshot.docs) {
      await deleteDoc(doc(db, 'users', userDoc.id, 'appointments', apptDoc.id));
      deleted++;
    }
    console.log(`  Deleted ${deleted} old appointments`);

    // Add new appointments
    for (const appt of newAppts) {
      await addDoc(apptRef, appt);
    }
    console.log(`  Added ${newAppts.length} new appointments`);
  }

  console.log('\nDone!');
  process.exit(0);
}

updateAppointments();
