import mongoose, { Schema, Document, Model } from "mongoose";

// 1. Define an interface representing a document in MongoDB.
export interface IUser extends Document {
  name: string;
  email: string;
  phoneNumber: string; // Changed to String
  password?: string;   // Optional because Google/Auth providers might not have passwords
  role: "jobseeker" | "recruiter";
  bio?: string;        // Made optional (recruiters might not need a bio)
  skills: string[];
  resume?: string;     // URL to the resume file
  profilePic?: string; // URL to the profile picture
  savedJobs?: mongoose.Schema.Types.ObjectId[]; // Array of Job IDs
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure no duplicate emails
    },
    phoneNumber: {
      type: String, // Best practice for phone numbers
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // Prevents password from being returned in queries by default
    },
    role: {
      type: String,
      enum: ["jobseeker", "recruiter"],
      required: true,
    },
    bio: {
      type: String,
    },
    skills: [
      {
        type: String,
      },
    ],
    resume: {
      type: String, // Store the File URL here (Cloudinary/S3)
    },
    profilePic: {
      type: String, // Store the Image URL here
    },
    savedJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job", // This links to your future 'Job' model
      },
    ],
  },
  {
    timestamps: true,
  }
);

// 2. Export the model with the "Singleton" check for Next.js
export const User =
  (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>("User", userSchema);