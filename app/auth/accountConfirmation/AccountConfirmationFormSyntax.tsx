"use client";
import { ErrorMessage, FormNavigation } from "@/app/auth/components";
import AccountConfirmationFormState from "@/app/auth/context/AccountConfirmationFormState";
import { FC } from "react";

interface AccountConfirmationData {
  contactVerification: string;
}
interface AccountConfirmationFormProps {
  handleSubmit: any;
  verifyUserCredentials: (data: AccountConfirmationData) => void;
  register: any;
  watch?: any;
  errors: any;
}

const AccountConfirmationFormSyntax: FC<AccountConfirmationFormProps> = ({
  handleSubmit,
  verifyUserCredentials,
  register,
  errors,
}) => {
  const isAccountConfirmationFormSubmitted = AccountConfirmationFormState(
    (state) => state.isAccountConfirmationFormSubmitted
  );

  return (
    <div className="form-wrap ">
      <FormNavigation text="Verify Account" isCloseBtnDisabled={true} />
      <form
        className="form-styling"
        onSubmit={handleSubmit(verifyUserCredentials)}
      >
        <div className="input-wrap">
          <label>Contact verification code</label>
          <input
            className="input-styling"
            placeholder="Confirmation code from mobile phone"
            {...register("contactVerification")}
          />
          {errors.contactVerification && (
            <ErrorMessage message={errors.contactVerification?.message} />
          )}
        </div>
        <button
          type="submit"
          className="bg-slate-800 px-3 laptop:px-4 py-1  rounded-md text-white text-sm my-2 "
        >
          {!isAccountConfirmationFormSubmitted ? "Submit" : "Submitting"}
        </button>
      </form>
    </div>
  );
};

export default AccountConfirmationFormSyntax;
