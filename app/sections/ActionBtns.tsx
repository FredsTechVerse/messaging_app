"use client";
import React, { FC } from "react";
import { ActionBtn } from "@/app/components/custom";
import userFormState from "@/app/context/UserFormState";

const ActionBtns: FC = () => {
  const toggleUserForm = userFormState((state) => state.toggleUserForm);
  const resetUserID = userFormState((state) => state.resetUserID);
  return (
    <section className="ml-auto w-max flex-row-centered gap-2 ">
      <ActionBtn
        action={() => {
          resetUserID();
          toggleUserForm();
        }}
        text="add user"
      />
    </section>
  );
};

export default ActionBtns;
