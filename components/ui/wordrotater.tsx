"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Home, ArrowLeft } from "lucide-react"; // example icons

const WordRotator = () => {
  const pathname = usePathname();
  const isProjectPage = pathname.startsWith("/projects/");

  // Words/icons for homepage
  const homeItems = [
    " hello@hirenova.com",
    "hirenova.com",
  ];

//   Items (icons + text) for project page
  const projectItems = [
    <div className="flex items-center gap-2">
      <ArrowLeft size={18} /> Go to Homepage
    </div>
  ];

  const items = isProjectPage ? projectItems : homeItems;

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className="h-12 flex items-center justify-center hover:text-[#c0b283]">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          {items[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default WordRotator;
