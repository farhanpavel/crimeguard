import React from "react";
import { GiMoebiusStar } from "react-icons/gi";
import { WiDirectionUpRight } from "react-icons/wi";
import { RiBox1Line } from "react-icons/ri";
import { FaScrewdriver } from "react-icons/fa";
import { GoShieldCheck } from "react-icons/go";
import { TbMessageCircleQuestion } from "react-icons/tb";
export default function Benefits() {
  return (
    <div>
      <div className="flex justify-center mt-4 p-6">
        <h1 className="text-center font-semibold text-white text-xl border-b-[3px] uppercase">
          Why CrimeGuard
        </h1>
      </div>
      {/* parent */}
      <div className="container mx-auto">
        <div className="grid grid-cols-3 p-10 gap-10">
          <div className="bg-head shadow-xl rounded-lg">
            <div className="flex justify-between p-4">
              <div>
                <GiMoebiusStar className="text-3xl text-white" />
              </div>
              <div>
                <WiDirectionUpRight className="text-2xl text-white" />
              </div>
            </div>
            <div className="text-white p-7 space-y-3">
              <h1 className="text-lg font-bold">Report Crimes</h1>
              <p className="text-xs font-light leading-[1.2rem]">
                Have you been a victim of a criminal gang? Did you witness a
                crime happening nearby? Take a picture or record a video. Then
                report it on your platform. Our team will verify your report and
                approve it.
              </p>
            </div>
          </div>
          <div className="bg-head shadow-xl rounded-lg">
            <div className="flex justify-between p-4">
              <div>
                <RiBox1Line className="text-3xl text-white" />
              </div>
              <div>
                <WiDirectionUpRight className="text-2xl text-white" />
              </div>
            </div>
            <div className="text-white p-7 space-y-3">
              <h1 className="text-lg font-bold">Find Crime Reports</h1>
              <p className="text-xs font-light  leading-[1.2rem]">
                With a vast collection of reports in your database, you can
                quickly search and filter crimes by time, location, and type.
                This allows you to find crimes going on in your neighborhood.
              </p>
            </div>
          </div>
          <div className="bg-head shadow-xl rounded-lg">
            <div className="flex justify-between p-4">
              <div>
                <FaScrewdriver className="text-3xl text-white" />
              </div>
              <div>
                <WiDirectionUpRight className="text-2xl text-white" />
              </div>
            </div>
            <div className="text-white p-7 space-y-3">
              <h1 className="text-lg font-bold">Expert Team Members</h1>
              <p className="text-xs font-light  leading-[1.2rem]">
                All of your team members are highly specialized in journalism,
                psychology, criminology, sociology. They are dedicated to their
                passion. Hunting down criminals and saving the word is their
                true passion.
              </p>
            </div>
          </div>

          <div className="bg-head shadow-xl rounded-lg">
            <div className="flex justify-between p-4">
              <div>
                <FaScrewdriver className="text-3xl text-white" />
              </div>
              <div>
                <WiDirectionUpRight className="text-2xl text-white" />
              </div>
            </div>
            <div className="text-white p-7 space-y-3">
              <h1 className="text-lg font-bold">Instant Feedback</h1>
              <p className="text-xs font-light  leading-[1.2rem]">
                After a report gets approved, other users can leave feedback on
                the post based on its authenticity. If a report is false or
                partially true, other users can add their side of the truth
                through evidences.
              </p>
            </div>
          </div>
          <div className="bg-head shadow-xl rounded-lg">
            <div className="flex justify-between p-4">
              <div>
                <GoShieldCheck className="text-3xl text-white" />
              </div>
              <div>
                <WiDirectionUpRight className="text-2xl text-white" />
              </div>
            </div>
            <div className="text-white p-7 space-y-3">
              <h1 className="text-lg font-bold">Explore Resources</h1>
              <p className="text-xs font-light  leading-[1.2rem]">
                Discover a variety of tutorials, eBooks, videos, and true crime
                incident reports. Learn how to report crimes and what to do in
                case you're in danger.
              </p>
            </div>
          </div>
          <div className="bg-head shadow-xl rounded-lg">
            <div className="flex justify-between p-4">
              <div>
                <TbMessageCircleQuestion className="text-3xl text-white" />
              </div>
              <div>
                <WiDirectionUpRight className="text-2xl text-white" />
              </div>
            </div>
            <div className="text-white p-7 space-y-3">
              <h1 className="text-lg font-bold">24/7 Support</h1>
              <p className="text-xs font-light  leading-[1.2rem]">
                Have questions? Feeling endangered? We have a rescue team
                dedicated to make your feel safer. Call us and we'll reach you
                before the danger.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
