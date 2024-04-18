"use client";
import React, { FC } from "react";
import { ActionBtn } from "@/app/components/custom";
import UserFormState from "@/app/context/UserFormState";
import { sendMessage } from "@/lib/messageActions";
const ActionBtns: FC = () => {
  const toggleUserForm = UserFormState((state) => state.toggleUserForm);
  const resetUserID = UserFormState((state) => state.resetUserID);
  return (
    <section className="ml-auto w-max flex-row-centered gap-2 ">
      <ActionBtn
        action={() => {
          sendMessage();
        }}
        text="Message"
      />
    </section>
  );
};

export default ActionBtns;
