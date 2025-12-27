"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import LoginLottie from "@/public/Pin code Password Protection, Secure Login animation - Copy.json"; // Verify path
import { ArrowLeftToLine } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/app/redux/action/user"; // Import clearError if you have it
import { AppDispatch } from "@/app/redux/store"; // Import AppDispatch

export default function SignInPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const success = searchParams.get("success");

  // 1. Get State from Redux
  const { isAuth, user, error, btnLoading } = useSelector((state: any) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 2. Handle Login Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ✅ FIX: Pass as an OBJECT { email, password }
    dispatch(loginUser({ email, password }));
  };

  // 3. Watch for Success -> Redirect
  useEffect(() => {
    if (isAuth && user) {
      // If logged in, go to dashboard
      // Note: Ensure user.role exists
      const role = user.role || "jobseeker"; 
      router.push(`/dashboard/${role}`);
    }
    
    // Cleanup: Clear errors when leaving
    return () => {
        // dispatch(clearError()); 
    };
  }, [isAuth, user, router]);

  // 4. Watch for Error -> Alert
  useEffect(() => {
    if (error) {
      alert(error);
      // Optional: dispatch(clearError()) after showing alert
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-xl shadow-xl overflow-hidden">
        
        {/* LEFT FORM */}
        <div className="p-5">
          <Link href="/">
            <div className="p-2 w-44 rounded-lg mb-4 flex flex-row items-center gap-2 border bg-emerald-600 text-white justify-center">
              <ArrowLeftToLine />
              <span>Go to homepage</span>
            </div>
          </Link>
          <h2 className="text-3xl font-bold text-zinc-900">Welcome Back</h2>
          <p className="text-sm text-zinc-500 mt-1">
            Continue your journey with HireNova
          </p>

          {success && (
            <p className="mt-3 text-sm text-emerald-600 font-medium">
              ✅ Account created successfully. Please login.
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label className="text-sm font-medium text-zinc-700">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-zinc-700">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={btnLoading} // Use Redux loading state
              className="w-full mt-4 rounded-lg bg-emerald-600 py-2.5 text-white font-semibold hover:bg-emerald-700 transition disabled:opacity-60"
            >
              {btnLoading ? "Signing in..." : "Login"}
            </button>
            
            <p className="text-sm text-center text-zinc-500">
              Don’t have an account?{" "}
              <Link href="/role" className="text-emerald-600 font-medium">
                Signup
              </Link>
            </p>
          </form>
        </div>

        {/* RIGHT ANIMATION */}
        <div className="hidden md:flex items-center justify-center bg-emerald-50">
          <Lottie animationData={LoginLottie} className="w-full" />
        </div>
      </div>
    </div>
  );
}