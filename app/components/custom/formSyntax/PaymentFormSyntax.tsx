"use client";
import { FC } from "react";

import {
  ErrorMessage,
  FormNavigation,
  Modal,
  ActionBtn,
} from "@/app/components/custom";
import PaymentFormState from "@/app/context/PaymentFormState";

interface PaymentFormProps {
  handleSubmit: any;
  savePayment: any;
  isEditEnabled: boolean;
  enableEdit: () => void;
  disableEdit: () => void;
  register: any;
  watch?: any;
  errors: any;
}

const PaymentFormSyntax: FC<PaymentFormProps> = ({
  handleSubmit,
  savePayment,
  isEditEnabled,
  enableEdit,
  disableEdit,
  register,
  errors,
  watch,
}) => {
  const togglePaymentForm = PaymentFormState(
    (state) => state.togglePaymentForm
  );
  const paymentID = PaymentFormState((state) => state.paymentID);
  const isPaymentFormSubmitted = PaymentFormState(
    (state) => state.isPaymentFormSubmitted
  );
  return (
    <Modal>
      <div className="form-wrap ">
        <FormNavigation text="Payment" disableForm={togglePaymentForm} />
        <form className="form-styling" onSubmit={handleSubmit(savePayment)}>
          <div className="input-wrap">
            <label htmlFor="names">Names</label>
            <div className="input-wrap">
              <input
                readOnly={!isEditEnabled}
                maxLength={12}
                className="input-styling"
                placeholder="First Name"
                {...register("firstName")}
              />

              {errors.firstName && (
                <ErrorMessage message={errors.firstName?.message} />
              )}

              <input
                readOnly={!isEditEnabled}
                className="input-styling"
                placeholder="Last Name"
                maxLength={12}
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
              <label>Mode of Payment</label>
              <select
                className="input-styling mb-5"
                {...register("modeOfPayment")}
              >
                <option key="M-Pesa" value="M-Pesa" className="uppercase">
                  M-Pesa
                </option>
                <option key="cash" value="cash" className="uppercase">
                  Cash
                </option>
              </select>
              {errors.modeOfPayment && (
                <ErrorMessage message={errors.modeOfPayment?.message} />
              )}
            </div>
            {watch("modeOfPayment") === "M-Pesa" && (
              <div className="input-wrap">
                <label htmlFor="referenceID">ReferenceID</label>
                <input
                  readOnly={!isEditEnabled}
                  className="input-styling"
                  {...register("referenceID")}
                />
                {errors.referenceID && (
                  <ErrorMessage message={errors.referenceID?.message} />
                )}
              </div>
            )}

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
          <div className="input-wrap">
            <label>Date of Payment</label>
            <input
              readOnly={!isEditEnabled}
              className="input-styling"
              placeholder="Enter date of entry"
              type="date"
              {...register("date", { valueAsDate: true })}
            />
            {errors.date && <ErrorMessage message={errors.date.message} />}
          </div>

          {paymentID && isEditEnabled && (
            <section className="self-end flex-row-centered gap-2 py-2">
              <button
                type="submit"
                className="bg-slate-700 hover:bg-slate-900 px-3 laptop:px-4 py-1.5  rounded-md text-white text-sm "
              >
                {!isPaymentFormSubmitted ? "Save" : "Saving"}
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
          {!paymentID && (
            <button
              type="submit"
              className="bg-primary hover:bg-primary/80 px-3 laptop:px-4 py-1.5  rounded-md text-white text-sm my-2 "
            >
              {!isPaymentFormSubmitted ? "Submit" : "Submitting"}
            </button>
          )}
          {paymentID && !isEditEnabled && (
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

export default PaymentFormSyntax;
