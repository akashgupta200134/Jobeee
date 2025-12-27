import mongoose, { Schema, Document, Model } from "mongoose";

// 1. Define the Interface (TypeScript Type)
export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phoneNumber: string; 
  password?: string;   // Optional in type because it's not returned by default queries
  role: "jobseeker" | "recruiter";
  bio?: string;        
  skills: string[];
  resume?: string;     
  profilePic?: string; 
  // ✅ FIX: Use 'Types.ObjectId' for the Interface, not 'Schema.Types...'
  savedJobs: mongoose.Types.ObjectId[]; 
  createdAt: Date;
  updatedAt: Date;
}

// 2. Define the Schema (Mongoose Structure)
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, 
    },
    phoneNumber: {
      type: String, 
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false, 
    },
    role: {
      type: String,
      enum: ["jobseeker", "recruiter"],
      required: true,
    },
    bio: {
      type: String,
      default: null,
    },
    skills: {
      type: [String],
      default: [],   
    },
    resume: {
      type: String, 
      default: "",
    },
    profilePic: {
      type: String, 
      default: "",
    },
    savedJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job", 
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const User =
  (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>("User", userSchema);