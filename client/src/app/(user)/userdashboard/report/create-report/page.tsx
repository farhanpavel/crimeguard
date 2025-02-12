"use client";
import React, { useState } from "react";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { url } from "@/components/Url/page";
import { FaBahai } from "react-icons/fa";
import Cookies from "js-cookie";
export default function Page() {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [crimeTime, setCrimeTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleFileChange = async (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const getAIDescription = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const token = Cookies.get("accessToken");
    try {
      const response = await fetch(`${url}/intelligence/explain-image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("AI description generation failed");
      }

      const data = await response.json();
      return data.description; // Assuming the AI returns a description field
    } catch (error) {
      console.error("Error generating AI description:", error);
      return null;
    }
  };
  const handleGenerateDescription = async () => {
    if (files.length > 0) {
      // Find the first image file in the files array
      const imageFile = files.find((file) => file.type.startsWith("image"));

      if (imageFile) {
        const aiDescription = await getAIDescription(imageFile);
        if (aiDescription) {
          setDescription(aiDescription); // Update the description field
        }
      } else {
        alert("Please upload an image file to generate a description.");
      }
    } else {
      alert("Please upload a file first.");
    }
  };
  const handleDeleteFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      // Upload files and get their URLs
      const mediaUrls = await Promise.all(
        files.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);

          const response = await fetch(`${url}/media/upload`, {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            throw new Error("File upload failed");
          }

          const data = await response.json();
          return {
            url: data.url,
            type: file.type.startsWith("image") ? "IMAGE" : "VIDEO",
          };
        })
      );

      // Convert crimeTime to ISO string
      const isoCrimeTime = new Date(crimeTime).toISOString();

      // Prepare the report data
      const reportData = {
        title,
        description,
        division,
        district,
        crimeTime: isoCrimeTime,
        media: mediaUrls,
      };

      console.log(reportData);

      const token = Cookies.get("accessToken");
      const reportResponse = await fetch(`${url}/report`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reportData),
      });

      if (!reportResponse.ok) {
        throw new Error("Report submission failed");
      }

      alert("Success");
      router.back();
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="p-9 space-y-2">
        <div className="flex gap-x-2 items-center text-green-600">
          <VscGitPullRequestNewChanges className="text-3xl" />
          <h1 className="text-2xl font-bold">Create Report</h1>
        </div>
        <p className="text-xs text-[#4a4a4a] border-[#d1cece] border-b-[2px] pb-4">
          Create a new reports here!
        </p>
        <div>
          <Card className="border-[1px] border-gray-300 bg-[#F0F4F4]">
            <div className="flex justify-between">
              <CardHeader className="space-y-4">
                <CardTitle>Case&apos;s Details</CardTitle>
                <div>
                  <h1 className="font-semibold text-sm">Enter Informations</h1>
                </div>
              </CardHeader>
              <CardHeader className="space-y-4">
                <Button
                  className="flex items-center gap-x-2 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white px-4 py-2 rounded-lg shadow-md hover:from-blue-600 hover:via-purple-600 hover:to-indigo-600 transition-all"
                  onClick={handleGenerateDescription} // Add onClick handler
                >
                  Generate <FaBahai />
                </Button>
              </CardHeader>
            </div>

            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-5 ">
                    <div className="mt-4 flex space-x-5 flex-wrap">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 mb-2"
                        >
                          {file.type.startsWith("image") ? (
                            <img
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              className="w-20 h-20 object-cover"
                            />
                          ) : file.type.startsWith("video") ? (
                            <video
                              src={URL.createObjectURL(file)}
                              className="w-20 h-20 object-cover"
                              controls
                            />
                          ) : null}
                          <span>{file.name.substring(0, 4)}</span>
                          <button
                            onClick={() => handleDeleteFile(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            &#10005;
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <Input
                        id="file"
                        type="file"
                        className="w-1/4 border-[1px] bg-white"
                        name="file"
                        multiple
                        onChange={handleFileChange}
                      />
                    </div>
                    <div className="space-y-5 ">
                      <div className="space-y-2 ">
                        <Label className="text-xs" htmlFor="name">
                          Title
                        </Label>
                        <Input
                          id="title"
                          type="name"
                          className="w-1/2 border-[1px] bg-white"
                          name="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs" htmlFor="email">
                          Description
                        </Label>
                        <Textarea
                          id="description"
                          className="w-1/2 border-[1px] bg-white border-gray-600 resize-none"
                          rows={10}
                          name="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                      <div className="flex  space-x-16">
                        <div className="space-y-2">
                          <Label className="text-xs" htmlFor="password">
                            Division
                          </Label>
                          <Input
                            type="name"
                            id="division"
                            className=" border-[1px] bg-white"
                            name="division"
                            value={division}
                            onChange={(e) => setDivision(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs" htmlFor="password">
                            District
                          </Label>
                          <Input
                            type="district"
                            id="district"
                            className=" border-[1px] bg-white"
                            name="district"
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs" htmlFor="password">
                            CrimeTime
                          </Label>
                          <Input
                            type="date"
                            id="time"
                            className=" border-[1px] bg-white"
                            name="time"
                            value={crimeTime}
                            onChange={(e) => setCrimeTime(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <CardFooter className="flex justify-end mt-12">
                  <Button
                    type="submit"
                    className=" bg-head text-xs hover:bg-green-800 hover:transition-all hover:delay-100"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
