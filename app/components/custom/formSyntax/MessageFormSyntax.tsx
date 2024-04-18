"use client";
import React from "react";
import { FormNavigation, ErrorMessage, Modal } from "..";
import messageFormState from "@/app/context/MessageFormState";
import { Textarea } from "@/components/ui/textarea";

interface MessageFormProps {
  handleSubmit: any;
  saveMessage: any;
  isEditEnabled: boolean;
  enableEdit: () => void;
  disableEdit: () => void;
  register: any;
  watch?: any;
  errors: any;
}
const MessageFormSyntax: React.FC<MessageFormProps> = ({
  handleSubmit,
  saveMessage,
  isEditEnabled,
  register,
  errors,
}) => {
  const toggleMessageForm = messageFormState(
    (state) => state.toggleMessageForm
  );
  const { names, message, email } = errors;
  return (
    <Modal>
      <div className="form-wrap  my-5 ">
        <FormNavigation disableForm={toggleMessageForm} text="Message Form" />
        <form
          className="form-styling gap-2"
          onSubmit={handleSubmit(saveMessage)}
        >
          <div className="input-wrap">
            <label htmlFor="message">Message</label>
            <Textarea
              readOnly={!isEditEnabled}
              className="input-styling"
              placeholder="Enter Message"
              {...register("message")}
            />
            {message && <ErrorMessage message={message.message} />}
          </div>

          <button
            type="submit"
            className="bg-primary hover:bg-primary/80 px-3 laptop:px-4 py-1.5  rounded-md text-white text-sm my-2 "
          >
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default MessageFormSyntax;
