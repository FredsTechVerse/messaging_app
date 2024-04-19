"use client";
import { FC } from "react";
import { FormNavigation, Modal, ActionBtn } from "@/app/components/custom";
import MessageConfirmationFormState from "@/app/context/MessageConfirmationFormState";
import AlertBoxState from "@/app/context/AlertBoxState";
import { sendReminder, sendBulkMessage } from "@/lib/messageActions";
const MessageConfirmationForm: FC = () => {
  const updateAlertBoxData = AlertBoxState((state) => state.updateAlertBoxData);
  const message = MessageConfirmationFormState((state) => state.message);
  const messageType = MessageConfirmationFormState(
    (state) => state.messageType
  );
  const toggleConfirmationForm = MessageConfirmationFormState(
    (state) => state.toggleConfirmationForm
  );
  const handleConfirmation = async () => {
    toggleConfirmationForm();
    console.log({ messageType });
    if (messageType === "bulk messages") {
      await sendBulkMessage({ message });
      return;
    } else if (messageType === "reminders") {
      await sendReminder();
      return;
    } else {
      toggleConfirmationForm();
      updateAlertBoxData({
        response: "Ooops! Something went wrong while sending messages",
        isResponse: true,
        status: "failure",
        timeout: 3000,
      });
    }
  };
  return (
    <Modal>
      <div className="form-wrap bg-white pb-5 gap-2 ">
        <FormNavigation
          text="Confirmation"
          disableForm={toggleConfirmationForm}
        />
        <p className="mb-4">Are you sure you want to send the {messageType}</p>
        <div className="w-min self-end flex-row-centered pr-3 gap-3">
          <ActionBtn text="send" action={handleConfirmation} />
          <ActionBtn
            variant="save"
            text="cancel"
            action={toggleConfirmationForm}
          />
        </div>
      </div>
    </Modal>
  );
};

export default MessageConfirmationForm;
