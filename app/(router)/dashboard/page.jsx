"use client";
import React, { use, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import WelcomeBannerDashboard from "./_components/WelcomeBannerDashboard";
import SideBanner from "../courses/_components/SideBanner";
import InProgressCourseList from "./_components/InProgressCourseList";
import GlobalApi from "../../_utils/GlobalApi";
const DashBoard = () => {
  const { user } = useUser();
  const [userEnrolledCourses, setUserEnrolledCourses] = useState([]);
  useEffect(() => {
    user && getAllUserEnrolledCourses();
  }, [user]);

  //To get all the courses registred by a user
  const getAllUserEnrolledCourses = () => {
    GlobalApi.getUserAllEnrolledCourseList(
      user.primaryEmailAddress.emailAddress
    ).then((resp) => {
      console.log(resp);
      setUserEnrolledCourses(resp.userEnrollCourses);
    });
  };
  return (

    <div className="h-screen grid grid-cols-1 md:grid-cols-4 p-5 gap-5 bg-zinc-200 ">
      {/* left container */}
      <div className="col-span-3">
        <WelcomeBannerDashboard user={user} />
        {/* In Progree course List */}
        <InProgressCourseList userEnrolledCourses={userEnrolledCourses} />
      </div>
      {/* right container */}
      <div className="p-5 bg-white rounded-xl">
        <SideBanner />
      </div>
    </div>
  );
};

export default DashBoard;
