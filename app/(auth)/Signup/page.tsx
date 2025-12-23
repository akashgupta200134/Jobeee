"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import SignupLottie from "@/public/Login.json";
import { ArrowLeftToLine } from "lucide-react";
import Link from "next/link";

type Role = "jobseeker" | "recruiter";

export default function SignUpPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const roleFromUrl = searchParams.get("role") as Role | null;

  const [resume, setResume] = useState<File | null>(null);
  const [profilePic, setProfilePic] = useState<File | null>(null);

  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    bio: "",
    skills:""
  });

  useEffect(() => {
    if (roleFromUrl === "jobseeker" || roleFromUrl === "recruiter") {
      setRole(roleFromUrl);
    } else {
      router.push("/role");
    }
  }, [roleFromUrl, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const data = new FormData();

    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("phoneNumber", formData.phone);
    data.append("skills", formData.skills);
    data.append("role", role!);

    if (formData.bio) data.append("bio", formData.bio);
    if (profilePic) data.append("profilePic", profilePic);
    if (resume) data.append("resume", resume);

    const res = await fetch("/api/user/register", {

      method: "POST",
      body: data,
    });

    if (!res.ok) {
      throw new Error("Signup failed");
    }

    // ✅ SUCCESS → redirect to login
    router.push("/signin?success=true");
  } catch (error) {
    alert("Signup failed. Please try again.");
  } finally {
    setLoading(false);
  }
};

  if (!role) return null;

  return (
    <>   
   
    <div className=" relative min-h-screen mt-4 flex items-center justify-center mb-5 px-6">
      <Link href="/">
       <div className=" absolute p-1 w-40 mt-2 text-sm top-1 left-37 rounded-lg  flex flex-row items-center gap-1 border bg-emerald-600 text-white  justify-center" >
        <ArrowLeftToLine/>
        <span>Go to homepage</span>
        </div>
      </Link>
   
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-xl shadow-xl overflow-hidden">
        {/* LEFT FORM */}
        <div className="p-5 mt-10">
          <h2 className="text-3xl font-bold text-zinc-900">
            Sign up as <span className="text-[#388667] capitalize">{role}</span>
          </h2>
          <p className="text-sm text-zinc-500 mt-1">
            Create your HireNova account
          </p>

          <form onSubmit={handleSubmit} className="mt-5 space-y-3">
            {/* Name */}
            <div>
              <label className="text-sm font-medium text-zinc-700">
                Full Name
              </label>
              <input
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Akash Gupta"
                className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-zinc-700">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-zinc-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-medium text-zinc-700">
                Phone Number
              </label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            {/* Profile Image */}
            <div>
              <label className="text-sm font-medium text-zinc-700">
                Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfilePic(e.target.files?.[0] || null)}
                className="mt-1 w-full text-sm file:rounded-lg file:border-0 file:bg-emerald-50 file:px-4 file:py-2 file:text-emerald-700 hover:file:bg-emerald-100"
              />
            </div>

            {/* JOBSEEKER ONLY */}
            {role === "jobseeker" && (
              <>
                <div>
                  <label className="text-sm font-medium text-zinc-700">
                    Resume
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setResume(e.target.files?.[0] || null)}
                    className="mt-1 w-full text-sm file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
                  <div>
                  <label className="text-sm font-medium text-zinc-700">
                    Skills
                  </label>
                  <input
                name="skills"
                required
                value={formData.skills}
                onChange={handleChange}
                placeholder="Nextjs, Nodejs"
                className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
                </div>

                <div>
                  <label className="text-sm font-medium text-zinc-700">
                    Short Bio
                  </label>
                  <textarea
                    rows={3}
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell us about yourself"
                    className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                  />
                </div>
              </>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 rounded-lg bg-emerald-600 py-2.5 text-white font-semibold hover:bg-emerald-700 transition disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            <p className="text-sm text-center text-zinc-500">
              Already have an account?{" "}
              <a href="/signin" className="text-emerald-600 font-medium">
                Login
              </a>
            </p>
          </form>
        </div>

        {/* RIGHT ANIMATION */}
        <div className="hidden md:flex items-center justify-center bg-emerald-50">
          <Lottie animationData={SignupLottie} className="w-full" />
        </div>
      </div>
    </div>
     </>
  );
}
