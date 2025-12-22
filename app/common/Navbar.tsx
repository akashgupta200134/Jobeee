"use client";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.png";
import WordRotator from "@/components/ui/wordrotater";

const Navbar: FC = () => {
  return (
    <header className="sticky top-0 w-full z-50">
      <div className="mx-auto flex h-20 max-w-8xl items-center justify-between px-6 md:px-12">
        {/* Logo & Email */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image
              src={Logo}
              alt="Hirenova Logo"
              className="w-14 h-14 object-contain"
              priority
            />
          </Link>
          <div className="hidden md:flex flex-col">

            <WordRotator>
              <p className="text-[#1b2a24] font-semibold text-base tracking-wide">
                hello@hirenova.com
              </p>
            </WordRotator>
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <Link href="/sign-in">
            <Button
              variant="ghost"
              className="hidden sm:inline-flex text-[#1b2a24] border border-[#c0b283] hover:bg-[#c0b283] hover:text-white transition-all duration-300"
            >
              Login
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="bg-[#c0b283] text-black hover:bg-[#a99865] hover:text-white transition-all duration-300 shadow-md">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
