"use client";
import React from "react";
import { FormNavigation, ErrorMessage, Modal } from "..";
import messageFormState from "@/app/context/MessageFormState";

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
  watch,
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
            <label htmlFor="contact">Sender</label>
            <input
              readOnly={!isEditEnabled}
              className="input-styling"
              placeholder="Enter your name"
              {...register("names", {
                required: "Atleast one name is required ",
              })}
            />

            {names && <ErrorMessage message={names.message} />}
          </div>
          <div className="input-wrap">
            <label htmlFor="contact">Drop your email address</label>
            <input
              readOnly={!isEditEnabled}
              className="input-styling"
              placeholder="Enter Message"
              {...register("email")}
            />
            {email && <ErrorMessage message={email.message} />}
          </div>

          <div className="input-wrap">
            <label htmlFor="contact">Enter Message</label>
            <input
              readOnly={!isEditEnabled}
              className="input-styling"
              placeholder="Enter Message"
              {...register("message")}
            />
            {message && <ErrorMessage message={message.message} />}
          </div>

          <button type="submit" className="button">
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default MessageFormSyntax;
