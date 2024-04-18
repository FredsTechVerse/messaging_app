"use client";
import { MessageFormSyntax } from "..";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MessageSchema } from "@/app/zod_schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { findMessage, sendMessage } from "@/lib/messageActions";
interface MessageForm {
  message: string;
}

const MessageForm: FC = (props) => {
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const enableEdit = () => {
    setIsEditEnabled(true);
  };
  const disableEdit = () => {
    setIsEditEnabled(false);
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<MessageForm>({
    resolver: zodResolver(MessageSchema),
  });

  useEffect(() => {
    findMessage("string");
    setIsEditEnabled(true);
  }, []);

  const submitMessage = async (data: any) => {
    const { message } = data;
    await sendMessage({ message });
    console.log({ message });
    console.log(data);
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
