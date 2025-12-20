// components/Footer.tsx
import { Github, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="sticky bottom-0 w-full border-t bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold tracking-tight text-zinc-900">
            Job<span className="text-primary">Portal</span>
          </span>
        </div>

        <p>Built By @Akash Gupta</p>

        <div className="flex items-center gap-5">
          <Link href="/" aria-label="Github">
            <Github />
          </Link>

          <Link href="/" aria-label="Instagram">
            <Instagram />
          </Link>

          <Link href="/" aria-label="Twitter">
            <Twitter />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
