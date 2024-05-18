"use client";
import { create } from "zustand";

type AccountConfirmationFormStateProps = {
  isAccountConfirmationFormSubmitted: boolean;
  setIsAccountConfirmationFormSubmitted: (status: boolean) => void;
  isAccountConfirmationFormOpen: boolean;
  toggleAccountConfirmationForm: () => void;
};

const AccountConfirmationFormState =
  create<AccountConfirmationFormStateProps>((set) => ({
    isAccountConfirmationFormSubmitted: false,
    setIsAccountConfirmationFormSubmitted: (status) =>
      set(() => ({ isAccountConfirmationFormSubmitted: status })),
    isAccountConfirmationFormOpen: false,
    toggleAccountConfirmationForm: () =>
      set((state) => ({
        isAccountConfirmationFormOpen:
          !state.isAccountConfirmationFormOpen,
      })),
  }));

export default AccountConfirmationFormState;
