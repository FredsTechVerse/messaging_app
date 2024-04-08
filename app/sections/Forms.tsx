"use client";
import { FC } from "react";
import UserFormState from "../context/UserFormState";
import { UserForm } from "../components/custom";

const Forms: FC = () => {
  const isUserFormOpen = UserFormState((state) => state.isUserFormOpen);
  return (
    <main className="flex flex-col gap-5 py-2">
      {isUserFormOpen && <UserForm />}
    </main>
  );
};

export default Forms;
