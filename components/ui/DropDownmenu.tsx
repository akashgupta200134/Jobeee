"use client";

import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout} from "@/app/redux/action/user"; 
import { AppDispatch } from "@/app/redux/store";

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user } = useSelector((state: any) => state.user);

  // Toggle the menu
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Logout Logic
  const handleLogout = () => {
    dispatch(logout());
    router.replace("/signin");
    setIsOpen(false);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* 1. The Trigger Button (Avatar / Name) */}
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {/* User Initial Avatar */}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
          
         {/* 🖼️ LOGIC: Show Image if exists, otherwise show Initial */}
  {user?.profilePic ? (
    <img 
      src={user.profilePic} 
      alt="Profile" 
      className="h-8 w-8 rounded-full object-cover border border-gray-300"
    />
  ) : (
    // Fallback: The Blue Circle with Initial
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
      {user?.name?.charAt(0).toUpperCase() || "U"}
    </div>
  )}
        </div>
        
        <span className="hidden md:block">{user?.name || "Account"}</span>
        
        {/* Down Arrow Icon */}
        <svg
          className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* 2. The Dropdown Menu (Hidden unless isOpen is true) */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-46 origin-top-right rounded-md border border-gray-100 bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          
          {/* Header (Mobile only or extra info) */}
          <div className="px-4 py-2 border-b border-gray-100 md:hidden">
             <p className="text-sm font-bold text-gray-900">{user?.name}</p>
             <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>

          {/* Menu Items */}
          <Link
            href="/profilepage" 
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            My Profile
          </Link>

          {/* <Link
             href="/settings"
             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
             onClick={() => setIsOpen(false)}
          >
             Settings
          </Link> */}

          <div className="my-0.5 border-t border-gray-100"></div>

          <button
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}