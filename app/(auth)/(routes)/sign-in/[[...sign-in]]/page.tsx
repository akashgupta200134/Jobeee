import { Button } from "@/components/ui/button";
import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function Signup() {
  return (
    <div>
      <Link href="/">
       <Button>Go to Home</Button>
      </Link>
      <SignIn />
    </div>
  );
}

