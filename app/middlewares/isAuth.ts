import jwt, { JwtPayload } from "jsonwebtoken";
import { User, IUser } from "../models/User"; 

interface AuthTokenPayload extends JwtPayload {
  userId: string;
  role: string;
}

async function CheckAuth(token: string): Promise<IUser | null> {
  try {
    if (!token) return null;

    // ✂️ FIX: Remove "Bearer " if it exists
    // This handles both "Bearer eyJ..." (Header) and "eyJ..." (Cookie)
    const cleanToken = token.startsWith("Bearer ") 
      ? token.split(" ")[1] 
      : token;

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("❌ JWT_SECRET is missing in .env"); // Log this for debugging
      throw new Error("JWT_SECRET is not defined");
    }

    // 2. Decode the CLEAN token
    const decodedData = jwt.verify(cleanToken, secret) as AuthTokenPayload;

    // 3. Query the Database
    const user = await User.findById(decodedData.userId);

    if (!user) {
        console.error("❌ Token valid, but User ID not found in DB:", decodedData.userId);
        return null;
    }

    return user; 
    
  } catch (error) {
    // console.error("❌ Auth Check Failed:", error.message); // Uncomment to see exact error
    return null;
  }
}

export default CheckAuth;