"use client";

// import { useDispatch, useSelector } from "react-redux"; // 1. Import useSelector
// import { useRouter } from "next/navigation";
// import { AppDispatch } from "@/app/redux/store";
import ProtectedRoute from "@/components/ui/ProtectedRoute";
import ProfileDropdown from "@/components/ui/DropDownmenu";

export default function RecruiterDashboard() {
//   const dispatch = useDispatch<AppDispatch>();
//   const router = useRouter();

//   // 2. Get the user data from Redux Store
//   const { user } = useSelector((state: any) => state.user);

  return (
    // 3. Security Wrapper
    <ProtectedRoute allowedRoles={["recruiter"]}>
      <div className="min-h-screen bg-gray-50 ">
        <div className="mx-auto max-w-8xl p-4 flex items-center justify-between">
          <h1 className=" text-2xl font-semibold">Recruiter Dashboard</h1>
          <ProfileDropdown />
        </div>

      </div>
    </ProtectedRoute>
  );
}
