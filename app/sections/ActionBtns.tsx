"use client";
import React, { FC } from "react";
import { ActionBtn } from "@/app/components/custom";
import UserFormState from "@/app/context/UserFormState";
import MessageConfirmationFormState from "../context/MessageConfirmationFormState";
import { sendReminder } from "@/lib/messageActions";
import MessageFormState from "../context/MessageFormState";
const ActionBtns: FC = () => {
  const toggleUserForm = UserFormState((state) => state.toggleUserForm);
  const toggleMessageConfirmationForm = MessageConfirmationFormState(
    (state) => state.toggleConfirmationForm
  );
  const resetUserID = UserFormState((state) => state.resetUserID);
  const setMessageType = MessageConfirmationFormState(
    (state) => state.setMessageType
  );

  return (
    <section className="ml-auto w-max flex-row-centered gap-2 ">
      <ActionBtn
        action={() => {
          resetUserID();
          toggleUserForm();
        }}
        text="add user"
      />
      <ActionBtn
        action={() => {
          setMessageType("reminders");
          toggleMessageConfirmationForm();
          sendReminder();
        }}
        text="send reminder"
      />
    </section>
  );
};

export default ActionBtns;
