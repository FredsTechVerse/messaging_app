"use client";
import React, { FC } from "react";
import { ActionBtn } from "@/app/components/custom";
import TenantFormState from "@/app/context/TenantFormState";
import PaymentFormState from "@/app/context/PaymentFormState";
import ArrearFormState from "@/app/context/ArrearFormState";
import { updateArrears } from "@/lib/arrearActions";
const ActionBtns: FC = () => {
  const toggleTenantForm = TenantFormState((state) => state.toggleTenantForm);
  const togglePaymentForm = PaymentFormState(
    (state) => state.togglePaymentForm
  );
  const toggleArrearForm = ArrearFormState((state) => state.toggleArrearForm);
  const resetUserID = TenantFormState((state) => state.resetTenantID);
  const resetPaymentID = PaymentFormState((state) => state.resetPaymentID);
  const resetArrearID = ArrearFormState((state) => state.resetArrearID);

  return (
    <section className="w-max flex-row-centered gap-2">
      <ActionBtn
        action={() => {
          resetUserID();
          toggleTenantForm();
        }}
        text="add tenant"
      />
      <ActionBtn
        action={() => {
          resetArrearID();
          toggleArrearForm();
        }}
        text="add debt"
      />
      <ActionBtn
        action={() => {
          updateArrears();
        }}
        text="update arrears"
      />
      <ActionBtn
        action={() => {
          resetPaymentID();
          togglePaymentForm();
        }}
        text="add payment"
      />
    </section>
  );
};

export default ActionBtns;
