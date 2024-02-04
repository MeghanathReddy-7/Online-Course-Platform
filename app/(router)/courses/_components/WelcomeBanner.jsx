import React from "react";
import Image from "next/image";

const WelcomeBanner = () => {
  return (
    <div className="flex gap-5 items-center bg-white rounded-xl p-5">
      <div className="flex flex-wrap">
        <Image src="/panda.png" alt="panda" width={100} height={100} />
        <div>
          <h2 className="font-bold text-[29px] ">
            Welcome to
            <span className="text-violet-700 "> ProEducator</span> Academy
          </h2>
          <h2 className="text-gray-500">
            Explore, Learn and Build real life Projects
          </h2>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
