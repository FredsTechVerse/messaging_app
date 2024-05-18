"use client";
import React, { FC } from "react";
import { ActionBtn } from "@/app/components/custom";
import PaymentFormState from "@/app/context/PaymentFormState";

const ActionBtns: FC = () => {
  const togglePaymentForm = PaymentFormState(
    (state) => state.togglePaymentForm
  );
  const resetPaymentID = PaymentFormState((state) => state.resetPaymentID);

  return (
    <section className="ml-auto w-max flex-row-centered gap-2 ">
      <ActionBtn
        action={() => {
          resetPaymentID();
          togglePaymentForm();
        }}
        text="add Payment"
      />
    </section>
  );
};

export default ActionBtns;
