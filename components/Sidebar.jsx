"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import profile from "../assets/profile.webp";
import {
  FaTachometerAlt,
  FaList,
  FaMoneyBillWave,
  FaWallet,
  FaLightbulb,
} from "react-icons/fa";
import { useUser } from "@/context/UserContext";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
  { path: "/category", label: "Category", icon: <FaList /> },
  { path: "/income", label: "Income", icon: <FaMoneyBillWave /> },
  { path: "/expense", label: "Expense", icon: <FaWallet /> },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const { user } = useUser();

  if (!user) return null; // Ensure user is loaded before rendering

  return (
    <aside className="w-64 z-40">
      <div className="flex flex-col gap-1 items-center justify-center mt-12">
        <Image
          src={profile}
          alt="Profile"
          width={30}
          height={30}
          priority={true}
        />
        <h2>{user?.email}</h2>
      </div>
      <nav className="flex flex-col gap-8 justify-center items-start my-12 ml-8">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center justify-center gap-2 px-4 py-1.5 rounded-md ${
              pathname === item.path ? "bg-indigo-600 text-white" : ""
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};
