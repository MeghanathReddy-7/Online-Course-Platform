"use client";
import React from "react";
import WelcomeBanner from "./_components/WelcomeBanner";
import CourseList from "./_components/CourseList";
import SideBanner from "./_components/SideBanner";

function Courses() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 p-5 gap-5 bg-zinc-200 h-screen ">
      {/* left container */}
      <div className="col-span-3">
        <WelcomeBanner />

        {/* course list */}
        <CourseList className="bg-white" />
      </div>
      {/* right container */}
      <div className="p-5 bg-white rounded-xl">
        <SideBanner />
      </div>
    </div>
  );
}

export default Courses;
