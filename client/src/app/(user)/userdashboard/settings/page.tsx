"use client";
import React, { useState, useRef, useEffect } from "react";
import { IoIosSettings } from "react-icons/io";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { url } from "@/components/Url/page";

export default function Page() {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null); // Store the selected image file
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    division: "",
    district: "",
    thana: "",
    profileImage: "",
  });
  const fileInputRef = useRef(null);
  const router = useRouter();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setImageFile(file); // Store the file for later upload
    }
  };

  const handleCircleClick = () => {
    fileInputRef.current.click();
  };

  const fetchUserData = async () => {
    try {
      const token = Cookies.get("accessToken");

      if (!token) {
        throw new Error("No access token found.");
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(`${url}/auth/me`, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data.");
      }

      const result = await response.json();
      setUserData({
        name: result.name,
        email: result.email,
        phone: result.phone || "",
        bio: result.bio || "",
        division: result.division || "",
        district: result.district || "",
        thana: result.thana || "",
        profileImage: result.profileImage || "",
      });

      if (result.profileImage) {
        setImage(result.profileImage);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${url}/media/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image.");
      }

      const result = await response.json();

      return result.url; // Assuming the response contains a `profileUrl` field
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("accessToken");

      if (!token) {
        throw new Error("No access token found.");
      }

      let profileUrl = userData.profileImage;

      // Upload the image if a new file is selected
      if (imageFile) {
        profileUrl = await uploadImage(imageFile);
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(`${url}/auth/complete-profile`, {
        method: "PUT",
        headers,
        body: JSON.stringify({
          phone: userData.phone,
          bio: userData.bio,
          division: userData.division,
          district: userData.district,
          thana: userData.thana,
          profileImage: profileUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile.");
      }

      const result = await response.json();
      alert("Profile updated successfully!");
      console.log("Response:", result);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div>
      <div className="p-9 space-y-2">
        <div className="flex gap-x-2 items-center text-green-600">
          <IoIosSettings className="text-3xl" />
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
        <p className="text-xs text-[#4a4a4a] border-[#d1cece] border-b-[2px] pb-4">
          Manage all of your profile settings here!
        </p>
        <div className="flex flex-col items-center space-y-2">
          <Label htmlFor="imageUpload" className="text-[#4a4a4a] text-xs">
            Profile Picture
          </Label>
          <div
            className="w-24 h-24 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden cursor-pointer"
            onClick={handleCircleClick}
          >
            {image ? (
              <img
                src={image}
                alt="Uploaded"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-xs text-gray-500">Click to Upload</span>
            )}
          </div>
          <input
            type="file"
            id="imageUpload"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
          />
        </div>
        <form onSubmit={handleSubmit} className="p-10 space-y-9">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[#4a4a4a] text-xs">
              Name
            </Label>
            <Input
              type="text"
              id="name"
              value={userData.name}
              className="bg-white w-1/2"
              disabled
            />
            <h1 className="text-xs text-[#4a4a4a] mt-1 w-[47%]">
              This is your public display name. It must be your real legal name.
              You can only change this once every 6 months.
            </h1>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#4a4a4a] text-xs">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              value={userData.email}
              className="bg-white w-1/2"
              disabled
            />
            <h1 className="text-xs text-[#4a4a4a] mt-1 w-[47%]">
              Your email attached to this profile. Email can be changed every 6
              months. This will not be publicly displayed.
            </h1>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-[#4a4a4a] text-xs">
              Phone
            </Label>
            <Input
              type="text"
              id="phone"
              value={userData.phone}
              onChange={(e) =>
                setUserData({ ...userData, phone: e.target.value })
              }
              className="bg-white w-1/2"
            />
            <h1 className="text-xs text-[#4a4a4a] mt-1 w-[47%]">
              Your phone number for verification purposes. Phone number can be
              changed every 6 months. This will not be publicly displayed.
            </h1>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio" className="text-[#4a4a4a] text-xs">
              Bio
            </Label>
            <Textarea
              rows={5}
              id="bio"
              value={userData.bio}
              onChange={(e) =>
                setUserData({ ...userData, bio: e.target.value })
              }
              className="bg-white w-1/2 border-head resize-none"
            />
            <h1 className="text-xs text-[#4a4a4a] mt-1 w-[47%]">
              A short bio about yourself. This is an optional field. It will be
              publicly displyed.
            </h1>
          </div>
          <div className="space-y-2">
            <Label htmlFor="division" className="text-[#4a4a4a] text-xs">
              Division
            </Label>
            <Input
              type="text"
              id="division"
              value={userData.division}
              onChange={(e) =>
                setUserData({ ...userData, division: e.target.value })
              }
              className="bg-white w-1/2"
            />
            <h1 className="text-xs text-[#4a4a4a] mt-1 w-[47%]">
              The division you currently reside in (i.e. Dhaka, Rajshahi)
            </h1>
          </div>
          <div className="space-y-2">
            <Label htmlFor="district" className="text-[#4a4a4a] text-xs">
              District
            </Label>
            <Input
              type="text"
              id="district"
              value={userData.district}
              onChange={(e) =>
                setUserData({ ...userData, district: e.target.value })
              }
              className="bg-white w-1/2"
            />
            <h1 className="text-xs text-[#4a4a4a] mt-1 w-[47%]">
              The districe you currently reside in (i.e. Comilla, Noakhali)
            </h1>
          </div>
          <div className="space-y-2">
            <Label htmlFor="thana" className="text-[#4a4a4a] text-xs">
              Thana
            </Label>
            <Input
              type="text"
              id="thana"
              value={userData.thana}
              onChange={(e) =>
                setUserData({ ...userData, thana: e.target.value })
              }
              className="bg-white w-1/2"
            />
            <h1 className="text-xs text-[#4a4a4a] mt-1 w-[47%]">
              The thana/pourosova you currently reside in (i.e. Adabor, Azimpur)
            </h1>
          </div>
          <div className="flex justify-center">
            <Button type="submit" className="bg-head hover:bg-green-800">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
