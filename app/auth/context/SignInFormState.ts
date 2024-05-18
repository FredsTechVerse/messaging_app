"use client";
import { create } from "zustand";

type SignInFormStateProps = {
  isSignInFormSubmitted: boolean;
  setIsSignInFormSubmitted: (status: boolean) => void;
};



const SignInFormState = create<SignInFormStateProps>((set) => ({
  isSignInFormSubmitted: false,
  setIsSignInFormSubmitted: (status) =>
    set(() => ({ isSignInFormSubmitted: status })),

}));

export default SignInFormState;
