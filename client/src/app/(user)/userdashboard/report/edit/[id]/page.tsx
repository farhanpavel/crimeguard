"use client";
import React, { useState, useEffect } from "react";
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
export default function Page({ params }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Fetch report data based on params.id
  useEffect(() => {
    const fetchReportData = async () => {
      const token = Cookies.get("accessToken");

      try {
        const response = await fetch(`${url}/report/${params.id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to fetch report data");

        const data = await response.json();
        setTitle(data.title); // Set the title from the fetched data
        setDescription(data.description); // Set the description from the fetched data
      } catch (error) {
        console.error("Error fetching report data:", error);
      }
    };

    fetchReportData();
  }, [params.id]);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const token = Cookies.get("accessToken");

    try {
      const response = await fetch(`${url}/report/${params.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      if (!response.ok) throw new Error("Failed to update report");

      alert("Report updated successfully!");
      router.push("/userdashboard/report"); // Redirect to the reports page
    } catch (error) {
      console.error("Error updating report:", error);
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
          <h1 className="text-2xl font-bold">Edit Report</h1>
        </div>
        <p className="text-xs text-[#4a4a4a] border-[#d1cece] border-b-[2px] pb-4">
          Edit your reports here!
        </p>
        <div>
          <Card className="border-[1px] border-gray-300 bg-[#F0F4F4]">
            <div className="flex justify-between">
              <CardHeader className="space-y-4">
                <CardTitle>Case&apos;s Details</CardTitle>
              </CardHeader>
            </div>

            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div>
                    <h1 className="font-semibold text-sm">
                      Enter Informations
                    </h1>
                  </div>
                  <div className="flex flex-col space-y-5 ">
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
