

'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AuthService } from '@/services/auth'
import Link from 'next/link'

interface SignupFormProps {
  onSuccess?: () => void
  onError?: (error: string) => void
}

export default function SignupForm({ onSuccess, onError }: SignupFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    confirmEmail: '',
    password: '',
    userType: 'customer' as 'customer' | 'provider'
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const validateForm = () => {
    if (!formData.email || !formData.confirmEmail || !formData.password) {
      return 'All fields are required'
    }
    if (formData.email !== formData.confirmEmail) {
      return 'Emails do not match'
    }
    if (formData.password.length < 8) {
      return 'Password must be at least 8 characters'
    }
    if (!/[A-Z]/.test(formData.password)) {
      return 'Password must contain an uppercase letter'
    }
    if (!/[0-9]/.test(formData.password)) {
      return 'Password must contain a number'
    }
    return ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      onError?.(validationError)
      return
    }

    try {
      setIsLoading(true)
      await AuthService.signup(formData.email, formData.password)
      onSuccess?.()
      router.push(`/${formData.userType}/dashboard`)
    } catch (err: any) {
      const errorMsg = err.message || 'Registration failed'
      setError(errorMsg)
      onError?.(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Join ServiceHaat</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className={`p-2 rounded transition-colors ${
              formData.userType === 'customer' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => setFormData({...formData, userType: 'customer'})}
          >
            I Need Services
          </button>
          <button
            type="button"
            className={`p-2 rounded transition-colors ${
              formData.userType === 'provider' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => setFormData({...formData, userType: 'provider'})}
          >
            I Provide Services
          </button>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            placeholder="Confirm Email"
            value={formData.confirmEmail}
            onChange={(e) => setFormData({...formData, confirmEmail: e.target.value})}
            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
            required
          />
          <div>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              8+ characters with uppercase and number
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition-colors disabled:opacity-70"
        >
          {isLoading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span>Already have an account? </span>
        <Link href="/login" className="text-blue-600 hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  )
}

