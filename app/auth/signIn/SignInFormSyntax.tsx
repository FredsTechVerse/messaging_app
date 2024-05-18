"use client";
import { FC, useState } from "react";
import Link from "next/link";
import {
  FormNavigation,
  ErrorMessage,
  PasswordToggle,
} from "@/app/auth/components";
import SignInFormState from "@/app/auth/context/SignInFormState";

interface SignInFormProps {
  handleSubmit: any;
  signinUser: any;
  register: any;
  watch?: any;
  errors: any;
}

const SignInFormSyntax: FC<SignInFormProps> = ({
  handleSubmit,
  signinUser,
  register,
  errors,
}) => {
  const [isPasswordReadEnabled, setIsPasswordReadEnabled] = useState(false);
  const togglePasswordRead = () => setIsPasswordReadEnabled((state) => !state);
  const isSignInFormSubmitted = SignInFormState(
    (state) => state.isSignInFormSubmitted
  );
  return (
    <div className="form-wrap ">
      <FormNavigation text="Sign In" isCloseBtnDisabled={true} />
      <form className="form-styling" onSubmit={handleSubmit(signinUser)}>
        <div className="input-wrap">
          <label htmlFor="idNo">Username</label>
          <input
            className="input-styling"
            placeholder="First Name / ID Number"
            {...register("username")}
          />
          {errors.username && (
            <ErrorMessage message={errors.username?.message} />
          )}
        </div>

        <div className="input-wrap w-full">
          <label htmlFor="password">Password</label>
          <div className="flex gap-1.5 w-full ">
            <input
              className="input-styling w-full "
              placeholder="Enter Password"
              type={isPasswordReadEnabled ? "text" : "password"}
              {...register("password")}
            />
            <PasswordToggle
              togglePasswordRead={togglePasswordRead}
              isPasswordReadEnabled={isPasswordReadEnabled}
            />
          </div>
          {errors.password && (
            <ErrorMessage message={errors.password?.message} />
          )}
        </div>

        <div className="flex-row-centered gap-5 my-3 text-[15px]">
          <Link
            href="/auth/signUp"
            className="text-slate-500 hover:text-slate-900"
          >
            Register
          </Link>

          <Link
            href="/auth/forgotPassword"
            className="text-slate-500 hover:text-slate-900"
          >
            Forgot Password
          </Link>
        </div>

        <button
          type="submit"
          className="bg-slate-800 px-3 laptop:px-4 py-1  rounded-md text-white text-sm my-2 "
        >
          {!isSignInFormSubmitted ? "Sign in " : "Signing In"}
        </button>
      </form>
    </div>
  );
};

export default SignInFormSyntax;
