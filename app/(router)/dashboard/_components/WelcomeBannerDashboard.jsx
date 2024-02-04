import React from "react";
import Image from "next/image";

const WelcomeBannerDashboard = ({ user }) => {
  return (
    <div className="bg-red-100 rounded-sm p-5 flex gap-5 items-center">
      <div className="flex flex-wrap">
        <Image src="/hi-panda.webp" alt="panda" width={150} height={150} />
        <div>
          <h2 className="text-[32px] font-bold">
            Welcome Back,
            <span className="text-violet-700  font-bold">{user?.fullName}</span>
          </h2>
          <h2 className="text-[19px] font-light text-slate-500">
            Lets Begin Learning where you left off,
            <br/>
            Keep it up and improve your progress
          </h2>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBannerDashboard;
