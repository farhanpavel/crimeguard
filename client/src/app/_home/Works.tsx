import Image from "next/image";
import React from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
export default function Works() {
  return (
    <div>
      <div className="font-grot container mx-auto">
        <div className="flex justify-around p-10">
          <div className="w-[60%]">
            <h1 className="uppercase text-xs text-pera">Testimonial</h1>
            <p className="text-2xl text-texty font-bold">
              Why We are Trusted ?
            </p>
          </div>
          <div>
            <button className="border-[1px] border-pera px-5 py-2 flex items-center font-semibold">
              Learn More
              <MdOutlineArrowOutward />
            </button>
          </div>
        </div>
        <div className="flex justify-center gap-x-5">
          <div>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/rtCOPGNRpz4?si=X6iYtcqWtDIZPXHF"
              title="YouTube video player"
              frameborder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
          <div className="bg-head p-4">
            <h1 className="text-white uppercase text-xs">Facts and Numbers</h1>
            <div className="flex flex-col h-full justify-end ">
              <h1 className="text-7xl font-bold text-white">87%</h1>
              <p className="ml-2 text-white text-xs mb-6">
                of our reports were verified by the local reporters to be true
                <br />
                Authenticity and public safety are our number one priority.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
