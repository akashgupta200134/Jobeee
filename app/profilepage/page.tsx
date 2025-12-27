"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import { updateProfile } from "@/app/redux/action/user";
import ProtectedRoute from "@/components/ui/ProtectedRoute";
import { useRouter } from "next/navigation";

export default function MyProfile() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: any) => state.user);
  
  const [isEditing, setIsEditing] = useState(false);

  // --- Form State ---
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState(""); 
  
  // --- File State ---
  const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [previewPic, setPreviewPic] = useState("");

  // --- Load Data on Component Mount ---
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhoneNumber(user.phoneNumber || "");
      setBio(user.bio || "");
      setSkills(user.skills ? user.skills.join(", ") : ""); // Convert Array -> String
      setPreviewPic(user.profilePic || "");
    }
  }, [user]);

  // --- Handlers ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (e.target.name === "profilePic") {
        setProfilePicFile(file);
        setPreviewPic(URL.createObjectURL(file)); 
      } else if (e.target.name === "resume") {
        setResumeFile(file);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phoneNumber", phoneNumber);
    formData.append("bio", bio);
    formData.append("skills", skills); 

    if (profilePicFile) formData.append("profilePic", profilePicFile);
    if (resumeFile) formData.append("resume", resumeFile);

    dispatch(updateProfile(formData));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (user) {
        setName(user.name);
        setPhoneNumber(user.phoneNumber);
        setBio(user.bio);
        setSkills(user.skills?.join(", ") || "");
        setPreviewPic(user.profilePic);
        setProfilePicFile(null);
        setResumeFile(null);
    }
  };

  // --- Helper: Format Date ---
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  return (
    <ProtectedRoute allowedRoles={["jobseeker", "recruiter"]}>
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="mx-auto max-w-5xl rounded-2xl bg-white shadow-xl overflow-hidden">
          
          {/* Header Background */}
          <div className="h-40 w-full bg-gradient-to-r from-blue-600 to-indigo-700"></div>

          <div className="px-8 pb-12">
            
            {/* --- TOP SECTION: Profile Pic & Main Actions --- */}
            <div className="relative -mt-20 mb-8 flex flex-col md:flex-row justify-between items-end gap-4">
                
                {/* Profile Picture */}
                <div className="relative group">
                    <div className="h-40 w-40 rounded-full border-4 border-white bg-white overflow-hidden shadow-lg">
                        {previewPic ? (
                            <img src={previewPic} alt="Profile" className="h-full w-full object-cover" />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gray-200 text-5xl font-bold text-gray-400">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>
                    {/* Camera Icon Overlay (Only in Edit Mode) */}
                    {isEditing && (
                        <label className="absolute bottom-2 right-2 cursor-pointer rounded-full bg-gray-900 p-3 text-white hover:bg-gray-700 shadow-md transition-all">
                             <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /></svg>
                            <input type="file" name="profilePic" accept="image/*" className="hidden" onChange={handleFileChange} />
                        </label>
                    )}
                </div>

                {/* Edit / Save Buttons */}
                <div className="mb-2">
                    {!isEditing ? (
                        <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-white font-medium shadow hover:bg-blue-700 transition">
                           <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                           Edit Profile
                        </button>
                    ) : (
                        <div className="flex gap-3">
                            <button onClick={handleCancel} className="rounded-lg bg-gray-200 px-6 py-2.5 text-gray-700 font-medium hover:bg-gray-300 transition">Cancel</button>
                            <button onClick={handleSubmit} disabled={loading} className="rounded-lg bg-green-600 px-6 py-2.5 text-white font-medium shadow hover:bg-green-700 transition">
                                {loading ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* --- MAIN GRID: All Details --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* LEFT COLUMN: Personal Info */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* 1. Basic Information */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">Basic Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Full Name</label>
                                {isEditing ? (
                                    <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-md border border-gray-300 p-2.5 mt-1 focus:ring-2 focus:ring-blue-500 outline-none" />
                                ) : <p className="text-gray-900 text-lg font-medium mt-1">{user?.name}</p>}
                             </div>

                             <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Email</label>
                                <p className="text-gray-700 text-lg mt-1 truncate" title={user?.email}>{user?.email}</p>
                                <span className="text-xs text-orange-500 bg-orange-50 px-2 py-0.5 rounded">Read-only</span>
                             </div>

                             <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Phone Number</label>
                                {isEditing ? (
                                    <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full rounded-md border border-gray-300 p-2.5 mt-1 focus:ring-2 focus:ring-blue-500 outline-none" />
                                ) : <p className="text-gray-900 text-lg mt-1">{user?.phoneNumber || "N/A"}</p>}
                             </div>

                             <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Role</label>
                                <p className="text-blue-600 font-bold capitalize text-lg mt-1">{user?.role}</p>
                             </div>
                        </div>
                    </div>

                    {/* 2. Bio */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">About Me</h3>
                        {isEditing ? (
                            <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={4} className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Write a short bio..." />
                        ) : (
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{user?.bio || "No bio added yet."}</p>
                        )}
                    </div>

                    {/* 3. Skills */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                         <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">Skills</h3>
                         {isEditing ? (
                             <div>
                                 <input value={skills} onChange={(e) => setSkills(e.target.value)} className="w-full rounded-md border border-gray-300 p-2.5 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="React, Node.js, Python..." />
                                 <p className="text-xs text-gray-400 mt-2">Separate skills with commas.</p>
                             </div>
                         ) : (
                             <div className="flex flex-wrap gap-2">
                                 {user?.skills && user.skills.length > 0 ? (
                                     user.skills.map((skill: string, idx: number) => (
                                         <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-100">
                                             {skill}
                                         </span>
                                     ))
                                 ) : <span className="text-gray-400 italic">No skills listed.</span>}
                             </div>
                         )}
                    </div>

                </div>

                {/* RIGHT COLUMN: Account Details & Resume */}
                <div className="space-y-8">
                    
                    {/* 4. Documents */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">Documents</h3>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">Resume / CV</label>
                        
                        {isEditing ? (
                            <input type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                        ) : (
                            <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                                {user?.resume ? (
                                    <a href={user.resume} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition">
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                        View Resume
                                    </a>
                                ) : <span className="text-gray-400 italic text-sm">No resume uploaded.</span>}
                            </div>
                        )}
                    </div>

                    {/* 5. Account Metadata (Read Only) */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <h3 className="text-md font-bold text-gray-700 border-b border-gray-200 pb-2 mb-4">Account Metadata</h3>
                        
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase">User ID</p>
                                <p className="font-mono text-xs text-gray-600 break-all bg-white p-2 rounded border mt-1">{user?._id}</p>
                            </div>

                            <div className="flex justify-between">
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase">Saved Jobs</p>
                                    <p className="font-medium text-gray-800">{user?.savedJobs?.length || 0}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-500 font-bold uppercase">Member Since</p>
                                    <p className="font-medium text-gray-800">{formatDate(user?.createdAt)}</p>
                                </div>
                            </div>
                            
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase">Last Profile Update</p>
                                <p className="font-medium text-gray-800">{formatDate(user?.updatedAt)}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}