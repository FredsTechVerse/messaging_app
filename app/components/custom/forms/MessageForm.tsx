"use client";
import { MessageFormSyntax } from "..";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MessageSchema } from "@/app/zod_schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendMessage, findMessage } from "@/lib/messageActions";
interface MessageForm {
  name: string;
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

  return (
    <MessageFormSyntax
      handleSubmit={handleSubmit}
      enableEdit={enableEdit}
      disableEdit={disableEdit}
      saveMessage={sendMessage}
      isEditEnabled={isEditEnabled}
      register={register}
      watch={watch}
      errors={errors}
    />
  );
};

export default MessageForm;
