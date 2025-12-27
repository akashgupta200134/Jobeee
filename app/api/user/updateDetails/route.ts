import { connectDB } from "@/app/connectDB";
import CheckAuth from "@/app/middlewares/isAuth";
import { User } from "@/app/models/User";
import uploadFile from "@/app/middlewares/upload";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    // 🔍 DEBUGGING START
    const authHeader = req.headers.get("authorization");
    console.log("----------------------------------------------");
    console.log("🔍 INCOMING HEADER:", authHeader); 
    // ----------------------------------------------

    if (!authHeader) {
        return NextResponse.json({ message: "Missing Authorization Header" }, { status: 401 });
    }

    // 1. Check Auth (Passing the full header)
    const user = await CheckAuth(authHeader); 
    
    if (!user) {
        console.log("❌ CheckAuth failed. Token rejected.");
        return NextResponse.json({ message: "Unauthorized: User not found" }, { status: 401 });
    }

    console.log(`✅ Authorized User: ${user.email}`);

    // 2. Parse Data
    const formData = await req.formData();

    const name = (formData.get("name") as string) || user.name;
    const phoneNumber = (formData.get("phoneNumber") as string) || user.phoneNumber;
    const bio = (formData.get("bio") as string) || user.bio;
    
    // Skills
    const skillsString = formData.get("skills") as string;
    let skills = user.skills;
    if (skillsString) {
        skills = skillsString.split(",").map(s => s.trim()).filter((s: string) => s !== "");
    }

    // 3. Handle Files
    let profilePicUrl = user.profilePic; 
    let resumeUrl = user.resume;         

    // Profile Pic
    const profilePicFile = formData.get("profilePic");
    if (profilePicFile && profilePicFile instanceof File && profilePicFile.size > 0) {
      console.log("📷 Uploading Profile Pic...");
      try {
          const data = await uploadFile(profilePicFile);
          profilePicUrl = data.secure_url;
      } catch (err) {
          console.error("Profile Pic Upload Error:", err);
      }
    }

    // Resume
    const resumeFile = formData.get("resume");
    if (resumeFile && resumeFile instanceof File && resumeFile.size > 0) {
      console.log("📄 Uploading Resume...");
      try {
          const data = await uploadFile(resumeFile);     
          resumeUrl = data.secure_url;
      } catch (err) {
          console.error("Resume Upload Error:", err);
      }
    }

    // 4. Update Database
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        name,
        phoneNumber,
        bio,
        skills,
        profilePic: profilePicUrl,
        resume: resumeUrl,
      },
      { new: true, runValidators: true }
    );

    return NextResponse.json(
      { success: true, user: updatedUser, message: "Profile updated successfully!" },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("❌ SERVER ERROR:", error);
    return NextResponse.json(
      { message: error.message || "Server Error" },
      { status: 500 }
    );
  }
}