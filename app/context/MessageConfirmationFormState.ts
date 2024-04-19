"use client";
import { create } from "zustand";

type ConfirmationFormStateProps = {
    isConfirmationFormOpen: boolean;
    messageType: string | null;
    message: string;
    setMessage: (message: string) => void;
    toggleConfirmationForm: () => void;
    resetConfirmationForm: () => void;
    setMessageType: (messageType: string) => void

};

const MessageConfirmationForm = create<ConfirmationFormStateProps>((set) => ({
    isConfirmationFormOpen: false,
    messageType: null,
    message: "",
    setMessage: (message: string) =>
        set(() => ({ message })),
    setMessageType: (messageType: string) =>
        set(() => ({ messageType })),
    toggleConfirmationForm: () =>
        set((state) => ({ isConfirmationFormOpen: !state.isConfirmationFormOpen })),
    resetConfirmationForm: () => set(() => ({ messageType: null }))
}));

export default MessageConfirmationForm;
