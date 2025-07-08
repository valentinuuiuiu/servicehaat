


import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  User
} from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

// Auth functions
export const loginWithEmail = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
}

export const signupWithEmail = async (
  email: string, 
  password: string,
  userData: {
    role: 'customer' | 'provider' | 'admin'
    name?: string
    businessName?: string
  }
) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  
  await setDoc(doc(db, 'users', userCredential.user.uid), {
    email,
    role: userData.role,
    name: userData.name || '',
    businessName: userData.businessName || '',
    createdAt: new Date().toISOString()
  })

  return userCredential.user
}

export const logout = () => signOut(auth)
export const sendPasswordReset = (email: string) => 
  sendPasswordResetEmail(auth, email)

// Firestore helpers
export const updateUserProfile = async (
  userId: string,
  data: {
    name?: string
    businessName?: string
    photoURL?: string
  }
) => {
  await setDoc(doc(db, 'users', userId), data, { merge: true })
}

export { auth, db }


