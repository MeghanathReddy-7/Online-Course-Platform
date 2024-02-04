import GlobalApi from  "../../../_utils/GlobalApi"
import React, { useEffect, useState } from "react";
import Link  from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import CourseItem from "./CourseItem";

const CourseList = () => {
  const [courseList, setcourseList] = useState();
  useEffect(() => {
    getAllCourses();
  }, []);
  const getAllCourses = () => {
    GlobalApi.getAllCourseList().then((resp) => {
      setcourseList(resp?.courseLists);
    });
  };
  return (
    <div className="p-5 bg-white rounded-lg mt-5">
      {/* Title and filter */}
      <div className="flex items-center justify-between ">
        <h2 className="text-[25px] font-bold text-violet-700">Our Courses</h2>
        {/* <Select className="bg-white">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">All</SelectItem>
            <SelectItem value="dark">Paid</SelectItem>
            <SelectItem value="system">Free</SelectItem>
          </SelectContent>
        </Select> */}
      </div>

      {/* Display all the courses  */}
      <div className=" grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4  ">
        {courseList?.length > 0 ? courseList?.map((item, index) => (
          <Link href={'/course-preview/'+item.slug}>
          <div key={index} className="bg-white  md:border-gray-900 ">
                <CourseItem course={item} />
            </div>
            </Link>)) :
                  [1, 2, 3, 4, 5, 6,7,8,9,10,11,12].map((item, index) => (
                      <div key={index} className="w-full h-[240px] rounded-xl m-2  bg-gray-500 animate-pulse"></div>  ))}
      </div>
      </div>
  );
};

export default CourseList;
