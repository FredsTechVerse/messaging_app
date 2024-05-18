"use client";
import { FC } from "react";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import PaymentFormState from "@/app/context/PaymentFormState";
import DeleteConfirmationFormState from "@/app/context/DeleteConfirmationFormState";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

interface UserMenuProps {
  paymentID: string;
}
const PaymentMenu: FC<UserMenuProps> = ({ paymentID }) => {
  const setPaymentID = PaymentFormState((state) => state.setPaymentID);
  const togglePaymentForm = PaymentFormState(
    (state) => state.togglePaymentForm
  );
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
          className="h-8 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-full ml-auto"
        >
          <span>Actions </span>
          <span>
            <ChevronDownIcon className="icon-styling h-4 text-white" />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white group p-0 m-0">
        {paymentID && (
          <DropdownMenuItem
            className="flex-row-centered hover:bg-slate-800 hover:text-white m-0 rounded-lg"
            onClick={() => {
              setPaymentID(paymentID);
              togglePaymentForm();
            }}
          >
            <span>Update</span>
          </DropdownMenuItem>
        )}
        {paymentID && (
          <DropdownMenuItem
            className="flex-row-centered hover:bg-slate-800 hover:text-white m-0 rounded-lg"
            onClick={() => {
              setResourceID(paymentID.replace(/^0+/, ""));
              setResourceType("payment");
              toggleDeleteConfirmationForm();
            }}
          >
            <span>Delete </span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PaymentMenu;
