"use client";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { verifyContact } from "@/app/auth/libs/authentication";
import { ForgotPasswordSchema } from "@/app/zod_schemas";
import AlertBoxState from "@/app/context/AlertBoxState";
import { useForm } from "react-hook-form";
import ForgotPasswordFormState from "@/app/auth/context/ForgotPasswordFormState";
import ForgotPasswordFormSyntax from "./ForgotPasswordFormSyntax";
import { handleUIErrors, handleUISuccess } from "@/lib/responseHandler";
import { zodResolver } from "@hookform/resolvers/zod";
const ForgotPasswordForm: FC = () => {
  const router = useRouter();
  const setIsForgotPasswordFormSubmitted = ForgotPasswordFormState(
    (state) => state.setIsForgotPasswordFormSubmitted
  );
  const setUserRole = ForgotPasswordFormState((state) => state.setUserRole);
  const setUserID = ForgotPasswordFormState((state) => state.setUserID);
  const updateAlertBoxData = AlertBoxState((state) => state.updateAlertBoxData);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const handleForgotPassword = async (data: any) => {
    try {
      const { idNo, role } = data;
      setIsForgotPasswordFormSubmitted(true);
      const response: string = await verifyContact({
        idNo,
        role,
      });
      const responseData = response && JSON.parse(response);
      const { status, message } = responseData;

      if (status === 200 || status === 201) {
        const { role, userID } = responseData.payload;
        setIsForgotPasswordFormSubmitted(false);
        handleUISuccess({ message, updateAlertBoxData });
        setUserID(userID);
        setUserRole(role);
        router.push(`/auth/resetToken?userID=${userID}&role=${role}`);
      } else {
        setIsForgotPasswordFormSubmitted(false);
        handleUIErrors({ status, message, updateAlertBoxData });
      }
    } catch (err) {
      setIsForgotPasswordFormSubmitted(false);
    }
  };
  return (
    <ForgotPasswordFormSyntax
      handleSubmit={handleSubmit}
      handleForgotPassword={handleForgotPassword}
      register={register}
      errors={errors}
    />
  );
};

export default ForgotPasswordForm;
