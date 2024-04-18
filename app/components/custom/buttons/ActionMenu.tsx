"use client";
import { FC } from "react";
import { deleteUserById } from "@/lib/userActions";
import { Button } from "@/app/components/ui/button";
import { handleUIErrors, handleUISuccess } from "@/lib/responseHandler";
import AlertBoxState from "@/app/context/AlertBoxState";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import UserFormState from "@/app/context/UserFormState";
interface ActionMenuProps {
  userID: string;
}
const ActionMenu: FC<ActionMenuProps> = ({ userID }) => {
  const setUserID = UserFormState((state) => state.setUserID);
  const toggleUserForm = UserFormState((state) => state.toggleUserForm);
  const updateAlertBoxData = AlertBoxState((state) => state.updateAlertBoxData);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="destructive" className="h-8 px-4">
          Actions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => {
            setUserID(userID);
            toggleUserForm();
          }}
        >
          Update
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            const data = await deleteUserById({ userID });
            const userData = await JSON.parse(data);
            const { status, message } = userData;
            if (status === 200 || status === 201) {
              handleUISuccess({ message, updateAlertBoxData });
            } else {
              handleUIErrors({ status, message, updateAlertBoxData });
            }
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionMenu;
