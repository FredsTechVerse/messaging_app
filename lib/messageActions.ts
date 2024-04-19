"use server"
import Message from "../app/models/message";
const AfricasTalking = require('africastalking');
import { handleError } from "./errorHandling";
import { sendEmail } from "./emailActions";
import { revalidateTag } from "next/cache";
import connectMongoDB from "./mongodb";
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
interface Message { message: string }
export const sendBulkMessage = async ({ message }: Message) => {
    console.log("Message being sent");
    console.log(message);
    try {
        // const message = "Lorem ipsum , Africa's Talking SMS test"
        const result = await africastalking.SMS.send({
            from: 'DIGISPEAR',
            to: "+254112615416",
            message,
        });
        // const result = JSON.parse(data)
        const recipients: Recipient[] = result.SMSMessageData.Recipients;
        const successful = recipients.filter(recipient => recipient.status === "Success").length;
        const unsuccessfulRecipients = recipients.filter(recipient => recipient.status !== "Success").map((recipient) => recipient.number);
        const unsuccessful = unsuccessfulRecipients.length;
        const totalCount = recipients.length;
        const summary = {
            message,
            totalCount,
            successful,
            unsuccessful,
            unsuccessfulRecipients
        };
        console.log({
            message,
            totalCount,
            successful,
            unsucessful: unsuccessful,
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
        console.log(err);
        return handleError(err)
    }

};

export const sendReminder = async () => {
    try {
        // Reminder will be generated from system via looping through the system data.
        const message = "Good Reminder, Africa's Talking SMS test"
        const result = await africastalking.SMS.send({
            from: 'DIGISPEAR',
            to: "+254112615416",
            message,
        });
        // const result = JSON.parse(data)
        const recipients: Recipient[] = result.SMSMessageData.Recipients;
        const successful = recipients.filter(recipient => recipient.status === "Success").length;
        const unsuccessfulRecipients = recipients.filter(recipient => recipient.status !== "Success").map((recipient) => recipient.number);
        const unsuccessful = unsuccessfulRecipients.length;
        const totalCount = recipients.length;
        const summary = {
            message,
            totalCount,
            successful,
            unsuccessful,
            unsuccessfulRecipients
        };
        console.log(summary)
        const newMessage = await Message.create(summary)
        newMessage.save();
        revalidateTag("message")
        const response = {
            status: 201,
            message: "Message sent",
        };
        return JSON.stringify(response);
    } catch (err) {
        console.log(err);
        return handleError(err)
    }
};


export const findAllMessages = async () => {
    try {
        await connectMongoDB();
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
        console.log(messageID);
        await connectMongoDB();
        const message = await Message.findById(messageID);
        console.log({ message })
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
        await connectMongoDB();
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


