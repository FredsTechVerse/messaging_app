"use client";
import { FC } from "react";
import { Button } from "@/app/components/ui/button";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import UserFormState from "@/app/context/UserFormState";
import DeleteConfirmationFormState from "@/app/context/DeleteConfirmationFormState";
import Link from "next/link";

interface ActionMenuProps {
  userID: string;
}
const ActionMenu: FC<ActionMenuProps> = ({ userID }) => {
  const setUserID = UserFormState((state) => state.setUserID);
  const toggleUserForm = UserFormState((state) => state.toggleUserForm);
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
        <DropdownMenuItem className="flex-row-centered hover:bg-slate-800 hover:text-white m-0 rounded-lg">
          <Link
            className="w-full h-full flex-row-centered"
            href={`/user/${userID}`}
          >
            View
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setUserID(userID);
            toggleUserForm();
          }}
          className="flex-row-centered hover:bg-slate-800 hover:text-white m-0 rounded-lg"
        >
          Update
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            setResourceID(userID);
            setResourceType("user");
            toggleDeleteConfirmationForm();
          }}
          className="flex-row-centered hover:bg-slate-800 hover:text-white m-0 rounded-lg"
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionMenu;
