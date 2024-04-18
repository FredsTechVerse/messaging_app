"use client";
import { FC } from "react";

import {
  ErrorMessage,
  FormNavigation,
  Modal,
  ActionBtn,
} from "@/app/components/custom";
import UserFormState from "@/app/context/UserFormState";

interface UserFormProps {
  handleSubmit: any;
  saveUser: any;
  isEditEnabled: boolean;
  enableEdit: () => void;
  disableEdit: () => void;
  register: any;
  watch?: any;
  errors: any;
}

const UserFormSyntax: FC<UserFormProps> = ({
  handleSubmit,
  saveUser,
  isEditEnabled,
  enableEdit,
  disableEdit,
  register,
  errors,
}) => {
  const toggleUserForm = UserFormState((state) => state.toggleUserForm);
  const userID = UserFormState((state) => state.userID);
  const isUserFormSubmitted = UserFormState(
    (state) => state.isUserFormSubmitted
  );
  return (
    <Modal>
      <div className="form-wrap ">
        <FormNavigation text="User Registration" disableForm={toggleUserForm} />
        <form className="form-styling" onSubmit={handleSubmit(saveUser)}>
          <div className="input-wrap">
            <label htmlFor="names">Names</label>
            <div className="input-wrap">
              <input
                readOnly={!isEditEnabled}
                maxLength={15}
                className="input-styling"
                placeholder="First Name"
                {...register("fName")}
              />

              {errors.fName && <ErrorMessage message={errors.fName?.message} />}

              <input
                readOnly={!isEditEnabled}
                className="input-styling"
                placeholder="Last Name"
                maxLength={15}
                {...register("surname")}
              />
              {errors.surname && (
                <ErrorMessage message={errors.surname?.message} />
              )}
            </div>
          </div>
          {/* CONTACT SECTION */}
          <div className="input-wrap">
            <div className="w-full">
              <label htmlFor="contact">Contact</label>
              <div className="flex phone:gap-3 tablet:gap-2 w-full">
                <input
                  className="input-styling w-16"
                  type="Text"
                  required
                  value="+254"
                  readOnly
                />
                <input
                  readOnly={!isEditEnabled}
                  className="input-styling w-full"
                  placeholder="Safaricom No."
                  {...register("contact")}
                />
              </div>
              {errors.contact && (
                <ErrorMessage message={errors.contact?.message} />
              )}
            </div>
            <div className="input-wrap">
              <label htmlFor="amount">Amount</label>
              <input
                readOnly={!isEditEnabled}
                className="input-styling"
                placeholder="Enter amount"
                type="number"
                {...register("amount", { valueAsNumber: true })}
              />
              {errors.amount && (
                <ErrorMessage message={errors.amount?.message} />
              )}
            </div>
          </div>

          {userID && isEditEnabled && (
            <section className="self-end flex-row-centered gap-2 py-2">
              <button
                type="submit"
                className="bg-slate-700 hover:bg-slate-900 px-3 laptop:px-4 py-1.5  rounded-md text-white text-sm "
              >
                {!isUserFormSubmitted ? "Save" : "Saving"}
              </button>
              <ActionBtn
                variant="cancel"
                text="cancel"
                action={() => {
                  disableEdit();
                }}
              />
            </section>
          )}
          {!userID && (
            <button
              type="submit"
              className="bg-primary hover:bg-primary/80 px-3 laptop:px-4 py-1.5  rounded-md text-white text-sm my-2 "
            >
              {!isUserFormSubmitted ? "Submit" : "Submitting"}
            </button>
          )}
          {userID && !isEditEnabled && (
            <section className="py-2 self-end">
              <ActionBtn
                variant="edit"
                text="edit"
                action={() => {
                  enableEdit();
                }}
              />
            </section>
          )}
        </form>
      </div>
    </Modal>
  );
};

export default UserFormSyntax;
