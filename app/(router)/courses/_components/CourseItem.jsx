import React from "react";
import Image from "next/image";
const CourseItem = ({ course }) => {
  return (
    <div className="flex-wrap-reverse">
      <div
        className="border rounded-xl
      hover:shadow-md
      hover:shadow-purple-400
      cursor-pointer
      "
      >
        <Image
          src={course?.banner?.url}
          width={500}
          height={150}
          alt="banner"
          className="rounded-t-xl"
        />
        <div className="flex flex-col gap-1 p-2">
          <h2 className="font-medium">{course.name}</h2>
          <h2 className="text-[12px] text-gray-500">{course.author}</h2>
          {!course?.free ? (
            <div className="flex gap-2">
              <Image src="/chapter.png" alt="chapter" width={20} height={20} />
              <h2 className="text-[14px] text-gray-500">Chapters</h2>
            </div>
          ) : (
            <div className="flex gap-2">
              <Image src="/youtube.png" alt="youtube" width={20} height={20} />
              <h2 className="text-[14px] text-gray-500">Watch on youtube</h2>
            </div>
          )}
          <h2>{course?.free ? "Free" : "paid"}</h2>
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
