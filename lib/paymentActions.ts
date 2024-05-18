"use server";
import Payment from "@/app/models/payment";
import { revalidatePath } from "next/cache";
import { handleError } from "@/lib/errorHandling";
import connectMongoDB from "@/lib/mongodb";
// import User from "@/app/models/user";
import User from "@/app/models/testUser";
interface PaymentUpdateData {
    paymentID: string;
    firstName: string;
    surname: string;
    contact: string;
    amount: number;
    date: Date;
    referenceID: string;
    modeOfPayment: string;

}

interface PaymentDataFetch {
    paymentID: string
}


interface PaymentData {
    firstName: string;
    surname: string;
    contact: string;
    amount: number;
    date: Date;
    referenceID: string;
    modeOfPayment: string;
}

export const registerPayment = async ({
    firstName,
    surname,
    contact,
    amount,
    date,
    referenceID,
    modeOfPayment,
}: PaymentData) => {
    try {
        const credentials = {
            firstName,
            surname,
            contact,
            amount,
            date,
            referenceID,
            modeOfPayment
        };
        console.log(credentials);
        await connectMongoDB();
        let response;

        const newPayment = await Payment.create(credentials);
        // We need to disburse payment to the user who matches our specifications.
        const { _id: paymentID } = newPayment;
        console.log(`Payment saved ${paymentID}`);

        const paymentDisbursementResult = await User.findOneAndUpdate(
            { contact: contact },
            { $push: { paymentInfo: paymentID } },
            { new: true, useFindAndModify: false, runValidators: true }
        );

        if (paymentDisbursementResult && paymentDisbursementResult.paymentInfo.includes(paymentID)) {
            newPayment.status = "disbursed";
        }

        await newPayment.save(); // Save only once after the status update if needed
        revalidatePath("/payments");
        revalidatePath("/");
        response = {
            status: 201,
            message: paymentDisbursementResult && paymentDisbursementResult.paymentInfo.includes(paymentID)
                ? "Payment disbursed"
                : "Payment registered",
        };

        return JSON.stringify(response);
    } catch (err) {
        console.log(err);
        return handleError(err);
    }
};


export const findPaymentById = async (data: PaymentDataFetch) => {
    try {
        const { paymentID } = data
        await connectMongoDB();
        const userData = await Payment.findById(paymentID)
        const response = {
            status: 200,
            message: "Payment found",
            payload: userData,
        };
        return JSON.stringify(response);
    } catch (err) {
        return handleError(err);
    }
};

export const findAllPayments = async () => {
    try {
        await connectMongoDB();
        const userData = await Payment.find()
        const response = {
            status: 200,
            message: "Payments Found",
            payload: userData,
        };
        return JSON.stringify(response);
    } catch (err) {
        return handleError(err);
    }
};




export const updatePaymentInformation = async (data: PaymentUpdateData) => {
    try {
        const { firstName, surname, contact, amount, paymentID, date, modeOfPayment,
            referenceID } = data;
        await connectMongoDB();
        const updatedUserData = {
            firstName,
            surname,
            contact,
            amount,
            date,
            referenceID,
            modeOfPayment,
        };
        await Payment.findByIdAndUpdate(paymentID, updatedUserData);
        revalidatePath("/");
        revalidatePath("/payments");

        const response = {
            status: 200,
            message: "Payment Information Updated",
        };
        return JSON.stringify(response);
    } catch (error: any) {
        return handleError(error);
    }
};

export const deletePaymentById = async (data: PaymentDataFetch) => {
    try {
        await connectMongoDB();
        const { paymentID } = data
        await User.updateMany({ paymentInfo: paymentID }, { $pull: { paymentInfo: paymentID } })
        await Payment.findByIdAndDelete(paymentID)
        revalidatePath("/");
        const response = {
            status: 200,
            message: "Payment deleted ",
        };
        return JSON.stringify(response);
    } catch (err) {
        return handleError(err);
    }
};

