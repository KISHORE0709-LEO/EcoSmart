import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDgZMzdaoI0AEVJqkZ8ZBE2NWa1rvkh69Q",
  authDomain: "ecosmart-513a8.firebaseapp.com",
  projectId: "ecosmart-513a8",
  storageBucket: "ecosmart-513a8.firebasestorage.app",
  messagingSenderId: "488515876324",
  appId: "1:488515876324:web:dd641955d93a2f07be43f1",
  measurementId: "G-G1CQQZSH9P"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);