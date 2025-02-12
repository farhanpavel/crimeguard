import Image from "next/image";
import React from "react";

export default function SubHero() {
  return (
    <div>
      <div className="flex justify-center font-grot">
        <div className="w-1/3 bg-head p-5 space-y-3">
          <div className="space-y-2">
            <h1 className="uppercase text-xs text-white">Resources</h1>
            <p className="text-xl text-white ">
              How to Report Crimes on CrimeGuard? A Step-By-Step Guide.
            </p>
          </div>
          <Image
            width={350}
            height={350}
            src="/images/detective-notebook.jpg"
            alt="slogan"
            className="mx-auto"
          />
        </div>
        <div className="w-[60%] bg-[#F7F7F7] p-5">
          <h1 className="uppercase text-xs text-pera">Review</h1>

          <div className="flex flex-col justify-center h-full">
            <p className="text-2xl text-center">
              The other day, I saw a robber trying to steal money from the local
              market. I recorded a video and uploaded it on CrimeGuard. The post
              was approved quickly. People from the neighborhood saw the post
              and upvoted it. The robber was caught the next day by the
              authority.
            </p>
            <p className="flex justify-end mt-4">Farhan Pavel</p>
          </div>
        </div>
      </div>
    </div>
  );
}
