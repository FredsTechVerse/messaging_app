"use client";
import { create } from "zustand";

type PasswordUpdateFormStateProps = {
  isPasswordUpdateFormSubmitted: boolean;
  setIsPasswordUpdateFormSubmitted: (status: boolean) => void;
  isPasswordUpdateFormOpen: boolean;
  togglePasswordUpdateForm: () => void;
};

const PasswordUpdateFormState = create<PasswordUpdateFormStateProps>((set) => ({
  isPasswordUpdateFormSubmitted: false,
  setIsPasswordUpdateFormSubmitted: (status) =>
    set(() => ({ isPasswordUpdateFormSubmitted: status })),
  isPasswordUpdateFormOpen: false,
  togglePasswordUpdateForm: () =>
    set((state) => ({
      isPasswordUpdateFormOpen: !state.isPasswordUpdateFormOpen,
    })),
}));

export default PasswordUpdateFormState;
