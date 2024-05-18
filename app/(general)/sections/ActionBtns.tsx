"use client";
import React, { FC } from "react";
import { ActionBtn } from "@/app/components/custom";
import UserFormState from "@/app/context/UserFormState";
import MessageConfirmationFormState from "../../context/MessageConfirmationFormState";
import PaymentFormState from "../../context/PaymentFormState";
import { Button } from "@/app/components/ui/button";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
const ActionBtns: FC = () => {
  const toggleUserForm = UserFormState((state) => state.toggleUserForm);
  const toggleMessageConfirmationForm = MessageConfirmationFormState(
    (state) => state.toggleConfirmationForm
  );
  const togglePaymentForm = PaymentFormState(
    (state) => state.togglePaymentForm
  );
  const resetPaymentID = PaymentFormState((state) => state.resetPaymentID);
  const resetUserID = UserFormState((state) => state.resetUserID);
  const setMessageType = MessageConfirmationFormState(
    (state) => state.setMessageType
  );

  return (
    <section className="ml-auto flex-row-centered gap-2 ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="destructive"
            className="h-8 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-full"
          >
            <span>Add </span>
            <span>
              <ChevronDownIcon className="icon-styling h-4 text-white" />
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white">
          <DropdownMenuItem
            onClick={() => {
              resetUserID();
              toggleUserForm();
            }}
            className="flex-row-centered hover:bg-slate-800 hover:text-white m-0 rounded-lg"
          >
            User
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={async () => {
              resetPaymentID();
              togglePaymentForm();
            }}
            className="flex-row-centered hover:bg-slate-800 hover:text-white m-0 rounded-lg"
          >
            Payment
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="destructive"
            className="h-8 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-full"
          >
            <span>Send </span>
            <span>
              <ChevronDownIcon className="icon-styling h-4 text-white" />
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white">
          <DropdownMenuItem
            onClick={() => {
              setMessageType("reminders");
              toggleMessageConfirmationForm();
            }}
            className="flex-row-centered hover:bg-slate-800 hover:text-white m-0 rounded-lg"
          >
            Reminder
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
};

export default ActionBtns;
