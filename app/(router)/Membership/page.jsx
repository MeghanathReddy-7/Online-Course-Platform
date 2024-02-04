"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Script from "next/script";
import { useUser } from "@clerk/nextjs";
import GlobalApi from "../../_utils/GlobalApi";
import { toast } from "sonner";
import { useContext } from "react";
import { UserMemberContext } from "../../_context/UserMemberContext";
import { ChevronsRight } from "lucide-react";
const page = () => {
  const { isMember, setIsMember } = useContext(UserMemberContext);
  const [subscriptionId, setSubsciptionId] = useState(null);
  const { user } = useUser();
  const createSubscriptionMontly = async (planId) => {
    axios
      .post("/api/MontlySub", JSON.stringify({ plan_id: planId }))
      .then((resp) => {
        console.log(resp.data);
        setSubsciptionId(resp.data.id);
      });
  };

  const createSubscriptionYearly = async (planId) => {
    axios
      .post("/api/YearlySub", JSON.stringify({ plan_id: planId }))
      .then((resp) => {
        console.log(resp.data);
        setSubsciptionId(resp.data.id);
        makePayments();
      });
  };

  useEffect(() => {
    subscriptionId && makePayments();
  }, [subscriptionId]);

  const makePayments = () => {
    console.log("sub is",subscriptionId);
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_LIVE_KEY,
      subsciption_id: subscriptionId,
      name: "ProEducator Academy",
      description: "ProEducator Pro Membership",
      image: "/logo.png",
      handler: async (resp) => {
        if (resp) {
          addNewMember(resp?.razorpay_payment_id);
        }
      },
      theme: {
        color: "#7D41E1",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const addNewMember = (paymentId) => {
    GlobalApi.addNewMember(
      user.primaryEmailAddress.emailAddress,
      paymentId
    ).then(
      (resp) => {
        console.log(resp);
        if (resp) {
          toast("Payment Sucessfull");
        }
      },
      (error) => {
        toast("Some Error Happend");
      }
    );
  };
  return (
    <div className=" bg-slate-300 h-screen">
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      ></Script>
      {!isMember && (
        <div>
          <div class="mx-auto max-w-3xl px-2 py-4 sm:px-6 sm:py-12 lg:px-8">
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
              <div class="rounded-2xl border border-gray-400 p-6 hover:border-violet-700 cursor-pointer bg-white shadow-sm sm:px-8 lg:p-12">
                <div class="text-center">
                  <h2 class="text-lg font-medium text-gray-900">
                    Monthly<span class="sr-only">Plan</span>
                  </h2>
                  <p class="mt-2 sm:mt-4">
                    <strong class="text-3xl font-bold text-gray-900 sm:text-4xl">
                      ₹399
                    </strong>
                  </p>
                </div>
                <ul class="mt-6 space-y-2">
                  <li class="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="h-5 w-5 text-violet-700"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      ></path>
                    </svg>
                    <span class="text-gray-700"> Access to All Courses </span>
                  </li>
                  <li class="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="h-5 w-5 text-violet-700"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      ></path>
                    </svg>
                    <span class="text-gray-700"> Doubt Solving Support </span>
                  </li>
                  <li class="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="h-5 w-5 text-violet-700"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      ></path>
                    </svg>
                    <span class="text-gray-700"> Free App Membership </span>
                  </li>
                  <li class="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="h-5 w-5 text-violet-700"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      ></path>
                    </svg>
                    <span class="text-gray-700">
                      {" "}
                      Email &amp; Instagram DM support{" "}
                    </span>
                  </li>
                </ul>
                <button
                  class="mt-8 block w-full rounded-full border bg-violet-700 px-12 py-3  text-center text-sm font-medium  text-white hover:ring-1 hover:ring-indigo-600 focus:outline-none focus:ring  active:text-indigo-500"
                  onClick={() =>
                    createSubscriptionMontly("plan_NWSlkqDqVyszOV")
                  }
                >
                  <span>Get Started</span>
                </button>
              </div>
              <div class="rounded-2xl border border-gray-400 p-6 shadow-sm sm:px-8 lg:p-12 bg-white hover:border-violet-700 cursor-pointer ">
                <div class="text-center">
                  <h2 class="text-lg font-medium text-gray-900">
                    Yearly<span class="sr-only">Plan</span>
                  </h2>
                  <p class="mt-2 sm:mt-4">
                    <strong class="text-3xl font-bold text-gray-900 sm:text-4xl">
                      ₹3999
                    </strong>
                  </p>
                </div>
                <ul class="mt-6 space-y-2">
                  <li class="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="h-5 w-5 text-violet-700"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      ></path>
                    </svg>
                    <span class="text-gray-700"> Access to All Courses </span>
                  </li>
                  <li class="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="h-5 w-5 text-violet-700"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      ></path>
                    </svg>
                    <span class="text-gray-700"> Doubt Solving Support </span>
                  </li>
                  <li class="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="h-5 w-5 text-violet-700"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      ></path>
                    </svg>
                    <span class="text-gray-700"> Free App Membership </span>
                  </li>
                  <li class="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="h-5 w-5 text-violet-700"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      ></path>
                    </svg>
                    <span class="text-gray-700">
                      {" "}
                      Email &amp; Instagram DM support{" "}
                    </span>
                  </li>
                </ul>
                <button
                  class="mt-8 block rounded-full border bg-violet-700 px-12 py-3  w-full text-center text-sm font-medium text-white hover:ring-1 hover:ring-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                  onClick={() =>
                    createSubscriptionYearly("plan_NWSn960Re0Y2y9")
                  }
                >
                  <span>Get Started</span>
                </button>
              </div>
            </div>
          </div>
          <p class="text-center">
            Get your first monthly Subscription at half price by using the code{" "}
            <strong>FIRSTSTEP</strong> (Applicable for monthly plan only).
          </p>
        </div>
      )}
      {isMember && (
        <div>
          <div class="mx-auto  px-2 py-4 sm:px-6 sm:py-12 lg:px-8">
            <div class="grid grid-cols-1 sm:items-center ">
              <div class="rounded-2xl border border-gray-400 p-6 hover:border-violet-700 cursor-pointer bg-white shadow-sm sm:px-8 lg:p-12">
                <div class="text-center">
                  <p class="mt-2 sm:mt-4">
                    <strong class="text-3xl font-bold text-violet-700 sm:text-4xl">
                      Thanks For Takeing MemberShip
                    </strong>
                  </p>
                </div>
                <ul class="mt-6 space-y-2">
                  <li class="flex items-center gap-1">
                    <ChevronsRight className="text-[20px]" />
                    <span class="text-gray-700">
                      You Have Access to All Courses{" "}
                    </span>
                  </li>
                  <li class="flex items-center gap-1">
                    <ChevronsRight className="text-[20px]" />
                    <span class="text-gray-700">
                      Click on the Discord Link for Doubt Solving Support
                    </span>
                  </li>
                  <li class="flex items-center gap-1">
                    <ChevronsRight className="text-[20px]" />
                    <a
                      href="https://discord.gg/qTja4bcq"
                      className="text-violet-700"
                    >
                      DISCORD LINK
                    </a>
                  </li>
                  <li class="flex items-center gap-1">
                    <ChevronsRight className="text-[20px]" />
                    <span class="text-gray-700">
                      Password to enter the room is your email.
                    </span>
                  </li>
                  <li class="flex items-center gap-1">
                    <ChevronsRight className="text-[20px]" />
                    <span class="text-gray-700"> Free App Membership-Enter the same credentials at our app</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
