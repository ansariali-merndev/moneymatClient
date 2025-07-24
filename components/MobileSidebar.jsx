"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { RiMenu3Line } from "react-icons/ri";

export const MobileSidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Hamburger Icon */}
      <RiMenu3Line
        size={24}
        className="cursor-pointer"
        onClick={() => setOpen(true)}
      />

      {/* Overlay and Drawer */}
      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/30 z-30 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-64 bg-gray-200 z-40 shadow-lg transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
        <p
          onClick={() => setOpen(false)}
          className="fixed left-56 top-2 text-3xl text-indigo-600 z-50 cursor-pointer"
        >
          &times;
        </p>
      </div>

      {/* Close Button
      {open && (
       
      )} */}
    </div>
  );
};
