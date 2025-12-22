import { connectDB } from "@/app/connectDB";
import { User } from "@/app/models/User"; // Ensure this path points to your model file
import { NextRequest, NextResponse } from "next/server";
import uploadFile from "@/app/middlewares/upload"; // Ensure this path is correct
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    // 1. Connect to Database
    await connectDB();

    // 2. Parse Form Data
    const formdata = await req.formData();

    const name = formdata.get("name") as string;
    const email = formdata.get("email") as string;
    const password = formdata.get("password") as string;
    const role = formdata.get("role") as string;
    const bio = formdata.get("bio") as string;
    
    // MATCHES MODEL: camelCase 'phoneNumber' and kept as String
    const phoneNumber = formdata.get("phoneNumber") as string; 

    const skillsRaw = formdata.get("skills") as string;
    const profilePic = formdata.get("profilePic") as File | null;
    const resume = formdata.get("resume") as File | null;

    // 3. Validation
    if (!name || !email || !password || !role || !phoneNumber) {
      return NextResponse.json(
        { message: "Missing required fields (name, email, password, role, phoneNumber)" },
        { status: 400 }
      );
    }

    // 4. Check if User Exists
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 400 }
      );
    }

    // 5. Handle File Uploads (Cloudinary/S3)
    let profilePicUrl = "";
    if (profilePic && profilePic.size > 0) {
      const data = await uploadFile(profilePic);
      profilePicUrl = data.url; // Ensure your upload utility returns { url: "..." }
    }

    let resumeUrl = "";
    if (resume && resume.size > 0) {
      const data = await uploadFile(resume);
      resumeUrl = data.url;
    }

    // 6. Hash Password & Format Skills
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Split "React, Node, JS" string into ["React", "Node", "JS"]
    const skillsArray = skillsRaw ? skillsRaw.split(",").map(s => s.trim()) : [];

    // 7. Create User
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber, // Saved as String per your model
      role,
      bio,
      skills: skillsArray,
      resume: resumeUrl,
      profilePic: profilePicUrl,
      savedJobs: [], // Initialize with empty array
    });

    // 8. Generate Token
    const token = jwt.sign(
      { id: user._id, role: user.role }, // Payload
      process.env.JWT_SECRET!,           // Secret Key
      { expiresIn: "5d" }                // Expiry
    );

    // 9. Return Response
    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
            // Return only safe fields (exclude password)
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phoneNumber: user.phoneNumber
        },
        token,
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}