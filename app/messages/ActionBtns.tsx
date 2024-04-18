"use client";
import React, { FC } from "react";
import { ActionBtn } from "@/app/components/custom";
import MessageFormState from "@/app/context/MessageFormState";
const ActionBtns: FC = () => {
  const toggleMessageForm = MessageFormState(
    (state) => state.toggleMessageForm
  );
  const resetMessageID = MessageFormState((state) => state.resetMessageID);
  return (
    <section className="ml-auto w-max flex-row-centered gap-2 ">
      <ActionBtn
        action={() => {
          resetMessageID();
          toggleMessageForm();
        }}
        text="Message"
      />
    </section>
  );
};

export default ActionBtns;
