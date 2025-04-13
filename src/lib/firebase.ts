import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

// Payment verification functions
export async function recordPayment(userId: string) {
  try {
    await setDoc(doc(db, 'payments', userId), {
      paid: true,
      timestamp: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error('Error recording payment:', error);
    return false;
  }
}

export async function hasUserPaid(userId: string): Promise<boolean> {
  try {
    const paymentDoc = await getDoc(doc(db, 'payments', userId));
    return paymentDoc.exists() && paymentDoc.data()?.paid === true;
  } catch (error) {
    console.error('Error checking payment status:', error);
    // Return false on error to be safe
    return false;
  }
}

export { auth, googleProvider, db }; 