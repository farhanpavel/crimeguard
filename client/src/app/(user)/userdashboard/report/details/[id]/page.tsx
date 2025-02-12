"use client"; // Mark this as a Client Component
import { url } from "@/components/Url/page";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaPhone } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import Cookies from "js-cookie";
type userData = {
  id: string;
  email: string;
  name: string;
  phone: string;
  profileImage: string;
  bio: string;
  division: string;
  district: string;
  thana: string;
  registeredAt: string;
};

const DetailsPage = ({ params }: { params: { id: string } }) => {
  const { id } = params; // Access the dynamic `id` parameter from `params`
  const [user, setUser] = useState<userData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/admin/user/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to fetch data");

        const json = await response.json();
        setUser(json);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-9 space-y-2 font-grot">
      <div className="flex gap-x-2 items-center text-green-600">
        <CgProfile className="text-3xl" />
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>
      <p className="text-xs text-[#4a4a4a] border-[#d1cece] border-b-[2px] pb-4">
        Manage all of your Profile here!
      </p>
      <div className="flex  p-5 space-x-5">
        <div>
          <img
            src={
              user?.profileImage ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQL-DvvHmURGSplrEJFERgKxD1P8OBshQY4g&s"
            }
            width={500}
            height={500}
            alt="User Profile Picture"
          />
        </div>
        <div className="mt-2 space-y-3">
          <div className="space-y-1">
            <h1 className="text-3xl text-green-400">{user?.name}</h1>
            <p className="text-[#4a4a4a] text-sm">{user?.bio}</p>
          </div>
          <div className="space-y-4">
            <h1 className="text-sm">District : {user?.district}</h1>

            <h1 className="text-sm">Division : {user?.division}</h1>
            <h1 className="text-sm">District : {user?.district}</h1>
            <h1 className="text-sm">Thana : {user?.thana}</h1>
            <h1 className="text-sm">
              Registration Date : {user?.registeredAt}
            </h1>
            <div className="flex space-x-4 ">
              <h1 className="text-sm flex items-center gap-x-2">
                <MdOutlineMail className="text-xl text-blue-700" />{" "}
                {user?.email}
              </h1>
              <h1 className="text-sm flex items-center gap-x-2">
                <FaPhone className="text-lg text-yellow-500" /> {user?.phone}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
