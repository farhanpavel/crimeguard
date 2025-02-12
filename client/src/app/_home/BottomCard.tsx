"use client";
import React from "react";
import { AiFillApi, AiFillAppstore, AiFillCompass } from "react-icons/ai";
import { motion, useAnimationFrame } from "framer-motion";

const AnimatedNumber = ({ target }: { target: number }) => {
  const [number, setNumber] = React.useState(0);

  useAnimationFrame((time) => {
    const progress = Math.min(time / 2000, 1); // Animation duration of 2 seconds
    setNumber(Math.floor(progress * target));
  });

  return <span className="text-2xl">{number}+</span>;
};

export default function BottomCard() {
  return (
    <div className="font-grot">
      <div className="p-7 flex justify-around">
        <div className="w-1/4 bg-white p-4 shadow-lg rounded-sm">
          <div>
            <AiFillApi className="bg-[#F7F7F7] text-5xl p-3" />
          </div>
          <div className="mt-3 space-y-2">
            <AnimatedNumber target={1800} />
            <h1 className="text-xs font-semibold text-head">Crime Reports</h1>
            <p className="text-md">
              Our reporters and dedicated team report crimes on a regular basis.
            </p>
          </div>
        </div>

        <div className="w-1/4 p-4 shadow-lg rounded-sm bg-head text-white">
          <div>
            <AiFillAppstore className="bg-white text-black text-5xl p-3" />
          </div>
          <div className="mt-3 space-y-2">
            <AnimatedNumber target={500} />
            <h1 className="text-xs font-semibold ">Criminals Captured</h1>
            <p className="text-md">
              It&apos;s not only about reporting the crime. We make sure to reach the
              right authority.
            </p>
          </div>
        </div>

        <div className="w-1/4 bg-white p-4 shadow-lg rounded-sm">
          <div>
            <AiFillCompass className="bg-[#F7F7F7] text-5xl p-3" />
          </div>
          <div className="mt-3 space-y-2">
            <AnimatedNumber target={1000} />
            <h1 className="text-xs font-semibold text-head">Happy Users</h1>
            <p className="text-md">
              Our users share the same mission as us—Make the world a better
              place for everyone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
