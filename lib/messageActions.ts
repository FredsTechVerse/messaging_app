"use server"
import Message from "../app/models/message";
const AfricasTalking = require('africastalking');
import { handleError } from "./errorHandling";
import User from "@/app/models/testUser";
// import User from "@/app/models/user";
import { revalidatePath } from "next/cache";
import connectMongoDB from "./mongodb";
import { extrapolateSMSCost } from "./calculations";
const africastalking = AfricasTalking({
    apiKey: process.env.SMS_API_KEY,
    username: process.env.SMS_USERNAME
});

interface RecipientInfo {
    cost: string,
    status: string,
    statusCode: number,
    number: string,
    messageParts: number,
    messageId: string,
}



interface Message { message: string }



const sendATMessage = async ({ message, recipients }: { message: string, recipients: string[] }) => {
    // const result = {
    //     "SMSMessageData": {
    //         "Message": "Sent to 1/1 Total Cost: 1.6",
    //         "Recipients": [{ "cost": "0.8", "status": "Success", "statusCode": 101, "number": "+254112615416", "messageParts": 1, "messageId": "Test" }]
    //     }
    // }
    const result = await africastalking.SMS.send({
        from: 'DIGISPEAR',
        to: recipients,
        message,
    });
    return result

}


const sendMessage = async ({ users, message }: { users: UserInfo[], message: string }) => {
    let successfulRecipients: string[] = []
    let unsuccessfulRecipients: string[] = []
    let messageFailed = false; // Flag to track if any messages have failed
    let failureReason = ""
    for (let i = 0; i < users.length; i++) {
        let user = users[i]
        let refinedContact = [`+${user.contact}`]
        let result = await sendATMessage({ recipients: refinedContact, message })
        let recipientsInfo: RecipientInfo[] = result.SMSMessageData.Recipients;
        let isMessageSent = recipientsInfo[0].status === "Success"

        if (isMessageSent) {
            successfulRecipients.push(user.contact)
        } else {
            messageFailed = true; // Set flag indicating a failure
            failureReason = recipientsInfo[0].status
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
    revalidatePath("/messages")
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
        return totalCost;
    } else {
        return 0;
    }
};



const sendReminder = async () => {
    try {
        await connectMongoDB()
        let users: UserInfo[] = await User.find()
        let successfulRecipients: string[] = []
        let unsuccessfulRecipients: string[] = []
        let messageFailed = false; // Flag to track if any messages have failed
        let unitCost = 0
        let totalCost = 0
        let failureReason = ""
        for (let i = 0; i < users.length; i++) {
            let user = users[i]
            let capitalizedName = user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1).toLowerCase();
            let message = `Greetings ${capitalizedName}, Reminder to honor your ${user.amount > 1 ? `Ksh ${user.amount}` : ""} pledge for the INUA COMRADE Initiative to empower fellow Christians by helping the less privilleged financially. Donate via Till No 4313956 (Shadrack Wahinya).Thank you for your generosity : DeKUT CATHOLIC STUDENTS - For more information reach out to : 0110409672`
            let refinedContact = [`+${user.contact}`]
            let result = await sendATMessage({ recipients: refinedContact, message })
            unitCost = extrapolateAmount(result.SMSMessageData.Message);
            totalCost += unitCost;
            let recipientsInfo: RecipientInfo[] = result.SMSMessageData.Recipients;
            let isMessageSent = recipientsInfo[0].status === "Success";
            // Dispersing contact to the two categories.
            if (isMessageSent) {
                successfulRecipients.push(user.contact)
            } else {
                messageFailed = true; // Set flag indicating a failure
                failureReason = recipientsInfo[0].status
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
        console.log({ unitCost, totalCost, summary, count: totalCost / unitCost })
        revalidatePath("/messages")
    } catch (err) {
        handleError(err);
    }


};


export const sendUserMessage = async ({ recipients, message }: { recipients: string[], message: string }) => {
    let successfulRecipients: string[] = []
    let unsuccessfulRecipients: string[] = []
    let failureReason = "";
    let totalCost = 0
    try {
        let result = await sendATMessage({ message, recipients })
        let unitCost = extrapolateSMSCost(result.SMSMessageData.Message);
        totalCost += unitCost
        let recipientsInfo: RecipientInfo[] = result.SMSMessageData.Recipients;
        recipientsInfo.forEach((recipient) => {
            if (recipient.statusCode === 101) {
                successfulRecipients.push(recipient.number)
            } else {
                failureReason = recipient.status;
                unsuccessfulRecipients.push(recipient.number)
            }
        })
        const summary = {
            message,
            totalCount: recipients.length,
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
        revalidatePath("/messages")
    } catch (error) {
        // We are catching any error while sending a message to user(s). This is used to send individual messages.
        unsuccessfulRecipients.push(...recipients.slice(successfulRecipients.length));
        const summary = {
            totalCount: recipients.length,
            successful: successfulRecipients.length,
            unsuccessful: unsuccessfulRecipients.length,
            unsuccessfulRecipients: unsuccessfulRecipients,
            successfulRecipients,
            totalCost,
            category: "General",
        };
        const newMessage = await Message.create({ ...summary, failureReason: "Africas Talking Error" })
        newMessage.save();
        handleError(error);
    }
}


export const sendBulkMessage = async ({ message }: Message) => {
    try {
        await connectMongoDB();
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


