"use client";
import React, { FC } from "react";
import { ActionBtn } from "@/app/components/custom";
import MessageFormState from "@/app/context/MessageFormState";
interface Props {
  messageID: string;
}
const MessageTableActionBtns: FC<Props> = ({ messageID }) => {
  const toggleMessageForm = MessageFormState(
    (state) => state.toggleMessageForm
  );
  const setMessageID = MessageFormState((state) => state.setMessageID);
  return (
    <section className="ml-auto w-max flex-row-centered gap-2 ">
      <ActionBtn
        action={() => {
          setMessageID(messageID);
          toggleMessageForm();
        }}
        text="View"
      />
    </section>
  );
};

export default MessageTableActionBtns;
