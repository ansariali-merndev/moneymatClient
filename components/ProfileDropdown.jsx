"use client";

import Image from "next/image";
import profile from "../assets/profile.webp";
import { useState, useRef, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { handleAuthLogout } from "@/public/axios";
import { handleErrorSwal } from "@/public/Swal";
import { useRouter } from "next/navigation";

export const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, setuser } = useUser();
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const res = await handleAuthLogout();

    if (!res?.success) {
      return handleErrorSwal(res?.message || "Logout failed");
    }
    setuser(null);
    setOpen(false);
    router.push("/login");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Image
        src={profile}
        alt="Profile"
        width={30}
        height={30}
        className="cursor-pointer rounded-full"
        onClick={() => setOpen(!open)}
      />

      {open && (
        <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md z-50 p-3">
          <p className="text-sm text-gray-700 mb-2">
            👋 Hello, {user?.username}!
          </p>
          <p className="text-sm">{user?.email}</p>
          <button
            className="w-full text-left text-sm px-2 py-1 rounded bg-sky-400 text-white cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
