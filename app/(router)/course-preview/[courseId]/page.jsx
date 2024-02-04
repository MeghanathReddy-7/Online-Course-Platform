"use client";
import React, { useEffect, useState } from "react";
import CourseVedioDescription from "./_components/CourseVedioDescription";
import GlobalApi from "../../../_utils/GlobalApi";
import CourseEnrollSection from "./_components/CourseEnrollSection";
import CourseContentSection from "./_components/CourseContentSection";
import { useUser } from "@clerk/nextjs";

const Coursepreview = ({ params }) => {
  const { user } = useUser();
  const [courseInfo, setcourseInfo] = useState();
  const [isUserAlreadyEnrolled, setIsUserAlreadyEnrolled] = useState('');
  useEffect(() => {
    params && getCourseInfoById();
  }, [params]);

  useEffect(() => {
    courseInfo && user && checkUserEnrolledToCourse();
  }, [courseInfo, user]);
  /*
    used to get Course Info by slug/Id name
  */
  const getCourseInfoById = () => {
    GlobalApi.getCourseById(params?.courseId).then((resp) => {
      setcourseInfo(resp?.courseList);
    });
  };

  // To check user already enrolled to the course

  const checkUserEnrolledToCourse = () => {
    GlobalApi.checkUserEnrolledToCourse(
      courseInfo?.slug,
      user?.primaryEmailAddress.emailAddress
    ).then(resp => {
      if (resp?.userEnrollCourses) {
        setIsUserAlreadyEnrolled(resp?.userEnrollCourses[0]?.id);
      }
    });
  };
  return (
    courseInfo && (
      <div className="grid grid-cols-1 md:grid-cols-3 p-5 gap-3 bg-zinc-200">
        {/* Title,Vedio,Description */}
        <div className="col-span-2 bg-white p-3">
          <CourseVedioDescription courseInfo={courseInfo} />

          {/* course content */}
        </div>
        <div>
          <CourseEnrollSection
            courseInfo={courseInfo}
            isUserAlreadyEnrolled={isUserAlreadyEnrolled}
          />

          <CourseContentSection courseInfo={courseInfo}
          isUserAlreadyEnrolled={isUserAlreadyEnrolled}/>
        </div>
      </div>
    )
  );
};

export default Coursepreview;
