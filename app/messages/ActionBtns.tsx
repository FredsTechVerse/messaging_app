"use client";
import React, { FC } from "react";
import { ActionBtn } from "@/app/components/custom";
import MessageFormState from "@/app/context/MessageFormState";
import MessageConfirmationFormState from "../context/MessageConfirmationFormState";
const ActionBtns: FC = () => {
  const toggleMessageForm = MessageFormState(
    (state) => state.toggleMessageForm
  );
  const setMessageType = MessageConfirmationFormState(
    (state) => state.setMessageType
  );

  const resetMessageID = MessageFormState((state) => state.resetMessageID);
  return (
    <section className="ml-auto w-max flex-row-centered gap-2 ">
      <ActionBtn
        action={() => {
          resetMessageID();
          setMessageType("bulk messages");
          toggleMessageForm();
        }}
        text="Send Bulk Message"
      />
    </section>
  );
};

export default ActionBtns;
