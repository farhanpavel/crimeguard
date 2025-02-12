"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { GiMagnifyingGlass } from "react-icons/gi";
import Image from "next/image";
import { LuLogOut } from "react-icons/lu";
import { IoMdSettings } from "react-icons/io";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
type NavItem = {
  title: string;
  href: string;
  icon?: React.ReactNode;
  label?: string;
  disabled?: boolean;
};

const navItems: NavItem[] = [
  { title: "Overview", href: "/userdashboard/overview", icon: <FaHome /> },
  {
    title: "Report",
    href: "/userdashboard/report",
    icon: <GiMagnifyingGlass />,
  },
  {
    title: "Community",
    href: "/userdashboard/community",
    icon: <FaPeopleGroup />,
  },
];

export default function UserSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const path = usePathname();
  const searchParams = useSearchParams();
  const tripPlanId = searchParams.get("tripPlanId");
  const router = useRouter();
  const handleLogout = (e) => {
    e.preventDefault(); // Prevent default navigation
    Cookies.remove("role");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    router.push("/");
  };
  return (
    <div className="flex min-h-screen overflow-none">
      <nav
        onMouseEnter={() => setIsSidebarOpen(true)}
        onMouseLeave={() => setIsSidebarOpen(false)}
        className={`sticky top-0 left-0 h-screen bg-gradient-to-b from-gray-200 via-green-200 to-[#38646e] pt-4 transition-all duration-300 text-black ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="flex flex-col h-full justify-between py-4">
          <div className="overflow-hidden">
            <div className="mb-5 flex justify-center  items-center">
              <Image
                src={"/images/logo.png"}
                width={100}
                height={100}
                alt="logo"
              />
            </div>

            <nav className="grid items-start gap-2">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={
                    item.disabled
                      ? "/"
                      : `${item.href}${
                          tripPlanId ? `?tripPlanId=${tripPlanId}` : ""
                        }`
                  }
                  onClick={() => setIsSidebarOpen(false)}
                  className={`group relative overflow-none flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    path === item.href
                      ? "bg-green-300 text-black"
                      : "hover:bg-green-100 hover:text-black"
                  } ${item.disabled && "pointer-events-none opacity-60"}`}
                >
                  <div
                    className={`h-8 w-8 flex items-center overflow-none justify-center rounded-full bg-gray-200 ${
                      isSidebarOpen ? "mr-2" : ""
                    }`}
                  >
                    {item.icon}
                  </div>
                  {isSidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="text-base font-semibold"
                    >
                      {item.title}
                    </motion.span>
                  )}
                </Link>
              ))}
            </nav>
          </div>

          {/* Logout & Settings Button */}
          <div className="mt-auto space-y-2">
            {[
              {
                title: "Settings",
                href: "/userdashboard/settings",
                icon: <IoMdSettings />,
              },
              {
                title: "Logout",
                href: "/",
                icon: <LuLogOut />,
              },
            ].map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={item.title === "Logout" ? handleLogout : undefined} // Attach onClick for Logout only
                className="group relative flex overflow-none items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-green-100 hover:text-black"
              >
                <div
                  className={`h-8 w-8 flex items-center overflow-none justify-center rounded-full bg-gray-200 ${
                    isSidebarOpen ? "mr-2" : ""
                  }`}
                >
                  {item.icon}
                </div>
                {isSidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-base font-semibold"
                  >
                    {item.title}
                  </motion.span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
