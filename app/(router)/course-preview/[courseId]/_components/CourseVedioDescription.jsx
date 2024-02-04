"use client";
import React from "react";
import VedioPlayer from "./VedioPlayer";
import Markdown from "react-markdown";
import { Button } from "../../../../../components/ui/button";
function CourseVedioDescription({
  courseInfo,
  activeChapterIndex,
  watchMode = false,
  setChapterCompleted,
}) {
  return (
    <div>
      <h2 className="text-[20px] font-semibold">{courseInfo?.name}</h2>
      <h2
        className="text-gray-500 text-[14px]
          mb-3"
      >
        {courseInfo?.author}
      </h2>
      {/* vedio play */}
      <VedioPlayer
        vedioUrl={courseInfo?.chapter[activeChapterIndex]?.vedio?.url}
        poster={!watchMode ? courseInfo?.banner?.url : null}
      />
      {/* description */}
      <h2 className="mt-5 text-[17px font-semibold">
        {watchMode ? (
          <span className="flex justify-between items-center">
            {courseInfo?.chapter[activeChapterIndex]?.name}
            <Button
              onClick={() =>
                setChapterCompleted(courseInfo?.chapter[activeChapterIndex]?.id)
              }
              className="bg-violet-700 text-white "
            >
              Mark Completed
            </Button>
          </span>
        ) : (
          <span>About This Course</span>
        )}
      </h2>

      {watchMode ? (
        <Markdown
          className="text-[14px]
              font-light mt-2 leading-7"
        >
          {courseInfo?.chapter[activeChapterIndex]?.shortDesc}
        </Markdown>
      ) : (
        <Markdown
          className="text-[14px]
              font-light mt-2 leading-7"
        >
          {courseInfo?.description}
        </Markdown>
      )}
    </div>
  );
}

export default CourseVedioDescription;
