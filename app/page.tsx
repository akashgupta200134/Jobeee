import Image from "next/image";
import HeroSection from "./common/Hero";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HeroSection/>
    </div>
  );
}
