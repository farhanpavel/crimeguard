import Image from "next/image";
import React from "react";
import { RiUserCommunityFill } from "react-icons/ri";
import { FaSortUp } from "react-icons/fa";
import { FaSortDown } from "react-icons/fa";
export default function page() {
  return (
    <div>
      <div className="p-9 space-y-2">
        <div className="flex gap-x-2 items-center text-green-600">
          <RiUserCommunityFill className="text-3xl" />
          <h1 className="text-2xl font-bold">Community</h1>
        </div>
        <p className="text-xs text-[#4a4a4a] border-[#d1cece] border-b-[2px] pb-4">
          Manage all of your Post here!
        </p>
        <div>
          <Image src={"/images/logo.png"} width={100} height={100} alt="logo" />
          <h1>Linkon IIT</h1>
          <h2>onek moja</h2>
        </div>
        <div>
          <div>
            <h1>Description</h1>
            <div>
              <Image
                src={"/images/shield.jpg"}
                width={400}
                height={400}
                alt="logo"
              />
              <Image
                src={"/images/shield.jpg"}
                width={400}
                height={400}
                alt="logo"
              />
              <Image
                src={"/images/shield.jpg"}
                width={100}
                height={100}
                alt="logo"
              />
            </div>
            <div>
              <FaSortUp className="text-xl" />
              <FaSortDown className="text-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
