"use client";
import React, { useState, useEffect } from "react";
import { url } from "@/components/Url/page";
import {
  ColumnDef,
  SortingState,
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { userData, columns } from "./_datatable/action";
import { Input } from "@/components/ui/input";
import { TbReportSearch } from "react-icons/tb";
import { useUserContext } from "@/components/tableContext/page";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"; // Import Tooltip components
import Cookies from "js-cookie";
export default function Page() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [dataAll, setData] = useState<userData[]>([]);
  const { users, setUsers } = useUserContext();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const router = useRouter();
  const [nameFilter, setNameFilter] = useState("");
  const [isBanned, setIsBanned] = useState(false); // State for isBanned
  const [isVerified, setIsVerified] = useState(false); // State for isVerified

  useEffect(() => {
    const token = Cookies.get("accessToken");
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/auth/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to fetch data");

        const json = await response.json();
        console.log(json);
        setUsers(json.crimes);

        // Set isBanned and isVerified from the API response
        setIsBanned(json.isBanned || false); // Default to false if not provided
        setIsVerified(json.isVerified || false); // Default to false if not provided
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const table = useReactTable({
    data: users,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      sorting,
      globalFilter: nameFilter,
      pagination,
    },
    onGlobalFilterChange: setNameFilter,
  });

  // Determine if the button should be disabled
  const isButtonDisabled = isBanned || !isVerified;

  // Tooltip message based on the reason for disabling the button
  const tooltipMessage = isBanned
    ? "You are banned and cannot create reports."
    : !isVerified
    ? "You are not verified and cannot create reports."
    : "";

  return (
    <div className="p-9 space-y-2">
      <div className="flex gap-x-2 items-center text-green-600">
        <TbReportSearch className="text-3xl" />
        <h1 className="text-2xl font-bold">Report</h1>
      </div>
      <p className="text-xs text-[#4a4a4a] border-[#d1cece] border-b-[2px] pb-4">
        Manage all of your Reports here!
      </p>

      <div className="flex justify-between">
        <div className="flex space-x-4 items-center mt-2">
          <Input
            placeholder="Search by Name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="max-w-sm text-xs border-2 border-green-700"
          />
        </div>
        <div className="flex items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => {
                    router.push("/userdashboard/report/create-report");
                  }}
                  className="bg-head hover:bg-green-800 text-sm font-grot"
                  disabled={isButtonDisabled} // Disable button if banned or not verified
                >
                  Create Report
                </Button>
              </TooltipTrigger>
              {isButtonDisabled && ( // Show tooltip only if the button is disabled
                <TooltipContent>
                  <p>{tooltipMessage}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="space-y-4 p-3">
        <div className="rounded-md border">
          <Table className="w-full">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="text-left">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-[310px] text-center text-muted-foreground border-[1px] border-gray-300"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getRowModel().rows.length} row(s)
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
