import { Button } from "@/components/ui/button";
import React from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { AiFillAlert } from "react-icons/ai";
import { AiFillBell } from "react-icons/ai";
import Link from "next/link";
export default function Hero() {
  return (
    <div className="p-4 container mx-auto font-grot">
      <div className="flex justify-around">
        <div className="w-1/2 flex justify-center flex-col space-y-4">
          <div>
            <p className="uppercase text-xs text-head font-semibold">
              Report Crimes in Your Neighborhood
            </p>
            <h1 className="text-6xl text-texty font-bold ">
              Make the World <br /> A Safe Haven
            </h1>
          </div>
          <div>
            <p className="text-sm text-pera">
              Our dedicated detective and fact-checker teams handle every report
              with utmost care. Never let a crime get unreported.
            </p>
          </div>
          <div>
            <div className="flex gap-x-4">
              <Link
                href="/signin"
                className="bg-head px-5 py-2 text-white font-semibold"
              >
                Signin
              </Link>
              <Link
                href="/signup"
                className="border-[1px] border-pera px-5 py-2 flex items-center font-semibold"
              >
                Signup
                <MdOutlineArrowOutward />
              </Link>
            </div>
            <div className="flex items-center mt-3 space-x-2">
              <div className="flex -space-x-4 rtl:space-x-reverse">
                <img
                  className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                  src="https://www.shutterstock.com/image-photo/profile-side-picture-young-beautiful-260nw-2175899239.jpg"
                  alt=""
                />
                <img
                  className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                  src="https://img.freepik.com/free-photo/portrait-young-woman-with-freaky-appearance-red-wall_155003-4256.jpg"
                  alt=""
                />
                <img
                  className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                  src="https://img.freepik.com/free-photo/close-up-shot-hopeful-optimistic-happy-young-redhead-20s-girl-with-freckles-long-hair-smiling-joyfully-with-faith-eyes-prominent-look-posing-against-purple-background_1258-81590.jpg"
                  alt=""
                />
              </div>
              <div>
                <div className="flex items-center text-xs">
                  <h1 className="flex items-center">
                    <FaStar className="text-yellow-400" />
                    <FaStar className="text-yellow-400" />
                    <FaStar className="text-yellow-400" />
                    <FaStar className="text-yellow-400" />
                  </h1>
                  <h1 className="mx-1"> 4.2</h1>
                </div>
                <p className="text-xs">976+ Reviews</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <Image
            src={"/images/shield.jpg"}
            width={350}
            height={500}
            alt="hero"
            className="rounded-sm z-10"
          />

          <div className="flex justify-center -mt-32 z-20 relative ">
            <div className="shadow-xl bg-white w-[40%]  p-4 ">
              <AiFillAlert className="text-2xl text-red-700 mb-1" />
              <h1 className="text-2xl font-bold text-texty">500+</h1>
              <p className="text-xs">Total Reporters</p>
            </div>
            <div className="shadow-xl bg-head w-[40%] sa p-4 text-white">
              <AiFillBell className=" text-2xl mb-1 text-yellow-400" />
              <h1 className="text-2xl font-bold ">70+</h1>
              <p className="text-xs">Total Fact-Checkers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
