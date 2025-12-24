import jwt, { JwtPayload } from "jsonwebtoken";
import { User, IUser } from "../models/User"; // Assuming you export an interface 'IUser' from your model

// 1. Define the shape of your Token's payload
// We extend JwtPayload so it includes standard fields like 'iat' and 'exp'
interface AuthTokenPayload extends JwtPayload {
  id: string;
}

async function CheckAuth(token: string): Promise<IUser | null> {
  try {
    if (!token) return null;

    // 2. Handle the environment variable safely
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    // 3. Verify and Cast
    // We cast to 'AuthTokenPayload' so TS knows 'decodedData.id' exists
    const decodedData = jwt.verify(token, secret) as AuthTokenPayload;

    // 4. Find the user
    // Mongoose's findById returns null automatically if not found
    const user = await User.findById(decodedData.id);

    return user; 
    
  } catch (error) {
    // 5. Handle 'unknown' error type in TypeScript
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Auth Error:", errorMessage);
    return null;
  }
}

export default CheckAuth;