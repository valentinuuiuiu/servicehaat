


'use client'
import { useState } from 'react'
import { ProviderProfile } from '@/lib/schemas/provider'
import PhotoUpload from './PhotoUpload'
import ServiceCategorySelect from './ServiceCategorySelect'

export default function ProviderProfileForm({
  uid,
  initialData,
  onSubmit
}: {
  uid: string
  initialData?: Partial<ProviderProfile>
  onSubmit: (data: ProviderProfile) => void
}) {
  const [formData, setFormData] = useState({
    businessName: initialData?.businessName || '',
    serviceCategory: initialData?.serviceCategory || '',
    description: initialData?.description || '',
    photos: initialData?.photos || [],
    priceRange: initialData?.priceRange || undefined,
    plan: initialData?.plan || 'free'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Business Name */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Business Name</label>
        <input
          type="text"
          value={formData.businessName}
          onChange={(e) => setFormData({...formData, businessName: e.target.value})}
          className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          required
        />
      </div>

      {/* Service Category */}
      <ServiceCategorySelect
        value={formData.serviceCategory}
        onChange={(value) => setFormData({...formData, serviceCategory: value})}
      />

      {/* Description */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Service Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          rows={4}
          className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          required
        />
      </div>

      {/* Photo Upload */}
      <PhotoUpload
        onUpload={(urls) => setFormData({...formData, photos: urls})}
      />

      {/* Plan Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Service Plan</label>
        <div className="flex gap-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              checked={formData.plan === 'free'}
              onChange={() => setFormData({...formData, plan: 'free'})}
              className="h-4 w-4 text-blue-600"
            />
            <span className="ml-2">Free (Basic Visibility)</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              checked={formData.plan === 'paid'}
              onChange={() => setFormData({...formData, plan: 'paid'})}
              className="h-4 w-4 text-blue-600"
            />
            <span className="ml-2">Paid (Top Placement + Analytics)</span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Save Profile
      </button>
    </form>
  )
}


