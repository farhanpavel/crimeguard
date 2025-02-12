import Link from "next/link";
import React from "react";

export default function Bottom() {
  return (
    <div className="font-grot">
      <div className="mt-20 bg-head  rounded-xl p-14 w-[90%] mx-auto">
        <div className="text-center text-white space-y-5">
          <div>
            <h1 className="text-2xl   font-medium  font-sansSerif ">
              Don&apos;t let another criminal go unpunished.
              <br />
              Want to report a crime?
            </h1>
          </div>

          <div>
            <Link href={"/signup"}>
              <button className="px-8 py-4 bg-white text-head  font-semibold rounded-full ">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
