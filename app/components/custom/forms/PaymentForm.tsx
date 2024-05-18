"use client";
import { FC, useState, useEffect } from "react";
import { PaymentFormSyntax } from "@/app/components/custom/formSyntax";
import { PaymentSchema } from "@/app/zod_schemas";

import {
  registerPayment,
  updatePaymentInformation,
  findPaymentById,
} from "@/lib/paymentActions";
// ADMIN FUNCTIONALITIES

import AlertBoxState from "@/app/context/AlertBoxState";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PaymentFormState from "@/app/context/PaymentFormState";
import { handleUIErrors, handleUISuccess } from "@/lib/responseHandler";
import moment from "moment";
import { generateRandomString } from "@/lib/calculations";

interface PaymentFormProps {
  referenceID: string;
  firstName: string;
  surname: string;
  date: Date;
  amount: number;
  contact: string;
  modeOfPayment: string;
}

const PaymentForm: FC = () => {
  const updateAlertBoxData = AlertBoxState((state) => state.updateAlertBoxData);
  const paymentID = PaymentFormState((state) => state.paymentID);
  const setPaymentID = PaymentFormState((state) => state.setPaymentID);
  const togglePaymentForm = PaymentFormState(
    (state) => state.togglePaymentForm
  );
  const setIsPaymentFormSubmitted = PaymentFormState(
    (state) => state.setIsPaymentFormSubmitted
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
  } = useForm<PaymentFormProps>({
    resolver: zodResolver(PaymentSchema),
    defaultValues: {
      modeOfPayment: "M-Pesa",
    },
  });

  useEffect(() => {
    const fetchData = async (paymentID: string | null) => {
      if (paymentID) {
        let data = await findPaymentById({ paymentID });
        if (data) {
          const paymentData = data && JSON.parse(data);
          const {
            firstName,
            surname,
            contact,
            amount,
            date,
            referenceID,
            modeOfPayment,
          } = paymentData.payload;
          const formattedDate =
            typeof date === "string" ? moment(date).format("DD-MM-YYYY") : date;
          setValue("date", formattedDate);
          setValue("referenceID", referenceID);
          setValue("firstName", firstName);
          setValue("surname", surname);
          setValue("contact", contact.split("254")[1]);
          setValue("amount", amount);
          setValue("modeOfPayment", modeOfPayment);
        }
      }
    };

    fetchData(paymentID);
  }, [paymentID, setValue]);

  const savePayment = async (data: PaymentFormProps) => {
    const { firstName, surname, contact, amount, date, modeOfPayment } = data;
    const referenceID =
      watch("modeOfPayment") === "M-Pesa"
        ? data.referenceID
        : `C-${await generateRandomString(6)}`;
    try {
      if (!paymentID) {
        setIsPaymentFormSubmitted(true);
        let data = await registerPayment({
          firstName: firstName.trim(),
          surname: surname.trim(),
          amount,
          date,
          modeOfPayment: modeOfPayment.trim(),
          referenceID: referenceID.trim(),
          contact: `254${contact.trim()}`,
        });
        setIsPaymentFormSubmitted(false);
        const paymentData = JSON.parse(data);
        const { status, message } = paymentData;
        if (status === 200 || status === 201) {
          handleUISuccess({ message, updateAlertBoxData });
          togglePaymentForm();
        } else {
          handleUIErrors({ status, message, updateAlertBoxData });
          setIsPaymentFormSubmitted(false);
        }
      } else {
        setIsPaymentFormSubmitted(true);
        await updatePaymentInformation({
          paymentID,
          firstName: firstName.trim(),
          surname: surname.trim(),
          date,
          modeOfPayment: modeOfPayment.trim(),
          referenceID: referenceID.trim(),
          amount,
          contact: `254${contact.trim()}`,
        });
        setIsPaymentFormSubmitted(false);
        togglePaymentForm();
      }
    } catch (err) {
      setIsPaymentFormSubmitted(false);
    }
  };

  return (
    <PaymentFormSyntax
      handleSubmit={handleSubmit}
      savePayment={savePayment}
      isEditEnabled={isEditEnabled}
      enableEdit={enableEdit}
      disableEdit={disableEdit}
      register={register}
      errors={errors}
      watch={watch}
    />
  );
};

export default PaymentForm;
