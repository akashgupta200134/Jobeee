"use client"

import { FC } from "react";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.png"
import WordRotator from "@/components/ui/wordrotater";

const Navbar: FC = () => {
  return (
    <header className="sticky  w-full">
      <div className="mx-auto flex h-16 max-w-8xl items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-1">
          <span className="text-xl font-semibold tracking-tight text-[#1b2a24]">
            <Link href="/">
              <Image src={Logo} className="w-12 h-12 ml-10  object-contain" />
            </Link>
          </span>
          <span>/</span>
          <WordRotator>
            <p className="text-[#1b2a24] text-lg font-medium tracking-wide">
              hello@hirenova.com
            </p>
          </WordRotator>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-3">
          <Link href="/sign-in">
            <Button
              variant="ghost"
              className="hidden bg-[#c0b283] sm:inline-flex"
            >
              Login
            </Button>
          </Link>

          <Link href="/sign-up">
            <Button className="bg-[#c0b283] text-black  hover:bg-white">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
