"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { RiUserCommunityFill } from "react-icons/ri";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import { LiaCommentsSolid } from "react-icons/lia";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { url } from "@/components/Url/page";
import Cookies from "js-cookie";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AiTwotoneLike } from "react-icons/ai";
import { AiTwotoneDislike } from "react-icons/ai";

export default function Page() {
  const [dataAll, setData] = useState([]);
  const [commenting, setCommenting] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [commentFile, setCommentFile] = useState(null);
  const [upvoteCount, setUpvoteCount] = useState(0);
  const [downvoteCount, setDownvoteCount] = useState(0);

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
        const data = json.data;
        console.log(data);

        const upvotes =
          data?.votes?.filter((vote) => vote.voteType === "UPVOTE").length || 0;
        const downvotes =
          data?.votes?.filter((vote) => vote.voteType === "DOWNVOTE").length ||
          0;

        // Set state with the counts
        setData(data);
        setUpvoteCount(upvotes);
        setDownvoteCount(downvotes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleCommentSubmit = async (reportId) => {
    try {
      let mediaUrls = [];

      if (commentFile) {
        const formData = new FormData();
        formData.append("file", commentFile);

        const mediaResponse = await fetch(`${url}/media/upload`, {
          method: "POST",
          body: formData,
        });

        if (!mediaResponse.ok) throw new Error("Failed to upload media");

        const mediaResult = await mediaResponse.json();
        mediaUrls.push({
          url: mediaResult.url,
          type: commentFile.type.includes("image") ? "IMAGE" : "VIDEO",
        });
      }

      const token = Cookies.get("accessToken");
      const commentResponse = await fetch(
        `${url}/comment/${reportId}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content: commentText,
            media: mediaUrls,
          }),
        }
      );

      if (!commentResponse.ok) throw new Error("Failed to post comment");

      alert("Comment added successfully!");
      setCommentText("");
      setCommentFile(null);
      setCommenting(null);
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("Failed to submit comment. Please try again.");
    }
  };

  const handleVote = async (reportId, type) => {
    try {
      const token = Cookies.get("accessToken");
      const response = await fetch(`${url}/report/${type}/${reportId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error(`Failed to ${type}`);

      alert(`${type} successful!`);
    } catch (error) {
      console.error(`Error in ${type}:`, error);
      alert(`Failed to ${type}. Please try again.`);
    }
  };

  const handleHideReport = async (reportId) => {
    try {
      const token = Cookies.get("accessToken");
      const response = await fetch(`${url}/admin/report/${reportId}`, {
        method: "DELETE", // Assuming the API uses PATCH to update the hidden status
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ hidden: true }), // Set hidden to true
      });

      if (!response.ok) throw new Error("Failed to hide report");

      // Update the local state to reflect the hidden status
      setData((prevData) =>
        prevData.map((report) =>
          report.id === reportId ? { ...report, hidden: true } : report
        )
      );

      alert("Report hidden successfully!");
    } catch (error) {
      console.error("Error hiding report:", error);
      alert("Failed to hide report. Please try again.");
    }
  };

  // Filter out hidden reports
  const visibleReports = dataAll.filter((report) => !report.hidden);

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
        {visibleReports.map((report) => (
          <div
            key={report.id}
            className="bg-green-50 p-10 rounded-lg shadow-lg mb-4 w-3/4 mx-auto"
          >
            <div className="flex space-x-2">
              <Avatar>
                <AvatarImage
                  src={report.user.profileImage || "/images/default-avatar.jpg"}
                  alt="User Profile"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="font-bold space-y-1">
                <h1 className="text-sm text-green-800 font-bold">
                  {report.user.name}
                </h1>
                <h2 className="text-lg text-[#4a4a4a]">{report.title}</h2>
              </div>
            </div>
            <div className="mt-3">
              <h1 className="text-xs text-[#4a4a4a]">{report.description}</h1>
              {report.media && report.media.length > 0 && (
                <div className="flex gap-x-2 mt-3">
                  {report.media.map((mediaItem, index) =>
                    mediaItem.type.toLowerCase().startsWith("image") ? (
                      <Image
                        key={mediaItem.id}
                        src={mediaItem.url}
                        width={200}
                        height={200}
                        alt={`Report image ${index + 1}`}
                        className="rounded-xl w-1/2"
                      />
                    ) : mediaItem.type.toLowerCase().startsWith("video") ? (
                      <video
                        key={mediaItem.id}
                        src={mediaItem.url}
                        width={200}
                        height={200}
                        controls
                        className="rounded-xl w-1/2"
                      />
                    ) : null
                  )}
                </div>
              )}
              <div className="flex space-x-4 mt-3 mx-1">
                <h1 className="flex items-center text-xs text-blue-700">
                  <AiTwotoneLike />: {upvoteCount}
                </h1>
                <h1 className="flex items-center text-xs text-red-700">
                  <AiTwotoneDislike />: {downvoteCount}
                </h1>
              </div>
              <div className="flex justify-between">
                <div className="flex space-x-3">
                  <button
                    className="flex items-center text-xs"
                    onClick={() => handleVote(report.id, "upvote")}
                  >
                    <FaSortUp className="text-xl mt-2 text-green-700" /> Upvote
                  </button>
                  <button
                    className="flex items-center text-xs"
                    onClick={() => handleVote(report.id, "downvote")}
                  >
                    <FaSortDown className="text-xl -mt-2 text-green-700" />{" "}
                    Downvote
                  </button>
                  <button
                    className="flex items-center text-xs"
                    onClick={() =>
                      setCommenting(commenting === report.id ? null : report.id)
                    }
                  >
                    <LiaCommentsSolid className="text-xl mx-1 text-green-700" />{" "}
                    Comment
                  </button>
                </div>
                <div>
                  <Button
                    className="bg-red-600 hover:bg-red-500"
                    onClick={() => handleHideReport(report.id)}
                  >
                    Hide
                  </Button>
                  <Button className="bg-head hover:bg-green-500 ml-2">
                    View Details
                  </Button>
                </div>
              </div>
              {commenting === report.id && (
                <div className="mt-3 space-y-2">
                  <Input
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) => setCommentFile(e.target.files[0])}
                    className="w-1/4"
                  />
                  <Textarea
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    rows={7}
                    className="border-[1px] border-gray-500 resize-none"
                  />
                  <Button
                    className="bg-green-600 hover:bg-green-500"
                    onClick={() => handleCommentSubmit(report.id)}
                  >
                    Submit
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
