"use client";
import React from "react";
import { Phone } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const page = () => {
  const toaster = (e) => {
    e.preventDefault();
    toast.success("Your Form Is Submitted\nContinue with the Courses");
  };

  return (
    <div>
      <section className="bg-slate-100">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
            <div className="lg:col-span-2 lg:py-12">
              <p className="max-w-xl text-[30px]">
                You'll receive weekly newsletter where you'll discover new
                content at ProEducator, including events, platform updates,New
                courses.
              </p>

              <div className="mt-8 ">
                <div className="flex flex-row">
                  <Phone className="mt-1" />
                  <span className=" ml-3 text-[30px] font-extrabold text-violet-700">
                    1800-200-300-400
                  </span>
                </div>
                <address className="mt-2 not-italic text-pink-600">
                  Our vision at ProEducator is to combine quality teachers,
                  engaging content and superior technology. we are able to
                  create a superior learning experience for students and aid in
                  their outcome improvement.
                </address>
              </div>
            </div>

            <div className="rounded-lg border-gray-500 bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
              <h2 className="mb-3 text-violet-700 font-extrabold text-3xl text-center">
                Sign Up for Our Newsletter{" "}
              </h2>
              <form action="" className="space-y-4">
                <div>
                  <label className="sr-only" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="w-full rounded-lg border-2 border-gray-500 p-3 text-sm"
                    placeholder="Name"
                    type="text"
                    id="name"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="sr-only" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="w-full rounded-lg border-2 border-gray-500 p-3 text-sm"
                      placeholder="Email address"
                      type="email"
                      id="email"
                      required
                    />
                  </div>

                  <div>
                    <label className="sr-only" htmlFor="phone">
                      Phone
                    </label>
                    <input
                      className="w-full rounded-lg border-2 border-gray-500 p-3 text-sm"
                      placeholder="Phone Number"
                      type="tel"
                      id="phone"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="sr-only" htmlFor="message">
                    Message
                  </label>

                  <textarea
                    className="w-full rounded-lg border-2 border-gray-500 p-3 text-sm"
                    placeholder="Message"
                    rows="8"
                    id="message"
                  ></textarea>
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="inline-block w-full rounded-lg bg-violet-700 px-5 py-3 font-medium text-white sm:w-auto"
                    onClick={toaster}
                  >
                    Submit
                  </button>
                  <ToastContainer />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
