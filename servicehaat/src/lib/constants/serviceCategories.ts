

export const SERVICE_CATEGORIES = [
  { value: 'plumbing', label: 'Plumber' },
  { value: 'yoga', label: 'Yoga Instructor' },
  { value: 'cleaning', label: 'Cleaning Service' },
  { value: 'electrical', label: 'Electrician' },
  { value: 'tutoring', label: 'Tutor' },
  { value: 'beauty', label: 'Beauty Professional' },
  { value: 'construction', label: 'Construction Worker' },
  { value: 'catering', label: 'Caterer' },
  { value: 'driving', label: 'Driver' },
  { value: 'other', label: 'Other Service' }
] as const

export type ServiceCategory = typeof SERVICE_CATEGORIES[number]['value']

