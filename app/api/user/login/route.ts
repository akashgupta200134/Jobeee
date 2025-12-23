import { connectDB } from "@/app/connectDB";
import { User } from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // 1️⃣ Parse JSON body
    const body = await req.json();
    const email = body.email?.toLowerCase();
    const password = body.password;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // 2️⃣ Find user by email
   const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

    if (!user || !user.password) {
      console.log("Login failed: user not found or password missing", email);
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      );
    }

    // 3️⃣ Compare password safely
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Login failed: password mismatch", email);
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      );
    }

    // 4️⃣ Generate JWT
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not defined");
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "5d" }
    );

    if (!user) {
  console.log("Login failed: user not found for", email);
}
if (!isMatch) {
  console.log("Login failed: password mismatch for", email);
}


    // 5️⃣ Return response (token + user data without password)
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
    console.error("Login error:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
