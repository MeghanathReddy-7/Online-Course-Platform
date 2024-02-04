"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "../../../components/ui/button";
import { BellDot, Search } from "lucide-react";
import React from "react";
import Link from "next/link";
const Header = () => {
  const { user, isLoaded } = useUser();
  return (
    <div className="p-4 bg-white flex justify-between">
      <div className=" w-1/3 ">
        <div
          className="flex gap-2 border 
          p-2
          rounded-md"
        >
          <Search className="h-5 w-5 " />
          <input type="text" placeholder="Sreach..." className="outline-none" />
        </div>
      </div>
      {/* Get stared button &Bell Icon */}
      <div className="flex items-center gap-4">
        <BellDot className="text-gray-500" />
        {isLoaded && user ? (
          <UserButton afterSignOutUrl="/courses" />
        ) : (
          <Link href={"/sign-in"}>
            <Button className="bg-violet-700">Get Started</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
