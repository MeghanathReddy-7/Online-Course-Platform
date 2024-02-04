import GlobalApi from "../../../_utils/GlobalApi";
import React, { useEffect, useState } from "react";
import Image from "next/image";
const SideBanner = () => {
  const [sideBannnerList, setSideBannerList] = useState();
  useEffect(() => {
    getSideBanners();
  }, []);
  const getSideBanners = () => {
    GlobalApi.getsideBanner().then((resp) => {
      setSideBannerList(resp.sideBanners);
    });
  };
  const [AccounceList, setAccounceList] = useState();
  useEffect(() => {
    getAnnouncements();
  }, []);
  const getAnnouncements = () => {
    GlobalApi.getAnnouncementsSideBanner().then((resp) => {
      setAccounceList(resp.announcementsSidebanners);
    });
  };
  return (
    <div>
      {/* Follow me */}
      <div className="flex flex-col ">
        <h2 className="font-bold text-[29px] text-center text-violet-700">
          Follow On
        </h2>
        <div className="flex flex-row justify-center space-x-2">
          {sideBannnerList?.map((item, index) => (
            <div key={index}>
              <Image
                src={item.banner.url}
                alt="banner"
                width={100}
                height={100}
                className="rounded-xl bg-white 
             mt-2
      hover:shadow-md
      hover:shadow-purple-500
      cursor-pointer"
                onClick={() => window.open(item?.url)}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Announcements  here */}
      <div className="flex flex-col mt-4">
        <h2 className="flex-wrap text-center text- [30px] text-red-500 font-black animate-pulse italic">
          Announcements
        </h2>
        {AccounceList?.map((item, index) => (
          <div key={index}>
            <Image
              src={item.banner.url}
              alt="banner"
              width={500}
              height={500}
              className="rounded-xl bg-white 
             mt-1
      hover:shadow-md
      hover:shadow-purple-500
      cursor-pointer
      "
              onClick={() => window.open(item?.url)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default SideBanner;
