"use client";
import { create } from "zustand";

type MessageFormStateProps = {
    isMessageFormOpen: boolean;
    isMessageFormSubmitted: boolean;
    messageID: string | null;
    toggleMessageForm: () => void;
    setMessageID: (resourceID: string) => void;
    setIsMessageFormSubmitted: (status: boolean) => void;
    resetMessageID: () => void;
};

const MessageFormState = create<MessageFormStateProps>((set) => ({
    isMessageFormOpen: false,
    isMessageFormSubmitted: false,
    messageID: null,
    toggleMessageForm: () =>
        set((state) => ({ isMessageFormOpen: !state.isMessageFormOpen })),
    setIsMessageFormSubmitted: (status) =>
        set(() => ({ isMessageFormSubmitted: status })),
    setMessageID: (resourceID: string) =>
        set(() => ({ messageID: resourceID })),
    resetMessageID: () => set(() => ({ messageID: null })),
}));

export default MessageFormState;
