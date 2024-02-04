import React from "react";
import Image from "next/image";
import Link from "next/link";
const ProgressCourseItem = ({ course }) => {
  const getTotalCompletedChapterPerc = (item) => {
    const perc =
      (item.completedChapter?.length / item?.courseList?.chapter?.length) * 100;
    return perc;
  };

  return (
    <Link href={"/course-preview/" + course.courseList?.slug}>
      <div className="flex-wrap-reverse p-2">
        <div
          className="border rounded-xl
      hover:shadow-md
      hover:shadow-purple-400
      cursor-pointer
      "
        >
          <Image
            src={course.courseList?.banner?.url}
            width={500}
            height={150}
            alt="banner"
            className="rounded-t-xl"
          />
          <div className="flex flex-col gap-1 p-2 ">
            <h2 className="font-medium">{course.courseList.name}</h2>
            <h2 className="text-[15px] text-gray-500">
              {course.courseList.author}{" "}
            </h2>
            <h2 className="text-[15px] text-violet-700 mt-3 font-extrabold">
              {getTotalCompletedChapterPerc(course)}%
              <span className="float-right">
                {course.completedChapter?.length}/
                {course?.courseList?.chapter?.length}chapters
              </span>
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProgressCourseItem;
