"use client";
import { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { confirmCaretakerResetToken } from "@/app/auth/libs/caretakerActions";
import { confirmAdminResetToken } from "@/app/auth/libs/adminActions";
import AlertBoxState from "@/app/context/AlertBoxState";
import ResetTokenFormState from "@/app/auth/context/ResetTokenFormState";
import { ResetTokenSchema } from "@/app/zod_schemas";
import { useForm } from "react-hook-form";
import ResetTokenFormSyntax from "./ResetTokenFormSyntax";
import { handleUIErrors, handleUISuccess } from "@/lib/responseHandler";
import { zodResolver } from "@hookform/resolvers/zod";

const ResetTokenForm: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userID = searchParams.get("userID");
  const role = searchParams.get("role");
  const setIsResetTokenFormSubmitted = ResetTokenFormState(
    (state) => state.setIsResetTokenFormSubmitted
  );
  const updateAlertBoxData = AlertBoxState((state) => state.updateAlertBoxData);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ResetTokenSchema),
  });

  const handleResetToken = async (data: any) => {
    try {
      const { resetToken } = data;
      setIsResetTokenFormSubmitted(true);
      if (userID) {
        let response;
        if (role === "EM-203") {
          response = await confirmAdminResetToken({
            userID,
            resetToken: resetToken.trim(),
          });
        } else {
          response = await confirmCaretakerResetToken({
            userID,
            resetToken: resetToken.trim(),
          });
        }
        const responseData = response && (await JSON.parse(response));
        const { status, message } = responseData;
        if (status === 200 || status === 201) {
          handleUISuccess({ message, updateAlertBoxData });
          setIsResetTokenFormSubmitted(false);
          router.push(`/auth/passwordUpdate?userID=${userID}&role=${role}`);
        } else {
          setIsResetTokenFormSubmitted(false);
          handleUIErrors({ status, message, updateAlertBoxData });
        }
      } else {
        setIsResetTokenFormSubmitted(false);
        updateAlertBoxData({
          response: "UserID not specified",
          isResponse: true,
          status: "failure",
          timeout: 3000,
        });
      }
    } catch (err) {
      setIsResetTokenFormSubmitted(false);
    }
  };
  return (
    <ResetTokenFormSyntax
      handleSubmit={handleSubmit}
      handleResetToken={handleResetToken}
      register={register}
      errors={errors}
    />
  );
};

export default ResetTokenForm;
