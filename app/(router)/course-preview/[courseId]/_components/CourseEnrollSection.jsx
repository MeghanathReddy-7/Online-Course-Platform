import { useUser } from "@clerk/nextjs";
import { Button } from "../../../../../components/ui/button";
import React, { useEffect } from "react";
import Link from "next/link";
import GlobalApi from "../../../../_utils/GlobalApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useContext } from "react";
import { UserMemberContext } from "../../../../_context/UserMemberContext";
const CourseEnrollSection = ({ courseInfo,isUserAlreadyEnrolled }) => {
  const { isMember, setIsMember } =useContext(UserMemberContext)
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    console.log("isUserAlreadyEnrolled", isUserAlreadyEnrolled);
  }, [])
  

  //Enroll to the course
  const onEnrollCourse = () => {
    GlobalApi.enrollToCourse(
      courseInfo?.slug,
      user?.primaryEmailAddress.emailAddress
    ).then((resp) => {
      console.log(resp);
      if (resp) {
        //Show Toast on Successfull Enroll
        toast("User Enrolled Successfull", {
          description: "User Enrolled to this Course",
        });
        //Redirect to watch Course
        router.push("/watch-course/" + resp.createUserEnrollCourse.id);
      }
    });
  };

  const GotoBuyMembership = () => {
    router.push('/Membership');
  }
  return (
    <div className="p-2 text-center rounded-sm bg-violet-700 flex flex-col gap-3 mt-3">
      <h2 className="text-[22px] font-bold text-white">Enroll to the Course</h2>
      {/* User has MemberShip and Already Login */}
      {user && (isMember || courseInfo.free)&&!isUserAlreadyEnrolled? (
        <div>
          <h2 className="text-white font-light">
            Enroll Now to Start Leaning and Building the project
          </h2>
          <Button
            className="bg-white text-violet-700 hover:bg-white
          hover:text-primary"
            onClick={() => onEnrollCourse()}
          >
            Enroll Now
          </Button>
        </div>
      ) : !user ? (
        <div>
          <h2 className="text-white font-light">
            Enroll Now to Start Leaning and Building the project
          </h2>
          <Link href={"/sign-in"}>
            <Button className="bg-white text-violet-700 hover:bg-whitehover:text-primary">
              Enroll Now
            </Button>
          </Link>
        </div>
      ) : (
        !isUserAlreadyEnrolled&&<div className="flex flex-col gap-3 mt-3">
          <h2 className="text-white font-light">
            Buy Montly Membership and Get Access to All Courses
          </h2>
          <Button
            className="bg-white text-violet-700 hover:bg-white
          hover:text-primary" onClick={GotoBuyMembership}
          >
            Buy Membership Now
          </Button>
        </div>
      )}
      {/*For the Above Section User Does Not Login or Not have Membership  */}
      {isUserAlreadyEnrolled &&
        <div className="flex flex-col gap-3 mt-3">
          <h2 className="text-white font-light">
            Continue to Learn you Chapters
          </h2>
          <Link href={'/watch-course/'+isUserAlreadyEnrolled}>
          <Button
              className="bg-white text-violet-700 hover:bg-white hover:text-primary">Continue</Button>
            </Link>
        </div>}
    </div>
  );
};

export default CourseEnrollSection;
