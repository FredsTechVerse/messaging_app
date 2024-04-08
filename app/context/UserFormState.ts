"use client";
import { create } from "zustand";
type UserFormState = {
    isUserFormOpen: boolean;
    toggleUserForm: () => void;
    isUserFormSubmitted: boolean;
    setIsUserFormSubmitted: (status: boolean) => void;
    userID: null | string;
    setUserID: (userID: any) => void;
    resetUserID: () => void;

};

const UserFormState = create<UserFormState>((set) => ({
    isUserFormOpen: false,
    toggleUserForm: () =>
        set((state) => ({ isUserFormOpen: !state.isUserFormOpen })),
    isUserFormSubmitted: false,
    setIsUserFormSubmitted: (status) =>
        set(() => ({ isUserFormSubmitted: status })),
    userID: null,
    setUserID: (userID) => set(() => ({ userID: userID })),
    resetUserID: () => set(() => ({ userID: null })),

}));



export default UserFormState;
