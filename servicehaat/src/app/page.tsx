'use client'
import { useAuth } from '@/context/AuthContext'

export default function HomePage() {
  const { user, loading } = useAuth()

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Welcome to ServiceHaat</h1>
        
        {user ? (
          <div className="bg-white/10 p-6 rounded-lg">
            <h2 className="text-2xl mb-4">Welcome back, {user.email}!</h2>
            <p>Browse available services or manage your listings</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 p-6 rounded-lg">
              <h2 className="text-2xl mb-4">Find Local Services</h2>
              <p>Connect with trusted professionals in your area</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <h2 className="text-2xl mb-4">Grow Your Business</h2>
              <p>List your services and reach more customers</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
