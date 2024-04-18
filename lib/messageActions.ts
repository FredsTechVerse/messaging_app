import Message from "../app/models/message";
import User from "../app/models/user";
const AfricasTalking = require('africastalking');

import { handleError } from "./errorHandling";
import { sendEmail } from "./emailActions";

interface messageCredentials {
    message: string;
    recipients: string[];
    email: string;
    role: string;
}

interface Users {
    message: string;
    role: string;
}

const smsConfig = {
    headers: {
        "Content-Type": "application/json",
        apikey: process.env.SMS_API_KEY,
    },
};

//CONSUMING AFRICAS TALKING API

// TODO: Initialize Africa's Talking
const africastalking = AfricasTalking({
    apiKey: '3da009aa0a2a692678c835d7699ede7181d3eef274baa1fcbfe079f4aff2cf10',
    username: 'sandbox'
});

const sendSMS: any = async () => {

    // TODO: Send message
    try {

    } catch (ex) {
        console.error(ex);
    }
};

const sendMessage = async ({ message, recipients, role }: any) => {
    try {
        const processedContacts = recipients.map(
            (recipient: any) => `+${recipient}`
        );

        const result = await africastalking.SMS.send({
            to: processedContacts,
            message: 'Yoh>>.. Good stuff',
            from: process.env.USERNAME
        });

        const messagePayload = { ...result, status: "delivered", role };
        const messageData = await Message.create(messagePayload);
        messageData.save();
        const response = {
            status: 200,
            message: "Message Sent",
            payload: "Message send successfully",
        };
        return JSON.stringify(response);
    } catch (err: any) {
        const emailMessage = `Error message ${JSON.stringify(
            err.message
        )} . Comprehensive error : ${JSON.stringify(err)}`;
        sendEmail({
            to: [process.env.TROUBLESHOOTING_EMAIL_ACCOUNT],
            subject: "SMS SERVICE HAS BEEN INTERRUPTED",
            text: emailMessage,
            role,
        });
        const smsPayload = {
            phone: process.env.SMS_CONTACT,
            message: message,
            recipient: [...recipients],
        };
        const messagePayload = { ...smsPayload, status: "rejected", role };

        const messageData = await Message.create(messagePayload);
        messageData.save();
        return JSON.stringify(err);
    }
};


const findAllMessages = async () => {
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
const findMessage = async (messageID: string) => {
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
const deleteMessage = async (messageID: string) => {
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

export {
    sendMessage,
    findAllMessages,
    findMessage,
    deleteMessage,
};
