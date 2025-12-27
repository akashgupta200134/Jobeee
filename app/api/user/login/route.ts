import { connectDB } from "@/app/connectDB";
import { User } from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const email = body.email?.toLowerCase();
    const password = body.password;

    // 1. Validate Input
    if (!email || !password) {
      console.log("❌ Login Attempt Failed: Missing email or password");
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // 2. Find User
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      console.log(`❌ Login Attempt Failed: User not found for email '${email}'`);
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      );
    }

    // 3. Check Password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      console.log(`❌ Login Attempt Failed: Wrong password for '${email}'`);
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      );
    }

    // 4. Generate Token (FIXED)
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not defined");
    }

    // ✅ FIX: Changed 'id' to 'userId' to match your CheckAuth middleware!
    const token = jwt.sign(
      { userId: user._id, role: user.role }, 
      process.env.JWT_SECRET,
      { expiresIn: "5d" }
    );

    console.log(`✅ Login Success for user: ${user.name}`);

    // 5. Return Response
    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phoneNumber: user.phoneNumber,
        },
        token,
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("❌ Login Server Error:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}