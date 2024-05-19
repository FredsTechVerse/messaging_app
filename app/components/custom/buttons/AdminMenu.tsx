"use client";
import { FC } from "react";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import SignUpFormState from "@/app/context/SignUpFormState";
import DeleteConfirmationFormState from "@/app/context/DeleteConfirmationFormState";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { disableAdmin, enableAdmin } from "@/app/auth/libs/adminActions";
interface ActionMenuProps {
  userID: string;
  status: string;
}
const AdminMenu: FC<ActionMenuProps> = ({ userID, status }) => {
  const setUserRole = SignUpFormState((state) => state.setUserRole);
  const setAdminID = SignUpFormState((state) => state.setUserID);
  const toggleSignUpForm = SignUpFormState((state) => state.toggleSignUpForm);
  const setResourceID = DeleteConfirmationFormState(
    (state) => state.setResourceID
  );
  const setResourceType = DeleteConfirmationFormState(
    (state) => state.setResourceType
  );
  const toggleDeleteConfirmationForm = DeleteConfirmationFormState(
    (state) => state.toggleDeleteConfirmationForm
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="destructive"
          className="h-8 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-full"
        >
          <span>Actions </span>
          <span>
            <ChevronDownIcon className="icon-styling h-4 text-white" />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white">
        <DropdownMenuItem
          className="flex-row-centered hover:bg-slate-800 hover:text-white m-0 rounded-lg"
          onClick={() => {
            setUserRole("EM-203");
            setAdminID(userID);
            toggleSignUpForm();
          }}
        >
          Update
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex-row-centered hover:bg-slate-800 hover:text-white m-0 rounded-lg"
          onClick={() => {
            status === "active"
              ? disableAdmin({ userID })
              : enableAdmin({ userID });
          }}
        >
          {status === "active" ? "Deactivate" : "Activate"}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex-row-centered hover:bg-slate-800 hover:text-white m-0 rounded-lg"
          onClick={() => {
            setResourceID(userID);
            setResourceType("admin");
            toggleDeleteConfirmationForm();
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AdminMenu;
