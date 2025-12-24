"use client";

import { FC } from "react";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import HeroLottie from "@/public/Hiring.json";

const HeroSection: FC = () => {
  return (
    <section className="relative w-full min-h-screen  bg-[#e7ebe6]">  
     <div className="relative z-10 mx-auto max-w-7xl px-6 pt-5 pb-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left Content */}
        <div className="text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="text-5xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight text-[#1b2a24]"
          >
            Get Hired for Your Skills.
            <br />
            <span className="bg-gradient-to-r from-[#3a6956] to-[#5ea88c] bg-clip-text text-transparent">
              Hire Talent That Delivers.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 max-w-xl mx-auto lg:mx-0 text-lg text-[#4b5563]"
          >
            A smart hiring platform connecting skilled professionals with trusted recruiters.
            Faster hiring. Verified talent. Real opportunities.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Link href="/signup?role=jobseeker">
              <Button
                size="lg"
                className="px-8 bg-[#3a6956] hover:bg-[#2f5a49] text-white shadow-lg"
              >
                Apply for Jobs
              </Button>
            </Link>

            <Link href="/signup?role=recruiter">
              <Button
                size="lg"
                variant="outline"
                className="px-8 border-[#3a6956] text-[#3a6956] hover:bg-[#3a6956] hover:text-white"
              >
                Post a Job
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Right Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.9 }}
          className="flex justify-center -mt-12"
        >
          <Lottie
            animationData={HeroLottie}
            className="w-[400px] sm:w-[380px] lg:w-[600px]"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
