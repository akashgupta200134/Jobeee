import { FC } from "react";
import { Button } from "../../components/ui/button";
import Link from "next/link";

const Navbar: FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold tracking-tight text-zinc-900">
            <Link href="/">
              Jobeee
            </Link>
          </span>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-3">
          <Link href="/sign-in">
            <Button variant="ghost" className="hidden sm:inline-flex">
              Login
            </Button>
          </Link>

          <Link href="/sign-up">
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
