
"use client";

import { FC } from "react";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const HeroSection: FC = () => {
  return (
    <section className="relative w-full h-screen bg-[#e7ebe6]">
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 flex flex-col items-center justify-center text-center h-full">
        {/* Animated Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-5xl text-4xl font-extrabold tracking-tight text-[#3a6956] sm:text-5xl lg:text-6xl"
        >
          Get Hired for Your Skills. <br />
          <span className="text-primary">Hire Talent That Delivers.</span>
        </motion.h1>

        {/* Animated Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-6 max-w-2xl text-lg text-[#6B7280] sm:text-xl"
        >
          A smart job portal connecting skilled professionals with trusted recruiters.
          Fast hiring. Verified talent. Real opportunities.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-6"
        >
          <Link href="/sign-up" passHref>
            <Button size="lg" className="px-8">
              Apply for Jobs
            </Button>
          </Link>

          <Link href="/sign-up" passHref>
            <Button size="lg" variant="outline" className="px-8">
              Post a Job
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Tailwind CSS Gradient Animation */}
      <style jsx global>{`
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradientBG 15s infinite;
        }`}
        
        
    </style>
    </section>
  );
};

export default HeroSection;
