"use client";
import { FC } from "react";
import { ErrorMessage, FormNavigation } from "@/app/auth/components";
import ForgotPasswordFormState from "@/app/auth/context/ForgotPasswordFormState";
interface ForgotPasswordFormProps {
  handleSubmit: any;
  handleForgotPassword: any;
  register: any;
  watch?: any;
  errors: any;
}

const ForgotPasswordFormSyntax: FC<ForgotPasswordFormProps> = ({
  handleSubmit,
  register,
  errors,
  handleForgotPassword,
}) => {
  const isForgotPasswordFormSubmitted = ForgotPasswordFormState(
    (state) => state.isForgotPasswordFormSubmitted
  );
  return (
    <div className="form-wrap ">
      <FormNavigation text="Forgot Password" isCloseBtnDisabled={true} />
      <form
        className="form-styling"
        onSubmit={handleSubmit(handleForgotPassword)}
      >
        <div className="input-wrap">
          <div className="input-wrap">
            <label>ID Number</label>
            <input
              className="input-styling"
              placeholder="Enter ID Number"
              type="text"
              {...register("idNo")}
            />
            {errors.idNo && <ErrorMessage message={errors.idNo?.message} />}
          </div>
        </div>

        <div className="input-wrap">
          <label>Select Role</label>

          <select className="input-styling  mb-5" {...register("role")}>
            <option
              value="EM-203"
              className="uppercase w-full h-8 tablet:h-10 rounded-lg"
            >
              Admin
            </option>
          </select>
          {errors.role && <ErrorMessage message={errors.role?.message} />}
        </div>
        <div className="cta-wrap">
          <div className="w-full flex-row-centered">
            <button
              type="submit"
              className="bg-slate-800 px-3 laptop:px-4 py-1  rounded-md text-white text-sm my-2 "
            >
              {!isForgotPasswordFormSubmitted ? "Submit" : "Submitting"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordFormSyntax;
