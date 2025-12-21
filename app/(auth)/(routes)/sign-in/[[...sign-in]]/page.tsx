import { SignIn } from "@clerk/nextjs";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center  ">
      
     

        {/* Back Button */}
        <Link
          href="/"
          className="absolute top-5 left-5 flex items-center  text-sm text-[#1b2a24] hover:text-[#c0b283] transition"
        >
          <ChevronLeft size={32} />
          Back to home
        </Link>

        <SignIn/>
      </div>

  );
}
