"use client";

import Lottie from "lottie-react";
import { useRouter } from "next/navigation";
import rolesLottie from "@/public/People morph flow.json";
import Link from "next/link";
import { ArrowLeftToLine } from "lucide-react";

export default function RoleSelection() {
  const router = useRouter();

  const handleSelect = (role: "jobseeker" | "recruiter") => {
    router.push(`/signup?role=${role}`);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center relative bg-gradient-to-r from-gray-100 to-gray-200 px-6 md:px-12 overflow-hidden">
      
      {/* Go to Home Button at Top-Left */}
      <div className="absolute top-3 left-5">
        <Link href="/">
          <div className="p-2 w-40 rounded-lg text-sm flex flex-row items-center gap-2 bg-emerald-600 text-white justify-center shadow-md hover:bg-emerald-500 transition-all duration-300">
            <ArrowLeftToLine size={20} />
            <span>Go to Homepage</span>
          </div>
        </Link>
      </div>

      {/* LEFT CARD */}
      <div className="max-w-md w-full bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10 md:mr-12 text-center md:text-left transform transition duration-500 hover:scale-105 hover:shadow-2xl border border-white/40 z-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          Welcome to <span className="text-emerald-600">HireNova</span>
        </h1>
        <p className="text-gray-700 text-lg mb-8">
          Choose your path and get started in seconds
        </p>

        <div className="space-y-5">
          {/* Job Seeker Button */}
          <button
            onClick={() => handleSelect("jobseeker")}
            className="w-full rounded-2xl p-6 text-left bg-white/90 backdrop-blur-md border border-gray-300 hover:bg-emerald-100 hover:border-emerald-500 hover:shadow-lg transition-all duration-300 flex flex-col"
          >
            <h3 className="font-semibold text-xl text-gray-900">Job Seeker</h3>
            <p className="text-gray-700 text-sm mt-1">
              Explore thousands of jobs and apply with ease
            </p>
          </button>

          {/* Recruiter Button */}
          <button
            onClick={() => handleSelect("recruiter")}
            className="w-full rounded-2xl p-6 text-left bg-white/90 backdrop-blur-md border border-gray-300 hover:bg-blue-100 hover:border-blue-500 hover:shadow-lg transition-all duration-300 flex flex-col"
          >
            <h3 className="font-semibold text-xl text-gray-900">Recruiter</h3>
            <p className="text-gray-700 text-sm mt-1">
              Post jobs and connect with top talent
            </p>
          </button>
        </div>
      </div>

      {/* RIGHT Lottie Animation */}
      <div className="hidden md:flex md:w-1/2 justify-center items-center relative -mt-8">
        <div className="absolute -inset-16 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 rounded-3xl blur-3xl opacity-20"></div>
        <Lottie
          animationData={rolesLottie}
          loop
          className="w-full max-w-lg relative z-10"
        />
      </div>
    </div>
  );
}
