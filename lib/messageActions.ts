"use server"
import Message from "../app/models/message";
const AfricasTalking = require('africastalking');
import { handleError } from "./errorHandling";
// import User from "@/app/models/testUser";
import User from "@/app/models/user";
import { revalidatePath } from "next/cache";
import connectMongoDB from "./mongodb";
const africastalking = AfricasTalking({
    apiKey: process.env.SMS_API_KEY,
    username: process.env.SMS_USERNAME
});

interface RecipientInfo {
    cost: string,
    messageId: string,
    messageParts: number,
    number: string,
    status: string,
    statusCode: string
}


interface Message { message: string }

const sendMessage = async ({ users, message }: { users: UserInfo[], message: string }) => {
    let successfulRecipients: string[] = []
    let unsuccessfulRecipients: string[] = []
    let messageFailed = false; // Flag to track if any messages have failed
    let failureReason = ""
    for (let i = 0; i < users.length; i++) {
        let user = users[i]
        let refinedContact = [`+${user.contact}`]
        let result = await africastalking.SMS.send({
            from: 'DIGISPEAR',
            to: refinedContact,
            message,
        });
        let recipientsInfo: RecipientInfo[] = result.SMSMessageData.Recipients;
        let isMessageSent = recipientsInfo[0].status === "Success"

        if (isMessageSent) {
            successfulRecipients.push(user.contact)
        } else {
            messageFailed = true; // Set flag indicating a failure
            failureReason = recipientsInfo[0].statusCode
            break; // Exit loop
        }
    }
    // If a failure occurred, add remaining users to unsuccessfulRecipients
    if (messageFailed) {
        unsuccessfulRecipients.push(...users.slice(successfulRecipients.length).map(user => user.contact));
    }
    const summary = {
        message,
        totalCount: users.length,
        successful: successfulRecipients.length,
        unsuccessful: unsuccessfulRecipients.length,
        unsuccessfulRecipients: unsuccessfulRecipients,
        successfulRecipients,
        category: "Message",
    };
    if (unsuccessfulRecipients.length == 0) {
        const newMessage = await Message.create(summary)
        newMessage.save();
    } else {
        const newMessage = await Message.create({ ...summary, failureReason })
        newMessage.save();
    }
    revalidatePath("/message")
}

const extrapolateAmount = (inputString: string): number => {
    // Split the string by space
    var parts = inputString && inputString.split(" ");

    // Get the last part which is the cost
    var costPart = parts && parts[parts.length - 1];

    // Remove "KES" if needed
    if (costPart.startsWith("KES")) {
        costPart = costPart.substring(4);
    }

    // Convert the cost string to a floating-point number
    var totalCost = parseFloat(costPart);

    // Check if totalCost is a valid number
    if (!isNaN(totalCost)) {
        console.log("Total cost has been computed")
        return totalCost;
    } else {
        console.log("No total cost found in the input string.");
        return 0;
    }
};


const sendReminder = async () => {
    let users: UserInfo[] = await User.find()
    let successfulRecipients: string[] = []
    let unsuccessfulRecipients: string[] = []
    let messageFailed = false; // Flag to track if any messages have failed
    let unitCost;
    let failureReason = ""
    for (let i = 0; i < users.length; i++) {
        let user = users[i]
        let capitalizedName = user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1).toLowerCase();
        let message = `Greetings ${capitalizedName}, Reminder to honor your ${user.amount > 1 ? `Ksh ${user.amount}` : ""} pledge for the INUA COMRADE Initiative to empower fellow Christians by helping the less privilleged financially. Donate via Till No 4313956 (Shadrack Wahinya).Thank you for your generosity : DeKUT CATHOLIC STUDENTS - For more information reach out to : 0110409672`
        let refinedContact = [`+${user.contact}`]
        let result = await africastalking.SMS.send({
            from: 'DIGISPEAR',
            to: refinedContact,
            message,
        });
        unitCost = extrapolateAmount(result.SMSMessageData.Message);
        let recipientsInfo: RecipientInfo[] = result.SMSMessageData.Recipients;
        let isMessageSent = recipientsInfo[0].status === "Success";
        // Dispersing contact to the two categories.
        if (isMessageSent) {
            successfulRecipients.push(user.contact)
            break;
        } else {
            messageFailed = true; // Set flag indicating a failure
            failureReason = recipientsInfo[0].statusCode
            break; // Exit loop
        }
    }
    // If a failure occurred, add remaining users to unsuccessfulRecipients
    if (messageFailed) {
        unsuccessfulRecipients.push(...users.slice(successfulRecipients.length).map(user => user.contact));
    }
    const summary = {
        totalCount: users.length,
        successful: successfulRecipients.length,
        unsuccessful: unsuccessfulRecipients.length,
        unsuccessfulRecipients: unsuccessfulRecipients,
        successfulRecipients,
        category: "Reminder",

    };

    if (unsuccessfulRecipients.length == 0) {
        const newMessage = await Message.create(summary)
        newMessage.save();
    } else {
        const newMessage = await Message.create({ ...summary, failureReason })
        newMessage.save();
    }
    console.log({ unitCost, summary })
    revalidatePath("/message")
};


export const sendBulkMessage = async ({ message }: Message) => {
    try {
        const users = await User.find()
        sendMessage({ users, message })
        const response = {
            status: 201,
            message: "Message sent",
        };
        return JSON.stringify(response);
    } catch (err) {
        return handleError(err)
    }

};

export const sendBulkReminder = async () => {
    try {
        sendReminder();
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
        await connectMongoDB();
        const messages = await Message.find({ category: "Message" })
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

export const findAllReminders = async () => {
    try {
        await connectMongoDB();
        const messages = await Message.find({ category: "Reminder" })
        const response = {
            status: 200,
            message: "All reminders have been found",
            payload: messages,
        };
        return JSON.stringify(response);
    } catch (err) {
        return handleError(err);
    }
};
export const findMessage = async (messageID: string) => {
    try {
        await connectMongoDB();
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


