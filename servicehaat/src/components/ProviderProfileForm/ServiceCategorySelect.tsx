

'use client'
import { SERVICE_CATEGORIES } from '@/lib/constants'

interface ServiceCategorySelectProps {
  value: string
  onChange: (category: string) => void
}

export default function ServiceCategorySelect({ value, onChange }: ServiceCategorySelectProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">Service Category</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
      >
        <option value="">Select a category</option>
        {SERVICE_CATEGORIES.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
    </div>
  )
}

