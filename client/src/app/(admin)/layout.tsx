"use client";
import AdminSidebar from "@/components/AdminSidebar/page";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
export default function Landing({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const role = Cookies.get("role");

    if (role !== "ADMIN") {
      router.back();
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <div></div>;
  }
  return (
    <div className="bg-[#F0F4F4] flex">
      <AdminSidebar />
      <div className="w-[90%]">{children}</div>
    </div>
  );
}
