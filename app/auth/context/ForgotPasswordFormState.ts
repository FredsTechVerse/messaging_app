"use client";
import { create } from "zustand";

type ForgotPasswordFormStateProps = {
  isForgotPasswordFormOpen: boolean;
  toggleForgotPasswordForm: () => void;
  userRole: null | string;
  setUserRole: (userRole: string) => void;
  userID: null | string;
  setUserID: (userID: any) => void;
  isForgotPasswordFormSubmitted: boolean;
  setIsForgotPasswordFormSubmitted: (status: boolean) => void;
};

const ForgotPasswordFormState = create<ForgotPasswordFormStateProps>((set) => ({
  isForgotPasswordFormOpen: false,
  toggleForgotPasswordForm: () =>
    set((state) => ({
      isForgotPasswordFormOpen: !state.isForgotPasswordFormOpen,
    })),
  isForgotPasswordFormSubmitted: false,
  setIsForgotPasswordFormSubmitted: (status) =>
    set(() => ({ isForgotPasswordFormSubmitted: status })),
  userRole: null,
  setUserRole: (userRole) => set(() => ({ userRole: userRole })),
  userID: null,
  setUserID: (userID) => set(() => ({ userID })),
}));

export default ForgotPasswordFormState;
