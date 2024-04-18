"use server"
import Message from "../app/models/message";
const AfricasTalking = require('africastalking');
import { handleError } from "./errorHandling";
import { sendEmail } from "./emailActions";
import { revalidateTag } from "next/cache";

const africastalking = AfricasTalking({
    apiKey: 'e30f2d6a7b7eba5e9962c36113e09252e5bf8c32d946b6fcd3f124b50b25cd74',
    username: 'fredstechverse'
});

interface Recipient {
    cost: string,
    messageId: string,
    messageParts: number,
    number: string,
    status: string,
    statusCode: string
}
export const sendMessage = async () => {
    try {
        const message = "Lorem ipsum , Africa's Talking SMS test"
        const result = await africastalking.SMS.send({
            from: 'DIGISPEAR',
            to: "+254112615416",
            message,
        });
        // const result = JSON.parse(data)
        const recipients: Recipient[] = result.SMSMessageData.Recipients;
        const successful = recipients.filter(recipient => recipient.status === "Success").length;
        const unsuccessfulRecipients = recipients.filter(recipient => recipient.status !== "Success").map((recipient) => recipient.number);
        const unsucessful = unsuccessfulRecipients.length;
        const totalCount = recipients.length;
        const summary = {
            message,
            totalCount,
            successful,
            unsucessful,
            unsuccessfulRecipients
        };
        console.log({
            message,
            totalCount,
            successful,
            unsucessful,
            unsuccessfulRecipients
        })
        const newMessage = await Message.create(summary)
        newMessage.save();
        revalidateTag("message")
        const response = {
            status: 201,
            message: "Message sent",
        };
        return JSON.stringify(response);
    } catch (err) {
        return handleError(err)
    }

};

export const sendReminder = async () => {
    try {
        const message = "Lorem ipsum , Africa's Talking SMS test"
        const result = await africastalking.SMS.send({
            from: 'DIGISPEAR',
            to: "+254112615416",
            message,
        });
        // const result = JSON.parse(data)
        const recipients: Recipient[] = result.SMSMessageData.Recipients;
        const successful = recipients.filter(recipient => recipient.status === "Success").length;
        const unsuccessfulRecipients = recipients.filter(recipient => recipient.status !== "Success").map((recipient) => recipient.number);
        const unsucessful = unsuccessfulRecipients.length;
        const totalCount = recipients.length;
        const summary = {
            message,
            totalCount,
            successful,
            unsucessful,
            unsuccessfulRecipients
        };
        console.log({
            message,
            totalCount,
            successful,
            unsucessful,
            unsuccessfulRecipients
        })
        const newMessage = await Message.create(summary)
        newMessage.save();
        revalidateTag("message")
        const response = {
            status: 201,
            message: "Message sent",
        };
        return JSON.stringify(response);
    } catch (err) {
        return handleError(err)
    }

};



export const findAllMessages = async () => {
    try {
        const messages = await Message.find();
        const response = {
            status: 200,
            message: "All messages have been found",
            payload: messages,
        };
        return JSON.stringify(response);
    } catch (err) {
        return handleError(err);
    }
};
export const findMessage = async (messageID: string) => {
    try {
        const message = await Message.findById(messageID);
        const response = {
            status: 200,
            message: "Message found!",
            payload: message,
        };
        return JSON.stringify(response);
    } catch (err) {
        return handleError(err);
    }
};
export const deleteMessage = async (messageID: string) => {
    try {
        await Message.findByIdAndDelete(messageID);
        const response = {
            status: 200,
            message: "Message deleted successfully",
        };
        return JSON.stringify(response);
    } catch (err) {
        return handleError(err);
    }
};


