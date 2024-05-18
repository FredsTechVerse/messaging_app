"use client";
import { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AlertBoxState from "@/app/context/AlertBoxState";
import { updateCaretakerPassword } from "@/app/auth/libs/caretakerActions";
import { updateAdminPassword } from "@/app/auth/libs/adminActions";
import { useForm } from "react-hook-form";
import ForgotPasswordFormState from "@/app/auth/context/ForgotPasswordFormState";
import PasswordUpdateFormState from "@/app/auth/context/PasswordUpdateFormState";
import PasswordUpdateFormSyntax from "./PasswordUpdateFormSyntax";
import { handleUIErrors, handleUISuccess } from "@/lib/responseHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordUpdateSchema } from "@/app/zod_schemas";

const PasswordUpdateForm: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userID = searchParams.get("userID");
  const role = searchParams.get("role");

  // const role = "EM-203";
  // const role = ForgotPasswordFormState((state) => state.userRole);
  // const userID = ForgotPasswordFormState((state) => state.userID);
  const setIsPasswordUpdateFormSubmitted = PasswordUpdateFormState(
    (state) => state.setIsPasswordUpdateFormSubmitted
  );
  const updateAlertBoxData = AlertBoxState((state) => state.updateAlertBoxData);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      cPassword: "",
    },
    resolver: zodResolver(PasswordUpdateSchema),
  });

  const handlePasswordUpdate = async (data: any) => {
    try {
      const { password, cPassword } = data;
      setIsPasswordUpdateFormSubmitted(true);
      if (password === cPassword) {
        if (userID) {
          let response;
          if (role === "EM-203") {
            response = await updateAdminPassword({
              userID,
              password,
            });
          } else {
            response = await updateCaretakerPassword({
              userID,
              password,
            });
          }
          const responseData = response && (await JSON.parse(response));
          const { status, message } = responseData;

          if (status === 200 || status === 201) {
            handleUISuccess({ message, updateAlertBoxData });
            setIsPasswordUpdateFormSubmitted(false);
            router.push("/");
          } else {
            setIsPasswordUpdateFormSubmitted(false);
            handleUIErrors({ status, message, updateAlertBoxData });
          }
        } else {
          setIsPasswordUpdateFormSubmitted(false);
          updateAlertBoxData({
            response: "userID not specified",
            isResponse: true,
            status: "failure",
            timeout: 3000,
          });
        }
      } else {
        setIsPasswordUpdateFormSubmitted(false);
        updateAlertBoxData({
          response: "Passwords do not match",
          isResponse: true,
          status: "failure",
          timeout: 3000,
        });
      }
    } catch (err) {
      setIsPasswordUpdateFormSubmitted(false);
    }
  };

  return (
    <PasswordUpdateFormSyntax
      watch={watch}
      handleSubmit={handleSubmit}
      handlePasswordUpdate={handlePasswordUpdate}
      register={register}
      errors={errors}
    />
  );
};

export default PasswordUpdateForm;
