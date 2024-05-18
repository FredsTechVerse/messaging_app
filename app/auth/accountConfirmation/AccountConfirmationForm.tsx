"use client";
import { FC } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { confirmCaretakerCredentials } from "@/app/auth/libs/caretakerActions";
import { confirmAdminCredentials } from "@/app/auth/libs/adminActions";
import AlertBoxState from "@/app/context/AlertBoxState";
import AccountConfirmationFormSyntax from "./AccountConfirmationFormSyntax";
import AccountConfirmationFormState from "@/app/auth/context/AccountConfirmationFormState";
import SignupFormState from "@/app/auth/context/SignUpFormState";
import { AccountConfirmationSchema } from "@/app/zod_schemas";
import {
  handleSyntaxErrors,
  handleUIErrors,
  handleUISuccess,
} from "@/lib/responseHandler";

interface AccountConfirmationData {
  contactVerification: string;
}

const AccountConfirmationForm: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userID = searchParams.get("userID");
  const role = searchParams.get("role");
  const updateAlertBoxData = AlertBoxState((state) => state.updateAlertBoxData);
  const setIsAccountConfirmationFormSubmitted = AccountConfirmationFormState(
    (state) => state.setIsAccountConfirmationFormSubmitted
  );
  const verifyUserCredentials = async (data: AccountConfirmationData) => {
    try {
      const { contactVerification } = data;
      setIsAccountConfirmationFormSubmitted(true);
      if (contactVerification && userID) {
        let response: string;
        if (role == "EM-203") {
          response = await confirmAdminCredentials({
            contactVerificationCode: contactVerification.trim(),
            userID,
          });
        } else {
          response = await confirmCaretakerCredentials({
            contactVerificationCode: contactVerification.trim(),
            userID,
          });
        }
        const responseData = response && JSON.parse(response);
        const { status, message } = responseData;
        setIsAccountConfirmationFormSubmitted(false);
        if (status === 200 || status === 201) {
          setIsAccountConfirmationFormSubmitted(false);
          router.push("/auth/signIn");
          handleUISuccess({ message, updateAlertBoxData });
        } else {
          setIsAccountConfirmationFormSubmitted(false);
          handleUIErrors({ status, message, updateAlertBoxData });
        }
      } else {
        setIsAccountConfirmationFormSubmitted(false);
        updateAlertBoxData({
          response: "Fill in all the parameters",
          isResponse: true,
          status: "failure",
          timeout: 3000,
        });
      }
    } catch (err: any) {
      setIsAccountConfirmationFormSubmitted(false);
      handleSyntaxErrors({ err, updateAlertBoxData });
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AccountConfirmationData>({
    resolver: zodResolver(AccountConfirmationSchema),
  });

  return (
    <AccountConfirmationFormSyntax
      handleSubmit={handleSubmit}
      verifyUserCredentials={verifyUserCredentials}
      register={register}
      watch={watch}
      errors={errors}
    />
  );
};

export default AccountConfirmationForm;
