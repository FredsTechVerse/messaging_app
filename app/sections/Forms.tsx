"use client";
import { FC } from "react";
import UserFormState from "../context/UserFormState";
import MessageFormState from "../context/MessageFormState";
import MessageConfirmationFormState from "../context/MessageConfirmationFormState";
import {
  UserForm,
  MessageForm,
  MessageConfirmationForm,
} from "../components/custom";

const Forms: FC = () => {
  const isUserFormOpen = UserFormState((state) => state.isUserFormOpen);
  const isMessageFormOpen = MessageFormState(
    (state) => state.isMessageFormOpen
  );
  const isMessageConfirmationFormOpen = MessageConfirmationFormState(
    (state) => state.isConfirmationFormOpen
  );
  return (
    <main className="flex flex-col gap-5 py-2">
      {isUserFormOpen && <UserForm />}
      {isMessageFormOpen && <MessageForm />}
      {isMessageConfirmationFormOpen && <MessageConfirmationForm />}
    </main>
  );
};

export default Forms;
