import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { url } from "@/components/Url/page";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useUserContext } from "@/components/tableContext/page"; // Import the context

export type userData = {
  id: string;
  title: string;
  description: string;
  division: string;
  district: string;
  crimeTime: string;
  postTime: string;
};
export const ActionsCell: React.FC<{ user: userData }> = ({ user }) => {
  const router = useRouter();
  const { updateUserStatus } = useUserContext(); // Use context for updating the user
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // Track ban status

  const handleRoute = () => {
    router.push(`/userdashboard/report/edit/${user.id}`);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-1 hover:bg-green-200 outline-none rounded-full hover:transition-all hover:delay-100">
            <MoreHorizontal className="h-3 w-3" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="text-xs text-[#4a4a4a]">
            Actions
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleRoute}
            className="hover:bg-green-200 rounded-lg hover:transition-all hover:delay-100 text-xs text-[#4a4a4a]"
          >
            Edit
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Confirmation Dialog */}
      {/* <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {isBanned ? "Unblock User" : "Block User"}
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to {isBanned ? "unblock" : "block"} this
              user? This action can be reversed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className={`text-white ${
                isBanned ? "bg-green-600" : "bg-red-600"
              }`}
              onClick={handleBanned}
            >
              Confirm {isBanned ? "Unblock" : "Block"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}

      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <ScaleLoader color="#1dce4d" />
        </div>
      )}
    </>
  );
};
