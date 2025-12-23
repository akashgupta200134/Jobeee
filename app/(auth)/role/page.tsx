"use client";

import Lottie from "lottie-react";
import { useRouter } from "next/navigation";
import rolesLottie from "@/public/People morph flow.json";

export default function RoleSelection() {
  const router = useRouter();

  const handleSelect = (role: "jobseeker" | "recruiter") => {
    router.push(`/signup?role=${role}`);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100 px-6 md:px-12">
      
      {/* LEFT CARD */}
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 md:mr-12 text-center md:text-left z-10 transform transition duration-500 hover:scale-105">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
          Welcome to <span className="text-emerald-600">HireNova</span>
        </h1>
        <p className="text-gray-500 text-lg mb-8">
          Choose your path and get started in seconds
        </p>

        <div className="space-y-6">
          <button
            onClick={() => handleSelect("jobseeker")}
            className="w-full rounded-2xl border border-gray-300 p-6 text-left bg-white hover:bg-emerald-50 hover:border-emerald-500 transition-all duration-300 shadow-md hover:shadow-lg flex flex-col"
          >
            <h3 className="font-semibold text-xl text-gray-900">Job Seeker</h3>
            <p className="text-sm text-gray-500 mt-1">
              Explore thousands of jobs and apply with ease
            </p>
          </button>

          <button
            onClick={() => handleSelect("recruiter")}
            className="w-full rounded-2xl border border-gray-300 p-6 text-left bg-white hover:bg-blue-50 hover:border-blue-500 transition-all duration-300 shadow-md hover:shadow-lg flex flex-col"
          >
            <h3 className="font-semibold text-xl text-gray-900">Recruiter</h3>
            <p className="text-sm text-gray-500 mt-1">
              Post jobs and connect with top talent
            </p>
          </button>
        </div>
      </div>

      {/* RIGHT LOTTIE ANIMATION */}
      <div className="hidden -mt-8 md:flex md:w-1/2 justify-center items-center relative">
        <div className="absolute -inset-10 bg-gradient-to-r from-emerald-100 via-blue-100 to-purple-100 rounded-3xl blur-3xl opacity-40"></div>
        <Lottie
          animationData={rolesLottie}
          loop
          className="w-full max-w-lg relative z-10"
        />
      </div>
    </div>
  );
}
