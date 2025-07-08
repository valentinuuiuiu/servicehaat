
import { Timestamp } from 'firebase/firestore'

export interface ProviderProfile {
  uid: string
  businessName: string
  serviceCategory: string
  description: string
  location: {
    city: string
    district?: string
  }
  photos: string[] // Firebase Storage URLs
  priceRange?: {
    min: number
    max: number
  }
  plan: 'free' | 'paid'
  createdAt: Timestamp
  updatedAt: Timestamp
}
