"use client";
import { create } from "zustand";

type SignUpFormStateProps = {
    logo: any,
    setLogo: (logo: any) => void;
    isSignUpFormOpen: boolean;
    toggleSignUpForm: () => void;
    isSignUpFormSubmitted: boolean;
    setIsSignUpFormSubmitted: (status: boolean) => void;
    userRole: null | string;
    setUserRole: (userRole: any) => void;
    userID: null | string;
    setUserID: (userID: any) => void;
};

const SignUpFormState = create<SignUpFormStateProps>((set) => ({
    logo: null,
    setLogo: (logo) => set(() => ({ logo: logo })),
    isSignUpFormOpen: false,
    toggleSignUpForm: () =>
        set((state) => ({ isSignUpFormOpen: !state.isSignUpFormOpen })),
    isSignUpFormSubmitted: false,
    setIsSignUpFormSubmitted: (status) =>
        set(() => ({ isSignUpFormSubmitted: status })),
    userRole: null,
    setUserRole: (userRole) => set(() => ({ userRole: userRole })),
    userID: null,
    setUserID: (userID) => set(() => ({ userID })),
}));

export default SignUpFormState;
