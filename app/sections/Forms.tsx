"use client";
import { FC } from "react";
import UserFormState from "../context/UserFormState";
import MessageFormState from "../context/MessageFormState";
import { UserForm, MessageForm } from "../components/custom";

const Forms: FC = () => {
  const isUserFormOpen = UserFormState((state) => state.isUserFormOpen);
  const isMessageFormOpen = MessageFormState(
    (state) => state.isMessageFormOpen
  );
  return (
    <main className="flex flex-col gap-5 py-2">
      {isUserFormOpen && <UserForm />}
      {isMessageFormOpen && <MessageForm />}
    </main>
  );
};

export default Forms;
