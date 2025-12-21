"use client";
import { SignUp } from "@clerk/nextjs";
import Lottie from "lottie-react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import SignupAnimation from "@/public/Login.json";



export default function Signup() {
  return (
    <div className="min-h-screen flex  mt-48 items-center justify-center relative px-6">
      
      {/* Back Button */}
      <Link
        href="/"
        className="absolute top-4 left-10 flex items-center gap-1 text-sm font-medium text-[#1b2a24] hover:text-[#c0b283] transition"
      >
        <ChevronLeft size={20} />
        Back to home
      </Link>

      {/* Main Container */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl mb-2 shadow-xl overflow-hidden">
        
        {/* Left: Sign In */}
        <div className="flex items-center justify-center p-9">
          <div className="w-full max-w-md mt-2">
            <h1 className="text-3xl font-bold text-[#1b2a24] ">
             Create your account with HexaNova
            </h1>
           <p className="mt-1 mb-2 text-sm text-gray-500 leading-relaxed">
              Join{" "}
              <span className="font-medium text-[#1b2a24]">
                HexaNova
              </span>{" "}
              and start building your future today.
            </p>
            <SignUp
              appearance={{
                elements: {
                  card: "shadow-none border-none",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                },
              }}
            />
          </div>
        </div>

        {/* Right: Illustration */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-[#1b2a24] to-[#2f4f45] p-10">
          <Lottie
            animationData={SignupAnimation}
            loop
            className="w-[500px] h-[500px]"
          />
        </div>

      </div>
    </div>
  );
}

