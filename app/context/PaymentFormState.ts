"use client";
import { create } from "zustand";
type PaymentFormStateProps = {
    isPaymentFormOpen: boolean;
    togglePaymentForm: () => void;
    isPaymentFormSubmitted: boolean;
    setIsPaymentFormSubmitted: (status: boolean) => void;
    paymentID: null | string;
    setPaymentID: (paymentID: any) => void;
    resetPaymentID: () => void;

};

const PaymentFormState = create<PaymentFormStateProps>((set) => ({
    isPaymentFormOpen: false,
    togglePaymentForm: () =>
        set((state) => ({ isPaymentFormOpen: !state.isPaymentFormOpen })),
    isPaymentFormSubmitted: false,
    setIsPaymentFormSubmitted: (status) =>
        set(() => ({ isPaymentFormSubmitted: status })),
    paymentID: null,
    setPaymentID: (paymentID) => set(() => ({ paymentID: paymentID })),
    resetPaymentID: () => set(() => ({ paymentID: null })),

}));



export default PaymentFormState;
