"use client";
import { FC, useEffect, useState } from "react";
import {
  FormNavigation,
  ErrorMessage,
  PasswordToggle,
} from "@/app/auth/components";
import SignUpFormState from "@/app/auth/context/SignUpFormState";

interface SignUpFormProps {
  handleSubmit: any;
  saveBusiness: any;
  register: any;
  watch?: any;
  errors: any;
  role: any;
}

const SignUpFormSyntax: FC<SignUpFormProps> = ({
  role,
  handleSubmit,
  saveBusiness,
  register,
  errors,
}) => {
  const isSignUpFormSubmitted = SignUpFormState(
    (state) => state.isSignUpFormSubmitted
  );
  useEffect(() => {
    console.log(errors);
  });
  return (
    <div className="form-wrap ">
      <FormNavigation
        text={
          role === "EM-203" ? "Admin Registration" : "Caretaker Registration"
        }
        isCloseBtnDisabled={true}
      />
      <form className="form-styling " onSubmit={handleSubmit(saveBusiness)}>
        <div className="input-wrap">
          <label htmlFor="names">Names</label>
          <div className="input-wrap">
            <input
              maxLength={12}
              className="input-styling"
              placeholder="First Name"
              {...register("fName")}
            />

            {errors.fName && <ErrorMessage message={errors.fName?.message} />}

            <input
              className="input-styling"
              placeholder="Last Name"
              maxLength={12}
              {...register("surname")}
            />
            {errors.surname && (
              <ErrorMessage message={errors.surname?.message} />
            )}
          </div>
        </div>
        {/* CONTACT SECTION */}
        <div className="input-wrap">
          <div className="w-full">
            <label htmlFor="contact">Contact</label>
            <div className="flex phone:gap-3 tablet:gap-2 w-full">
              <input
                className="input-styling w-16"
                type="Text"
                required
                value="+254"
                readOnly
              />
              <input
                className="input-styling w-full"
                placeholder="Safaricom No."
                {...register("contact")}
              />
            </div>
            {errors.contact && (
              <ErrorMessage message={errors.contact?.message} />
            )}
          </div>
        </div>
        <div className="input-wrap">
          <label htmlFor="idNo">ID Number</label>
          <input
            className="input-styling"
            placeholder="Enter ID Number"
            {...register("idNo")}
          />
          {errors.idNo && <ErrorMessage message={errors.idNo?.message} />}
        </div>

        <div className="tablet:col-span-2 flex-row-centered p-4">
          <button
            type="submit"
            className="bg-slate-800 px-3 laptop:px-4 py-1  rounded-md text-white text-sm my-2 "
          >
            {!isSignUpFormSubmitted ? "Submit" : "Submitting"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpFormSyntax;
