"use client";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import {
  BadgeCheck,
  BookOpen,
  LayoutDashboard,
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
      id: 2,
      name: "Membership",
      icon: BadgeCheck,
      path: "/Membership",
      auth: true,
    },
    {
      id: 5,
      name: "NewsLetter",
      icon: Mail,
      path: "/NewsLetter",
      auth: true,
    },
  ];
  const path = usePathname();
  useEffect(() => {
    console.log("path", path);
  }, []);
  return (
    <div>
      <Disclosure as="nav">
        <Disclosure.Button className="absolute top-4 left-4 inline-flex items-center peer justify-center rounded-md p-2 text-violet-700 hover:bg-violet-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
          <GiHamburgerMenu
            className="block md:hidden h-6 w-6"
            aria-hidden="true"
          />
        </Disclosure.Button>
        <div className="p-6 w-3/5 h-screen bg-white fixed top-0 -left-96  md:left-0 md:w-60 lg:left-0 lg:w-60  peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
          <Image src="/logo.png" alt="logo" width={600} height={150} />
          <hr className="mt-7"></hr>
          {/* menu list */}
          <div className="flex flex-col justify-start item-center">
            <div className="my-4 border-b border-gray-100 pb-4">
              {menu.map(
                (item, index) =>
                  item.auth && (
                    <Link href={item.path}>
                      <div
                        className={` 
                                  flex mb-2 justify-start items-center gap-4 pl-5  hover:bg-violet-700
                                   text-gray-500 
             hover:text-white p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto
             ${path.includes(item.path) && "bg-violet-700 text-white"}
             `}
                      >
                        <item.icon className="text-2xgroup-hover:animate-bounce " />
                        <h2 className="text-base font-semibold ">
                          {item.name}
                        </h2>
                      </div>
                    </Link>
                  )
              )}
            </div>
          </div>
        </div>
      </Disclosure>
    </div>
  );
};

export default SideNav;
