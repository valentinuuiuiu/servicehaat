

import { db } from '@/lib/firebase'
import { ProviderProfile } from '@/lib/schemas/provider'
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'

export const createProviderProfile = async (
  uid: string,
  profileData: Omit<ProviderProfile, 'uid' | 'createdAt' | 'updatedAt'>
) => {
  const profileRef = doc(db, 'providers', uid)
  const newProfile: ProviderProfile = {
    ...profileData,
    uid,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  await setDoc(profileRef, newProfile)
  return newProfile
}

export const updateProviderProfile = async (
  uid: string,
  updates: Partial<ProviderProfile>
) => {
  const profileRef = doc(db, 'providers', uid)
  await updateDoc(profileRef, {
    ...updates,
    updatedAt: new Date()
  })
}

export const getProviderProfile = async (uid: string) => {
  const profileRef = doc(db, 'providers', uid)
  const snapshot = await getDoc(profileRef)
  return snapshot.exists() ? (snapshot.data() as ProviderProfile) : null
}

export const checkPlanStatus = async (uid: string) => {
  const profile = await getProviderProfile(uid)
  return profile?.plan || 'free'
}

