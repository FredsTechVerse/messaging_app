"use client";
import { FC, useState, useEffect } from "react";
import { UserFormSyntax } from "@/app/components/custom";
import { UserSchema } from "@/app/zod_schemas";

import {
  registerUser,
  updateUserInformation,
  findUserById,
} from "@/lib/userActions";

import AlertBoxState from "@/app/context/AlertBoxState";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import UserFormState from "@/app/context/UserFormState";
import { handleUIErrors, handleUISuccess } from "@/lib/responseHandler";

interface UserForm {
  fName: string;
  surname: string;
  email: string;
  contact: string;
  amount: number;
}

const UserForm: FC = () => {
  const updateAlertBoxData = AlertBoxState((state) => state.updateAlertBoxData);
  const userID = UserFormState((state) => state.userID);
  const setUserID = UserFormState((state) => state.setUserID);
  const toggleUserForm = UserFormState((state) => state.toggleUserForm);

  const setIsUserFormSubmitted = UserFormState(
    (state) => state.setIsUserFormSubmitted
  );
  const [isEditEnabled, setIsEditEnabled] = useState(true);
  const enableEdit = () => {
    setIsEditEnabled(true);
  };
  const disableEdit = () => {
    setIsEditEnabled(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<UserForm>({
    resolver: zodResolver(UserSchema),
  });

  useEffect(() => {
    const fetchData = async (userID: string | null) => {
      if (userID) {
        let data = await findUserById({ userID });
        if (data) {
          const userData = data && JSON.parse(data);
          const { firstName, surname, contact, amount } = userData.payload;
          setValue("fName", firstName);
          setValue("surname", surname);
          setValue("contact", contact.split("254")[1]);
          setValue("amount", amount);
        }
      }
    };

    fetchData(userID);
  }, [userID, setValue]);

  const saveUser = async (data: any) => {
    const { fName, surname, contact, amount } = data;

    if (!userID) {
      setIsUserFormSubmitted(true);
      let data = await registerUser({
        firstName: fName.trim(),
        surname: surname.trim(),
        amount,
        contact: `254${contact.trim()}`,
      });

      setIsUserFormSubmitted(false);
      const userData = JSON.parse(data);
      const { status, message } = userData;
      if (status === 200 || status === 201) {
        const { _id: userID } = userData.payload;
        handleUISuccess({ message, updateAlertBoxData });
        setUserID(userID);
        toggleUserForm();
      } else {
        handleUIErrors({ status, message, updateAlertBoxData });
        setIsUserFormSubmitted(false);
      }
    } else {
      updateUserInformation({
        userID,
        firstName: fName.trim(),
        surname: surname.trim(),
        amount,
        contact: `254${contact.trim()}`,
      });
      setIsUserFormSubmitted(false);
    }
  };

  return (
    <UserFormSyntax
      handleSubmit={handleSubmit}
      saveUser={saveUser}
      isEditEnabled={isEditEnabled}
      enableEdit={enableEdit}
      disableEdit={disableEdit}
      register={register}
      errors={errors}
      watch={watch}
    />
  );
};

export default UserForm;
