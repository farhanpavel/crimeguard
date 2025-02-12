import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ArrowUpDown } from "lucide-react";
import { FaFile } from "react-icons/fa";
import { ColumnDef } from "@tanstack/react-table";
import { ActionsCell } from "./data";
import { url } from "@/components/Url/page";
// import LoadingSpinner from "@/components/Loader/page";
import ScaleLoader from "react-spinners/ScaleLoader";
export type userData = {
  id: string;
  title: string;
  description: string;
  division: string;
  district: string;
  crimeTime: string;
  postTime: string;
};

export const columns: ColumnDef<userData>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <button
        className="hover:bg-green-200 flex items-center px-4 py-2 rounded-full hover:transition-all hover:delay-100"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Title
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </button>
    ),
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "crimeTime",
    header: ({ column }) => (
      <button
        className="hover:bg-green-200 flex items-center px-4 py-2 rounded-full hover:transition-all hover:delay-100"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Crime Time
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </button>
    ),
    enableSorting: true,
    cell: ({ row }) => {
      const crimeTime = row.getValue("crimeTime"); // Get the date-time string
      const formattedTime = new Date(crimeTime).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false, // Set to `true` for AM/PM format
      });

      return <span>{formattedTime}</span>; // Display only the time
    },
  },
  {
    accessorKey: "postTime",
    header: ({ column }) => (
      <button
        className="hover:bg-green-200 flex items-center px-4 py-2 rounded-full hover:transition-all hover:delay-100"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Post Time
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </button>
    ),
    enableSorting: true,
    cell: ({ row }) => {
      const postTime = row.getValue("postTime");
      const formattedTime = new Date(postTime).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false, // Set to `true` for AM/PM format
      });

      return <span>{formattedTime}</span>; // Display only the time
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <ActionsCell user={row.original} />,
  },
];
