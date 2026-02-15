import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from '../Firebase';
import { COLLECTIONS } from '../constants/collections';

// --- Patients ---

export const getPatients = async () => {
  const snapshot = await getDocs(collection(db, COLLECTIONS.USERS));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name || 'Unknown',
    image: doc.data().image
  }));
};

export const getPatient = async (patientId) => {
  const docSnap = await getDoc(doc(db, COLLECTIONS.USERS, patientId));
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() };
};

export const updatePatient = async (patientId, data) => {
  await updateDoc(doc(db, COLLECTIONS.USERS, patientId), data);
};

// --- Activities ---

export const getActivities = async (patientId) => {
  const ref = collection(db, COLLECTIONS.USERS, patientId, COLLECTIONS.ACTIVITIES);
  const q = query(ref, orderBy('date', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data()
  }));
};

export const addActivity = async (patientId, activityData) => {
  const ref = collection(db, COLLECTIONS.USERS, patientId, COLLECTIONS.ACTIVITIES);
  const docRef = await addDoc(ref, activityData);
  return docRef.id;
};

export const deleteActivity = async (patientId, activityId) => {
  await deleteDoc(doc(db, COLLECTIONS.USERS, patientId, COLLECTIONS.ACTIVITIES, activityId));
};

// --- Appointments ---

export const getAppointments = async (patientId) => {
  const ref = collection(db, COLLECTIONS.USERS, patientId, COLLECTIONS.APPOINTMENTS);
  const snapshot = await getDocs(ref);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data()
  }));
};

// --- Mood Entries ---

export const getMoodEntries = async (patientId) => {
  const ref = collection(db, COLLECTIONS.USERS, patientId, COLLECTIONS.MOOD_ENTRIES);
  const q = query(ref, orderBy('date', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data()
  }));
};

export const addMoodEntry = async (patientId, entryData) => {
  const ref = collection(db, COLLECTIONS.USERS, patientId, COLLECTIONS.MOOD_ENTRIES);
  const docRef = await addDoc(ref, entryData);
  return docRef.id;
};

// --- Family Linking ---

export const getPatientByFamilyUid = async (familyUid) => {
  const q = query(collection(db, COLLECTIONS.USERS), where('familyUid', '==', familyUid));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const patientDoc = snapshot.docs[0];
  return { id: patientDoc.id, ...patientDoc.data() };
};

export const getPatientByFamilyEmail = async (email) => {
  const q = query(collection(db, COLLECTIONS.USERS), where('familyEmail', '==', email));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const patientDoc = snapshot.docs[0];
  return { id: patientDoc.id, ...patientDoc.data() };
};

export const linkFamilyToPatient = async (patientId, familyUid) => {
  await updateDoc(doc(db, COLLECTIONS.USERS, patientId), { familyUid });
};

// --- Helpers ---

export const createTimestamp = (date) => Timestamp.fromDate(date);
