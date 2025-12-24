import { connectDB } from "@/app/connectDB";
import CheckAuth from "@/app/middlewares/isAuth";
import { User } from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const token = searchParams.get("token");

        // FIX: Check for missing token OR literal "undefined" string
        if (!token || token === "undefined" || token === "null") {
            return NextResponse.json(
                { message: "Token missing or invalid. Please login." },
                { status: 401 }
            );
        }

        const user = await CheckAuth(token);

        if (!user) {
            return NextResponse.json(
                { message: "Invalid token. Please login." },
                { status: 401 }
            );
        }

        const loggedUser = await User.findById(user._id);

        if (!loggedUser) {
            return NextResponse.json(
                { message: "User not found." },
                { status: 404 }
            );
        }

        return NextResponse.json(loggedUser);

    } catch (error: any) {
        // Updated log message to reflect actual context
        console.error("Profile Fetch Error:", error);
        
        return NextResponse.json(
            { message: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}