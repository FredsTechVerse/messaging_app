"use client";
import { MessageFormSyntax } from "..";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MessageSchema } from "@/app/zod_schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { findMessage, sendBulkMessage } from "@/lib/messageActions";
import ConfirmationFormState from "@/app/context/MessageConfirmationFormState";
import MessageFormState from "@/app/context/MessageFormState";
interface MessageFormProps {
  message: string;
}

const MessageForm: FC = (props) => {
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const setMessageType = ConfirmationFormState((state) => state.setMessageType);
  const setMessage = ConfirmationFormState((state) => state.setMessage);
  const messageID = MessageFormState((state) => state.messageID);
  const toggleConfirmationForm = ConfirmationFormState(
    (state) => state.toggleConfirmationForm
  );
  const toggleMessageForm = MessageFormState(
    (state) => state.toggleMessageForm
  );
  const enableEdit = () => {
    setIsEditEnabled(true);
  };
  const disableEdit = () => {
    setIsEditEnabled(false);
  };
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MessageFormProps>({
    resolver: zodResolver(MessageSchema),
  });

  const fetchMessage = async (messageID: string) => {
    const data = await findMessage(messageID);
    const messageData = JSON.parse(data);
    const { message } = messageData.payload;
    setValue("message", message);
    setIsEditEnabled(false);
  };
  useEffect(() => {
    if (messageID) {
      fetchMessage(messageID);
    } else {
      setIsEditEnabled(true);
    }
  }, [messageID]);

  const submitMessage = async (data: any) => {
    const { message } = data;
    setMessage(message);
    toggleConfirmationForm();
    toggleMessageForm();
  };

  return (
    <MessageFormSyntax
      handleSubmit={handleSubmit}
      enableEdit={enableEdit}
      disableEdit={disableEdit}
      saveMessage={submitMessage}
      isEditEnabled={isEditEnabled}
      register={register}
      watch={watch}
      errors={errors}
    />
  );
};

export default MessageForm;
