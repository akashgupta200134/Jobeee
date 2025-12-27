"use client"

import { logout } from "@/app/redux/action/user";
import { AppDispatch } from "@/app/redux/store";
import ProtectedRoute from "@/components/ui/ProtectedRoute";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function JobseekerDashboardPage() {
const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user } = useSelector((state: any) => state.user);
  const handleLogout = () => {
    // 1. Trigger the logout action
    dispatch(logout());
    
    // 2. Redirect to Home or Login page
    router.push("/signin");
  };

  return (
    // 🛡️ Only "jobseeker" can enter.
    <ProtectedRoute allowedRoles={["jobseeker"]}>
        
 <div className="min-h-screen bg-gray-50 p-8">
        
        {/* Header Section */}
        <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-md">
          <div className="flex items-center justify-between border-b pb-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Recruiter Dashboard</h1>
            
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="rounded bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600 shadow-sm"
            >
              Logout
            </button>
          </div>

          {/* User Details Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Profile Information</h2>
            
            {/* Safe check: Only render if user exists */}
            {user ? (
              <div className="grid gap-4 md:grid-cols-2">
                
                <div className="rounded-lg bg-gray-100 p-4">
                  <p className="text-xs text-gray-500 uppercase font-bold">Full Name</p>
                  <p className="text-lg font-medium text-gray-900">{user.name}</p>
                </div>

                <div className="rounded-lg bg-gray-100 p-4">
                  <p className="text-xs text-gray-500 uppercase font-bold">Email Address</p>
                  <p className="text-lg font-medium text-gray-900">{user.email}</p>
                </div>

                <div className="rounded-lg bg-blue-50 p-4 border border-blue-100">
                  <p className="text-xs text-blue-500 uppercase font-bold">Current Role</p>
                  <p className="text-lg font-bold text-blue-700 capitalize">{user.role}</p>
                </div>

                <div className="rounded-lg bg-gray-100 p-4">
                  <p className="text-xs text-gray-500 uppercase font-bold">User ID</p>
                  <p className="text-sm font-mono text-gray-600 truncate" title={user._id}>
                    {user._id}
                  </p>
                </div>

              </div>
            ) : (
              <p className="text-red-500">Error: User data not loaded.</p>
            )}
          </div>
          
          <div className="mt-8 p-4 bg-yellow-50 text-yellow-800 rounded border border-yellow-200">
            <strong>Note:</strong> Since you are seeing this, your role is correctly set to <code>recruiter</code>.
          </div>

        </div>
      </div>
        
    </ProtectedRoute>
  );
}