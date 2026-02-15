import { useState, useEffect } from 'react';
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../Firebase';
import { COLLECTIONS } from '../constants/collections';

const useChat = (patientId, messageLimit = 50) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!patientId) return;

    const messagesRef = collection(
      db, COLLECTIONS.USERS, patientId, COLLECTIONS.MESSAGES
    );
    const q = query(
      messagesRef,
      orderBy('timestamp', 'desc'),
      limit(messageLimit)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);
      setLoading(false);
    }, (error) => {
      console.error('Chat listener error:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [patientId, messageLimit]);

  const sendMessage = async (messageData) => {
    const messagesRef = collection(
      db, COLLECTIONS.USERS, patientId, COLLECTIONS.MESSAGES
    );
    await addDoc(messagesRef, {
      ...messageData,
      timestamp: serverTimestamp(),
      read: false,
    });
  };

  return { messages, loading, sendMessage };
};

export default useChat;
