import { connectDB } from "@/app/connectDB";
import CheckAuth from "@/app/middlewares/isAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectDB();

        // ❌ WRONG: This looks for url.com?token=123 (which you are NOT sending)
        // const { searchParams } = new URL(req.url);
        // const token = searchParams.get("token");

        // ✅ CORRECT: This looks for the "Authorization" header you sent
        const authHeader = req.headers.get("authorization"); 

        if (!authHeader) {
            console.log("❌ API: No Authorization header received");
            return NextResponse.json(
                { message: "Token missing. Please login." },
                { status: 401 }
            );
        }

        // NOTE: Your CheckAuth function (from previous step) already handles 
        // removing the "Bearer " prefix, so we can pass the header directly.
        const user = await CheckAuth(authHeader);

        if (!user) {
            return NextResponse.json(
                { message: "Invalid token or User not found." },
                { status: 401 }
            );
        }

        // Success! Return the user data
        return NextResponse.json(user, { status: 200 });

    } catch (error: any) {
        console.error("Profile Fetch Error:", error);
        return NextResponse.json(
            { message: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}