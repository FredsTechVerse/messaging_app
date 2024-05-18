"use client";
import React, { FC } from "react";
import { ActionBtn } from "@/app/components/custom";
import UserFormState from "@/app/context/UserFormState";
import MessageConfirmationFormState from "../../context/MessageConfirmationFormState";
import PaymentFormState from "../../context/PaymentFormState";
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
          resetPaymentID();
          togglePaymentForm();
        }}
        text="add payment"
      />
      <ActionBtn
        action={() => {
          setMessageType("reminders");
          toggleMessageConfirmationForm();
        }}
        text="send reminder"
      />
    </section>
  );
};

export default ActionBtns;
