"use client";
import { FC } from "react";
import { FormNavigation, Modal, ActionBtn } from "@/app/components/custom";
import { handleUISuccess, handleUIErrors } from "@/lib/responseHandler";
import DeleteConfirmationFormState from "@/app/context/DeleteConfirmationFormState";
import AlertBoxState from "@/app/context/AlertBoxState";
import { deletePaymentById } from "@/lib/paymentActions";
import { deleteUserById } from "@/lib/userActions";
const DeleteConfirmationForm: FC = () => {
  const updateAlertBoxData = AlertBoxState((state) => state.updateAlertBoxData);
  const resourceID = DeleteConfirmationFormState((state) => state.resourceID);
  const resourceType = DeleteConfirmationFormState(
    (state) => state.resourceType
  );
  const toggleConfirmationForm = DeleteConfirmationFormState(
    (state) => state.toggleDeleteConfirmationForm
  );
  const handleConfirmation = async () => {
    toggleConfirmationForm();
    if (resourceType === "payment") {
      let data = await deletePaymentById({ paymentID: resourceID });
      const response = JSON.parse(data);
      const { status, message: messageInfo } = response;
      if (status === 200 || status === 201) {
        handleUISuccess({ message: messageInfo, updateAlertBoxData });
      } else {
        handleUIErrors({ status, message: messageInfo, updateAlertBoxData });
      }
      return;
    } else if (resourceType === "user") {
      let data = await deleteUserById({ userID: resourceID });
      const response = JSON.parse(data);
      const { status, message: messageInfo } = response;
      if (status === 200 || status === 201) {
        handleUISuccess({ message: messageInfo, updateAlertBoxData });
      } else {
        handleUIErrors({ status, message: messageInfo, updateAlertBoxData });
      }
      return;
    } else {
      updateAlertBoxData({
        response: "Ooops! Something went wrong while deleting information",
        isResponse: true,
        status: "failure",
        timeout: 3000,
      });
      toggleConfirmationForm();
    }
  };
  return (
    <Modal>
      <section className="form-wrap bg-white pb-5 gap-2 ">
        <FormNavigation
          text="Confirmation"
          disableForm={toggleConfirmationForm}
        />
        <article className="mb-4">
          Are you sure you want to delete {resourceType}
        </article>
        <article className="w-min self-end flex-row-centered pr-3 gap-3">
          <ActionBtn text="delete" action={handleConfirmation} />
          <ActionBtn
            variant="save"
            text="cancel"
            action={toggleConfirmationForm}
          />
        </article>
      </section>
    </Modal>
  );
};

export default DeleteConfirmationForm;
