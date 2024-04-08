import { z } from "zod"
const UserSchema = z.object({
    fName: z
        .string()
        .min(1, "First name is required")
        .max(20, "Cannot exceed 20 characters"),
    surname: z
        .string()
        .min(1, "Last Name is required")
        .max(20, "Cannot exceed 20 characters"),
    amount: z.number().positive().lte(100),
    contact: z
        .string()
        .min(1, "Contact is required")
        .max(9, "Cannot exceed 9 characters"),

});

const MessageSchema = z.object({
    names: z
        .string()
        .min(1, "Atleast one name is required")
        .max(40, "Cannot exceed 40 characters"),
    message: z.string().min(1, "Description is required"),
    email: z.string().email(),
});

export {
    UserSchema,
    MessageSchema,
};
