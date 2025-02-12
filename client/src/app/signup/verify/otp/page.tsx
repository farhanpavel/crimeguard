"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Cookies from "js-cookie";
import { url } from "@/components/Url/page";
import { useRouter } from "next/navigation";
export default function Page() {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [error, setError] = useState<string | null>(null);
  const accessToken = Cookies.get("accessToken");

  // Handle OTP input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    // Only allow single numeric digits
    if (!/^[0-9]?$/.test(value)) return;

    // Update the OTP array at the specified index
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Move focus to the next input field
    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`)?.focus();
    }
  };

  // Handle OTP form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join(""); // Convert OTP array to string
    console.log(otpString);

    if (otpString.length !== 6) {
      setError("OTP must be 6 digits long");
      return;
    }
    setError(null);

    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
      }

      const response = await fetch(`${url}/auth/verify-otp`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ otp: otpString }),
      });

      if (!response.ok) {
        throw new Error("Failed to verify OTP. Please try again.");
      }

      const result = await response.json();
      alert("OTP verified successfully!");
      router.push("/signin");
      console.log("Response:", result);
    } catch (error) {
      console.error("Error verifying OTP", error);
      alert("Failed to verify OTP. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen h-full w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Enter OTP</CardTitle>
          <CardDescription>
            Enter your OTP to verify your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex justify-center space-x-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  maxLength={1}
                  className="w-12 h-12 text-center text-xl border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>

            {error && (
              <div className="text-red-500 text-sm mt-2 text-center">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full bg-head hover:bg-green-800">
              Confirm
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
