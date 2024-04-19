import { z } from "zod"
const UserSchema = z.object({
    fName: z
        .string()
        .min(1, "First name is required")
        .max(12, "Cannot exceed 12 characters"),
    surname: z
        .string()
        .min(1, "Last Name is required")
        .max(12, "Cannot exceed 12 characters"),
    amount: z.number().positive().gte(1),
    contact: z
        .string()
        .length(9, "Contact must contain nine digits")

});

const MessageSchema = z.object({
    message: z.string().min(1, "Message is required."),
});

export {
    UserSchema,
    MessageSchema,
};
