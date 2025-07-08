

'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AuthService } from '@/services/auth'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('ionutbaltag3@gmail.com')
  const [password, setPassword] = useState('openhands39')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    try {
      setIsLoading(true)
      await AuthService.login(email, password)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Invalid email or password')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">ServiceHaat Login</h1>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
        >
          Sign In
        </button>
      </form>

      <div className="mt-4 text-center text-sm">
        <Link href="/signup" className="text-blue-600 hover:underline">
          Create an account
        </Link>
        <span className="mx-2">•</span>
        <button 
          onClick={() => AuthService.resetPassword(email)}
          className="text-blue-600 hover:underline"
        >
          Forgot password?
        </button>
      </div>
    </div>
  )
}

