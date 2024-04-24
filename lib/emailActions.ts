"use server";
import Email from "@/app/models/email";
import { handleError } from "@/lib/errorHandling";
import nodemailer from "nodemailer"

interface EmailCredentials {
    to: string;
    subject: string;
    text: string;
}



const sendEmail = async ({
    to: emails,
    subject,
    text,
}: any) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_ACCOUNT,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const emailConfig = {
            from: process.env.EMAIL_ACCOUNT,
            to: emails,
            subject,
            text,
        };
        const info = await transporter.sendMail(emailConfig);
        if (info.accepted.length > 0) {
            const emailData = await Email.create({
                from: process.env.EMAIL_ACCOUNT,
                to: info.accepted,
                subject,
                text,
                status: "delivered",
            });
            emailData.save();
        }
        if (info.rejected.length > 0) {
            const emailData = await Email.create({
                from: process.env.EMAIL_ACCOUNT,
                to: info.rejected,
                subject,
                text,
                status: "rejected",
            });
            emailData.save();
        }

        const emailResponse = {
            acceptedEmails: info.accepted,
            rejectedEmails: info.rejected,
        };
        return JSON.stringify(emailResponse);
    } catch (error: any) {
        console.log(
            `Error while sending email messages ${JSON.stringify(error.message)}`
        );
    }
};
const sendEmailController = async ({
    to: emails,
    subject,
    text,
}: EmailCredentials) => {
    const response: any = await sendEmail({ emails, subject, text });
    if (response && response.rejectedEmails.length === 0) {
        const emailResponse = {
            status: 200,
            message: "All emails have been delivered",
            payload: { acceptedEmails: response.acceptedEmails },
        };
        return JSON.stringify(emailResponse);
    }
    const emailResponse = {
        status: 200,
        message: "Some emails have not been delivered",
        payload: {
            rejectedEmails: response && response.rejectedEmails,
            acceptedEmails: response && response.acceptedEmails,
        },
    };
    return JSON.stringify(emailResponse);
};

const findAllEmails = async () => {
    try {
        const emailData = await Email.find();
        const emailResponse = {
            status: 201,
            message: "Email information found",
            payload: emailData,
        };
        return JSON.stringify(emailResponse);
    } catch (err) {
        return handleError(err);
    }
};

export { sendEmail, sendEmailController, findAllEmails };
