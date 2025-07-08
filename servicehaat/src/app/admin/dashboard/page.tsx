'use client'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import AdminSidebar from './_components/Sidebar'

export default function AdminDashboard() {
  return (
    <ProtectedRoute requiredRole="admin">
      <div className="flex h-screen bg-gray-100">
        <AdminSidebar />
        
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stats Cards */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-medium">Total Users</h3>
              <p className="text-3xl mt-2">1,024</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-medium">Active Listings</h3>
              <p className="text-3xl mt-2">356</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-medium">Revenue</h3>
              <p className="text-3xl mt-2">$2,540</p>
            </div>

            {/* Recent Activity */}
            <div className="md:col-span-2 bg-white p-4 rounded-lg shadow">
              <h3 className="font-medium mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {/* Mock activity items */}
                <div className="border-b pb-2">
                  <p>New provider registered: <strong>YogaWithPriya</strong></p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
                <div className="border-b pb-2">
                  <p>User <strong>john@example.com</strong> upgraded to Premium</p>
                  <p className="text-sm text-gray-500">5 hours ago</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-medium mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full bg-blue-600 text-white p-2 rounded">
                  Manage Users
                </button>
                <button className="w-full bg-green-600 text-white p-2 rounded">
                  View Reports
                </button>
                <button className="w-full bg-red-600 text-white p-2 rounded">
                  Moderate Content
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}