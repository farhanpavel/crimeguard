"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { RiUserCommunityFill } from "react-icons/ri";
import { FaSortUp } from "react-icons/fa";
import { FaSortDown } from "react-icons/fa";
import { LiaCommentsSolid } from "react-icons/lia";
import { Button } from "@/components/ui/button";
import { url } from "@/components/Url/page";

export default function Page() {
  const [dataAll, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/report`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to fetch data");

        const json = await response.json();
        setData(json.data); // Assuming the JSON structure has a `data` array
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="p-9 space-y-2 font-grot">
        <div className="flex gap-x-2 items-center text-green-600">
          <RiUserCommunityFill className="text-3xl" />
          <h1 className="text-2xl font-bold">Community</h1>
        </div>
        <p className="text-xs text-[#4a4a4a] border-[#d1cece] border-b-[2px] pb-4">
          Manage all of your Post here!
        </p>
        {dataAll.map((report) => (
          <div
            key={report.id}
            className="bg-green-50 p-10 rounded-lg shadow-lg mb-4"
          >
            <div className="flex space-x-2">
              <img
                src={report.user.profileImage || "/images/shield.jpg"}
                width={40}
                height={40}
                alt="logo"
                className="rounded-full"
              />
              <div className="mt-1 space-y-1">
                <h1 className="text-sm text-green-800 font-bold">
                  {report.user.name}
                </h1>
                <h2 className="text-xs text-[#4a4a4a]">{report.title}</h2>
              </div>
            </div>
            <div className="mt-3">
              <div>
                <h1 className="text-xs text-[#4a4a4a]">{report.description}</h1>
                <div className="grid grid-cols-3 gap-x-2 mt-3">
                  {/* Assuming images are not part of the report data, using placeholder images */}
                  <Image
                    src={"/images/shield.jpg"}
                    width={200}
                    height={200}
                    alt="logo"
                    className="rounded-xl w-full"
                  />
                  <Image
                    src={"/images/shield.jpg"}
                    width={200}
                    height={200}
                    alt="logo"
                    className="rounded-xl w-full"
                  />
                  <Image
                    src={"/images/shield.jpg"}
                    width={200}
                    height={200}
                    alt="logo"
                    className="rounded-xl w-full"
                  />
                </div>
                <div className="flex justify-between mt-3">
                  <div className="flex space-x-3">
                    <h1 className="flex items-center text-xs space-x-3">
                      <FaSortUp className="text-xl mt-2 text-green-700" />{" "}
                      Upvote
                    </h1>
                    <h1 className="flex items-center text-xs space-x-3">
                      <FaSortDown className="text-xl -mt-2 text-green-700" />
                      Downvote
                    </h1>
                    <h1 className="flex items-center text-xs">
                      <LiaCommentsSolid className="text-xl mx-1 text-green-700" />
                      Comment
                    </h1>
                  </div>
                  <div>
                    <Button className="bg-head hover:bg-green-500">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
