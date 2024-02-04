"use client";
import React, { useEffect, useState } from "react";
import GlobalApi from "../../../_utils/GlobalApi";
import { useUser } from "@clerk/nextjs";
import CourseVedioDescription from "../../course-preview/[courseId]/_components/CourseVedioDescription";
import CourseContentSection from "../../course-preview/[courseId]/_components/CourseContentSection";
import { toast } from "sonner";
const WatchCourse = ({ params }) => {
  const { user } = useUser();
  const [courseInfo, setCourseInfo] = useState([]);
  const [completedChapter, setCompletedChapter] = useState([]);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  useEffect(() => {
    params && user && getUserEnrolledCourseDetail();
  }, [params && user]);

  //Get User Enrolled Course Details by Id,Email

  const getUserEnrolledCourseDetail = () => {
    GlobalApi.getUserEnrolledCourseDetails(
      params.enrollId,
      user.primaryEmailAddress.emailAddress
    ).then((resp) => {
      setCompletedChapter(resp.userEnrollCourses[0].completedChapter)
      setCourseInfo(resp.userEnrollCourses[0].courseList);
    });
  };

  //Save completed Chapter Id
  const onChapterComplete = (chapterId) => {
    GlobalApi.markChapterCompleted(params.enrollId, chapterId).then((resp) => {
      console.log(resp);
      if (resp) {
        toast("chapter marked as complete");
        getUserEnrolledCourseDetail();
      }
    });
  };
  return (
    courseInfo.name && (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 p-5 gap-3 bg-zinc-200">
          {/* Title,Vedio,Description */}
          <div className="col-span-2 bg-white p-3">
            <CourseVedioDescription
              courseInfo={courseInfo}
              activeChapterIndex={activeChapterIndex}
              watchMode={true}
              setChapterCompleted={(chapterId) => onChapterComplete(chapterId)}
            />

            {/* course content */}
          </div>
          <div>
            <CourseContentSection
              courseInfo={courseInfo}
              isUserAlreadyEnrolled={true}
              watchMode={true}
              completedChapter={completedChapter}
              setActiveChapterIndex={(index) => setActiveChapterIndex(index)}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default WatchCourse;
