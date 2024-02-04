"use client"
import React, { useContext, useEffect } from "react";
import SideNav from "./_components/hello";
//import SideNav from './_components/SideNav';
import Header from "./_components/Header";
import { useUser } from "@clerk/nextjs";
import GlobalApi from "../_utils/GlobalApi";
import { UserMemberContext } from "../_context/UserMemberContext";

const layout = ({ children }) => {
  const { user } = useUser();
  const { isMember, setIsMember } = useContext(UserMemberContext)
  
  useEffect(() => {
    user&&checkUserMembership();
  }, [user])
  

  //Used to check the membership
  const checkUserMembership = () => {
    GlobalApi.checkForMembership(user?.primaryEmailAddress.emailAddress)
      .then(
      (resp) => {
        console.log(resp);
        if (resp?.memberships?.length > 0) {
          console.log("Is a member");
          setIsMember(true);
        }
      }
    );
  };




  return (
    <div>
      <div>
        <SideNav />
      </div>
      <div className="min-w-624 ml-8 md:ml-60">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default layout;
