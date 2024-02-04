"use client";
import {
  BadgeIcon,
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  LayoutGrid,
  Mail,
} from "lucide-react";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
const SideNav = () => {
  const { user } = useUser();
  const menu = [
    {
      id: 8,
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
      auth: user,
    },
    {
      id: 1,
      name: "All Courses",
      icon: BookOpen,
      path: "/courses",
      auth: true,
    },
    {
      id: 4,
      name: "Store",
      icon: LayoutGrid,
      path: "/store",
      auth: true,
    },
    {
      id: 2,
      name: "Membership",
      icon: BadgeIcon,
      path: "/membership",
      auth: true,
    },
    {
      id: 3,
      name: "Be Instructor",
      icon: GraduationCap,
      path: "/instructor",
      auth: true,
    },
    {
      id: 5,
      name: "Newsletter",
      icon: Mail,
      path: "/newsletter",
      auth: true,
    },
  ];
  const path = usePathname();
  useEffect(() => {
    console.log("path", path);
  }, []);
  return (
    <div className="p-5 bg-white shadow-sm border h-screen">
      <Image src="/logo.svg" alt="logo" width={170} height={80} />
      <hr className="mt-7"></hr>
      {/* menu list */}
      <div className="mt-5">
        {menu.map((item, index) =>item.auth&& (
          <Link href={item.path}>
            <div
              className={` group flex gap-3
             mt-2 p-3 text-[18px] 
             items-center
             text-gray-500 
             cursor-pointer
             hover:bg-violet-700
             hover:text-white
             rounded-md
             transition-all ease-in-out duration-200
             ${path.includes(item.path) && "bg-violet-700 text-white"}
             `}
            >
              <item.icon className="group-hover:animate-bounce" />
              <h2>{item.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default SideNav;
