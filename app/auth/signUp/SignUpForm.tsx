"use client";
import { FC, useEffect } from "react";
import SignUpFormSyntax from "./SignUpFormSyntax";
import { AdminSchema } from "@/app/zod_schemas";
import { useRouter } from "next/navigation";
import {
  registerCaretaker,
  findCaretakerById,
} from "@/app/auth/libs/caretakerActions";
import { registerAdmin, findAdminById } from "@/app/auth/libs/adminActions";
// ADMIN FUNCTIONALITIES
import AlertBoxState from "@/app/context/AlertBoxState";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import SignUpFormState from "@/app/auth/context/SignUpFormState";
import { handleUIErrors, handleUISuccess } from "@/lib/responseHandler";

interface SignUpFormProps {
  fName: string;
  surname: string;
  contact: string;
  idNo: string;
}

const SignUpForm: FC = () => {
  const router = useRouter();
  const updateAlertBoxData = AlertBoxState((state) => state.updateAlertBoxData);
  const roleInfo = SignUpFormState((state) => state.userRole);
  // const role = roleInfo ? roleInfo : "EM-202";
  const role = "EM-203";

  const setUserID = SignUpFormState((state) => state.setUserID);
  const setUserRole = SignUpFormState((state) => state.setUserRole);
  const setIsSignUpFormSubmitted = SignUpFormState(
    (state) => state.setIsSignUpFormSubmitted
  );
  const userID = SignUpFormState((state) => state.userID);
  console.log(userID);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<SignUpFormProps>({
    resolver: zodResolver(AdminSchema),
  });

  const saveUser = async (data: SignUpFormProps) => {
    console.log(data);
    try {
      const { fName, surname, contact, idNo } = data;
      setIsSignUpFormSubmitted(true);
      let userInformation = "";
      if (role === "EM-203") {
        userInformation = await registerAdmin({
          fName: fName.trim(),
          surname: surname.trim(),
          contact: `254${contact.trim()}`,
          idNo: idNo.trim(),
        });
        setUserRole("EM-203");
      } else if (role === "EM-202") {
        userInformation = await registerCaretaker({
          fName: fName.trim(),
          surname: surname.trim(),
          contact: `254${contact.trim()}`,
          idNo: idNo.trim(),
        });
        setUserRole("EM-201");
      }
      const userData = userInformation && JSON.parse(userInformation);
      const { status, message } = userData;
      if (status === 201) {
        const { _id: userID } = userData.payload;
        handleUISuccess({ message, updateAlertBoxData });
        setIsSignUpFormSubmitted(false);
        setUserID(userID);
        router.push(`/auth/accountConfirmation?userID=${userID}&role=${role}`);
      } else {
        setIsSignUpFormSubmitted(false);
        handleUIErrors({ status, message, updateAlertBoxData });
      }
    } catch (err) {
      console.log(err);
      updateAlertBoxData({
        response: "Error occurred",
        isResponse: true,
        status: "failure",
        timeout: 3000,
      });
    }
  };

  useEffect(() => {
    const fetchData = async (userID: string | null) => {
      if (userID) {
        if (role === "EM-203") {
          let data: any = await findAdminById(userID);
          const adminData = data && JSON.parse(data);
          if (adminData.payload) {
            const { fName, surname, contact, idNo } = adminData.payload;
            setValue("fName", fName);
            setValue("surname", surname);
            setValue("contact", contact);
            setValue("idNo", idNo);
          }
        } else if (role === "EM-202") {
          let data: any = await findCaretakerById(userID);
          const adminData = data && JSON.parse(data);
          if (adminData.payload) {
            const { fName, surname, contact, idNo } = adminData.payload;
            setValue("fName", fName);
            setValue("surname", surname);
            setValue("contact", contact);
            setValue("idNo", idNo);
          }
        }
      }
    };

    fetchData(userID);
  }, [userID, setValue]);

  return (
    <SignUpFormSyntax
      role={role}
      handleSubmit={handleSubmit}
      saveBusiness={saveUser}
      register={register}
      errors={errors}
      watch={watch}
    />
  );
};

export default SignUpForm;
