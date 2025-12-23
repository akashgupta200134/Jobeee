"use client";

import { useRouter } from "next/navigation";

export default function RoleSelection() {
  const router = useRouter();

  const handleSelect = (role: "jobseeker" | "recruiter") => {
    router.push(`/signup?role=${role}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f7f7] px-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <h1 className="text-3xl font-bold text-zinc-900">
          Join HireNova
        </h1>
        <p className="text-zinc-500 mt-2">
          Choose how you want to get started
        </p>

        <div className="mt-8 space-y-4">
          <button
            onClick={() => handleSelect("jobseeker")}
            className="w-full rounded-xl border border-zinc-300 p-4 text-left hover:border-emerald-600 hover:bg-emerald-50 transition"
          >
            <h3 className="font-semibold text-lg">Job Seeker</h3>
            <p className="text-sm text-zinc-500">
              Find jobs & apply easily
            </p>
          </button>

          <button
            onClick={() => handleSelect("recruiter")}
            className="w-full rounded-xl border border-zinc-300 p-4 text-left hover:border-blue-600 hover:bg-blue-50 transition"
          >
            <h3 className="font-semibold text-lg">Recruiter</h3>
            <p className="text-sm text-zinc-500">
              Post jobs & hire talent
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
