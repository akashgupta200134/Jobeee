"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[]; // e.g. ["recruiter"] or ["jobseeker", "admin"]
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, isAuth, loading } = useSelector((state: any) => state.user);
  const router = useRouter();

  useEffect(() => {
    // 1. If still loading, do nothing yet
    if (loading) return;

    // 2. If not logged in, go to Sign In
    if (!isAuth && !user) {
      router.push("/signin");
      return;
    }

    // 3. Role Check: If user exists but role is wrong...
    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
      console.warn(`⛔ Access Denied: User is ${user.role}, Page needs ${allowedRoles}`);
      
      // Redirect to THEIR dashboard
      if (user.role === "recruiter") {
        router.push("/dashboard/recruiter");
      } else {
        router.push("/dashboard/jobseeker");
      }
    }
  }, [user, isAuth, loading, router, allowedRoles]);

  // Show a loading spinner while we check permissions
  if (loading || !user) {
    return <div className="flex justify-center p-10">Loading Permission...</div>;
  }

  // If all checks pass, render the page!
  return <>{children}</>;
};

export default ProtectedRoute;