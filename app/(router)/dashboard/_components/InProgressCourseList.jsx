import React from 'react'
import ProgressCourseItem from "./ProgressCourseItem"
const InProgressCourseList = ({userEnrolledCourses}) => {
  return (
    <div className='p-5 bg-white mt-3 rounded-sm'>
          <h2 className='text-violet-700 text-[18px] font-semibold'>Recent Enrolled Courses</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-3'>
              {userEnrolledCourses.map((item, index) => (
                  <ProgressCourseItem key={index}
                      course={item} />
              ))}
          </div>
    </div>
  )
}

export default InProgressCourseList
