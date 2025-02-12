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
  getPaginationRowModel, // Add this import
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
import { GiEntryDoor } from "react-icons/gi";
import { useUserContext } from "@/components/tableContext/page";
export default function Page() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [dataAll, setData] = useState<userData[]>([]);
  const { users, setUsers } = useUserContext();
  const [pagination, setPagination] = useState({
    pageIndex: 0, // Current page index
    pageSize: 5, // Number of rows per page
  });
  const [nameFilter, setNameFilter] = useState("");
  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM0NTY2NDM4LTZjNGItNDI4OS04ZGZiLWI5Yjc2MjRlMTVmNCIsImlhdCI6MTczOTIwODk0MSwiZXhwIjoxNzM5ODEzNzQxfQ.ttWtamlCajMnCOGm625qUQMyOvwn-6x8K5Aa-jZoxx0";

    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/admin/users`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to fetch data");

        const json = await response.json();
        setUsers(json);
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
    getPaginationRowModel: getPaginationRowModel(), // Ensure pagination is applied
    onPaginationChange: setPagination,
    state: {
      sorting,
      globalFilter: nameFilter,
      pagination,
    },
    onGlobalFilterChange: setNameFilter,
  });

  return (
    <div className="p-9 space-y-2">
      <div className="flex gap-x-2 items-center text-green-600">
        <GiEntryDoor className="text-3xl" />
        <h1 className="text-2xl font-bold">Entry</h1>
      </div>
      <p className="text-xs text-[#4a4a4a] border-[#d1cece] border-b-[2px] pb-4">
        Manage all of your uploads here!
      </p>

      <div className="flex justify-end">
        <div className="flex space-x-4 items-center mt-2">
          <Input
            placeholder="Search by Name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="max-w-sm text-xs border-2 border-green-700"
          />
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
            {table.getRowModel().rows.length} row(s){" "}
            {/* Use paginated row model */}
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
