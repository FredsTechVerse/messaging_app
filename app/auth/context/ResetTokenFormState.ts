"use client";
import { create } from "zustand";

type ResetTokenFormStateProps = {
  isResetTokenFormSubmitted: boolean;
  setIsResetTokenFormSubmitted: (status: boolean) => void;
  isResetTokenFormOpen: boolean;
  toggleResetTokenForm: () => void;
};


const ResetTokenFormState = create<ResetTokenFormStateProps>((set) => ({
  isResetTokenFormSubmitted: false,
  setIsResetTokenFormSubmitted: (status) =>
    set(() => ({ isResetTokenFormSubmitted: status })),
  isResetTokenFormOpen: false,
  toggleResetTokenForm: () =>
    set((state) => ({ isResetTokenFormOpen: !state.isResetTokenFormOpen })),
}));

export default ResetTokenFormState;
