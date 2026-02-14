import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCAtpYlHeUZm0wlSNEtvlDwh0XmukzPWqw',
  authDomain: 'triniti-6dea8.firebaseapp.com',
  projectId: 'triniti-6dea8',
  storageBucket: 'triniti-6dea8.appspot.com',
  messagingSenderId: '113357896992',
  appId: '1:113357896992:web:fac795d43d8e04e541ab45'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const TEST_USERS = [
  { email: 'staff@triniti.com', password: 'Test1234!' },
  { email: 'family@triniti.com', password: 'Test1234!' }
];

async function createUsers() {
  for (const user of TEST_USERS) {
    try {
      const cred = await createUserWithEmailAndPassword(auth, user.email, user.password);
      console.log(`Created: ${user.email} (uid: ${cred.user.uid})`);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log(`Already exists: ${user.email} — skipping`);
      } else {
        console.error(`Failed to create ${user.email}:`, error.message);
      }
    }
  }
  process.exit(0);
}

createUsers();
