"use client";
import { FC } from "react";
import { ErrorMessage, FormNavigation } from "@/app/auth/components";
import ResetTokenFormState from "@/app/auth/context/ResetTokenFormState";

interface ResetTokenFormProps {
  handleSubmit: any;
  handleResetToken: any;
  watch?: any;
  register: any;
  errors: any;
}

const ResetTokenVerificationFormSyntax: FC<ResetTokenFormProps> = ({
  handleSubmit,
  handleResetToken,
  register,
  errors,
}) => {
  const isResetTokenFormSubmitted = ResetTokenFormState(
    (state) => state.isResetTokenFormSubmitted
  );
  return (
    <div className="form-wrap ">
      <FormNavigation text="Reset Token" isCloseBtnDisabled={true} />
      <form className="form-styling" onSubmit={handleSubmit(handleResetToken)}>
        <div className="input-wrap">
          <label>Reset Token</label>
          <input
            className="input-styling"
            placeholder="Enter reset token sent to phone"
            {...register("resetToken")}
          />
          {errors.resetToken && (
            <ErrorMessage message={errors.resetToken?.message} />
          )}
        </div>
        <div className="w-full flex-row-centered">
          <button
            type="submit"
            className="bg-slate-800 px-3 laptop:px-4 py-1  rounded-md text-white text-sm my-2 "
          >
            {!isResetTokenFormSubmitted ? "Verify" : "Verifying"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetTokenVerificationFormSyntax;
