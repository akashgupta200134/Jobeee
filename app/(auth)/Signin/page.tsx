"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Lottie from "lottie-react";
import LoginLottie from "@/public/Login.json";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const success = searchParams.get("success");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();

      // 🔐 store token (later move to httpOnly cookie)
      localStorage.setItem("token", data.token);

      // ✅ redirect based on role
    //   router.push(`/dashboard/${data.role}`);
    
    } catch (error) {
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-4 flex items-center justify-center mb-5 px-6">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-xl shadow-xl overflow-hidden">

        {/* LEFT FORM */}
        <div className="p-5">
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

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-zinc-700">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-zinc-700">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 rounded-lg bg-emerald-600 py-2.5 text-white font-semibold hover:bg-emerald-700 transition disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Login"}
            </button>

            <p className="text-sm text-center text-zinc-500">
              Don’t have an account?{" "}
              <a href="/role" className="text-emerald-600 font-medium">
                Signup
              </a>
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
