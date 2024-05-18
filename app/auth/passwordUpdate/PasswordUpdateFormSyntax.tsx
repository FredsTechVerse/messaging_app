"use client";
import { useState, FC } from "react";
import {
  ErrorMessage,
  FormNavigation,
  PasswordToggle,
} from "@/app/auth/components";
import PasswordUpdateFormState from "@/app/auth/context/PasswordUpdateFormState";
interface PasswordUpdateFormProps {
  handleSubmit: any;
  handlePasswordUpdate: any;
  watch?: any;
  register: any;
  errors: any;
}

const PasswordUpdateFormSyntax: FC<PasswordUpdateFormProps> = ({
  handleSubmit,
  handlePasswordUpdate,
  register,
  errors,
}) => {
  const isPasswordUpdateFormSubmitted = PasswordUpdateFormState(
    (state) => state.isPasswordUpdateFormSubmitted
  );
  const [isPasswordReadEnabled, setIsPasswordReadEnabled] = useState(false);
  const [isConfirmPasswordReadEnabled, setIsConfirmPasswordReadEnabled] =
    useState(false);
  const togglePasswordRead = () => setIsPasswordReadEnabled((state) => !state);
  const toggleConfirmPasswordRead = () =>
    setIsConfirmPasswordReadEnabled((state) => !state);
  return (
    <div className="form-wrap ">
      <FormNavigation text="Password Update" isCloseBtnDisabled={true} />

      <form
        className="form-styling"
        onSubmit={handleSubmit(handlePasswordUpdate)}
      >
        <div className="input-wrap w-full">
          <label>New Password</label>
          <div className="flex gap-1.5 w-full ">
            <input
              className="input-styling w-full "
              placeholder="Enter new password"
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
        <div className="input-wrap w-full ">
          <label>Confirm Password</label>
          <div className="flex gap-1.5 w-full ">
            <input
              className="input-styling w-full "
              placeholder="Retype New Password"
              type={isConfirmPasswordReadEnabled ? "text" : "password"}
              {...register("cPassword")}
            />
            <PasswordToggle
              togglePasswordRead={toggleConfirmPasswordRead}
              isPasswordReadEnabled={isConfirmPasswordReadEnabled}
            />
          </div>
          {errors.cPassword && (
            <ErrorMessage message={errors.cPassword?.message} />
          )}
        </div>

        <div className="w-full flex-row-centered">
          <button
            type="submit"
            className="bg-slate-800 px-3 laptop:px-4 py-1  rounded-md text-white text-sm my-2 "
          >
            {!isPasswordUpdateFormSubmitted ? "Submit" : "Submitting"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordUpdateFormSyntax;
