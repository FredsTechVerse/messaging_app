"use client";
import React, { FC } from "react";
import { ActionBtn } from "@/app/components/custom";
import UserFormState from "@/app/context/UserFormState";

const ActionBtns: FC = () => {
  const toggleUserForm = UserFormState((state) => state.toggleUserForm);
  const resetUserID = UserFormState((state) => state.resetUserID);
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
