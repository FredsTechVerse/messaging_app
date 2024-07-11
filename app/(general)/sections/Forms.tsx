"use client";
import { FC } from "react";
import UserFormState from "@/app/context/UserFormState";
import MessageFormState from "@/app/context/MessageFormState";
import MessageConfirmationFormState from "@/app/context/MessageConfirmationFormState";
import DeleteConfirmationFormState from "@/app/context/DeleteConfirmationFormState";
import PaymentFormState from "../../context/PaymentFormState";
import SignUpFormState from "@/app/context/SignUpFormState";
import {
  UserForm,
  MessageForm,
  MessageConfirmationForm,
  PaymentForm,
  DeleteConfirmationForm,
  SignUpForm,
} from "../../components/custom";

const Forms: FC = () => {
  const isUserFormOpen = UserFormState((state) => state.isUserFormOpen);
  const isSignUpFormOpen = SignUpFormState((state) => state.isSignUpFormOpen);
  const isMessageFormOpen = MessageFormState(
    (state) => state.isMessageFormOpen
  );
  const isDeleteConfirmationFormOpen = DeleteConfirmationFormState(
    (state) => state.isDeleteConfirmationFormOpen
  );
  const isMessageConfirmationFormOpen = MessageConfirmationFormState(
    (state) => state.isConfirmationFormOpen
  );
  const isPaymentFormOpen = PaymentFormState(
    (state) => state.isPaymentFormOpen
  );
  return (
    <main className="flex flex-col gap-5 py-2">
      {isUserFormOpen && <UserForm />}
      {isSignUpFormOpen && <SignUpForm />}
      {isMessageFormOpen && <MessageForm />}
      {isDeleteConfirmationFormOpen && <DeleteConfirmationForm />}
      {isPaymentFormOpen && <PaymentForm />}
      {isMessageConfirmationFormOpen && <MessageConfirmationForm />}
    </main>
  );
};

export default Forms;
