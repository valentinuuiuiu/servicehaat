


// Core data models for ServiceHaat
export interface UserProfile {
  id: string // Firebase UID
  email: string
  role: 'customer' | 'provider' | 'admin'
  name: string
  phone?: string
  avatarUrl?: string
  businessName?: string // For providers
  businessDescription?: string
  createdAt: string // ISO date
  updatedAt: string // ISO date
}

export interface ServiceListing {
  id: string
  providerId: string // References UserProfile
  category: string // e.g. 'plumbing', 'yoga'
  title: string
  description: string
  hourlyRate?: number
  fixedPrice?: number
  location: {
    city: string
    address?: string
    coordinates?: firebase.firestore.GeoPoint
  }
  photos: string[] // Storage URLs
  isPremium: boolean
  createdAt: string
  updatedAt: string
}

export interface ServiceLead {
  id: string
  serviceId: string // References ServiceListing
  customerId: string // References UserProfile
  message: string
  status: 'pending' | 'accepted' | 'rejected' | 'completed'
  customerContact: {
    email: string
    phone: string
  }
  createdAt: string
  updatedAt: string
}

// Subscription model for premium features
export interface UserSubscription {
  userId: string
  plan: 'basic' | 'premium' | 'enterprise'
  stripeSubscriptionId: string
  status: 'active' | 'canceled' | 'past_due'
  currentPeriodEnd: string // ISO date
  createdAt: string
}


